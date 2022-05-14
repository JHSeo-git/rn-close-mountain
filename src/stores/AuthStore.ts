import { action, makeObservable, observable, override } from 'mobx';
import me from '../api/auth/me';
import { applyToken, removeToken } from '../api/client';
import sessionStorage from '../utils/storage/sessionStorage';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { SessionInfo } from './types';

class AuthStore extends BaseStore {
  initialized = false;
  isAuthenticated = false;
  sessionInfo: SessionInfo | null = null;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      initialized: observable,
      isAuthenticated: observable,
      sessionInfo: observable,
      sessionIn: action,
      sessionOut: action,
    });

    this.init();
  }

  private setSessionInfo = (sessionInfo: SessionInfo | null) => {
    this.isAuthenticated = !!sessionInfo;
    this.sessionInfo = sessionInfo;
  };

  private init = async () => {
    try {
      const session = await sessionStorage.get();
      if (!session?.token || !session?.provider) {
        return;
      }
      applyToken(session.token);
      const result = await me();

      // if authenticated then sessionIn
      // otherwise sessionOut
      if (!result) {
        this.sessionOut();
        return;
      }

      this.sessionIn({
        token: session.token,
        provider: result.oauthProvider,
        email: result.email,
        username: result.username,
        // TODO: add avatarUrl
        avatarUrl: undefined,
      });
    } catch (e) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.initialized = true;
      console.log('complete');
    }
  };

  sessionIn = async (sessionInfo: SessionInfo) => {
    this.setSessionInfo(sessionInfo);
    applyToken(sessionInfo.token);
    await sessionStorage.set(sessionInfo);
  };

  sessionOut = async () => {
    this.setSessionInfo(null);
    removeToken();
    await sessionStorage.clear();
  };

  signOut = async () => {
    // 앱 통합 로그아웃
    if (!this.isAuthenticated) {
      return false;
    }
    if (!this.sessionInfo?.token || !this.sessionInfo?.provider) {
      return false;
    }
    if (this.sessionInfo.provider === 'google') {
      await this.root.googleSignInStore.signOut();
    }

    await this.sessionOut();
    return true;
  };
}

export default AuthStore;

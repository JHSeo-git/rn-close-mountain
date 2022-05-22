import { action, computed, makeObservable, observable } from 'mobx';
import me from '../api/auth/me';
import { applyToken, removeToken } from '../api/client';
import sessionStorage from '../utils/storage/sessionStorage';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { SessionInfo } from './types';

class AuthStore extends BaseStore {
  initialized = false;
  sessionInfo: SessionInfo | null = null;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      initialized: observable,
      sessionInfo: observable,
      sessionIn: action,
      sessionOut: action,
      isAuthenticated: computed,
    });

    this.init();
  }

  private setSessionInfo = (sessionInfo: SessionInfo | null) => {
    this.sessionInfo = sessionInfo;
  };

  private init = async () => {
    try {
      const session = await sessionStorage.get();
      if (!session?.token || !session?.oauthProvider) {
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
        oauthProvider: result.oauthProvider,
        email: result.email,
        username: result.username,
        // TODO: add avatarUrl
        avatarUrl: undefined,
      });
    } catch (e) {
      throw this.errorHandler(e);
    } finally {
      this.initialized = true;
      console.log('complete');
    }
  };

  get isAuthenticated() {
    return this.sessionInfo !== null;
  }

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
    let signOutResult = true;

    // 앱 통합 로그아웃
    if (!this.isAuthenticated) {
      signOutResult = false;
    }
    if (!this.sessionInfo?.token || !this.sessionInfo?.oauthProvider) {
      signOutResult = false;
    }
    if (this.sessionInfo?.oauthProvider === 'google') {
      await this.root.googleSignInStore.signOut();
    }

    // TODO: api server logout call
    await this.sessionOut();
    return signOutResult;
  };
}

export default AuthStore;

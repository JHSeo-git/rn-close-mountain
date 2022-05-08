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
      const token = await sessionStorage.get();
      if (!token) {
        return;
      }
      applyToken(token);
      const result = await me();

      // if authenticated then sessionIn
      // otherwise sessionOut
      if (!result) {
        this.sessionOut();
        return;
      }

      this.sessionIn({ token });
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
    await sessionStorage.set(sessionInfo.token);
  };

  sessionOut = async () => {
    this.setSessionInfo(null);
    removeToken();
    await sessionStorage.clear();
  };
}

export default AuthStore;

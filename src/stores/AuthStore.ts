import { action, makeObservable, observable, override } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { SessionInfo } from './types';

class AuthStore extends BaseStore {
  isAuthenticated = false;
  sessionInfo: SessionInfo | null = null;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      isAuthenticated: observable,
      sessionInfo: observable,
      setSessionInfo: action,
    });
  }

  setSessionInfo = (sessionInfo: SessionInfo | null) => {
    this.sessionInfo = sessionInfo;
    this.isAuthenticated = !!sessionInfo;
  };

  sessionOut = () => {
    this.setSessionInfo(null);
  };
}

export default AuthStore;

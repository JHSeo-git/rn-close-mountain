import { makeObservable, observable } from 'mobx';

class AuthStore {
  isAuthenticated = true;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
    });
  }
}

export default AuthStore;

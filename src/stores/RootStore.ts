import AuthStore from './AuthStore';
import SignInStore from './SignInStore';
import SampleStore from './__sample__/SampleStore';

class RootStore {
  SampleStore: SampleStore;
  AuthStore: AuthStore;
  SignInStore: SignInStore;

  constructor() {
    // sample
    this.SampleStore = new SampleStore();

    this.AuthStore = new AuthStore();
    this.SignInStore = new SignInStore();
  }
}

export default RootStore;

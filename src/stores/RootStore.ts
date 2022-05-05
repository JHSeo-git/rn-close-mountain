import AuthStore from './AuthStore';
import GoogleSignInStore from './GoogleSignInStore';
import EmailSignInStore from './EmailSignInStore';
import SampleStore from './__sample__/SampleStore';

class RootStore {
  SampleStore: SampleStore;
  AuthStore: AuthStore;
  EmailSignInStore: EmailSignInStore;
  GoogleSignInStore: GoogleSignInStore;

  constructor() {
    // sample
    this.SampleStore = new SampleStore();

    this.AuthStore = new AuthStore();
    this.EmailSignInStore = new EmailSignInStore();
    this.GoogleSignInStore = new GoogleSignInStore();
  }
}

export default RootStore;

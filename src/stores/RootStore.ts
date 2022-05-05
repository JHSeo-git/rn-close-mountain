import AuthStore from './AuthStore';
import GoogleSignInStore from './GoogleSignInStore';
import EmailSignInStore from './EmailSignInStore';
import SampleStore from './__sample__/SampleStore';
import LoaderStore from './LoaderStore';

class RootStore {
  SampleStore: SampleStore;
  AuthStore: AuthStore;
  EmailSignInStore: EmailSignInStore;
  GoogleSignInStore: GoogleSignInStore;
  LoaderStore: LoaderStore;

  constructor() {
    // sample
    this.SampleStore = new SampleStore();

    this.AuthStore = new AuthStore();
    this.EmailSignInStore = new EmailSignInStore();
    this.GoogleSignInStore = new GoogleSignInStore();
    this.LoaderStore = new LoaderStore();
  }
}

export default RootStore;

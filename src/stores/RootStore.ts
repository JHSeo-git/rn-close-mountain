import AuthStore from './AuthStore';
import GoogleSignInStore from './GoogleSignInStore';
import EmailSignInStore from './EmailSignInStore';
import SampleStore from './__sample__/SampleStore';
import LoaderStore from './LoaderStore';

class RootStore {
  sampleStore: SampleStore;
  authStore: AuthStore;
  emailSignInStore: EmailSignInStore;
  googleSignInStore: GoogleSignInStore;
  loaderStore: LoaderStore;

  constructor() {
    // sample
    this.sampleStore = new SampleStore();

    this.authStore = new AuthStore(this);
    this.emailSignInStore = new EmailSignInStore(this);
    this.googleSignInStore = new GoogleSignInStore(this);
    this.loaderStore = new LoaderStore(this);
  }
}

export default RootStore;

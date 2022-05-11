import AuthStore from './AuthStore';
import GoogleSignInStore from './GoogleSignInStore';
import EmailSignInStore from './EmailSignInStore';
import SampleStore from './__sample__/SampleStore';
import LoaderStore from './LoaderStore';
import SnackbarStore from './SnackbarStore';
import AppSettingStore from './AppSettingStore';
import BiometricStore from './BiometricStore';

class RootStore {
  sampleStore: SampleStore;
  authStore: AuthStore;
  emailSignInStore: EmailSignInStore;
  googleSignInStore: GoogleSignInStore;
  loaderStore: LoaderStore;
  snackbarStore: SnackbarStore;
  appSettingStore: AppSettingStore;
  biometricStore: BiometricStore;

  constructor() {
    // sample
    this.sampleStore = new SampleStore();

    this.authStore = new AuthStore(this);
    this.emailSignInStore = new EmailSignInStore(this);
    this.googleSignInStore = new GoogleSignInStore(this);
    this.loaderStore = new LoaderStore(this);
    this.snackbarStore = new SnackbarStore(this);
    this.appSettingStore = new AppSettingStore(this);
    this.biometricStore = new BiometricStore(this);
  }
}

export default RootStore;

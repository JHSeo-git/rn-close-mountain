import AuthStore from './AuthStore';
import GoogleSignInStore from './GoogleSignInStore';
import EmailSignInStore from './EmailSignInStore';
import EmailSignUpStore from './EmailSignUpStore';
import SampleStore from './__sample__/SampleStore';
import LoaderStore from './LoaderStore';
import SnackbarStore from './SnackbarStore';
import AppSettingStore from './AppSettingStore';
import BiometricStore from './BiometricStore';
import EmailStore from './EmailStore';
import VerificationStore from './VerificationStore';

// TODO: refactor this
class RootStore {
  sampleStore: SampleStore;
  authStore: AuthStore;
  emailStore: EmailStore;
  emailSignInStore: EmailSignInStore;
  emailSignUpStore: EmailSignUpStore;
  googleSignInStore: GoogleSignInStore;
  loaderStore: LoaderStore;
  snackbarStore: SnackbarStore;
  appSettingStore: AppSettingStore;
  biometricStore: BiometricStore;
  verificationStore: VerificationStore;

  constructor() {
    // sample
    this.sampleStore = new SampleStore();

    this.authStore = new AuthStore(this);
    this.emailStore = new EmailStore(this);
    this.emailSignInStore = new EmailSignInStore(this);
    this.emailSignUpStore = new EmailSignUpStore(this);
    this.googleSignInStore = new GoogleSignInStore(this);
    this.loaderStore = new LoaderStore(this);
    this.snackbarStore = new SnackbarStore(this);
    this.appSettingStore = new AppSettingStore(this);
    this.biometricStore = new BiometricStore(this);
    this.verificationStore = new VerificationStore(this);
  }
}

export default RootStore;

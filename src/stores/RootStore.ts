import SampleStore from './__sample__/SampleStore';

import AppSettingStore from './AppSettingStore';
import AuthStore from './AuthStore';
import BiometricStore from './BiometricStore';
import CollectionStore from './CollectionStore';
import EmailSignInStore from './EmailSignInStore';
import GoogleSignInStore from './GoogleSignInStore';
import LoaderStore from './LoaderStore';
import SignUpStore from './SignUpStore';
import SnackbarStore from './SnackbarStore';
import RankingsStore from './RankinsStore';
import VerificationStore from './VerificationStore';
import CommonCodeStore from './CommonCodeStore';

// TODO: refactor this
class RootStore {
  // sample
  sampleStore: SampleStore;

  appSettingStore: AppSettingStore;
  authStore: AuthStore;
  biometricStore: BiometricStore;
  collectionStore: CollectionStore;
  commonCodeStore: CommonCodeStore;
  emailSignInStore: EmailSignInStore;
  googleSignInStore: GoogleSignInStore;
  loaderStore: LoaderStore;
  rankingsStore: RankingsStore;
  signUpStore: SignUpStore;
  snackbarStore: SnackbarStore;
  verificationStore: VerificationStore;

  constructor() {
    // sample
    this.sampleStore = new SampleStore();

    this.appSettingStore = new AppSettingStore(this);
    this.authStore = new AuthStore(this);
    this.biometricStore = new BiometricStore(this);
    this.collectionStore = new CollectionStore(this);
    this.commonCodeStore = new CommonCodeStore(this);
    this.emailSignInStore = new EmailSignInStore(this);
    this.googleSignInStore = new GoogleSignInStore(this);
    this.loaderStore = new LoaderStore(this);
    this.rankingsStore = new RankingsStore(this);
    this.signUpStore = new SignUpStore(this);
    this.snackbarStore = new SnackbarStore(this);
    this.verificationStore = new VerificationStore(this);
  }
}

export default RootStore;

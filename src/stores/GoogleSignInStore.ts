import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { action, makeObservable, observable } from 'mobx';
import Config from 'react-native-config';

// Configuration for GoogleSignin
if (!Config.GOOGLE_CLIENT_ID_IOS) {
  throw new Error('GOOGLE_CLIENT_ID_IOS is not defined');
}

GoogleSignin.configure({
  iosClientId: Config.GOOGLE_CLIENT_ID_IOS,
});

class GoogleSignInError extends Error {
  code: any;

  constructor(message: string) {
    super(message);
    this.name = 'GoogleSignInError';
  }
}

class GoogleSignInStore {
  userInfo: User | null = null;
  loading: boolean = false;
  error: unknown | null = null;

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      loading: observable,
      error: observable,
      signIn: action,
      signOut: action,
      reset: action,
    });
  }

  signIn = async () => {
    this.loading = true;
    try {
      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();
      this.userInfo = googleUserInfo;
    } catch (e: unknown) {
      if (e instanceof GoogleSignInError) {
        if (e.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (e.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
        this.error = e;
      }
    } finally {
      this.loading = false;
    }
  };

  signOut = async () => {
    this.loading = true;
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.userInfo = null;
    } catch (e: unknown) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  };

  reset = () => {
    this.userInfo = null;
    this.loading = false;
    this.error = null;
  };
}

export default GoogleSignInStore;

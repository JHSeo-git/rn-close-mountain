import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { action, makeObservable, observable, override } from 'mobx';
import Config from 'react-native-config';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

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

class GoogleSignInStore extends BaseStore {
  userInfo: User | null = null;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      userInfo: observable,
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
      console.log(
        'google sign in success: ',
        JSON.stringify(this.userInfo, null, 2),
      );

      // TODO: call api to sign in
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
        console.error('google sign in error: ', e);
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

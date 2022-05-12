import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { action, makeObservable, override } from 'mobx';
import Config from 'react-native-config';
import googleSignIn from '../api/auth/googleSignIn';
import AppError from '../utils/error/AppError';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

// Configuration for GoogleSignin
if (!Config.GOOGLE_CLIENT_ID_IOS) {
  throw new AppError({
    message: 'env.GOOGLE_CLIENT_ID_IOS is not defined',
    name: 'GOOGLE_CLIENT_ID_IOS_NOT_DEFINED',
    label: 'APP',
  });
}

GoogleSignin.configure({
  iosClientId: Config.GOOGLE_CLIENT_ID_IOS,
});

class GoogleSignInStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
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
      const { accessToken } = await GoogleSignin.getTokens();

      console.log(
        'google sign in success: ',
        JSON.stringify({ userInfo: googleUserInfo, accessToken }, null, 2),
      );

      if (!googleUserInfo.idToken) {
        return;
      }

      const result = await googleSignIn({
        oauthToken: googleUserInfo.idToken,
        accessToken,
        email: googleUserInfo.user.email,
      });

      return result;
    } catch (e: any) {
      this.error = e;
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        throw new AppError({
          label: 'API',
          name: 'GOOGLE_SIGN_IN_CANCELLED',
          message: 'Google signin user cancelled', // e.message
        });
      } else if (e.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        throw new AppError({
          label: 'API',
          name: 'GOOGLE_IN_PROGRESS',
          message: 'Google signin is in progress already', // e.message
        });
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        throw new AppError({
          label: 'API',
          name: 'GOOGLE_PLAY_SERVICES_NOT_AVAILABLE',
          message: 'Google play services not available or outdated', // e.message
        });
      } else {
        throw this.errorHandler(e);
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
    } catch (e: unknown) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  };

  reset = () => {
    this.loading = false;
    this.error = null;
  };
}

export default GoogleSignInStore;

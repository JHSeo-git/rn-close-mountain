import { action, makeObservable, override } from 'mobx';
import emailSignIn from '../api/auth/emailSignIn';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class EmailSignInStore extends BaseStore {
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

  signIn = async (email: string, password: string) => {
    this.loading = true;

    try {
      const result = await emailSignIn({
        email,
        password,
      });

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  };

  signOut = async () => {};

  reset = () => {
    this.loading = false;
    this.error = null;
  };
}

export default EmailSignInStore;

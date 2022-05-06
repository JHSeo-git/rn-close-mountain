import { action, makeObservable, observable, override } from 'mobx';
import emailSignIn from '../utils/api/auth/emailSignIn';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class EmailSignInStore extends BaseStore {
  email: string | undefined;
  password: string | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      email: observable,
      password: observable,
      setEmail: action,
      setPassword: action,
      setFetchData: action,
      signIn: action,
      reset: action,
    });
  }

  setEmail = (email: string | undefined) => {
    this.email = email;
  };

  setPassword = (password: string | undefined) => {
    this.password = password;
  };

  setFetchData = (email: string, password: string) => {
    this.email = email;
    this.password = password;
  };

  signIn = async () => {
    this.loading = true;

    try {
      if (!this.email || !this.password) {
        throw new Error('Email or password is not set');
      }

      const result = await emailSignIn({
        email: this.email,
        password: this.password,
      });

      return result;
    } catch (e: unknown) {
      throw e;
    } finally {
      this.loading = false;
    }
  };

  signOut = async () => {};

  reset = () => {
    this.loading = false;
    this.error = null;
    this.email = undefined;
    this.password = undefined;
  };
}

export default EmailSignInStore;

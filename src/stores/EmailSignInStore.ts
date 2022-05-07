import axios from 'axios';
import { action, makeObservable, observable, override } from 'mobx';
import emailSignIn from '../api/auth/emailSignIn';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

import { AxiosErrorResponse } from '../api/types';
import AppError from '../utils/error/AppError';

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
        throw new AppError({
          message: 'Email or password is not set',
          name: 'EmailOrPasswordNotSet',
          label: 'VALIDATION',
        });
      }

      const result = await emailSignIn({
        email: this.email,
        password: this.password,
      });

      return result;
    } catch (e: any) {
      throw this.errorHandler(e);
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

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
      if (e instanceof AppError) {
        throw e;
      } else if (axios.isAxiosError(e) && e.response) {
        const errorResponse = e.response.data as AxiosErrorResponse | undefined;

        const message = errorResponse?.error.message ?? e.message;
        const name = errorResponse?.error.name ?? e.name;
        const status =
          errorResponse?.error.status ??
          (e.status ? parseInt(e.status, 10) : undefined);
        const stack = e.stack;

        throw new AppError({ message, name, label: 'API', status, stack });
      } else {
        const message = e.message ?? 'Unknown error';
        const name = e.name ?? 'UnknownError';

        throw new AppError({ message, name, label: 'UNKNOWN' });
      }
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

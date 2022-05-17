import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import signUp, { SignUpRequest } from '../api/auth/signUp';
import checkUsername, { CheckUsernameRequest } from '../api/auth/checkUsername';
import AppError from '../utils/error/AppError';
import type { OAuthProvider } from '../api/auth/types';

class EmailSignUpStore extends BaseStore {
  email: string | undefined;
  password: string | undefined;
  username: string | undefined;
  verificationCode: string | undefined;
  oauthProvider: OAuthProvider | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      email: observable,
      password: observable,
      username: observable,
      verificationCode: observable,
      oauthProvider: observable,
      setEmail: action,
      setVerificationCode: action,
      setPassword: action,
      setUsername: action,
      setOAuthProvider: action,
      signUp: action,
      checkUsername: action,
      reset: action,
    });
  }

  reset = () => {
    this.email = undefined;
    this.password = undefined;
    this.username = undefined;
    this.verificationCode = undefined;
    this.oauthProvider = undefined;
  };

  setEmail = (email: string) => {
    this.email = email;
  };
  setPassword = (password: string) => {
    this.password = password;
  };
  setUsername = (username: string) => {
    this.username = username;
  };
  setVerificationCode = (verificationCode: string) => {
    this.verificationCode = verificationCode;
  };
  setOAuthProvider = (oauthProvider: OAuthProvider) => {
    this.oauthProvider = oauthProvider;
  };

  signUp = async (requestData: SignUpRequest) => {
    try {
      const result = await this.callAPI(signUp(requestData));

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };

  checkUsername = async (requestData: CheckUsernameRequest) => {
    try {
      await this.callAPI(checkUsername(requestData));

      return true;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };
}

export default EmailSignUpStore;

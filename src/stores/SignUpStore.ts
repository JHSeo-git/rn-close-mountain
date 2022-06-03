import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import signUp, { SignUpRequest } from '../api/strapi/auth/signUp';
import type { OAuthProvider } from '../api/strapi/auth/types';

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
    const result = await this.callAPI(() => signUp(requestData), { useLoader: true });

    return result;
  };
}

export default EmailSignUpStore;

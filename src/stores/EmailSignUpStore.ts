import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import emailSignUp, { EmailSignUpRequest } from '../api/auth/emailSignUp';
import checkUsername, { CheckUsernameRequest } from '../api/auth/checkUsername';

class EmailSignUpStore extends BaseStore {
  email: string | undefined;
  emailVerificationCode: string | undefined;
  password: string | undefined;
  username: string | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      email: observable,
      emailVerificationCode: observable,
      password: observable,
      username: observable,
      setEmail: action,
      setEmailVerificationCode: action,
      setPassword: action,
      setUsername: action,
      signUp: action,
      checkUsername: action,
      reset: action,
    });

    this.reset();
  }

  init = () => {
    this.reset();
  };

  reset = () => {
    this.email = undefined;
    this.emailVerificationCode = undefined;
    this.password = undefined;
    this.username = undefined;
  };

  setEmail = (email: string) => {
    this.email = email;
  };
  setEmailVerificationCode = (emailVerificationCode: string) => {
    this.emailVerificationCode = emailVerificationCode;
  };
  setPassword = (password: string) => {
    this.password = password;
  };
  setUsername = (username: string) => {
    this.username = username;
  };

  signUp = async (requestData: EmailSignUpRequest) => {
    try {
      const result = await this.callAPI(emailSignUp(requestData));

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };

  checkUsername = async (requestData: CheckUsernameRequest) => {
    try {
      const result = await this.callAPI(checkUsername(requestData));

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };
}

export default EmailSignUpStore;

import { action, makeObservable, observable, override } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import emailSignUp, { EmailSignUpRequest } from '../api/auth/emailSignUp';

class EmailSignUpStore extends BaseStore {
  email: string | undefined;
  emailVerificationCode: string | undefined;
  password: string | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      email: observable,
      emailVerificationCode: observable,
      password: observable,
      setEmail: action,
      setEmailVerificationCode: action,
      signUp: action,
      reset: action,
    });

    this.reset();
  }

  init = () => {
    this.reset();
  };

  reset = () => {
    this.loading = false;
    this.error = null;
    this.email = undefined;
    this.emailVerificationCode = undefined;
    this.password = undefined;
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

  signUp = async (requestData: EmailSignUpRequest) => {
    this.loading = true;

    try {
      const result = await emailSignUp(requestData);

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  };
}

export default EmailSignUpStore;

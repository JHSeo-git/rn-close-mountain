import { action, makeObservable, observable, override } from 'mobx';
import emailSignIn, { EmailSignInRequest } from '../api/auth/emailSignIn';
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
      signIn: action,
      reset: action,
    });
  }

  signIn = async (requestData: EmailSignInRequest) => {
    this.loading = true;

    try {
      const result = await emailSignIn(requestData);

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  };

  reset = () => {
    this.loading = false;
    this.error = null;
  };
}

export default EmailSignInStore;

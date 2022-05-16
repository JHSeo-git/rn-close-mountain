import { action, makeObservable, observable } from 'mobx';
import emailSignIn, { EmailSignInRequest } from '../api/auth/emailSignIn';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class EmailSignInStore extends BaseStore {
  email: string | undefined;
  password: string | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      email: observable,
      password: observable,
      signIn: action,
      reset: action,
    });
  }

  signIn = async (requestData: EmailSignInRequest) => {
    try {
      const result = await this.callAPI(emailSignIn(requestData));

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };

  reset = () => {};
}

export default EmailSignInStore;

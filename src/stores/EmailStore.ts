import { action, makeObservable, override } from 'mobx';
import sendCode, { SendCodeRequest } from '../api/auth/sendCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class EmailStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      sendEmail: action,
    });
  }

  sendEmail = async (requestData: SendCodeRequest) => {
    this.loading = true;

    try {
      const result = await sendCode(requestData);

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  };
}

export default EmailStore;

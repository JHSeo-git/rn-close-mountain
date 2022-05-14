import { action, makeObservable, override } from 'mobx';
import sendEmailVerification, {
  SendEmailVerificationRequest,
} from '../api/auth/sendEmailVerification';
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

  sendEmail = async (requestData: SendEmailVerificationRequest) => {
    this.loading = true;

    try {
      // TODO: remove test code
      const result = {
        success: true,
      };
      // const result = await sendEmailVerification(requestData);

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

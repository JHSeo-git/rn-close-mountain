import { action, makeObservable } from 'mobx';
import checkVerificationCode, {
  CheckVerificationCodeRequest,
} from '../api/auth/checkVerificationCode';
import sendVerificationCode, {
  SendVerificationCodeRequest,
} from '../api/auth/sendVerificationCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class VerificationStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      sendVerificationCode: action,
      checkVerificationCode: action,
    });
  }

  checkVerificationCode = async (requestData: CheckVerificationCodeRequest) => {
    try {
      await this.callAPI(checkVerificationCode(requestData));

      return true;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };

  sendVerificationCode = async (requestData: SendVerificationCodeRequest) => {
    try {
      await this.callAPI(sendVerificationCode(requestData));

      return true;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };
}

export default VerificationStore;

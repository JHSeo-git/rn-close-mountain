import { action, makeObservable } from 'mobx';
import checkCode, { CheckCodeRequest } from '../api/auth/checkCode';
import sendCode, { SendCodeRequest } from '../api/auth/sendCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class VerificationStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      sendVerifyCode: action,
      checkVerifyCode: action,
    });
  }

  sendVerifyCode = async (requestData: SendCodeRequest) => {
    try {
      const result = await this.callAPI(sendCode(requestData));

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };

  checkVerifyCode = async (requestData: CheckCodeRequest) => {
    try {
      const result = await this.callAPI(checkCode(requestData));

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  };
}

export default VerificationStore;

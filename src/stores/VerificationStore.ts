import { action, makeObservable } from 'mobx';
import checkUsername, { CheckUsernameRequest } from '../api/strapi/auth/checkUsername';
import checkVerificationCode, {
  CheckVerificationCodeRequest,
} from '../api/strapi/auth/checkVerificationCode';
import sendVerificationCode, {
  SendVerificationCodeRequest,
} from '../api/strapi/auth/sendVerificationCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class VerificationStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      sendVerificationCode: action,
      checkVerificationCode: action,
      checkUsername: action,
    });
  }

  checkVerificationCode = async (requestData: CheckVerificationCodeRequest) => {
    await this.callAPI(checkVerificationCode(requestData));

    return true;
  };

  sendVerificationCode = async (requestData: SendVerificationCodeRequest) => {
    await this.callAPI(sendVerificationCode(requestData));

    return true;
  };

  checkUsername = async (requestData: CheckUsernameRequest) => {
    await this.callAPI(checkUsername(requestData));

    return true;
  };
}

export default VerificationStore;

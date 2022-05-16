import { action, makeObservable, override } from 'mobx';
import checkCode, { CheckCodeRequest } from '../api/auth/checkCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class VerificationStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      checkVerifyCode: action,
    });
  }

  checkVerifyCode = async (requestData: CheckCodeRequest) => {
    this.loading = true;
    try {
      const result = await checkCode(requestData);

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  };
}

export default VerificationStore;

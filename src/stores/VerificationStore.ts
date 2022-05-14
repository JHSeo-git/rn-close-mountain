import { action, makeObservable, override } from 'mobx';
import checkVerificationCode, {
  CheckVerificationCodeRequest,
} from '../api/auth/checkVerificationCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class VerificationStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      checkVerification: action,
    });
  }

  checkVerification(requestData: CheckVerificationCodeRequest) {
    this.loading = true;

    try {
      // TODO: remove test code
      const result = {
        success: true,
      };
      // const result = await checkVerificationCode(requestData);

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  }
}

export default VerificationStore;

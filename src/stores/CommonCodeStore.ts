import { action, makeObservable, observable, runInAction } from 'mobx';
import getCommonCode, { GetCommonCodeRequest } from '../api/strapi/commonCode/getCommonCode';
import { CommonCodeData } from '../api/strapi/commonCode/types';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class CommonCodeStore extends BaseStore {
  commonCodes: CommonCodeData[] = [];

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      commonCodes: observable,
      getCommonCode: action,
    });
  }

  reset = () => {
    this.commonCodes = [];
  };

  getCommonCode = async (requestData: GetCommonCodeRequest) => {
    const result = await this.callAPI(() => getCommonCode(requestData));

    runInAction(() => {
      this.commonCodes = result.data;
    });

    return result;
  };
}

export default CommonCodeStore;

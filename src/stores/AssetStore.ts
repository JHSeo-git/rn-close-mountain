import { action, makeObservable, observable, runInAction } from 'mobx';
import getAsset, { GetAssetRequest } from '../api/opensea/asset/getAsset';
import { OpenSeaAsset } from '../utils/types/opensea/types';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class AssetStore extends BaseStore {
  asset: OpenSeaAsset | undefined;
  retrieveAssetLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      asset: observable,
      retrieveAssetLoading: observable,

      retrieveAsset: action,
    });
  }

  retrieveAsset = async (requestData: GetAssetRequest) => {
    runInAction(() => {
      this.retrieveAssetLoading = true;
    });
    try {
      const result = await this.callAPI(() => getAsset(requestData), {
        delay: 2000,
        useLoader: true,
      });

      runInAction(() => {
        this.asset = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveAssetLoading = false;
      });
    }
  };
}

export default AssetStore;

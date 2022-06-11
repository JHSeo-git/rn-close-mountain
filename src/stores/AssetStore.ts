import { action, makeObservable, observable, runInAction } from 'mobx';
import getAsset, { GetAssetRequest } from '../api/opensea/asset/getAsset';
import getAssets, { GetAssetsRequest } from '../api/opensea/asset/getAssets';
import { OpenSeaAsset } from '../utils/types/opensea/types';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class AssetStore extends BaseStore {
  asset: OpenSeaAsset | undefined;
  moreAssets: OpenSeaAsset[] = [];
  retrieveAssetLoading: boolean = false;
  retrieveMoreAssetsLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      asset: observable,
      retrieveAssetLoading: observable,
      retrieveMoreAssetsLoading: observable,

      retrieveAsset: action,
      retrieveMoreAssets: action,
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

  retrieveMoreAssets = async (requestData: GetAssetsRequest) => {
    runInAction(() => {
      this.retrieveMoreAssetsLoading = true;
    });
    try {
      const result = await this.callAPI(() => getAssets(requestData), {
        delay: 2000,
      });

      runInAction(() => {
        this.moreAssets = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveMoreAssetsLoading = false;
      });
    }
  };
}

export default AssetStore;

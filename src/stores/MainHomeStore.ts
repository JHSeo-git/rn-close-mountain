import { action, makeObservable, observable, runInAction } from 'mobx';
import getFeaturedAsset, { GetFeaturedAssetRequest } from '../api/testnets/getFeaturedAsset';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { OpenSeaAsset } from '../utils/types/opensea/types';

class MainHomeStore extends BaseStore {
  featuredAsset: OpenSeaAsset | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      featuredAsset: observable,
      retrieveFeaturedAsset: action,
    });
  }

  retrieveFeaturedAsset = async (requestData?: GetFeaturedAssetRequest) => {
    const result = await this.callAPI(getFeaturedAsset({ ...requestData, limit: 1 }));

    runInAction(() => {
      this.featuredAsset = result;
    });

    return result;
  };
}

export default MainHomeStore;

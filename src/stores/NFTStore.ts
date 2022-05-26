import { action, makeObservable, observable, runInAction } from 'mobx';
import getNFTs, { GetNFTsRequest } from '../api/nft/getNFTs';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { NFTsData } from '../api/nft/types';

class NFTStore extends BaseStore {
  nfts: NFTsData[] = [];
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      nfts: observable,
      retrieveNFTs: action,
      reset: action,
    });
  }

  reset = () => {
    this.nfts = [];
  };

  retrieveNFTs = async (requestData?: GetNFTsRequest) => {
    const result = await this.callAPI(getNFTs(requestData ?? {}));

    runInAction(() => {
      this.nfts = result.data;
    });

    return result;
  };
}

export default NFTStore;

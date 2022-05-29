import { action, makeObservable, observable, runInAction } from 'mobx';
import getCollectionRankings, {
  GetCollectionRankingsRequest,
} from '../api/strapi/collection/getCollectionRankings';
import getCollections, { GetCollectionsRequest } from '../api/strapi/collection/getCollections';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { CollectionData } from '../api/strapi/collection/types';

class CollectionStore extends BaseStore {
  collections: CollectionData[] = [];

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      collections: observable,
      retrieveCollection: action,
      retrieveCollectionRankings: action,
    });
  }

  reset = () => {
    runInAction(() => {
      this.collections = [];
    });
  };

  retrieveCollection = async (requestData?: GetCollectionsRequest) => {
    const result = await this.callAPI(() => getCollections(requestData ?? {}));

    runInAction(() => {
      this.collections = result.data;
    });

    return result;
  };

  retrieveCollectionRankings = async (requestData?: GetCollectionRankingsRequest) => {
    const result = await this.callAPI(() => getCollectionRankings(requestData ?? {}));

    runInAction(() => {
      this.collections = result.data;
    });

    return result;
  };
}

export default CollectionStore;

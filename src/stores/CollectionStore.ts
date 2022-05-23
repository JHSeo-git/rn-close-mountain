import { action, makeObservable, observable, runInAction } from 'mobx';
import getCollectionRankings from '../api/collection/getCollectionRankings';
import getCollections from '../api/collection/getCollections';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { CollectionData } from '../api/collection/types';

class CollectionStore extends BaseStore {
  collections: CollectionData[] = [];

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      collections: observable,
      setCollections: action,
      retrieveCollection: action,
      retrieveCollectionRankings: action,
    });
  }

  reset = () => {
    this.collections = [];
  };

  setCollections = (collections: CollectionData[]) => {
    this.collections = collections;
  };

  retrieveCollection = async () => {
    const result = await this.callAPI(getCollections());

    runInAction(() => {
      this.collections = result.data;
    });

    return result;
  };

  retrieveCollectionRankings = async () => {
    const result = await this.callAPI(getCollectionRankings());

    runInAction(() => {
      this.collections = result.data;
    });

    return result;
  };
}

export default CollectionStore;

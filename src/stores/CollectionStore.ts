import { action, makeObservable, observable, runInAction } from 'mobx';
import getCollectionRankings, {
  GetCollectionRankingsRequest,
} from '../api/strapi/collection/getCollectionRankings';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { CollectionData } from '../api/strapi/collection/types';
import type { OpenSeaCollection } from '../utils/types/opensea/types';
import getCollection, { GetCollectionRequest } from '../api/opensea/collection/getCollection';

class CollectionStore extends BaseStore {
  collection: OpenSeaCollection | undefined;
  collectionRankings: CollectionData[] = [];
  retrieveCollectionLoading: boolean = false;
  retrieveCollectionRankingsLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      collection: observable,
      collectionRankings: observable,
      retrieveCollectionLoading: observable,
      retrieveCollectionRankingsLoading: observable,
      retrieveCollection: action,
      retrieveCollectionRankings: action,
      collectionCleanup: action,
    });
  }

  collectionCleanup = () => {
    this.collection = undefined;
  };

  retrieveCollection = async (requestData: GetCollectionRequest) => {
    runInAction(() => {
      this.retrieveCollectionLoading = true;
    });
    try {
      const result = await this.callAPI(() => getCollection(requestData), {
        delay: 2000,
        useLoader: true,
      });

      runInAction(() => {
        this.collection = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveCollectionLoading = false;
      });
    }
  };

  retrieveCollectionRankings = async (requestData?: GetCollectionRankingsRequest) => {
    runInAction(() => {
      this.retrieveCollectionRankingsLoading = true;
    });
    try {
      const result = await this.callAPI(() => getCollectionRankings(requestData ?? {}));

      runInAction(() => {
        this.collectionRankings = result.data;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveCollectionRankingsLoading = false;
      });
    }
  };
}

export default CollectionStore;

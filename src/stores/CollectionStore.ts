import { action, makeObservable, observable, runInAction } from 'mobx';
import getCollectionRankings, {
  GetCollectionRankingsRequest,
} from '../api/strapi/collection/getCollectionRankings';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { OpenSeaCollection } from '../utils/types/opensea/types';
import type { CollectionData } from '../api/strapi/collection/types';
import getCollection, { GetCollectionRequest } from '../api/opensea/collection/getCollection';
import getSelectedCollections, {
  SelectedCollection,
} from '../api/opensea/asset/getSelectedCollections';

class CollectionStore extends BaseStore {
  collection: OpenSeaCollection | undefined;
  collectionRankings: CollectionData[] = [];
  selectedCollections: SelectedCollection[] = [];
  retrieveCollectionLoading: boolean = false;
  retrieveSelectedCollectionsLoading: boolean = false;
  retrieveCollectionRankingsLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      collection: observable,
      collectionRankings: observable,
      retrieveCollectionLoading: observable,
      retrieveSelectedCollectionsLoading: observable,
      retrieveCollectionRankingsLoading: observable,
      retrieveCollection: action,
      retrieveCollectionRankings: action,
      retrieveSelectedCollections: action,
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

  retrieveSelectedCollections = async () => {
    runInAction(() => {
      this.retrieveSelectedCollectionsLoading = true;
    });
    try {
      const result = await this.callAPI(() => getSelectedCollections(), { delay: 2000 });

      runInAction(() => {
        this.selectedCollections = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveSelectedCollectionsLoading = false;
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

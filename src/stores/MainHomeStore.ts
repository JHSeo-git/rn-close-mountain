import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import getEvents from '../api/testnets/event/getEvents';
import getCategories, { Category } from '../api/testnets/collection/getCategories';
import getPromotion, { Promotion } from '../api/testnets/collection/getPromotion';
import getTopCollections, { TopCollection } from '../api/testnets/collection/getTopCollections';
import getCollectionsScroller, {
  TrendingCollection,
} from '../api/testnets/collection/getCollectionsScroller';
import getExpiredSoonAssets, { ExpiredSoonAsset } from '../api/testnets/asset/getExpiredSoonAssets';
import type { OpenSeaAsset } from '../utils/types/opensea/types';

class MainHomeStore extends BaseStore {
  pullToRefresh: boolean = false;
  featuredAsset: OpenSeaAsset | undefined;
  notableDrops: Promotion[] = [];
  categories: Category[] = [];
  trendingCollections: TrendingCollection[] = [];
  topCollections: TopCollection[] = [];
  expiredSoonAssets: ExpiredSoonAsset[] = [];
  retrieveFeaturedAssetLoading: boolean = false;
  retrieveNotableDropsLoading: boolean = false;
  retrieveCategoriesLoading: boolean = false;
  retrieveTrendingCollectionsLoading: boolean = false;
  retrieveTopCollectionsLoading: boolean = false;
  retrieveExpiredSoonAssetsLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      pullToRefresh: observable,
      featuredAsset: observable,
      notableDrops: observable,
      categories: observable,
      trendingCollections: observable,
      topCollections: observable,
      expiredSoonAssets: observable,
      retrieveFeaturedAssetLoading: observable,
      retrieveNotableDropsLoading: observable,
      retrieveCategoriesLoading: observable,
      retrieveTrendingCollectionsLoading: observable,
      retrieveTopCollectionsLoading: observable,
      retrieveExpiredSoonAssetsLoading: observable,
      setPullToRefresh: action,
      retrieveFeaturedAsset: action,
      retrieveNotableDrops: action,
      retrieveCategories: action,
      retrieveTrendingCollections: action,
      retrieveTopCollections: action,
      retrieveExpiredSoonAssets: action,
    });
  }

  setPullToRefresh = (pullToRefresh: boolean) => {
    this.pullToRefresh = pullToRefresh;
  };

  /**
   * 한달 이내의 이벤트가 'successful'인 Asset 중 하나를 조회한다.
   */
  retrieveFeaturedAsset = async () => {
    runInAction(() => {
      this.retrieveFeaturedAssetLoading = true;
    });
    try {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);

      const occurred_after = now.toISOString();

      const result = await this.callAPI(() =>
        getEvents({
          occurred_after,
          event_type: 'successful',
          limit: 1,
        }),
      );

      runInAction(() => {
        this.featuredAsset = result.length > 0 ? result[0].asset : undefined;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveFeaturedAssetLoading = false;
      });
    }
  };

  retrieveNotableDrops = async () => {
    runInAction(() => {
      this.retrieveNotableDropsLoading = true;
    });
    try {
      // TODO: remove delay when api is ready

      const result = await this.callAPI(() => getPromotion(), { delay: 2000 });

      runInAction(() => {
        this.notableDrops = result.promotions;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveNotableDropsLoading = false;
      });
    }
  };

  retrieveCategories = async () => {
    runInAction(() => {
      this.retrieveCategoriesLoading = true;
    });
    try {
      // TODO: remove delay when api is ready
      const result = await this.callAPI(() => getCategories());

      runInAction(() => {
        this.categories = result.categories;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveCategoriesLoading = false;
      });
    }
  };

  retrieveTrendingCollections = async () => {
    runInAction(() => {
      this.retrieveTrendingCollectionsLoading = true;
    });
    try {
      // TODO: remove delay when api is ready
      const result = await this.callAPI(() => getCollectionsScroller(), { delay: 2000 });

      runInAction(() => {
        this.trendingCollections = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveTrendingCollectionsLoading = false;
      });
    }
  };

  retrieveTopCollections = async () => {
    runInAction(() => {
      this.retrieveTopCollectionsLoading = true;
    });
    try {
      // TODO: remove delay when api is ready
      const result = await this.callAPI(() => getTopCollections(), { delay: 2000 });

      runInAction(() => {
        this.topCollections = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveTopCollectionsLoading = false;
      });
    }
  };

  retrieveExpiredSoonAssets = async () => {
    runInAction(() => {
      this.retrieveExpiredSoonAssetsLoading = true;
    });
    try {
      // TODO: remove delay when api is ready
      const result = await this.callAPI(() => getExpiredSoonAssets(), { delay: 2000 });

      runInAction(() => {
        this.expiredSoonAssets = result;
      });

      return result;
    } catch (e) {
      throw e;
    } finally {
      runInAction(() => {
        this.retrieveExpiredSoonAssetsLoading = false;
      });
    }
  };
}

export default MainHomeStore;

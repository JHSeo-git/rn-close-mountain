import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import getEvents from '../api/testnets/event/getEvents';
import getCategories from '../api/testnets/collection/getCategories';
import getPromotion from '../api/testnets/promition/getPromotion';
import type { OpenSeaAsset } from '../utils/types/opensea/types';
import type { Category, TrendingCollectionsNode } from '../api/testnets/collection/types';
import type { Promotion } from '../api/testnets/promition/types';
import getCollectionsScroller from '../api/testnets/collection/getCollectionsScroller';

class MainHomeStore extends BaseStore {
  featuredAsset: OpenSeaAsset | undefined;
  notableDrops: Promotion[] = [];
  categories: Category[] = [];
  trendingCollections: TrendingCollectionsNode[] = [];
  retrieveFeaturedAssetLoading: boolean = false;
  retrieveNotableDropsLoading: boolean = false;
  retrieveCategoriesLoading: boolean = false;
  retrieveTrendingCollectionsLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      featuredAsset: observable,
      notableDrops: observable,
      categories: observable,
      trendingCollections: observable,
      retrieveFeaturedAssetLoading: observable,
      retrieveNotableDropsLoading: observable,
      retrieveCategoriesLoading: observable,
      retrieveTrendingCollectionsLoading: observable,
      retrieveFeaturedAsset: action,
      retrieveNotableDrops: action,
      retrieveCategories: action,
      retrieveTrendingCollections: action,
    });
  }

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
        this.categories = result;
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
}

export default MainHomeStore;

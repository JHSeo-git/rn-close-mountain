import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import getEvents from '../api/testnets/event/getEvents';
import getAssets from '../api/testnets/asset/getAssets';
import type { OpenSeaAsset } from '../utils/types/opensea/types';

type CategoryInfo = {
  id: number;
  coverImageUrl: string;
  name: string;
};

// TODO: retreive api
const categories: CategoryInfo[] = [
  {
    id: 1,
    coverImageUrl: 'https://opensea.io/static/images/categories/art.png',
    name: 'Art',
  },
  {
    id: 2,
    coverImageUrl: 'https://opensea.io/static/images/categories/collectibles.png',
    name: 'Collectibles',
  },
  {
    id: 3,
    coverImageUrl: 'https://opensea.io/static/images/categories/domain-names.png',
    name: 'Domain Names',
  },
  {
    id: 4,
    coverImageUrl: 'https://opensea.io/static/images/categories/music.png',
    name: 'Music',
  },
  {
    id: 5,
    coverImageUrl: 'https://opensea.io/static/images/categories/photography-category.png',
    name: 'Photography',
  },
  {
    id: 6,
    coverImageUrl: 'https://opensea.io/static/images/categories/sports.png',
    name: 'Sports',
  },
  {
    id: 7,
    coverImageUrl: 'https://opensea.io/static/images/categories/trading-cards.png',
    name: 'Trading Cards',
  },
  {
    id: 8,
    coverImageUrl: 'https://opensea.io/static/images/categories/utility.png',
    name: 'Utility',
  },
  {
    id: 9,
    coverImageUrl: 'https://opensea.io/static/images/categories/virtual-worlds.png',
    name: 'Virtual Worlds',
  },
];

class MainHomeStore extends BaseStore {
  featuredAsset: OpenSeaAsset | undefined;
  notableDrops: OpenSeaAsset[] = [];
  categories: CategoryInfo[] = [];
  retrieveFeaturedAssetLoading: boolean = false;
  retrieveNotableDropsLoading: boolean = false;
  retrieveCategoriesLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      featuredAsset: observable,
      notableDrops: observable,
      retrieveFeaturedAssetLoading: observable,
      retrieveNotableDropsLoading: observable,
      retrieveCategoriesLoading: observable,
      retrieveFeaturedAsset: action,
      retrieveNotableDrops: action,
      retrieveCategories: action,
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

  /**
   * 판매 수로 정렬하여 상위 5개의 Asset을 조회한다.
   */
  retrieveNotableDrops = async () => {
    runInAction(() => {
      this.retrieveNotableDropsLoading = true;
    });
    try {
      const result = await this.callAPI(() =>
        getAssets({
          order_by: 'sale_count',
          order_direction: 'desc',
          offset: 0,
          limit: 5,
        }),
      );

      runInAction(() => {
        this.notableDrops = result;
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
      const result = categories;

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
}

export default MainHomeStore;

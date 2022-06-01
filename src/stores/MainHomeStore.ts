import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import getEvents from '../api/testnets/event/getEvents';
import getAssets from '../api/testnets/asset/getAssets';
import type { OpenSeaAsset } from '../utils/types/opensea/types';

class MainHomeStore extends BaseStore {
  featuredAsset: OpenSeaAsset | undefined;
  notableDrops: OpenSeaAsset[] = [];
  retrieveFeaturedAssetLoading: boolean = false;
  retrieveNotableDropsLoading: boolean = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      featuredAsset: observable,
      notableDrops: observable,
      retrieveFeaturedAssetLoading: observable,
      retrieveNotableDropsLoading: observable,
      retrieveFeaturedAsset: action,
      retrieveNotableDrops: action,
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
}

export default MainHomeStore;

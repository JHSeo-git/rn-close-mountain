import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import getEvents from '../api/testnets/event/getEvents';
import type { OpenSeaAsset } from '../utils/types/opensea/types';
import getAssets from '../api/testnets/asset/getAssets';

class MainHomeStore extends BaseStore {
  featuredAsset: OpenSeaAsset | undefined;
  notableDrops: OpenSeaAsset[] = [];

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      featuredAsset: observable,
      notableDrops: observable,
      retrieveFeaturedAsset: action,
      retrieveNotableDrops: action,
    });
  }

  /**
   * 일주일 이내의 이벤트가 'successful'인 Asset 중 하나를 조회한다.
   */
  retrieveFeaturedAsset = async () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);

    const occurred_after = now.toISOString();

    const result = await this.callAPI(
      () =>
        getEvents({
          occurred_after,
          event_type: 'successful',
          limit: 1,
        }),
      {
        delay: 1000,
      },
    );

    runInAction(() => {
      this.featuredAsset = result.length > 0 ? result[0].asset : undefined;
    });

    return result;
  };

  /**
   * 판매 수로 정렬하여 상위 5개의 Asset을 조회한다.
   */
  retrieveNotableDrops = async () => {
    const result = await this.callAPI(
      () =>
        getAssets({
          order_by: 'sale_count',
          order_direction: 'desc',
          offset: 0,
          limit: 5,
        }),
      {
        delay: 1000,
      },
    );

    runInAction(() => {
      this.notableDrops = result;
    });

    return result;
  };
}

export default MainHomeStore;

import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import getCommonCode from '../api/strapi/commonCode/getCommonCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { CommonCodeData } from '../api/strapi/commonCode/types';
import { SelectItem } from '../components/UISelect/UISelect';

class RankingsStore extends BaseStore {
  periods: CommonCodeData[] = [];
  categories: CommonCodeData[] = [];
  chains: CommonCodeData[] = [];
  selectedPeriodItem: SelectItem | undefined;
  selectedCategoryItem: SelectItem | undefined;
  selectedChainItem: SelectItem | undefined;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      periods: observable,
      categories: observable,
      chains: observable,
      selectedPeriodItem: observable,
      selectedCategoryItem: observable,
      selectedChainItem: observable,
      setSelectedPeriodItem: action,
      setSelectedCategoryItem: action,
      setSelectedChainItem: action,
      retrieveCategories: action,
      retrieveChains: action,

      periodItems: computed,
      categoryItems: computed,
      chainItems: computed,

      reset: action,
    });
  }

  reset() {
    this.periods = [];
    this.categories = [];
    this.chains = [];
    this.selectedPeriodItem = undefined;
    this.selectedCategoryItem = undefined;
    this.selectedChainItem = undefined;
  }

  setSelectedPeriodItem = (item: SelectItem) => {
    this.selectedPeriodItem = item;
  };
  setSelectedCategoryItem = (item: SelectItem) => {
    this.selectedCategoryItem = item;
  };
  setSelectedChainItem = (item: SelectItem) => {
    this.selectedChainItem = item;
  };

  retrievePeriods = async () => {
    const result = await this.callAPI(() => getCommonCode({ group: 'period' }));

    runInAction(() => {
      this.periods = result.data;
    });

    return result;
  };
  retrieveCategories = async () => {
    const result = await this.callAPI(() => getCommonCode({ group: 'category' }));

    runInAction(() => {
      this.categories = result.data;
    });

    return result;
  };
  retrieveChains = async () => {
    const result = await this.callAPI(() => getCommonCode({ group: 'chain' }));

    runInAction(() => {
      this.chains = result.data;
    });

    return result;
  };

  get periodItems(): SelectItem[] {
    return this.periods.map(period => {
      const item: SelectItem = {
        key: period.id,
        label: period.attributes.codeName,
        value: period.attributes.code,
      };
      return item;
    });
  }

  get categoryItems(): SelectItem[] {
    return this.categories.map(category => {
      const item: SelectItem = {
        key: category.id,
        label: category.attributes.codeName,
        value: category.attributes.code,
      };
      return item;
    });
  }

  get chainItems(): SelectItem[] {
    return this.chains.map(chain => {
      const item: SelectItem = {
        key: chain.id,
        label: chain.attributes.codeName,
        value: chain.attributes.code,
      };
      return item;
    });
  }
}

export default RankingsStore;

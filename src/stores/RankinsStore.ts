import { action, makeObservable, observable, runInAction } from 'mobx';
import getCommonCode from '../api/strapi/commonCode/getCommonCode';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import type { CommonCodeData } from '../api/strapi/commonCode/types';

class RankingsStore extends BaseStore {
  periods: CommonCodeData[] = [];
  categories: CommonCodeData[] = [];
  chains: CommonCodeData[] = [];
  selectedPeriod = '';
  selectedPeriodLabel = '';
  selectedCategory = '';
  selectedCategoryLabel = '';
  selectedChain = '';
  selectedChainLabel = '';

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      periods: observable,
      categories: observable,
      chains: observable,
      selectedPeriod: observable,
      selectedPeriodLabel: observable,
      selectedCategory: observable,
      selectedCategoryLabel: observable,
      selectedChain: observable,
      selectedChainLabel: observable,
      setSelectedPeriod: action,
      setSelectedPeriodLabel: action,
      setSelectedCategory: action,
      setSelectedCategoryLabel: action,
      setSelectedChain: action,
      setSelectedChainLabel: action,
      retrieveCategories: action,
      retrieveChains: action,
      reset: action,
    });
  }

  reset() {
    this.periods = [];
    this.categories = [];
    this.chains = [];
    this.selectedPeriod = '';
    this.selectedPeriodLabel = '';
    this.selectedCategory = '';
    this.selectedCategoryLabel = '';
    this.selectedChainLabel = '';
  }

  setSelectedPeriod = (period: string) => {
    this.selectedPeriod = period;
  };
  setSelectedPeriodLabel = (periodLabel: string) => {
    this.selectedPeriodLabel = periodLabel;
  };
  setSelectedCategory = (category: string) => {
    this.selectedCategory = category;
  };
  setSelectedCategoryLabel = (categoryLabel: string) => {
    this.selectedCategoryLabel = categoryLabel;
  };
  setSelectedChain = (chain: string) => {
    this.selectedChain = chain;
  };
  setSelectedChainLabel = (chainLabel: string) => {
    this.selectedChainLabel = chainLabel;
  };

  retrievePeriods = async () => {
    const result = await this.callAPI(getCommonCode({ group: 'period' }));

    runInAction(() => {
      this.periods = result.data;
    });

    return result;
  };
  retrieveCategories = async () => {
    const result = await this.callAPI(getCommonCode({ group: 'category' }));

    runInAction(() => {
      this.categories = result.data;
    });

    return result;
  };
  retrieveChains = async () => {
    const result = await this.callAPI(getCommonCode({ group: 'chain' }));

    runInAction(() => {
      this.chains = result.data;
    });

    return result;
  };
}

export default RankingsStore;

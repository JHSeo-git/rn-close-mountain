import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class RankingsStore extends BaseStore {
  categories: string[] = [];
  chains: string[] = [];
  selectedCategory = '';
  selectedChain = '';

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      categories: observable,
      chains: observable,
      selectedCategory: observable,
      selectedChain: observable,
      setSelectedCategory: action,
      setSelectedChain: action,
      getCategories: action,
      getChains: action,
      reset: action,
      initFilter: action,
    });
  }

  reset() {
    this.categories = [];
    this.chains = [];
    this.selectedCategory = '';
    this.selectedChain = '';
  }

  initFilter = async () => {
    const [categories, chains] = await Promise.all([this.getCategories(), this.getChains()]);

    runInAction(() => {
      this.categories = categories;
      this.chains = chains;
    });
  };

  setSelectedCategory = (category: string) => {
    this.selectedCategory = category;
  };
  setSelectedChain = (chain: string) => {
    this.selectedChain = chain;
  };

  async getCategories() {
    // TODO: get categories api call
    const result = ['New', 'Art', 'Music'];

    return result;
  }

  async getChains() {
    // TODO: get categories api call
    const result = ['Ethereum', 'Polygon', 'Solana'];

    return result;
  }
}

export default RankingsStore;

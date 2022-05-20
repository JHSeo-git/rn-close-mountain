import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class RankingsStore extends BaseStore {
  categories: string[] = [];
  chains: string[] = [];

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      categories: observable,
      chains: observable,
      getCategories: action,
      getChains: action,
      reset: action,
    });
  }

  async getCategories() {
    try {
      // TODO: get categories api call
      const result = ['New', 'Art', 'Music'];

      this.categories = result;

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  }

  async getChains() {
    try {
      // TODO: get categories api call
      const result = ['Ethereum', 'Polygon', 'Solana'];

      this.chains = result;

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    }
  }

  reset() {
    this.categories = [];
  }
}

export default RankingsStore;

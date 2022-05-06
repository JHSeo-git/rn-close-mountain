import { makeObservable, observable } from 'mobx';
import RootStore from '../RootStore';

class BaseStore {
  root: RootStore;
  loading: boolean = false;
  error: unknown | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      loading: observable,
      error: observable,
    });
  }
}

export default BaseStore;

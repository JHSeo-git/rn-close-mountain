import { action, makeObservable, override } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class LoaderStore extends BaseStore {
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      showLoader: action,
      hideLoader: action,
    });
  }

  showLoader = () => {
    this.loading = true;
  };

  hideLoader = () => {
    this.loading = true;
  };
}

export default LoaderStore;

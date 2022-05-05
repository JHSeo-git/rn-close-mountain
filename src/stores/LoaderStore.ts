import { action, makeObservable, observable } from 'mobx';

class LoaderStore {
  loading = false;

  constructor() {
    makeObservable(this, {
      loading: observable,
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

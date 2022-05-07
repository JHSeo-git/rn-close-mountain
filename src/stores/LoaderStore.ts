import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class LoaderStore extends BaseStore {
  visible: boolean = false;
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      visible: observable,
      showLoader: action,
      hideLoader: action,
      reset: action,
    });
  }

  showLoader = () => {
    this.visible = true;
  };

  hideLoader = () => {
    this.visible = false;
  };

  reset() {
    this.visible = false;
  }
}

export default LoaderStore;

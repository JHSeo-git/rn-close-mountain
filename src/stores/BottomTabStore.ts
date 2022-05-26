import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class BottomTabStore extends BaseStore {
  visible = true;
  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      visible: observable,
      show: action,
      hide: action,
      reset: action,
    });
  }

  reset = () => {
    this.visible = true;
  };

  show = () => {
    this.visible = true;
  };

  hide = () => {
    this.visible = false;
  };
}

export default BottomTabStore;

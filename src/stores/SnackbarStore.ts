import { action, makeObservable, observable } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

type SnackbarType = 'success' | 'error' | 'info' | 'default';

class SnackbarStore extends BaseStore {
  visible: boolean = false;
  message: string = '';
  type: SnackbarType = 'default';

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      visible: observable,
      message: observable,
      type: observable,
      showSnackbar: action,
      hideSnackbar: action,
      reset: action,
    });
  }

  private setSnackbar(message: string, type: SnackbarType) {
    this.message = message;
    this.type = type;
  }

  showSnackbar = (message: string, type: SnackbarType) => {
    this.setSnackbar(message, type);
    this.visible = true;
  };

  hideSnackbar = () => {
    this.visible = false;
  };

  reset() {
    this.visible = false;
    this.message = '';
    this.type = 'default';
  }
}

export default SnackbarStore;

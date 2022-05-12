import { action, computed, makeObservable, observable, override } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';

class EmailSignUpStore extends BaseStore {
  currentStep: number = 1;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      loading: override,
      error: override,
      currentStep: observable,
      signUp: action,
      goNextStep: action,
      goPrevStep: action,
      totalSteps: computed,
      reset: action,
    });
  }

  get totalSteps() {
    return 3;
  }

  goNextStep = () => {
    this.currentStep += 1;
  };
  goPrevStep = () => {
    this.currentStep -= 1;
  };
  signUp = async ({}) => {
    this.loading = true;

    try {
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  };
  reset = () => {
    this.loading = false;
    this.error = null;
  };
}

export default EmailSignUpStore;

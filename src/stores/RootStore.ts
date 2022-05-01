import AuthStore from './AuthStore';
import SampleStore from './__sample__/SampleStore';

class RootStore {
  SampleStore: SampleStore;
  AuthStore: AuthStore;
  constructor() {
    // sample
    this.SampleStore = new SampleStore();

    this.AuthStore = new AuthStore();
  }
}

export default RootStore;

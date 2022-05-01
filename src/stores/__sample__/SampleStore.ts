import { action, makeObservable, observable } from 'mobx';

class SampleStore {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
    });
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

export default SampleStore;

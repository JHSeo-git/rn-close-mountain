import { action, makeObservable, observable, runInAction } from 'mobx';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import AppSettingStorage from '../utils/storage/appSettingStorage';

class AppSettingStore extends BaseStore {
  initialized = false;
  isUseBiometric = false;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      isUseBiometric: observable,
      toggleUseBiometric: action,
      setUseBiometric: action,
      init: action,
    });

    this.init();
  }

  async init() {
    try {
      const [biometric] = await Promise.all([AppSettingStorage.get('biometric')]);

      runInAction(() => {
        this.isUseBiometric = biometric;
      });
    } catch (e) {
      throw e;
    } finally {
      this.initialized = true;
    }
  }

  async toggleUseBiometric() {
    this.isUseBiometric = !this.isUseBiometric;
    await AppSettingStorage.set('biometric', this.isUseBiometric);
  }

  async setUseBiometric(isUseBiometric: boolean) {
    this.isUseBiometric = isUseBiometric;
    await AppSettingStorage.set('biometric', this.isUseBiometric);
  }
}

export default AppSettingStore;

import { action, makeObservable, observable, runInAction } from 'mobx';
import * as LocalAuthentication from 'expo-local-authentication';
import BaseStore from './base/BaseStore';
import RootStore from './RootStore';
import AppError from '../utils/error/AppError';

export type BiometricType = 'faceId' | 'touchId' | 'iris' | 'unknown';

class BiometricStore extends BaseStore {
  initialized = false;
  isAuthenticated = false;
  isCompatible = false;
  isEnrolled = false;
  biometricTypes: BiometricType[] = [];
  authenticateResult: LocalAuthentication.LocalAuthenticationResult | null =
    null;

  constructor(root: RootStore) {
    super(root);
    makeObservable(this, {
      initialized: observable,
      isAuthenticated: observable,
      checkBiometric: action,
      authenticate: action,
      init: action,
    });

    this.init();
  }

  async init() {
    await this.checkBiometric();
  }

  async checkBiometric() {
    try {
      const [compatible, enrolled, types] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
        LocalAuthentication.supportedAuthenticationTypesAsync(),
      ]);

      runInAction(() => {
        this.isCompatible = compatible;
        this.isEnrolled = enrolled;
        this.biometricTypes = types.map(type => {
          switch (type) {
            case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
              return 'faceId';
            case LocalAuthentication.AuthenticationType.FINGERPRINT:
              return 'touchId';
            case LocalAuthentication.AuthenticationType.IRIS:
              return 'iris';
            default:
              return 'unknown';
          }
        });
      });

      if (compatible && enrolled && types.length > 0) {
        return true;
      }

      return false;
    } catch (e: any) {
      this.error = e;
      throw new AppError({
        label: 'APP',
        name: 'CheckBiometricError',
        message: e.message ?? 'Failed CheckBiometric',
      });
    } finally {
      this.initialized = true;
    }
  }

  async authenticate() {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      this.authenticateResult = result;
      this.isAuthenticated = result.success;

      return result;
    } catch (e: any) {
      this.error = e;
      throw new AppError({
        label: 'APP',
        name: 'BiometricAuthenticateError',
        message: e.message ?? 'Failed Biometric authentication',
      });
    }
  }
}

export default BiometricStore;

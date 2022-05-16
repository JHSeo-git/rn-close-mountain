import axios from 'axios';
import { makeObservable, observable } from 'mobx';
import RootStore from '../RootStore';
import AppError from '../../utils/error/AppError';
import type { AxiosErrorResponse } from '../../api/types';

type CallAPIOptions = {
  useLoader?: boolean;
};

class BaseStore {
  root: RootStore;
  loading: boolean = false;
  error: unknown | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      loading: observable,
      error: observable,
    });
  }

  protected async callAPI<T>(request: Promise<T>) {
    this.loading = true;

    try {
      const result = await request;

      return result;
    } catch (e: any) {
      this.error = e;
      throw this.errorHandler(e);
    } finally {
      this.loading = false;
    }
  }

  protected errorHandler(e: any) {
    if (e instanceof AppError) {
      throw e;
    } else if (axios.isAxiosError(e) && e.response) {
      /**
       * @see https://github.com/axios/axios/issues/3612#issuecomment-933263425
       */
      const errorResponse = e.response.data as AxiosErrorResponse | undefined;

      const message = errorResponse?.error.message ?? e.message;
      const name = errorResponse?.error.name ?? e.name;
      const status = errorResponse?.error.status ?? (e.status ? parseInt(e.status, 10) : undefined);
      const stack = e.stack;

      throw new AppError({ message, name, label: 'API', status, stack });
    } else {
      const message = e.message ?? 'Unknown error';
      const name = e.name ?? 'UnknownError';

      throw new AppError({ message, name, label: 'UNKNOWN' });
    }
  }
}

export default BaseStore;

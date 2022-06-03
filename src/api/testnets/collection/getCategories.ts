import result from './__mock__/getCategoriesResult.json';
import type { GetCategoriesResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

// TODO: remove mock
export default async function getCategories(config?: AxiosRequestConfig) {
  const { data } = result as GetCategoriesResponse;

  return data.categories;
}

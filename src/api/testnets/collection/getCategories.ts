import result from './__mock__/getCategoriesResult.json';
import type { AxiosRequestConfig } from 'axios';
import type { ArrayElementType } from '../../../utils/types/type-utils';

export type Category = ArrayElementType<typeof result['data']['categories']>;

// TODO: remove mock
export default async function getCategories(config?: AxiosRequestConfig) {
  const { data } = result;

  return data;
}

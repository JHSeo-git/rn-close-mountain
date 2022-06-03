import result from './__mock__/getCollectionPageResult.json';
import type { AxiosRequestConfig } from 'axios';

export type CollectionPage = typeof result['data']['collection'];

export default async function getCollectionPage(config?: AxiosRequestConfig) {
  const { data } = result;

  return data;
}

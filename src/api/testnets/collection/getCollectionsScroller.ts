import result from './__mock__/getCollectionsScrollerResult.json';
import type { GetCollectionsScrollerResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

// TODO: remove mock
export default async function getCollectionsScroller(config?: AxiosRequestConfig) {
  const { data } = result as GetCollectionsScrollerResponse;

  const serialized = data.trendingCollections.edges.map(({ node }) => node);

  return serialized;
}

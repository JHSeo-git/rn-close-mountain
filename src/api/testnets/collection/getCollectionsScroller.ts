import result from './__mock__/getCollectionsScrollerResult.json';
import type { AxiosRequestConfig } from 'axios';
import type { ArrayElementType } from '../../../utils/types/type-utils';

type TrendingCollections = typeof result['data']['trendingCollections'];
export type TrendingCollection = ArrayElementType<TrendingCollections['edges']>['node'];

// TODO: remove mock
export default async function getCollectionsScroller(config?: AxiosRequestConfig) {
  const { data } = result;

  const serialized = data.trendingCollections.edges.map(({ node }) => node);

  return serialized;
}

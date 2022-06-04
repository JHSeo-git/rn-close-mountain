import result from './__mock__/getExpiredSoonAssetsResult.json';
import type { AxiosRequestConfig } from 'axios';
import type { ArrayElementType } from '../../../utils/types/type-utils';

type ExpiredSoonAssets = typeof result['data']['query']['search']['edges'];
export type ExpiredSoonAsset = ArrayElementType<ExpiredSoonAssets>['node'];

export default async function getExpiredSoonAssets(config?: AxiosRequestConfig) {
  const { data } = result;

  const serialized = data.query.search.edges.map(({ node }) => node);

  return serialized;
}

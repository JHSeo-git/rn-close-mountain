import result from './__mock__/getExpiredSoonAssetsResult.json';
import type { GetExpiredSoonAssetsResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

export default async function getExpiredSoonAssets(config?: AxiosRequestConfig) {
  const { data } = result as GetExpiredSoonAssetsResponse;

  const serialized = data.query.search.edges.map(({ node }) => node);

  return serialized;
}

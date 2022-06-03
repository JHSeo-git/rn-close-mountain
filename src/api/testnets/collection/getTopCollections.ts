import result from './__mock__/getTopCollectionsResult.json';
import type { GetTopCollectionsResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

// TODO: remove mock
export default async function getTopCollections(config?: AxiosRequestConfig) {
  const { data } = result as GetTopCollectionsResponse;

  const serialized = data.collections.edges.map(({ node }) => node);

  return serialized;
}

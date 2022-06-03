import result from './__mock__/getTopCollectionsResult.json';
import type { AxiosRequestConfig } from 'axios';
import type { ArrayElementType } from '../../../utils/types/type-utils';

type TopCollections = typeof result['data']['collections']['edges'];
export type TopCollection = ArrayElementType<TopCollections>['node'];

// TODO: remove mock
export default async function getTopCollections(config?: AxiosRequestConfig) {
  const { data } = result;

  const serialized = data.collections.edges.map(({ node }) => node);

  return serialized;
}

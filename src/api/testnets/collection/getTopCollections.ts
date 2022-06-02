import result from './__mock__/getTopCollectionsResult.json';
import type { GetTopCollectionsResponse } from './types';

// TODO: remove mock
export default async function getTopCollections() {
  const { data } = result as GetTopCollectionsResponse;

  const serialized = data.collections.edges.map(({ node }) => node);

  return serialized;
}

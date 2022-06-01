import result from './__mock__/getCollectionsScrollerResult.json';
import type { GetCollectionsScrollerResponse } from './types';

// TODO: remove mock
export default async function getCollectionsScroller() {
  const { data } = result as GetCollectionsScrollerResponse;

  const serialized = data.trendingCollections.edges.map(({ node }) => node);

  return serialized;
}

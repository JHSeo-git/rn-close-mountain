import result from './__mock__/getExpiredSoonAssetsResult.json';
import type { GetExpiredSoonAssetsResponse } from './types';

export default async function getExpiredSoonAssets() {
  const { data } = result as GetExpiredSoonAssetsResponse;

  const serialized = data.query.search.edges.map(({ node }) => node);

  return serialized;
}

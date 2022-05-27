import qs from 'qs';
import client from './client';
import { GetFeaturedAssetResponse, OpenSeaBaseGetRequest } from './types';
import { assetFromJSON } from './utils/utils';

export type GetFeaturedAssetRequest = {} & OpenSeaBaseGetRequest;

export default async function getFeaturedAsset(requestData: GetFeaturedAssetRequest) {
  const query = qs.stringify(requestData, { encodeValuesOnly: true });
  const { data } = await client.get<GetFeaturedAssetResponse>(`/api/v1/assets?${query}`);

  const result = data.assets.map(assetFromJSON);

  return result.length > 0 ? result[0] : undefined;
}

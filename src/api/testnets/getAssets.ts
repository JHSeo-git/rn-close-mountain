import qs from 'qs';
import client from './client';
import { assetFromJSON } from './utils/utils';
import type { OpenSeaBaseGetRequest, GetAssetsResponse } from './types';

export type GetAssetsRequest = { collection?: string } & OpenSeaBaseGetRequest;

export default async function getAssets(requestData: GetAssetsRequest) {
  const query = qs.stringify(requestData, { encodeValuesOnly: true });
  const { data } = await client.get<GetAssetsResponse>(`/api/v1/assets?${query}`);

  const result = data.assets.map(assetFromJSON);

  return result;
}

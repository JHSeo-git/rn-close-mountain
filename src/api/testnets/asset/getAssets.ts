import qs from 'qs';
import client from '../client';
import { assetFromJSON } from '../utils/utils';
import type { GetAssetsResponse } from './types';
import type { AxiosRequestConfig } from 'axios';
import type { OpenSeaAssetQuery } from '../../../utils/types/opensea/types';

export type GetAssetsRequest = OpenSeaAssetQuery;

export default async function getAssets(
  requestData: GetAssetsRequest,
  config?: AxiosRequestConfig,
) {
  const query = qs.stringify(requestData, { encodeValuesOnly: true });
  const { data } = await client.get<GetAssetsResponse>(`/api/v1/assets?${query}`, config);

  const result = data.assets.map(assetFromJSON);

  return result;
}

import qs from 'qs';
import client from '../client';
import { assetFromJSON } from '../utils/utils';
import type { AxiosRequestConfig } from 'axios';
import type { GetAssetsResponse } from './types';
import type { OpenSeaBaseGetRequest } from '../types';

export type GetAssetsRequest = {
  owner?: string;
  collection_slug?: string;
  token_ids?: string[];
  account_address?: string;
  include_orders?: boolean;
  order_direction?: 'asc' | 'desc';
} & OpenSeaBaseGetRequest;

export default async function getAssets(
  {
    owner,
    collection_slug,
    token_ids,
    account_address,
    include_orders,
    order_direction = 'desc',
    offset = 0,
    limit = 20,
  }: GetAssetsRequest,
  config?: AxiosRequestConfig,
) {
  const query = qs.stringify(
    {
      owner,
      collection_slug,
      token_ids,
      account_address,
      include_orders,
      order_direction,
      offset,
      limit,
    },
    { encodeValuesOnly: true },
  );
  const { data } = await client.get<GetAssetsResponse>(`/api/v1/assets?${query}`, config);

  const result = data.assets.map(assetFromJSON);

  return result;
}

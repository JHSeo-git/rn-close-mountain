import qs from 'qs';
import client from '../client';
import type { GetAssetResponse } from './types';
import type { AxiosRequestConfig } from 'axios';
import { assetFromJSON } from '../utils/utils';

export type GetAssetRequest = {
  asset_contract_address: string;
  token_id: string;
  account_address?: string;
  include_orders?: boolean;
};

export default async function getAsset(
  { asset_contract_address, token_id, account_address, include_orders = false }: GetAssetRequest,
  config?: AxiosRequestConfig,
): Promise<GetAssetResponse> {
  const query = qs.stringify({ account_address, include_orders }, { encodeValuesOnly: true });
  const { data } = await client.get(
    `/api/v1/asset/${asset_contract_address}/${token_id}?${query}`,
    config,
  );

  const result = assetFromJSON(data);

  return result;
}

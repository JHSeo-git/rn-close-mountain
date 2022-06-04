import qs from 'qs';
import client from '../client';
import type { GetAssetResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

export type GetAssetRequest = {
  asset_contract_address: string;
  token_id: string;
  account_address?: string;
};

export default async function getAsset(
  { asset_contract_address, token_id, account_address }: GetAssetRequest,
  config?: AxiosRequestConfig,
) {
  const query = qs.stringify({ account_address }, { encodeValuesOnly: true });
  const { data } = await client.get<GetAssetResponse>(
    `/api/v1/asset/${asset_contract_address}/${token_id}?${query}`,
    config,
  );

  return data;
}

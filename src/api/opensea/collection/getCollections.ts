import qs from 'qs';
import client from '../client';
import { collectionFromJSON } from '../utils/utils';
import type { GetCollectionsResponse } from './types';
import type { OpenSeaBaseGetRequest } from '../types';
import type { AxiosRequestConfig } from 'axios';

export type GetCollectionsRequest = {
  asset_owner?: string;
} & OpenSeaBaseGetRequest;

export default async function getCollections(
  requestData: GetCollectionsRequest,
  config?: AxiosRequestConfig,
) {
  const options: GetCollectionsRequest = {
    ...requestData,
  };
  const query = qs.stringify(options, { encodeValuesOnly: true });
  const { data } = await client.get<GetCollectionsResponse>(`/api/v1/collections?${query}`, config);

  const result = data.map(collectionFromJSON);

  return result;
}

import client from '../client';
import type { GetCollectionResponse } from './types';
import type { AxiosRequestConfig } from 'axios';
import { collectionFromJSON } from '../utils/utils';

export type GetCollectionRequest = {
  connection_slug: string;
};

export default async function getCollection(
  { connection_slug }: GetCollectionRequest,
  config?: AxiosRequestConfig,
): Promise<GetCollectionResponse> {
  const { data } = await client.get(`/api/v1/collection/${connection_slug}`, config);

  const result = collectionFromJSON(data.collection);

  return result;
}

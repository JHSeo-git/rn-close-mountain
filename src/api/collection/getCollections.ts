import qs from 'qs';
import client from '../client';
import type { GetCollectionsResponse } from './types';

// TODO: options
export default async function getCollections() {
  const query = qs.stringify(
    {
      populate: '*',
      sort: 'id',
    },
    { encodeValuesOnly: true },
  );

  const { data } = await client.get<GetCollectionsResponse>(`/api/collections?${query}`);

  return data;
}

import qs from 'qs';
import client from '../client';
import type { GetCollectionsResponse } from './types';

export default async function getCollectionRankings() {
  const query = qs.stringify({
    populate: {
      logo: '*',
      nfts: {
        sort: 'price:desc',
      },
    },
  });
  const { data } = await client.get<GetCollectionsResponse>(`/api/collections?${query}`);

  return data;
}

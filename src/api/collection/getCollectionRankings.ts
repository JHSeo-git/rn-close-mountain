import qs from 'qs';
import client from '../client';
import { getDateByPeriod } from '../../utils/dateUtils';
import type { CategoryCode, PeriodCode } from '../commonCode/types';
import type { GetCollectionsResponse, PaymentAsset } from './types';

export type GetCollectionRankingsRequest = {
  name?: string;
  slug?: string;
  nftPaymentAsset?: PaymentAsset;
  period?: PeriodCode;
  category?: CategoryCode;
};
export default async function getCollectionRankings({
  name,
  slug,
  nftPaymentAsset,
  period,
  category,
}: GetCollectionRankingsRequest) {
  const query = qs.stringify(
    {
      populate: {
        nfts: {
          sort: ['price:desc'],
          filters: {
            paymentAsset: { $eq: nftPaymentAsset },
            createdAt: {
              $gte: period ? getDateByPeriod(period) : undefined,
            },
          },
        },
        creator: {
          sort: ['username:asc'],
        },
      },
      filters: {
        name: { $eq: name },
        slug: { $eq: slug },
        category: { $eq: category },
        nfts: {
          id: {
            $notNull: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const { data } = await client.get<GetCollectionsResponse>(`/api/collections?${query}`);

  return data;
}

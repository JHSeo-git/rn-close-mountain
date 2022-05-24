import qs from 'qs';
import { getDateByPeriod } from '../../utils/dateUtils';
import client from '../client';
import type { PeriodCode } from '../commonCode/types';
import type { GetCollectionsResponse, PaymentAsset } from './types';

export type GetCollectionRankingsRequest = {
  name?: string;
  slug?: string;
  nftPaymentAsset?: PaymentAsset;
  period?: PeriodCode;
};
export default async function getCollectionRankings({
  name,
  slug,
  nftPaymentAsset,
  period,
}: GetCollectionRankingsRequest) {
  const query = qs.stringify(
    {
      populate: {
        nfts: {
          sort: ['price:desc'],
          filters: {
            paymentAsset: { $eq: nftPaymentAsset },
            createdAt: {
              $gte: period && getDateByPeriod(period),
            },
          },
        },
      },
      filters: {
        name: { $eq: name },
        slug: { $eq: slug },
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

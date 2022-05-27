import qs from 'qs';
import client from '../client';
import { getDateByPeriod } from '../../../utils/dateUtils';
import type { CategoryCode, PeriodCode } from '../commonCode/types';
import type { GetCollectionsResponse, PaymentAsset } from './types';

export type GetCollectionsRequest = {
  name?: string;
  slug?: string;
  nftName?: string;
  nftPaymentAsset?: PaymentAsset;
  period?: PeriodCode;
  category?: CategoryCode;
};
export default async function getCollections({
  name,
  slug,
  nftName,
  nftPaymentAsset,
  period,
  category,
}: GetCollectionsRequest) {
  const query = qs.stringify(
    {
      populate: {
        nfts: {
          sort: ['name:asc'],
          filters: {
            name: { $eq: nftName },
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
      },
    },
    { encodeValuesOnly: true },
  );

  const { data } = await client.get<GetCollectionsResponse>(`/api/collections?${query}`);

  return data;
}

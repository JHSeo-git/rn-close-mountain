import qs from 'qs';
import client from '../client';
import { PeriodCode } from '../commonCode/types';
import type { GetCollectionsResponse, PaymentAsset } from './types';

export type GetCollectionsRequest = {
  name?: string;
  slug?: string;
  nftName?: string;
  nftPaymentAsset?: PaymentAsset;
  period?: PeriodCode;
};
export default async function getCollections({
  name,
  slug,
  nftName,
  nftPaymentAsset,
  period,
}: GetCollectionsRequest) {
  const query = qs.stringify(
    {
      populate: {
        nfts: {
          filters: {
            name: { $eq: nftName },
            paymentAsset: { $eq: nftPaymentAsset },
            createdAt: {
              $gte: period === 'LAST_24_HOURS' ? '-1d' : '-1w',
            },
          },
        },
      },
      filters: {
        name: { $eq: name },
        slug: { $eq: slug },
      },
    },
    { encodeValuesOnly: true },
  );

  const { data } = await client.get<GetCollectionsResponse>(`/api/collections?${query}`);

  return data;
}

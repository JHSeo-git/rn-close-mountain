import qs from 'qs';
import client from '../client';
import { GetNFTsResponse, PaymentAsset } from './types';

export type GetNFTsRequest = {
  name?: string;
  paymentAsset?: PaymentAsset;
};
export default async function getNFTs({ name, paymentAsset }: GetNFTsRequest) {
  const query = qs.stringify(
    {
      populate: {
        collection: {
          sort: ['name:asc'],
        },
        creator: {
          sort: ['username:asc'],
        },
      },
      filters: {
        name: { $eq: name },
        paymentAsset: { $eq: paymentAsset },
      },
      sort: ['price:desc'],
    },
    { encodeValuesOnly: true },
  );

  const { data } = await client.get<GetNFTsResponse>(`/api/nfts?${query}`);

  return data;
}

import type { CollectionInfo } from '../collection/types';
import type { ChainCode } from '../commonCode/types';
import type { Data, Meta, PopluateData } from '../types';

export type PaymentAsset = ChainCode;

export type NFTInfo = {
  name: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  tokenId: number;
  logo: string | null;
  paymentAsset: PaymentAsset;
  collection?: PopluateData<Data<CollectionInfo>>;
};
export type NFTsData = Data<NFTInfo>;
export type GetNFTsResponse = {
  data: NFTsData[];
  meta: Meta;
};

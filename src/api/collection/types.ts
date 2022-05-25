import type { User } from '../auth/types';
import type { CategoryCode, ChainCode } from '../commonCode/types';
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
};

export type CollectionInfo = {
  isVerified: boolean;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  logo: string | null;
  category: CategoryCode;
  creator: PopluateData<Data<User>>;
  nfts: PopluateData<Data<NFTInfo>[]>;
};

export type NFTsData = Data<NFTInfo>;
export type GetNFTsResponse = {
  data: NFTsData[];
  meta: Meta;
};

export type CollectionData = Data<CollectionInfo>;
export type GetCollectionsResponse = {
  data: CollectionData[];
  meta: Meta;
};

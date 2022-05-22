import type { Data, Meta, PupluateData } from '../types';

export type NFTInfo = {
  name: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  tokenId: number;
};

export type CollectionInfo = {
  isVerified: boolean;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  logo: PupluateData<Data<ImageInfo>>;
  nfts: PupluateData<Data<NFTInfo>[]>;
};

export type ImageInfo = {
  name: string;
  alternativeText: string;
  caption: string;
  width: number | null;
  height: number | null;
  formats: string | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetNFTsResponse = {
  data: Data<NFTInfo>[];
  meta: Meta;
};

export type GetCollectionsResponse = {
  data: Data<CollectionInfo>[];
  meta: Meta;
};

import type { OpenSeaCollection } from '../../../utils/types/opensea/types';

export type GetCollectionsResponse = OpenSeaCollection[];
export type GetCategoriesResponse = GetCategories;
export type GetCollectionsScrollerResponse = GetCollectionsScroller;

export interface GetCategories {
  data: GetCategoriesData;
}

export interface GetCategoriesData {
  categories: Category[];
}

export interface Category {
  id: number;
  coverImageUrl: string;
  name: string;
}

export interface GetCollectionsScroller {
  data: GetCollectionsScrollerData;
}

export interface GetCollectionsScrollerData {
  trendingCollections: TrendingCollections;
}

export interface TrendingCollections {
  edges: TrendingCollectionsEdge[];
}

export interface TrendingCollectionsEdge {
  node: TrendingCollectionsNode;
}

export interface TrendingCollectionsNode {
  slug: string;
  logo: string;
  banner: string;
  description: string;
  name: string;
  shortDescription: string | null;
  isVerified: boolean;
  owner: Owner;
  stats: Stats;
  defaultChain: DefaultChain;
  id: string;
}

export interface DefaultChain {
  identifier: Identifier;
}

export enum Identifier {
  Ethereum = 'ETHEREUM',
  Solana = 'SOLANA',
}

export interface Owner {
  address: string;
  config: null | string;
  isCompromised: boolean;
  user: User | null;
  displayName: null | string;
  imageUrl: string;
  id: string;
}

export interface User {
  publicUsername: string;
  id: string;
}

export interface Stats {
  totalSupply: number;
  id: string;
}

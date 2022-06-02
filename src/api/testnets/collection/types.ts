import type { OpenSeaCollection } from '../../../utils/types/opensea/types';

export type GetCollectionsResponse = OpenSeaCollection[];
export type GetCategoriesResponse = GetCategories;
export type GetCollectionsScrollerResponse = GetCollectionsScroller;
export type GetTopCollectionsResponse = GetTopCollections;

// GetCategories
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

// GetCollectionsScroller
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

// GetTopCollections
export interface GetTopCollections {
  data: GetTopCollectionsData;
}

export interface GetTopCollectionsData {
  collections: TopCollections;
}

export interface TopCollections {
  edges: TopCollectionsEdge[];
}

export interface TopCollectionsEdge {
  node: TopCollectionsNode;
}

export interface TopCollectionsNode {
  slug: string;
  id: string;
  name: string;
  logo: string;
  createdDate: string;
  isVerified: boolean;
  nativePaymentAsset: NativePaymentAsset;
  statsV2: StatsV2;
}

export interface NativePaymentAsset {
  symbol: Symbol;
  asset: Asset;
  id: string;
}

export interface Asset {
  imageUrl: string;
  id: string;
}

export enum Symbol {
  Eth = 'ETH',
  Sol = 'SOL',
}

export interface StatsV2 {
  floorPrice: DayVolume | null;
  oneDayChange: number;
  oneDayVolume: DayVolume;
  sevenDayChange: number;
  sevenDayVolume: DayVolume;
  thirtyDayChange: number;
  thirtyDayVolume: DayVolume;
}

export interface DayVolume {
  unit: string;
}

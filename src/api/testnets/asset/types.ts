import type { OpenSeaAsset } from '../../../utils/types/opensea/types';

export type GetAssetsResponse = { assets: OpenSeaAsset[] };
export type GetAssetResponse = OpenSeaAsset;
export type GetExpiredSoonAssetsResponse = GetExpiredSoonAssets;

// GetExpiredSoonAssets
export interface GetExpiredSoonAssets {
  data: GetExpiredSoonAssetsData;
}

export interface GetExpiredSoonAssetsData {
  query: GetExpiredSoonAssetsQuery;
}

export interface GetExpiredSoonAssetsQuery {
  selectedCollections: SelectedCollections;
  collections: Collections;
  collection: null;
  paymentAssets: PaymentAssets;
  PaymentFilter_collection: null;
  search: Search;
}

export interface Collections {
  edges: CollectionsEdge[];
  pageInfo: PageInfo;
}

export interface CollectionsEdge {
  node: CollectionsEdgeNode;
  cursor: string;
}

export interface CollectionsEdgeNode {
  assetCount: number | null;
  imageUrl: string;
  name: string;
  slug: string;
  isVerified: boolean;
  id: string;
  __typename: string;
}

export enum PurpleTypename {
  CollectionType = 'CollectionType',
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface PaymentAssets {
  edges: PaymentAssetsEdge[];
  pageInfo: PageInfo;
}

export interface PaymentAssetsEdge {
  node: PaymentAssetsEdgeNode;
  cursor: string;
}

export interface PaymentAssetsEdgeNode {
  symbol: string;
  relayId: string;
  id: string;
  __typename: string;
}

export interface Search {
  edges: SearchEdge[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface SearchEdge {
  node: SearchEdgeNode;
  cursor: string;
}

export interface SearchEdgeNode {
  asset: NodeAsset;
  assetBundle: null;
  __typename: string;
}

export interface NodeAsset {
  assetContract: PurpleAssetContract;
  collection: Collection;
  relayId: string;
  tokenId: string;
  backgroundColor: null;
  imageUrl: string;
  name: string;
  id: string;
  isDelisted: boolean;
  animationUrl: null;
  displayImageUrl: string;
  decimals: number | null;
  favoritesCount: number;
  isFavorite: boolean;
  isFrozen: boolean;
  hasUnlockableContent: boolean;
  orderData: OrderData;
  assetEventData: AssetEventData;
}

export interface PurpleAssetContract {
  address: string;
  chain: Chain;
  id: string;
  openseaVersion: OpenseaVersion | null;
}

export type Chain = 'ETHEREUM' | 'SOLANA';

export enum OpenseaVersion {
  The200 = '2.0.0',
}

export interface AssetEventData {
  lastSale: LastSale | null;
}

export interface LastSale {
  unitPriceQuantity: Quantity;
}

export interface Quantity {
  asset: PaymentAssetQuantityAsset;
  quantity: string;
  id: string;
  quantityInEth?: string;
}

export interface PaymentAssetQuantityAsset {
  decimals: number;
  imageUrl: string;
  symbol: Symbol;
  usdSpotPrice: number;
  assetContract: PaymentAssetQuantityAssetContract;
  id: string;
}

export interface PaymentAssetQuantityAssetContract {
  blockExplorerLink: string;
  chain: Chain;
  id: string;
}

export enum Symbol {
  Eth = 'ETH',
  Weth = 'WETH',
}

export interface Collection {
  isVerified: boolean;
  relayId: string;
  id: string;
  displayData: DisplayData;
  imageUrl: string;
  slug: string;
  name: string;
}

export interface DisplayData {
  cardDisplayStyle: CardDisplayStyle;
}

export enum CardDisplayStyle {
  Contain = 'CONTAIN',
  Cover = 'COVER',
}

export interface OrderData {
  bestAsk: BestAsk;
  bestBid: BestBid | null;
}

export interface BestAsk {
  relayId: string;
  decimals: null;
  paymentAssetQuantity: Quantity;
  orderType: OrderType;
  maker: Maker;
  closedAt: string;
  dutchAuctionFinalPrice: null | string;
  openedAt: string;
  priceFnEndedAt: null | string;
  quantity: string;
}

export interface Maker {
  address: string;
  id: string;
}

export enum OrderType {
  Basic = 'BASIC',
  Dutch = 'DUTCH',
}

export interface BestBid {
  orderType: OrderType;
  paymentAssetQuantity: Quantity;
}

export interface SelectedCollections {
  edges: any[];
}

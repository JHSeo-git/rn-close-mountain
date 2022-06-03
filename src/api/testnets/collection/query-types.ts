import type { OpenSeaCollection } from '../../../utils/types/opensea/types';

export type GetCollectionsResponse = OpenSeaCollection[];
export type GetCategoriesResponse = GetCategories;
export type GetCollectionsScrollerResponse = GetCollectionsScroller;
export type GetTopCollectionsResponse = GetTopCollections;
export type GetPromotionResponse = GetPromotion;
export type GetCollectionPageResponse = GetCollectionPage;

//#region GetPromotion
export interface GetPromotion {
  data: GetPromotionData;
}
export interface GetPromotionData {
  promotions: Promotion[];
  featuredAsset: Asset;
}
//#endregion

//#region GetCategories
export interface GetCategories {
  data: GetCategoriesData;
}
export interface GetCategoriesData {
  categories: Category[];
}
//#endregion

//#region GetCollectionsScroller
export interface GetCollectionsScroller {
  data: GetCollectionsScrollerData;
}
export interface GetCollectionsScrollerData {
  trendingCollections: EdgesNode<Collection>;
}
//#endregion

//#region GetTopCollections
export interface GetTopCollections {
  data: GetTopCollectionsData;
}
export interface GetTopCollectionsData {
  collections: EdgesNode<Collection>;
}
//#endregion

//#region GetCollectionPage
export interface GetCollectionPage {
  data: GetCollectionPageData;
}
export interface GetCollectionPageData {
  collection: Collection;
  assets: Assets;
}
//#endregion

//#region Common
type Maybe<T> = T | null | undefined;
export type Identifier = 'ETHEREUM' | 'SOLANA';
export type AssetSymbol = 'ETH' | 'SOL' | 'WETH';
export type OrderType = 'BASIC' | 'ENGLISH';
export type CardDisplayStyle = 'COVER';

export type IsEditable = { value: Maybe<boolean>; reason: Maybe<string> };
export type PageInfo = { endCursor: Maybe<string>; hasNextPage: Maybe<boolean> };
export type EdgesNode<T> = {
  edges: Maybe<Array<{ node: Maybe<T>; cursor: Maybe<string> }>>;
  totalCount: Maybe<number>;
  pageInfo: Maybe<PageInfo>;
};

export interface DefaultChain {
  identifier: Maybe<Identifier>;
}
export interface AssetEventData {
  lastSale: Maybe<LastSale>;
}
export interface LastSale {
  unitPriceQuantity: Maybe<Quantity>;
}
export interface Owner {
  address: Maybe<string>;
  config: Maybe<string>;
  isCompromised: Maybe<boolean>;
  user: Maybe<User>;
  displayName: Maybe<string>;
  imageUrl: Maybe<string>;
  id: Maybe<string>;
}
export interface User {
  publicUsername: Maybe<string>;
  id: Maybe<string>;
}
export interface DayVolume {
  unit: Maybe<string>;
}
export interface FloorPrice {
  unit: Maybe<string>;
}
export interface Stats {
  numOwners: Maybe<number>;
  totalSupply: Maybe<number>;
  id: Maybe<string>;
}
export interface StatsV2 {
  floorPrice: Maybe<DayVolume>;
  oneDayChange: Maybe<number>;
  oneDayVolume: Maybe<DayVolume>;
  sevenDayChange: Maybe<number>;
  sevenDayVolume: Maybe<DayVolume>;
  thirtyDayChange: Maybe<number>;
  thirtyDayVolume: Maybe<DayVolume>;
  numOwners: Maybe<number>;
  totalSupply: Maybe<number>;
  totalVolume: Maybe<FloorPrice>;
}
export interface DisplayData {
  cardDisplayStyle: Maybe<CardDisplayStyle>;
}
export interface Creator {
  imageUrl: Maybe<string>;
  user: Maybe<User>;
  address: Maybe<string>;
  id: Maybe<string>;
}
export interface AssetContract {
  address: Maybe<string>;
  chain: Maybe<Identifier>;
  id: Maybe<string>;
  blockExplorerLink: Maybe<string>;
  chainData: Maybe<ChainData>;
  openseaVersion: Maybe<string>;
}
export interface Quantity {
  relayId: Maybe<string>;
  decimals: Maybe<number>;
  paymentAssetQuantity: Maybe<Quantity>;
  orderType: Maybe<OrderType>;
  maker: Maybe<Creator>;
  closedAt: Maybe<string>;
  dutchAuctionFinalPrice: Maybe<number>;
  openedAt: Maybe<string>;
  priceFnEndedAt: Maybe<string>;
  quantity: Maybe<string>;
  asset: Maybe<Asset>;
  quantityInEth: Maybe<string>;
  id: Maybe<string>;
}
export interface OrderData {
  bestAsk: Maybe<Quantity>;
  bestBid: Maybe<Quantity>;
}
export interface ChainData {
  blockExplorerName: Maybe<string>;
}

export interface SearchAssets {
  asset: Maybe<Asset>;
  assetBundle: Maybe<any>;
  __typename: Maybe<string>;
}
export interface Assets {
  collection: Maybe<Collection>;
  paymentAssets: Maybe<EdgesNode<Asset>>;
  PaymentFilter_collection: Maybe<Assets>;
  selectedCollections: Maybe<EdgesNode<Collection>>;
  search: Maybe<EdgesNode<SearchAssets>>;
}
export interface Category {
  id: Maybe<number>;
  coverImageUrl: Maybe<string>;
  name: Maybe<string>;
}
export interface Collection {
  displayData: Maybe<DisplayData>;
  numericTraits: Maybe<any[]>;
  stringTraits: Maybe<any[]>;
  defaultChain: Maybe<DefaultChain>;
  slug: Maybe<string>;
  logo: Maybe<string>;
  banner: Maybe<string>;
  description: Maybe<string>;
  name: Maybe<string>;
  shortDescription: Maybe<string | null>;
  isVerified: Maybe<boolean>;
  owner: Maybe<Owner>;
  stats: Maybe<Stats>;
  id: Maybe<string>;
  createdDate: Maybe<string>;
  nativePaymentAsset: Maybe<Asset>;
  statsV2: Maybe<StatsV2>;
  bannerImageUrl: Maybe<string>;
  imageUrl: Maybe<string>;
  relayId: Maybe<string>;
  connectedTwitterUsername: Maybe<string>;
  assetContracts: Maybe<EdgesNode<AssetContract>>;
  representativeAsset: Maybe<Asset>;
  isMintable: Maybe<boolean>;
  isSafelisted: Maybe<boolean>;
  discordUrl: Maybe<string>;
  externalUrl: Maybe<string>;
  instagramUsername: Maybe<string>;
  mediumUsername: Maybe<string>;
  telegramUrl: Maybe<string>;
  twitterUsername: Maybe<string>;
  __typename: Maybe<string>;
}
export interface Asset {
  imageUrl: Maybe<string>;
  id: Maybe<string>;
  assetContract: Maybe<AssetContract>;
  collection: Maybe<Collection>;
  relayId: Maybe<string>;
  tokenId: Maybe<string>;
  backgroundColor: Maybe<string>;
  name: Maybe<string>;
  isDelisted: Maybe<boolean>;
  animationUrl: Maybe<string>;
  displayImageUrl: Maybe<string>;
  decimals: Maybe<number>;
  favoritesCount: Maybe<number>;
  isFavorite: Maybe<boolean>;
  isFrozen: Maybe<boolean>;
  hasUnlockableContent: Maybe<boolean>;
  orderData: Maybe<OrderData>;
  isEditable: Maybe<IsEditable>;
  isListable: Maybe<boolean>;
  ownership: Maybe<string>;
  creator: Maybe<Creator>;
  ownedQuantity: Maybe<number>;
  assetEventData: Maybe<AssetEventData>;
  symbol: Maybe<AssetSymbol>;
  imagePreviewUrl: Maybe<string>;
  usdSpotPrice: Maybe<number>;
  __typename: Maybe<string>;
}
export interface Promotion {
  id: Maybe<string>;
  promoCardImg: Maybe<string>;
  promoCardLink: Maybe<string>;
  promoCardVideo: Maybe<null>;
  promoCardVideoMimeType: Maybe<string>;
  promoHeader: Maybe<string>;
  cardColor: Maybe<string>;
  promoSubtitle: Maybe<string>;
  saleStartTime: Maybe<string>;
  saleEndTime: Maybe<string>;
}
//#endregion Common

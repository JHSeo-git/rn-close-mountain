export type GetPromotionResponse = HomePagePromotion;

export interface HomePagePromotion {
  data: HomePagePromotionData;
}

export interface HomePagePromotionData {
  promotions: Promotion[];
  featuredAsset: FeaturedAsset;
}

export interface FeaturedAsset {
  name: string;
  imagePreviewUrl: string;
  imageUrl: string;
  creator: Creator;
  assetContract: AssetContract;
  tokenId: string;
  animationUrl: null;
  backgroundColor: null;
  collection: Collection;
  isDelisted: boolean;
  displayImageUrl: string;
  id: string;
}

export interface AssetContract {
  address: string;
  chain: string;
  id: string;
}

export interface Collection {
  displayData: DisplayData;
  id: string;
}

export interface DisplayData {
  cardDisplayStyle: string;
}

export interface Creator {
  imageUrl: string;
  user: User;
  id: string;
}

export interface User {
  publicUsername: string;
  id: string;
}

export interface Promotion {
  id: string;
  promoCardImg: string;
  promoCardLink: string;
  promoCardVideo: null;
  promoCardVideoMimeType: string;
  promoHeader: string;
  cardColor: string;
  promoSubtitle: string;
  saleStartTime: string;
  saleEndTime: string;
}

import type { OpenSeaAsset } from '../../utils/types/opensea/types';

export type OpenSeaBaseGetRequest = {
  order_by?: string;
  order_direction?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
};

export type GetAssetsResponse = { assets: OpenSeaAsset[] };
export type GetFeaturedAssetResponse = GetAssetsResponse;

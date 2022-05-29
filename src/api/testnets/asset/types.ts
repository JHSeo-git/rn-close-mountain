import type { OpenSeaAsset } from '../../../utils/types/opensea/types';

export type GetAssetsResponse = { assets: OpenSeaAsset[] };
export type GetFeaturedAssetResponse = GetAssetsResponse;

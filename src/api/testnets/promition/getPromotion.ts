import result from './__mock__/getPromotionResult.json';
import type { GetPromotionResponse } from './types';

// TODO: remove mock
export default async function getPromotion() {
  const { data } = result as GetPromotionResponse;

  return data;
}

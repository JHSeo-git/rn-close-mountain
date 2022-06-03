import result from './__mock__/getPromotionResult.json';
import type { GetPromotionResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

// TODO: remove mock
export default async function getPromotion(config?: AxiosRequestConfig) {
  const { data } = result as GetPromotionResponse;

  return data;
}

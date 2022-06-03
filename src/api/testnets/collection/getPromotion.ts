import result from './__mock__/getPromotionResult.json';
import type { AxiosRequestConfig } from 'axios';
import { ArrayElementType } from '../../../utils/types/type-utils';

export type Promotion = ArrayElementType<typeof result['data']['promotions']>;

// TODO: remove mock
export default async function getPromotion(config?: AxiosRequestConfig) {
  const { data } = result;

  return data;
}

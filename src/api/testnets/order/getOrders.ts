import qs from 'qs';
import client from '../client';
import { orderFromJSON } from '../utils/utils';
import type { GetOrdersResponse } from './types';
import type { OpenSeaBaseGetRequestWithOrderby } from '../types';

export type GetOrdersRequest = {
  listed_after?: string;
  listed_before?: string;
  side?: number;
  bundled?: boolean;
  include_bundled?: boolean;
} & OpenSeaBaseGetRequestWithOrderby;

export default async function getOrders(requestData: GetOrdersRequest) {
  const options: GetOrdersRequest = {
    side: 1,
    bundled: false,
    include_bundled: false,
    order_by: 'created_date',
    order_direction: 'desc',
    ...requestData,
  };
  const query = qs.stringify(options, { encodeValuesOnly: true });
  const { data } = await client.get<GetOrdersResponse>(`/wyvern/v1/orders?${query}`);

  const result = data.orders.map(orderFromJSON);

  return result;
}

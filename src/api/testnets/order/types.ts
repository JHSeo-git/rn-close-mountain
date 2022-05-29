import type { Order } from '../../../utils/types/opensea/types';

export type GetOrdersResponse = { count: number; orders: Order[] };

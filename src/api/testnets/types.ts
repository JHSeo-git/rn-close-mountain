export type OpenSeaBaseGetRequest = {
  offset?: number;
  limit?: number;
};

export type OpenSeaBaseGetRequestWithOrderby = {
  order_by?: string;
  order_direction?: 'asc' | 'desc';
} & OpenSeaBaseGetRequest;

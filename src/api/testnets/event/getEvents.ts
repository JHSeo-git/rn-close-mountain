import qs from 'qs';
import client from '../client';
import { eventFromJSON } from '../utils/utils';
import type { GetEventsResponse } from './types';
import type { OpenSeaBaseGetRequest } from '../types';

export type GetEventsRequest = {
  occurred_after?: string;
  occurred_before?: string;
  event_type?:
    | 'created'
    | 'successful'
    | 'cancelled'
    | 'bid_entered'
    | 'bid_withdrawn'
    | 'transfer'
    | 'approve';
  only_opensea?: boolean;
  auction_type?: 'english' | 'dutch' | 'min-price';
} & OpenSeaBaseGetRequest;

export default async function getEvents(requestData: GetEventsRequest) {
  const options: GetEventsRequest = {
    only_opensea: false,
    ...requestData,
  };
  const query = qs.stringify(options, { encodeValuesOnly: true });
  const { data } = await client.get<GetEventsResponse>(`/api/v1/events?${query}`);

  const result = data.asset_events.map(eventFromJSON);

  return result;
}

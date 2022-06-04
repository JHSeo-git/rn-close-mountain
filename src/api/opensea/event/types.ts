import { AssetEvent } from '../../../utils/types/opensea/types';

export type GetEventsResponse = {
  next: string | null;
  previous: string | null;
  asset_events: AssetEvent[];
};

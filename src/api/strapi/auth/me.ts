import client from '../client';
import { MeResponse } from './types';

export default async function me() {
  const { data } = await client.get<MeResponse>('/api/users/me');

  return data;
}

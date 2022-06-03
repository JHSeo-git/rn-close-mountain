import client from '../client';
import { MeResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

export default async function me(config?: AxiosRequestConfig) {
  const { data } = await client.get<MeResponse>('/api/users/me', config);

  return data;
}

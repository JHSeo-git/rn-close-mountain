import client from '../client';
import type { NoContent204Response } from '../types';
import type { AxiosRequestConfig } from 'axios';

export type CheckUsernameRequest = {
  username: string;
};

export default async function checkUsername(
  { username }: CheckUsernameRequest,
  config?: AxiosRequestConfig,
) {
  const { data } = await client.post<NoContent204Response>(
    '/api/auth/verify/check-username',
    {
      username,
    },
    config,
  );

  return data;
}

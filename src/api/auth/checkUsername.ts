import client from '../client';
import type { NoContent204Response } from '../types';

export type CheckUsernameRequest = {
  username: string;
};

export default async function checkUsername({ username }: CheckUsernameRequest) {
  const { data } = await client.post<NoContent204Response>('/api/auth/verify/check-username', {
    username,
  });

  return data;
}

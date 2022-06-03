import client from '../client';
import type { OAuthProvider, SignUpResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  oauthProvider: OAuthProvider;
};

export default async function signUp(
  { username, email, password, oauthProvider }: SignUpRequest,
  config?: AxiosRequestConfig,
) {
  const { data } = await client.post<SignUpResponse>(
    '/api/auth/local/register',
    {
      username,
      email,
      password,
      oauthProvider,
    },
    config,
  );

  return data;
}

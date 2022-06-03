import client from '../client';
import type { SignInResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

type GoogleSignInProps = {
  oauthToken: string;
  accessToken: string;
  email: string;
};

export default async function googleSignIn(
  { oauthToken, accessToken, email }: GoogleSignInProps,
  config?: AxiosRequestConfig,
) {
  const { data } = await client.post<SignInResponse>(
    '/api/auth/oauth/login',
    {
      oauthToken,
      accessToken,
      email,
    },
    config,
  );

  return data;
}

import client from '../client';
import type { SignInResponse } from './types';
import type { AxiosRequestConfig } from 'axios';

export type EmailSignInRequest = {
  email: string;
  password: string;
};

export default async function emailSignIn(
  { email, password }: EmailSignInRequest,
  config?: AxiosRequestConfig,
) {
  const { data } = await client.post<SignInResponse>(
    '/api/auth/local',
    {
      identifier: email,
      password,
    },
    config,
  );

  return data;
}

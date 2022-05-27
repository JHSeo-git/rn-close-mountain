import client from '../client';
import type { OAuthProvider, SignUpResponse } from './types';

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  oauthProvider: OAuthProvider;
};

export default async function signUp({ username, email, password, oauthProvider }: SignUpRequest) {
  const { data } = await client.post<SignUpResponse>('/api/auth/local/register', {
    username,
    email,
    password,
    oauthProvider,
  });

  return data;
}

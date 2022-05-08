import client from '../client';
import type { SignInResponse } from './types';

type GoogleSignInProps = {
  oauthToken: string;
  accessToken: string;
  email: string;
};

export default async function googleSignIn({
  oauthToken,
  accessToken,
  email,
}: GoogleSignInProps) {
  const { data } = await client.post<SignInResponse>('/api/auth/oauth/login', {
    oauthToken,
    accessToken,
    email,
  });

  return data;
}

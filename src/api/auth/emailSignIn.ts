import client from '../client';
import type { SignInResponse } from './types';

export type EmailSignInRequest = {
  email: string;
  password: string;
};

export default async function emailSignIn({ email, password }: EmailSignInRequest) {
  const { data } = await client.post<SignInResponse>('/api/auth/local', {
    identifier: email,
    password,
  });

  return data;
}

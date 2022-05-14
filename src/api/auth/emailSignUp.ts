import client from '../client';
import type { SignUpResponse } from './types';

export type EmailSignUpRequest = {
  username: string;
  email: string;
  password: string;
};

export default async function emailSignUp({ username, email, password }: EmailSignUpRequest) {
  const { data } = await client.post<SignUpResponse>('/api/auth/local/register', {
    username,
    email,
    password,
  });

  return data;
}

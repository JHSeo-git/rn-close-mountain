import client from '../client';
import type { SignUpResponse } from './types';

type EmailSignUpProps = {
  username: string;
  email: string;
  password: string;
};

export default async function emailSignUp({ username, email, password }: EmailSignUpProps) {
  const { data } = await client.post<SignUpResponse>('/api/auth/local/register', {
    username,
    email,
    password,
  });

  return data;
}

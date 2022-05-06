import client from '../client';
import type { EmailSignInResponse } from './types';

type EmailSignInProps = {
  email: string;
  password: string;
};

export default async function emailSignIn({
  email,
  password,
}: EmailSignInProps) {
  const { data } = await client.post<EmailSignInResponse>('/api/auth/local', {
    identifier: email,
    password,
  });

  return data;
}

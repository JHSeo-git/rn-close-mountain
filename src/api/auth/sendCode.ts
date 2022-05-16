import client from '../client';
import type { VerificationProvider, VerificationUseType } from './types';

export type SendCodeRequest = {
  email: string;
  verifyProvider: VerificationProvider;
  verifyUseType: VerificationUseType;
};

export default async function sendCode({ email, verifyProvider, verifyUseType }: SendCodeRequest) {
  const { data } = await client.post<undefined>('/api/auth/verify/send-code', {
    email,
    type: verifyUseType,
  });

  return data;
}

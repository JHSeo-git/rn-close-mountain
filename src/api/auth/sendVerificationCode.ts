import client from '../client';
import type { NoContent204Response, VerificationProvider, VerificationUseType } from './types';

export type SendVerificationCodeRequest = {
  email: string;
  verificationProvider: VerificationProvider;
  verificationUseType: VerificationUseType;
};

export default async function sendCode({
  email,
  verificationProvider,
  verificationUseType,
}: SendVerificationCodeRequest) {
  const { data } = await client.post<NoContent204Response>('/api/auth/verify/send-code', {
    email,
    type: verificationUseType,
  });

  return data;
}

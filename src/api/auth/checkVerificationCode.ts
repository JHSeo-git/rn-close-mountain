import client from '../client';
import type { NoContent204Response, VerificationProvider, VerificationUseType } from './types';

export type CheckVerificationCodeRequest = {
  email: string;
  verificationUseType: VerificationUseType;
  code: string;
  verificationProvider: VerificationProvider;
};

export default async function checkVerificationCode({
  email,
  verificationUseType,
  code,
  verificationProvider,
}: CheckVerificationCodeRequest) {
  const { data } = await client.post<NoContent204Response>('/api/auth/verify/check-code', {
    email,
    type: verificationUseType,
    code,
  });

  return data;
}

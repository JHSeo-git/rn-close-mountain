import client from '../client';
import type { NoContent204Response, VerificationProvider, VerificationUseType } from './types';

export type CheckVerificationCodeRequest = {
  targetForSendCode: string;
  verificationUseType: VerificationUseType;
  code: string;
  verificationProvider: VerificationProvider;
};

export default async function checkVerificationCode({
  targetForSendCode,
  verificationUseType,
  code,
  verificationProvider,
}: CheckVerificationCodeRequest) {
  const { data } = await client.post<NoContent204Response>('/api/auth/verify/check-code', {
    targetForSendCode,
    verificationUseType,
    code,
    verificationProvider,
  });

  return data;
}

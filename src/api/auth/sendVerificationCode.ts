import client from '../client';
import type { VerificationProvider, VerificationUseType } from './types';
import type { NoContent204Response } from '../types';

export type SendVerificationCodeRequest = {
  targetForSendCode: string;
  verificationProvider: VerificationProvider;
  verificationUseType: VerificationUseType;
};

export default async function sendCode({
  targetForSendCode,
  verificationProvider,
  verificationUseType,
}: SendVerificationCodeRequest) {
  const { data } = await client.post<NoContent204Response>('/api/auth/verify/send-code', {
    targetForSendCode,
    verificationProvider,
    verificationUseType,
  });

  return data;
}

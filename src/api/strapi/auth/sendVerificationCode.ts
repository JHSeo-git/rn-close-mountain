import client from '../client';
import type { VerificationProvider, VerificationUseType } from './types';
import type { NoContent204Response } from '../types';
import type { AxiosRequestConfig } from 'axios';

export type SendVerificationCodeRequest = {
  targetForSendCode: string;
  verificationProvider: VerificationProvider;
  verificationUseType: VerificationUseType;
};

export default async function sendCode(
  { targetForSendCode, verificationProvider, verificationUseType }: SendVerificationCodeRequest,
  config?: AxiosRequestConfig,
) {
  const { data } = await client.post<NoContent204Response>(
    '/api/auth/verify/send-code',
    {
      targetForSendCode,
      verificationProvider,
      verificationUseType,
    },
    config,
  );

  return data;
}

import client from '../client';
import type { NoContent204Response, VerificationProvider, VerificationUseType } from './types';

export type CheckCodeRequest = {
  email: string;
  verifyUseType: VerificationUseType;
  code: string;
  verifyProvider: VerificationProvider;
};

export default async function checkCode({
  email,
  verifyUseType,
  code,
  verifyProvider,
}: CheckCodeRequest) {
  const { data } = await client.post<NoContent204Response>('/api/auth/verify/check-code', {
    email,
    type: verifyUseType,
    code,
  });

  return data;
}

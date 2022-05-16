export type StrapiProvider = 'local';
export type Provider = 'email' | 'google' | 'apple';
export type VerificationProvider = 'email'; // | 'sms' | 'otp';
export type VerificationUseType = 'reset-password' | 'signup' | 'two-factor';

export type SignInResponse = {
  jwt: string;
  user: User;
};
export type SignUpResponse = SignInResponse;
export type NoContent204Response = {};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: StrapiProvider;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  oauthProvider: Provider;
};

export type MeResponse = User;

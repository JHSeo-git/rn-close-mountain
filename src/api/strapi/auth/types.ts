export type StrapiProvider = 'local';
export type OAuthProvider = 'email' | 'google' | 'apple';
export type VerificationProvider = 'email'; // | 'sms' | 'otp';
export type VerificationUseType = 'reset-password' | 'signup' | 'two-factor';

export type SignInResponse = {
  jwt: string;
  user: User;
};
export type SignUpResponse = SignInResponse;

export type User = {
  id: number;
  username: string;
  email: string;
  provider: StrapiProvider;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  oauthProvider: OAuthProvider;
};

export type MeResponse = User;

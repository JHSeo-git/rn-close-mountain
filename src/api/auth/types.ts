export type Provider = 'email' | 'google' | 'apple';

export type SignInResponse = {
  jwt: string;
  user: User;
};
export type SignUpResponse = SignInResponse;

export type User = {
  id: number;
  username: string;
  email: string;
  provider: Provider;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MeResponse = User;

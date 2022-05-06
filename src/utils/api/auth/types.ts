export type Provider = 'email' | 'google' | 'apple';

export type EmailSignInResponse = {
  jwt: string;
  user: User;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

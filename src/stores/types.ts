import { OAuthProvider } from '../api/strapi/auth/types';

export type BiometricType = 'faceId' | 'touchId' | 'iris' | 'unknown';
export type SnackbarType = 'success' | 'error' | 'info' | 'default';

export type SessionInfo = {
  token: string;
  oauthProvider: OAuthProvider;
  email: string;
  username: string;
  avatarUrl?: string;
};

import { Provider } from '../api/auth/types';

export type BiometricType = 'faceId' | 'touchId' | 'iris' | 'unknown';
export type SnackbarType = 'success' | 'error' | 'info' | 'default';

export type SessionInfo = {
  token: string;
  provider: Provider;
  email: string;
  username: string;
  avatarUrl?: string;
};

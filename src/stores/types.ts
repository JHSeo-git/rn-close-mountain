import { Provider } from '../api/auth/types';

export type SessionInfo = {
  token: string;
  provider: Provider;
};

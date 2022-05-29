import { ApolloClient, InMemoryCache } from '@apollo/client';
import Config from 'react-native-config';
import AppError from '../utils/error/AppError';

if (!Config.TESTNETS_URL) {
  throw new AppError({
    message: 'env.TESTNETS_URL is not defined',
    name: 'TESTNETS_URL_NOT_DEFINED',
    label: 'APP',
  });
}

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: `${Config.TESTNETS_URL}/graphql`,
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});
export { cache };
export default client;

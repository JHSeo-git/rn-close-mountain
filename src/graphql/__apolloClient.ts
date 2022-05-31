import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Config from 'react-native-config';
import AppError from '../utils/error/AppError';
import signedQuery from './openseaQuery';
import { QueryVariablesKey } from './types/generated';

if (!Config.TESTNETS_URL) {
  throw new AppError({
    message: 'env.TESTNETS_URL is not defined',
    name: 'TESTNETS_URL_NOT_DEFINED',
    label: 'APP',
  });
}

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: `${Config.TESTNETS_URL}/graphql/`,
  fetch: (uri, options) => {
    const { operationName, query, variables } = JSON.parse((options?.body ?? '') as string);

    const body = JSON.stringify({
      id: operationName,
      query,
      variables,
    });
    console.log(body);
    console.log(options?.body);

    return fetch(uri, {
      ...options,
      body,
    });
  },
});
const graphqlLink = setContext((req, { headers }) => {
  const xSignedQuery = req.operationName && signedQuery[req.operationName as QueryVariablesKey];

  console.log({ req, xSignedQuery });

  return {
    headers: {
      ...headers,
      'x-signed-query': xSignedQuery ?? undefined,
    },
  };
});

const client = new ApolloClient({
  link: graphqlLink.concat(httpLink),
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

export { cache };
export default client;

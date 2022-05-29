import { useEffect, useState } from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import Loader from '../Loader';
import client, { cache } from '../../graphql/client';
import GestureBottomSheetModalProvider from '../GestureBottomSheetModalProvider';

type ComposedProviderProps = {
  children: React.ReactNode;
};

// TODO: graphql
const ComposedProvider = ({ children }: ComposedProviderProps) => {
  // const [loadingCache, setLoadingCache] = useState(true);

  // useEffect(() => {
  //   persistCache({
  //     cache,
  //     storage: AsyncStorage,
  //   }).then(() => setLoadingCache(false));
  // }, []);

  // if (loadingCache) {
  //   return <Loader force={true} />;
  // }

  return (
    // <ApolloProvider client={client}>
    <GestureBottomSheetModalProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>{children}</SafeAreaProvider>
    </GestureBottomSheetModalProvider>
    // </ApolloProvider>
  );
};

export default ComposedProvider;

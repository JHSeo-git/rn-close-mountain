import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import GestureBottomSheetModalProvider from '../GestureBottomSheetModalProvider';
// import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../Loader';
// import { ApolloProvider } from '@apollo/client';
// import { persistCache } from 'apollo3-cache-persist';
// import client, { cache } from '../../graphql/__apolloClient';

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

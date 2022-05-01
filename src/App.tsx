import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import RootNavigation from './navigation/RootNavigation';
import { StoreContextProvider } from './contexts/StoreContext';
import './i18n';

const App = () => {
  return (
    <StoreContextProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreContextProvider>
  );
};

export default App;

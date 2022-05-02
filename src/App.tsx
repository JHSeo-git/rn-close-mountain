import { NavigationContainer, useTheme } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import RootStackNavigation from './navigation/RootStackNavigation';
import { StoreContextProvider } from './contexts/StoreContext';
import './i18n';
import { COLORS } from './constants/design-token';

const App = () => {
  const theme = useTheme();
  theme.colors.background = COLORS.loContrast;

  return (
    <StoreContextProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer theme={theme}>
          <RootStackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreContextProvider>
  );
};

export default App;

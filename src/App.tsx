import { NavigationContainer, useTheme } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import RootStack from './screens/RootStack';
import { StoreContextProvider } from './contexts/StoreContext';
import { COLORS } from './constants/design-token';
import muiTheme from './constants/mui/theme';
import './i18n';

const App = () => {
  const theme = useTheme();
  theme.colors.background = COLORS.loContrast;

  return (
    <StoreContextProvider>
      <PaperProvider theme={muiTheme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer theme={theme}>
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </StoreContextProvider>
  );
};

export default App;

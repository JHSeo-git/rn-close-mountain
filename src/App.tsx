import { NavigationContainer, useTheme } from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import RootStack from './screens/RootStack';
import Loader from './components/Loader';
import muiTheme from './constants/mui/theme';
import { COLORS } from './constants/design-token';
import { StoreContextProvider } from './contexts/StoreContext';
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
          <Loader />
        </SafeAreaProvider>
      </PaperProvider>
    </StoreContextProvider>
  );
};

export default App;

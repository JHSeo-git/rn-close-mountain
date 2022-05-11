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
import CustomSnackbar from './components/CustomSnackbar';
import GestureBottomSheetModalProvider from './components/GestureBottomSheetModalProvider';
import BiometricAuth from './components/BiometricAuth';

// TODO: add a global error boundary
// import { ErrorBoundary } from 'react-error-boundary';
// import ErrorFallback from './components/ErrorFallback';

const App = () => {
  const theme = useTheme();
  theme.colors.background = COLORS.loContrast;

  return (
    <StoreContextProvider>
      <PaperProvider theme={muiTheme}>
        <GestureBottomSheetModalProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Loader />
            <CustomSnackbar />
            <NavigationContainer theme={theme}>
              <BiometricAuth />
              <RootStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureBottomSheetModalProvider>
      </PaperProvider>
    </StoreContextProvider>
  );
};

export default App;

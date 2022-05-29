import { NavigationContainer, useTheme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import RootStack from './screens/RootStack';
import Loader from './components/Loader';
import BiometricAuth from './components/BiometricAuth';
import CustomSnackbar from './components/CustomSnackbar';
import ComposedProvider from './components/ComposedProvider';
import muiTheme from './constants/mui/theme';
import { COLORS } from './constants/design-token';
import { StoreContextProvider } from './contexts/StoreContext';
import './i18n';

// TODO: add a global error boundary
// import { ErrorBoundary } from 'react-error-boundary';
// import ErrorFallback from './components/ErrorFallback';

const App = () => {
  const theme = useTheme();
  theme.colors.background = COLORS.loContrast;

  return (
    <StoreContextProvider>
      <PaperProvider theme={muiTheme}>
        <ComposedProvider>
          <Loader />
          <CustomSnackbar />
          <NavigationContainer theme={theme}>
            <BiometricAuth />
            <RootStack />
          </NavigationContainer>
        </ComposedProvider>
      </PaperProvider>
    </StoreContextProvider>
  );
};

export default App;

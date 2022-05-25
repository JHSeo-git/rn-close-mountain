import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from '../MainTab';
import SettingScreen from '../SettingScreen';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import SampleStackNavigation from '../__sample__/SampleStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
      <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Group>
      <Stack.Screen name="Sample" component={SampleStackNavigation} />
    </Stack.Navigator>
  );
};

export default RootStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import MainNavigation from '../MainNavigation';
import SampleNavigation from '../__sample__/SampleNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Main" component={MainNavigation} />
      <Stack.Screen name="Sample" component={SampleNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import MainTabNavigation from '../MainTabNavigation';
import SampleStackNavigation from '../__sample__/SampleStackNavigation';

const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Main" component={MainTabNavigation} />
      <Stack.Screen name="Sample" component={SampleStackNavigation} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;

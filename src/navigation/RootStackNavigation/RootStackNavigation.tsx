import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootHome from '../../screens/RootHome';
import MainTabNavigation from '../MainTabNavigation';
import SampleStackNavigation from '../__sample__/SampleStackNavigation';

const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="RootHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RootHome" component={RootHome} />
      <Stack.Screen name="Main" component={MainTabNavigation} />
      <Stack.Screen name="Sample" component={SampleStackNavigation} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;

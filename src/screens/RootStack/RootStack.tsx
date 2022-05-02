import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from '../MainTab';
import SampleStackNavigation from '../__sample__/SampleStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Sample" component={SampleStackNavigation} />
    </Stack.Navigator>
  );
};

export default RootStack;

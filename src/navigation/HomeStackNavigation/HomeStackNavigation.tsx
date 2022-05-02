import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeMain from '../../screens/HomeMain';

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeMain" component={HomeMain} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;

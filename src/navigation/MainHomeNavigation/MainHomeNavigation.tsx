import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainHome from '../../screens/MainHome';

const Stack = createNativeStackNavigator();

const MainHomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={MainHome} />
    </Stack.Navigator>
  );
};

export default MainHomeNavigation;

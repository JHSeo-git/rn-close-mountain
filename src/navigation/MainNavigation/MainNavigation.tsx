import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainHome from '../../screens/MainHome';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="MainHome" component={MainHome} />
    </Tab.Navigator>
  );
};

export default MainNavigation;

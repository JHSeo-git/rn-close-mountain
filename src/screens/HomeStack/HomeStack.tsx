import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import AssetScreen from '../AssetScreen';
import CollectionScreen from '../CollectionScreen';
import type { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Asset" component={AssetScreen} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

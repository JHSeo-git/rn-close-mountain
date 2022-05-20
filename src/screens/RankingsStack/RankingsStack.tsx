import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RankingsStackParamList } from '../types';
import RankingsScreen from '../RankingsScreen';

const Stack = createNativeStackNavigator<RankingsStackParamList>();

const RankingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Rankings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Rankings" component={RankingsScreen} />
    </Stack.Navigator>
  );
};

export default RankingsStack;

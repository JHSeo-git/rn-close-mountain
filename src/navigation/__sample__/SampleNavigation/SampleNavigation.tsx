import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SampleHome from '../../../screens/__sample__/SampleHome';
import SampleGIF from '../../../screens/__sample__/SampleGIF';
import SampleBottomSheet from '../../../screens/__sample__/SampleBottomSheet';

const Stack = createNativeStackNavigator();

const SampleNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SampleHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SampleHome" component={SampleHome} />
      <Stack.Screen name="SampleGIF" component={SampleGIF} />
      <Stack.Screen name="SampleBottomSheet" component={SampleBottomSheet} />
    </Stack.Navigator>
  );
};

export default SampleNavigation;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SampleHome from '../SampleHome';
import SampleGIF from '../SampleGIF';
import SampleBottomSheet from '../SampleBottomSheet';
import SampleBottomSheetModal from '../SampleBottomSheetModal';
import SampleMobx from '../SampleMobx';
import SampleBiometric from '../SampleBiometric';
import type { SampleStackParamList } from '../../types';

const Stack = createNativeStackNavigator<SampleStackParamList>();

const SampleStack = () => {
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
      <Stack.Screen name="SampleBottomSheetModal" component={SampleBottomSheetModal} />
      <Stack.Screen name="SampleMobx" component={SampleMobx} />
      <Stack.Screen name="SampleBiometric" component={SampleBiometric} />
    </Stack.Navigator>
  );
};

export default SampleStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SampleHome from '../../../screens/__sample__/SampleHome';
import SampleGIF from '../../../screens/__sample__/SampleGIF';
import SampleBottomSheet from '../../../screens/__sample__/SampleBottomSheet';
import SampleBottomSheetModal from '../../../screens/__sample__/SampleBottomSheetModal';
import SampleMobx from '../../../screens/__sample__/SampleMobx';
import type { SampleStackParamList } from '../../types';

const Stack = createNativeStackNavigator<SampleStackParamList>();

const SampleStackNavigation = () => {
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
      <Stack.Screen
        name="SampleBottomSheetModal"
        component={SampleBottomSheetModal}
      />
      <Stack.Screen name="SampleMobx" component={SampleMobx} />
    </Stack.Navigator>
  );
};

export default SampleStackNavigation;

import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';

const SampleBottomSheet = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Sample Bottom-Sheet" hasGoback />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Poppins-Bold' }}>Sample Bottom Sheet</Text>
      </View>
    </SafeAreaView>
  );
};

export default SampleBottomSheet;

import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';

const SampleGIF = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Sample GIF" hasGoback />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Poppins-Bold' }}>Sample GIF</Text>
        <Image source={require('../../../assets/images/sample.gif')} />
      </View>
    </SafeAreaView>
  );
};

export default SampleGIF;

import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import type { SampleStackScreenProps } from '../../../navigation/types';

type SampleHomeProps = SampleStackScreenProps<'SampleHome'>;

const SampleHome = ({ navigation }: SampleHomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Sample" hasGoback />
      <View style={styles.main}>
        <View style={styles.hero}>
          <Text style={styles.text}>샘플 코드</Text>
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={() => navigation.navigate('SampleGIF')}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>GIF</Text>
          </Button>
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={() => navigation.navigate('SampleBottomSheet')}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>
              Bottom Sheet
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  buttonBox: {
    marginVertical: 5,
  },
});

export default SampleHome;

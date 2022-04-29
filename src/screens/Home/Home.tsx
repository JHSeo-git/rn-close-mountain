import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import Header from '../../components/Header';
import type { RootStackScreenProps } from '../../navigation/types';

import Config from 'react-native-config';

type HomeProps = RootStackScreenProps<'Home'>;

const Home = ({ navigation }: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <View style={styles.main}>
        <View style={styles.hero}>
          <Text style={styles.text}>
            {Config.NODE_ENV !== 'production' ? '개발 모드' : '운영 모드'}
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={() => navigation.navigate('Main')}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Main</Text>
          </Button>
        </View>
        <View style={styles.buttonBox}>
          <Button onPress={() => navigation.navigate('Sample')}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Sample</Text>
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

export default Home;

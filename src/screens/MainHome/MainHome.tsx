import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import type { RootStackScreenProps } from '../../navigation/types';

type MainHomeProps = RootStackScreenProps<'Home'>;

const MainHome = ({}: MainHomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Main" hasGoback />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>MainHome</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MainHome;

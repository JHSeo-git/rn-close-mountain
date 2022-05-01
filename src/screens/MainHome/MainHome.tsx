import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { viewStyles } from '../../constants/global-styles';
import type { RootStackScreenProps } from '../../navigation/types';

type MainHomeProps = RootStackScreenProps<'Home'>;

const MainHome = ({}: MainHomeProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('common.main')} />
      <View style={viewStyles.flex_1_padding_20}>
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

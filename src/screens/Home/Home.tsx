import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import SampleButton from '../../components/__sample__/SampleButton';
import Header from '../../components/Header';
import { textStyles, viewStyles } from '../../constants/global-styles';
import { COLORS } from '../../constants/design-token';
import type { RootStackScreenProps } from '../../navigation/types';

type HomeProps = RootStackScreenProps<'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('common.home')} />
      <View style={styles.main}>
        <View style={styles.hero}>
          <Text style={textStyles.content}>
            {Config.NODE_ENV !== 'production'
              ? t('sample.develop_mode')
              : t('sample.product_mode')}
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => navigation.navigate('Main')}>
            <Text style={styles.buttonText}>{t('sample.main')}</Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => navigation.navigate('Sample')}>
            <Text style={styles.buttonText}>{t('sample.sample')}</Text>
          </SampleButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...viewStyles.flex_1_bg_white,
  },
  main: {
    ...viewStyles.flex_1_padding_x_20,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  buttonText: {
    ...textStyles.strong,
    color: COLORS.loContrast,
  },
  buttonBox: {
    marginVertical: 5,
  },
});

export default Home;

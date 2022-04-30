import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SampleButton from '../../../components/__sample__/SampleButton';
import Header from '../../../components/Header';
import { textStyles, viewStyles } from '../../../constants/global-styles';
import { COLORS } from '../../../constants/design-token';
import type { SampleStackScreenProps } from '../../../navigation/types';
import { useTranslation } from 'react-i18next';

type SampleHomeProps = SampleStackScreenProps<'SampleHome'>;

const SampleHome = ({ navigation }: SampleHomeProps) => {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('sample.sample')} hasGoback />
      <View style={styles.main}>
        <View style={styles.hero}>
          <Text style={styles.text}>{t('sample.sample_code')}</Text>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => navigation.navigate('SampleGIF')}>
            <Text style={styles.buttonText}>GIF</Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton
            onPress={() => navigation.navigate('SampleBottomSheet')}
          >
            <Text style={styles.buttonText}>Bottom Sheet</Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton
            onPress={() =>
              i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en')
            }
          >
            <Text style={styles.buttonText}>{t('sample.change_language')}</Text>
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
  text: {
    ...textStyles.content,
  },
  buttonText: {
    ...textStyles.strong,
    color: COLORS.loContrast,
  },
  buttonBox: {
    marginVertical: 5,
  },
});

export default SampleHome;

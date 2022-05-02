import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header';
import UIText from '../../../components/UIText';
import SampleButton from '../../../components/__sample__/SampleButton';
import { COLORS } from '../../../constants/design-token';
import * as textStyles from '../../../constants/global-styles/textStyles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
import type { SampleStackScreenProps } from '../../types';

type SampleHomeProps = SampleStackScreenProps<'SampleHome'>;

const SampleHome = ({ navigation }: SampleHomeProps) => {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('sample.sample')} hasGoback />
      <View style={styles.main}>
        <View style={styles.hero}>
          <UIText style={styles.text}>{t('sample.sample_code')}</UIText>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => navigation.navigate('SampleGIF')}>
            <UIText style={styles.buttonText}>GIF</UIText>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton
            onPress={() => navigation.navigate('SampleBottomSheet')}
          >
            <UIText style={styles.buttonText}>Bottom Sheet</UIText>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton
            onPress={() => navigation.navigate('SampleBottomSheetModal')}
          >
            <UIText style={styles.buttonText}>Bottom Sheet Modal</UIText>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => navigation.navigate('SampleMobx')}>
            <UIText style={styles.buttonText}>Mobx</UIText>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton
            onPress={() =>
              i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en')
            }
          >
            <UIText style={styles.buttonText}>
              {t('sample.change_language')}
            </UIText>
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

import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import UIText from '../../../components/UIText';
import { COLORS, SPACE } from '../../../constants/design-token';

const FooterSection = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <View style={styles.container}>
      <UIText as="h3_contrast" style={styles.textAlign}>
        {t('common.closeMountain')}
      </UIText>
      <UIText as="content_contrast" style={[styles.textAlign, { marginTop: SPACE.$2 }]}>
        {t('footer.footer_description')}
      </UIText>
      <View style={styles.section}>
        <UIText as="small_bold_contrast" style={styles.textAlign}>
          © {currentYear} Seonest
        </UIText>
        <View style={styles.buttonContainer}>
          <CustomButton
            mode="text"
            // TODO: onPress
            onPress={() => {}}
          >
            <UIText as="small_bold_contrast">{t('footer.privacy_policy')}</UIText>
          </CustomButton>
          <CustomButton
            mode="text"
            // TODO: onPress
            onPress={() => {}}
          >
            <UIText as="small_bold_contrast">{t('footer.terms_of_use')}</UIText>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.$8,
    paddingHorizontal: SPACE.$5,
  },
  textAlign: {
    textAlign: 'center',
  },
  section: {
    marginTop: SPACE.$8,
    paddingTop: SPACE.$8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
  buttonContainer: {
    marginTop: SPACE.$2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default FooterSection;

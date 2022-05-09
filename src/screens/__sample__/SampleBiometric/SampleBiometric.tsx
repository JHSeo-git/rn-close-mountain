/**
 * @see https://blog.logrocket.com/implementing-react-native-biometric-authentication-expo/
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';

import Header from '../../../components/Header';
import UIText from '../../../components/UIText';
import SampleButton from '../../../components/__sample__/SampleButton';
import * as textStyles from '../../../constants/global-styles/textStyles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
import { COLORS, SPACE } from '../../../constants/design-token';

const SampleBiometric = () => {
  const { t } = useTranslation();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [savedBiometrics, setSavedBiometrics] = useState(false);
  const [biometricTypes, setBiometricTypes] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);
  const [biometricAuthResult, setBiometricAuthResult] =
    useState<LocalAuthentication.LocalAuthenticationResult | null>(null);

  const matchedBiometricType = (
    biometricType: LocalAuthentication.AuthenticationType,
  ) => {
    switch (biometricType) {
      case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
        return t('sample.facial_recognition');
      case LocalAuthentication.AuthenticationType.FINGERPRINT:
        return t('sample.fingerprint');
      case LocalAuthentication.AuthenticationType.IRIS:
        return t('sample.iris');
    }
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setSavedBiometrics(isEnrolled);

      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setBiometricTypes(types);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({});
    setBiometricAuthResult(result);
    console.log(result);
    if (!result.success) {
      // error examples
      // {
      //   "error": "lockout",
      //   "message": "Too many attempts. Try again later.",
      //   "success": false,
      // },
    }
  };

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('sample.sample_biometric')} />
      <View style={styles.main}>
        <View style={styles.labelBox}>
          <UIText as="strong">
            {t('sample.message.biometric_supported_question')}
          </UIText>
          <UIText>
            {isBiometricSupported
              ? t('sample.message.biometric_supported_true')
              : t('sample.message.biometric_supported_false')}
          </UIText>
        </View>
        <View style={styles.labelBox}>
          <UIText as="strong">
            {t('sample.message.biometric_enrolled_question')}
          </UIText>
          <UIText>
            {savedBiometrics
              ? t('sample.message.biometric_enrolled_true')
              : t('sample.message.biometric_enrolled_false')}
          </UIText>
        </View>
        <View style={styles.labelBox}>
          <UIText as="strong">
            {t('sample.message.biometric_types_question')}
          </UIText>
          {biometricTypes.map(type => (
            <UIText key={type}>{matchedBiometricType(type)}</UIText>
          ))}
        </View>
        <View style={styles.labelBox}>
          <SampleButton onPress={handleBiometricAuth}>
            <UIText style={styles.buttonText}>
              {t('sample.sample_biometric')}
            </UIText>
          </SampleButton>
        </View>
        <View style={styles.labelBox}>
          <UIText as="strong">
            {t('sample.message.biometric_authentication_question')}
          </UIText>
          <UIText>{JSON.stringify(biometricAuthResult, null, 2)}</UIText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    ...viewStyles.flex_1_padding_20,
  },
  labelBox: {
    marginVertical: SPACE.$2,
  },
  buttonText: {
    ...textStyles.strong,
    color: COLORS.loContrast,
  },
});

export default SampleBiometric;

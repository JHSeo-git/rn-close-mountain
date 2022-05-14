import { View } from 'react-native';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import UIText from '../../../components/UIText';
import UIScreenTitleView from '../../../components/UIScreenTitleView';
import DismissKeyboard from '../../../components/DismissKeyboard';
import UICodeFields from '../../../components/UICodeFields';
import CustomButton from '../../../components/CustomButton';
import AppError from '../../../utils/error/AppError';
import { useStore } from '../../../contexts/StoreContext';
import styles from './EmailSignUp.styles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
import useCountdown from '../../../hooks/useCountdown';

type EmailSignUpStep2 = {
  handleNextStep: () => void;
};

const EmailSignUpStep2 = observer(({ handleNextStep }: EmailSignUpStep2) => {
  const { verificationStore, emailSignUpStore, snackbarStore } = useStore();
  const { t } = useTranslation();
  const countdown = useCountdown();

  const onResend = async () => {
    // TODO: resend

    countdown.restart();
    emailSignUpStore.setEmailVerificationCode('');

    snackbarStore.showSnackbar(t('verification.message.send_success'), 'success');
  };

  const onSubmit = async () => {
    try {
      if (!emailSignUpStore.email) {
        return;
      }
      if (!emailSignUpStore.emailVerificationCode) {
        return;
      }

      const result = await verificationStore.checkVerification({
        type: 'email',
        target: emailSignUpStore.email,
        code: emailSignUpStore.emailVerificationCode,
      });

      if (!result.success) {
        snackbarStore.showSnackbar(
          t('common.message.failed_msg', { msg: t('verification.check_code') }),
          'error',
        );
        return;
      }

      // if success then go next step
      handleNextStep();
    } catch (e: unknown) {
      if (e instanceof AppError) {
        snackbarStore.showSnackbar(e.message, 'error');
      }
    }
  };

  useEffect(() => {
    countdown.start();
    return () => {
      countdown.reset();
      snackbarStore.reset();
    };
  }, []);

  return (
    <DismissKeyboard>
      <View style={viewStyles.flex_1_padding_20}>
        <View style={styles.mainBox}>
          <ScrollView>
            <UIScreenTitleView
              title={t('common.signUp')}
              subTitle={t('verification.message.code_input_information', { type: 'email' })}
            >
              <View style={styles.chipBox}>
                <Chip>
                  <UIText as="content_primary">{emailSignUpStore.email}</UIText>
                </Chip>
              </View>
            </UIScreenTitleView>
            <View style={styles.inputBox}>
              <UICodeFields
                cellCount={6}
                disabled={countdown.isZero}
                error={countdown.isZero}
                value={emailSignUpStore.emailVerificationCode ?? ''}
                setValue={text => emailSignUpStore.setEmailVerificationCode(text)}
              />
            </View>
            <View style={styles.inputBelowBox}>
              <CustomButton mode="text" labelStyle={styles.textButtonLabel} onPress={onResend}>
                {t('verification.resend')}
              </CustomButton>
              <UIText as="small" style={styles.timerText}>
                {countdown.timeLeftPad}
              </UIText>
            </View>
          </ScrollView>
          <View style={styles.buttonBox}>
            <View style={styles.buttonBox}>
              <CustomButton
                disabled={
                  emailSignUpStore.emailVerificationCode?.length !== 6 ||
                  countdown.isZero ||
                  verificationStore.loading
                }
                loading={verificationStore.loading}
                labelStyle={{ marginVertical: 15 }}
                onPress={onSubmit}
              >
                <UIText as="h4_contrast">{t('common.submit')}</UIText>
              </CustomButton>
            </View>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
});

export default EmailSignUpStep2;

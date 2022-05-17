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

type SignUpStep2 = {
  handleNextStep: () => void;
};

const SignUpStep2 = observer(({ handleNextStep }: SignUpStep2) => {
  const { verificationStore, signUpStore, snackbarStore } = useStore();
  const { t } = useTranslation();
  const countdown = useCountdown();

  const onResend = async () => {
    try {
      if (!signUpStore.email) {
        snackbarStore.showSnackbar(t('member.message.email_required'), 'error');
        return;
      }

      const result = await verificationStore.sendVerificationCode({
        email: signUpStore.email,
        verificationProvider: 'email',
        verificationUseType: 'signup',
      });

      if (result) {
        // 성공시에 timer 재시작하고 input 초기화
        // 그리고 toast
        countdown.restart();
        signUpStore.setVerificationCode('');
        snackbarStore.showSnackbar(t('verification.message.send_success'), 'success');
      }
    } catch (e: unknown) {
      if (e instanceof AppError) {
        snackbarStore.showSnackbar(e.message, 'error');
      }
    }
  };

  const onSubmit = async () => {
    try {
      if (!signUpStore.email) {
        snackbarStore.showSnackbar(t('member.message.email_required'), 'error');
        return;
      }
      if (!signUpStore.verificationCode) {
        snackbarStore.showSnackbar(t('member.message.code_required'), 'error');
        return;
      }

      const result = await verificationStore.checkVerificationCode({
        email: signUpStore.email,
        verificationUseType: 'signup',
        code: signUpStore.verificationCode,
        verificationProvider: 'email',
      });

      // if success then go next step
      if (result) {
        handleNextStep();
      }
    } catch (e: unknown) {
      if (e instanceof AppError) {
        snackbarStore.showSnackbar(e.message, 'error');
      }
    }
  };

  useEffect(() => {
    // 화면 렌더링 직후 countdown
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
                  <UIText as="content_primary">{signUpStore.email}</UIText>
                </Chip>
              </View>
            </UIScreenTitleView>
            <View style={styles.inputBox}>
              <UICodeFields
                cellCount={6}
                disabled={countdown.isZero}
                error={countdown.isZero}
                value={signUpStore.verificationCode ?? ''}
                setValue={text => signUpStore.setVerificationCode(text)}
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
                  signUpStore.verificationCode?.length !== 6 ||
                  countdown.isZero ||
                  verificationStore.loading
                }
                loading={verificationStore.loading}
                labelStyle={{ marginVertical: 15 }}
                onPress={onSubmit}
              >
                <UIText as="h4_contrast">{t('common.next')}</UIText>
              </CustomButton>
            </View>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
});

export default SignUpStep2;

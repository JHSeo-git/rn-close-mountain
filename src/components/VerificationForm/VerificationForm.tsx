import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import UIText from '../UIText';
import UIScreenTitleView from '../UIScreenTitleView';
import DismissKeyboard from '../DismissKeyboard';
import UICodeFields from '../UICodeFields';
import CustomButton from '../CustomButton';
import AppError from '../../utils/error/AppError';
import { useStore } from '../../contexts/StoreContext';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import useCountdown from '../../hooks/useCountdown';
import { COLORS, SPACE } from '../../constants/design-token';
import { VerificationProvider, VerificationUseType } from '../../api/auth/types';

type VerificationFormProps = {
  title: string;
  setVerificationCode: (verificationCode: string) => void;
  onSuccess: () => void;
  targetForSendCode: string;
  verificationProvider: VerificationProvider;
  verificationUseType: VerificationUseType;
};

const VerificationForm = observer(
  ({
    title,
    targetForSendCode,
    verificationProvider,
    verificationUseType,
    setVerificationCode,
    onSuccess,
  }: VerificationFormProps) => {
    const [code, setCode] = useState('');
    const { verificationStore, snackbarStore } = useStore();
    const { t } = useTranslation();
    const countdown = useCountdown();

    const typeMessage = (() => {
      switch (verificationProvider) {
        case 'email':
          return t('common.email');
      }
    })();

    const onResend = async () => {
      try {
        if (!targetForSendCode) {
          snackbarStore.showSnackbar(
            t('member.message.required_type', { type: typeMessage }),
            'error',
          );
          return;
        }

        const result = await verificationStore.sendVerificationCode({
          targetForSendCode,
          verificationProvider,
          verificationUseType,
        });

        if (result) {
          // 성공시에 input 초기화하고 timer 재시작
          // 그리고 toast
          setCode('');
          countdown.restart();
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
        const result = await verificationStore.checkVerificationCode({
          targetForSendCode,
          verificationUseType,
          code,
          verificationProvider,
        });

        // if success then set-up verification code
        // and onSuccess call
        if (result) {
          setVerificationCode(code);
          onSuccess();
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
        <View style={styles.mainBox}>
          <ScrollView>
            <UIScreenTitleView
              title={title}
              subTitle={t('verification.message.code_input_information', { type: typeMessage })}
            >
              <View style={styles.chipBox}>
                <Chip>
                  <UIText as="content_primary">{targetForSendCode}</UIText>
                </Chip>
              </View>
            </UIScreenTitleView>
            <View style={styles.inputBox}>
              <UICodeFields
                cellCount={6}
                disabled={countdown.isZero || verificationStore.loading}
                error={countdown.isZero}
                value={code}
                setValue={value => setCode(value)}
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
                disabled={code.length !== 6 || countdown.isZero || verificationStore.loading}
                loading={verificationStore.loading}
                labelStyle={{ marginVertical: 15 }}
                onPress={onSubmit}
              >
                <UIText as="h4_contrast">{t('common.next')}</UIText>
              </CustomButton>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  },
);

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
  },
  inputBox: {
    marginTop: SPACE.$10,
  },
  inputBelowBox: {
    marginTop: SPACE.$2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBox: {
    paddingTop: SPACE.$5,
  },
  textButtonLabel: {
    marginVertical: SPACE.$2,
    marginHorizontal: SPACE.$3,
  },
  chipBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  timerText: {
    color: COLORS.gray11,
    marginHorizontal: SPACE.$3,
  },
});

export default VerificationForm;

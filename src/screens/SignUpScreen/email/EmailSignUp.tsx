import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import Header from '../../../components/Header';
import UIText from '../../../components/UIText';
import UIDialog from '../../../components/UIDialog';
import EmailForm from '../../../components/EmailForm';
import PasswordForm from '../../../components/PasswordForm';
import UsernameForm from '../../../components/UsernameForm';
import VerificationForm from '../../../components/VerificationForm';
import { useStore } from '../../../contexts/StoreContext';
import { COLORS } from '../../../constants/design-token';
import AppError from '../../../utils/error/AppError';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
import type { RootStackScreenProps } from '../../types';

const EmailSignUp = observer(() => {
  const navigation = useNavigation<RootStackScreenProps<'SignUp'>['navigation']>();
  const { authStore, signUpStore, snackbarStore } = useStore();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSignUp = async () => {
    try {
      // Last validation
      if (!signUpStore.email) {
        snackbarStore.showSnackbar(t('member.message.email_required'), 'error');
        return;
      }
      if (!signUpStore.username) {
        snackbarStore.showSnackbar(t('member.message.username_required'), 'error');
        return;
      }
      if (!signUpStore.password) {
        snackbarStore.showSnackbar(t('member.message.password_required'), 'error');
        return;
      }
      if (!signUpStore.oauthProvider) {
        snackbarStore.showSnackbar(t('member.message.oauthprovider_required'), 'error');
        return;
      }

      const signUpResult = await signUpStore.signUp({
        email: signUpStore.email,
        username: signUpStore.username,
        password: signUpStore.password,
        oauthProvider: signUpStore.oauthProvider,
      });

      if (!signUpResult?.jwt || !signUpResult?.user) {
        snackbarStore.showSnackbar(t('member.message.signup_response_data_empty'), 'error');
        return;
      }

      // if result exists, set session in sessionStorage.
      await authStore.sessionIn({
        token: signUpResult.jwt,
        oauthProvider: signUpResult.user.oauthProvider,
        email: signUpResult.user.email,
        username: signUpResult.user.username,
        // TODO: add avatarUrl
        avatarUrl: undefined,
      });

      setVisibleDialog(true);
    } catch (e: unknown) {
      if (e instanceof AppError) {
        snackbarStore.showSnackbar(e.message, 'error');
      }
    }
  };

  const onSignUpSuccess = () => {
    setVisibleDialog(false);
    navigation.replace('MainTab');
  };

  useEffect(() => {
    // setup email signup provider
    signUpStore.setOAuthProvider('email');

    return () => {
      snackbarStore.reset();
      signUpStore.reset();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar
        visible={true}
        progress={step / 4}
        color={COLORS.primary}
        style={styles.progressBar}
      />
      <Header rightIcon="close" onRightIconPress={() => navigation.goBack()} />
      <View style={viewStyles.flex_1_padding_20}>
        {step === 1 && (
          <EmailForm
            title={t('common.signUp')}
            setEmail={signUpStore.setEmail}
            onSuccess={handleNextStep}
          />
        )}
        {step === 2 && signUpStore.email && (
          <VerificationForm
            title={t('common.signUp')}
            setVerificationCode={signUpStore.setVerificationCode}
            onSuccess={handleNextStep}
            targetForSendCode={signUpStore.email}
            verificationProvider="email"
            verificationUseType="signup"
          />
        )}
        {step === 3 && (
          <PasswordForm
            title={t('common.signUp')}
            setPassword={signUpStore.setPassword}
            onSuccess={handleNextStep}
          />
        )}
        {step === 4 && (
          <UsernameForm
            title={t('common.signUp')}
            setUsername={signUpStore.setUsername}
            onSuccess={handleSignUp}
          />
        )}
      </View>
      <UIDialog
        title={t('common.welcome')}
        action="ok"
        handleOK={onSignUpSuccess}
        visible={visibleDialog}
        dismissable={false}
      >
        <UIText>{t('common.welcome')}</UIText>
      </UIDialog>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.gray3,
  },
  main: {
    flex: 1,
  },
});

export default EmailSignUp;

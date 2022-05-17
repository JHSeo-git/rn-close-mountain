import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '../../../components/UIText';
import UIDialog from '../../../components/UIDialog';
import CustomButton from '../../../components/CustomButton';
import DismissKeyboard from '../../../components/DismissKeyboard';
import UIScreenTitleView from '../../../components/UIScreenTitleView';
import CustomTextInput, { CustomTextInputRef } from '../../../components/CustomTextInput';
import { useStore } from '../../../contexts/StoreContext';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
import AppError from '../../../utils/error/AppError';
import styles from './EmailSignUp.styles';

type SignUpStep4Props = {
  handleNextStep: () => void;
};

const SignUpStep4 = observer(({ handleNextStep }: SignUpStep4Props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { authStore, signUpStore, snackbarStore } = useStore();

  const usernameRef = useRef<CustomTextInputRef>(null);

  const handleOK = () => {
    setVisible(false);
    handleNextStep();
  };

  const initialValues = {
    username: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, t('member.message.username_min', { min: 4 }))
      .max(32, t('member.message.username_max', { max: 32 }))
      .required(t('member.message.username_required')),
  });

  useEffect(() => {
    return () => {
      snackbarStore.reset();
    };
  }, []);

  return (
    <DismissKeyboard>
      <View style={viewStyles.flex_1_padding_20}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, action) => {
            try {
              if (!values.username) {
                action.setFieldError('username', t('member.message.username_required'));
                return;
              }

              const checkUserResult = await signUpStore.checkUsername({
                username: values.username,
              });

              if (!checkUserResult) {
                action.setFieldError('username', t('member.message.username_exists'));
                return;
              }

              // 성공하면 setup store
              // 그리고 바로 signup 진행
              signUpStore.setUsername(values.username);

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

              // if success then confetti and welcome modal
              setVisible(true);
            } catch (e: unknown) {
              if (e instanceof AppError) {
                snackbarStore.showSnackbar(e.message, 'error');
              }
            }
          }}
        >
          {({
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            values,
            dirty,
            isValid,
          }) => (
            <View style={styles.mainBox}>
              <ScrollView>
                <UIScreenTitleView
                  title={t('common.signUp')}
                  subTitle={t('verification.message.username_input_information')}
                />
                <View style={styles.inputBox}>
                  <CustomTextInput
                    ref={usernameRef}
                    maxLength={32}
                    label={t('member.message.username_placeholder')}
                    placeholder={t('member.message.username_placeholder')}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    error={touched.username && !!errors.username}
                    errorText={touched.username ? errors.username : undefined}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    disabled={signUpStore.loading}
                  />
                </View>
              </ScrollView>
              <View style={styles.footerBox}>
                <View style={styles.buttonBox}>
                  <CustomButton
                    disabled={!dirty || !isValid || signUpStore.loading}
                    loading={signUpStore.loading}
                    labelStyle={{ marginVertical: 15 }}
                    onPress={handleSubmit}
                  >
                    <UIText as="h4_contrast">{t('common.next')}</UIText>
                  </CustomButton>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <UIDialog title={t('common.welcome')} action="ok" handleOK={handleOK} visible={visible}>
        <UIText>{t('common.welcome')}</UIText>
      </UIDialog>
    </DismissKeyboard>
  );
});

export default SignUpStep4;

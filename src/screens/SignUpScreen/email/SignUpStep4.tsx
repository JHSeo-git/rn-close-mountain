import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '../../../components/UIText';
import CustomButton from '../../../components/CustomButton';
import DismissKeyboard from '../../../components/DismissKeyboard';
import UIScreenTitleView from '../../../components/UIScreenTitleView';
import CustomTextInput, { CustomTextInputRef } from '../../../components/CustomTextInput';
import AppError from '../../../utils/error/AppError';
import { useStore } from '../../../contexts/StoreContext';
import styles from './EmailSignUp.styles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';

type SignUpStep4Props = {
  handleNextStep: () => void;
};

const SignUpStep4 = observer(({ handleNextStep }: SignUpStep4Props) => {
  const { t } = useTranslation();
  const { emailSignUpStore, snackbarStore } = useStore();

  const usernameRef = useRef<CustomTextInputRef>(null);

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

              emailSignUpStore.setUsername(values.username);

              await emailSignUpStore.checkUsername({ username: values.username });

              // Last validation
              // if (!emailSignUpStore.email) {
              //   snackbarStore.showSnackbar(t('member.message.email_required'), 'error');
              //   return;
              // }
              // if (!emailSignUpStore.username) {
              //   snackbarStore.showSnackbar(t('member.message.username_required'), 'error');
              //   return;
              // }
              // if (!emailSignUpStore.password) {
              //   return;
              // }

              // const result = await emailSignUpStore.signUp({
              //   email: emailSignUpStore.email,
              //   username: emailSignUpStore.username,
              //   password: emailSignUpStore.password,
              // });

              // if (!result?.jwt || !result?.user) {
              //   // TODO: message
              //   // snackbarStore.showSnackbar(t('member.message.signin_response_data_empty'), 'error');
              //   return;
              // }

              // // if result exists, set session in sessionStorage.
              // // and then, navigate home screen
              // await authStore.sessionIn({
              //   token: result.jwt,
              //   provider: result.user.oauthProvider,
              //   email: result.user.email,
              //   username: result.user.username,
              //   // TODO: add avatarUrl
              //   avatarUrl: undefined,
              // });

              // if success then go next step
              handleNextStep();
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
                    disabled={emailSignUpStore.loading}
                  />
                </View>
              </ScrollView>
              <View style={styles.footerBox}>
                <View style={styles.buttonBox}>
                  <CustomButton
                    disabled={!dirty || !isValid || emailSignUpStore.loading}
                    loading={emailSignUpStore.loading}
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
    </DismissKeyboard>
  );
});

export default SignUpStep4;

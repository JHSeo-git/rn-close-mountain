import { StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput, { CustomTextInputRef } from '../../components/CustomTextInput';
import { SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import * as textStyles from '../../constants/global-styles/textStyles';
import AppError from '../../utils/error/AppError';
import type { MainTabScreenProps } from '../types';

const SignInForm = observer(() => {
  const { t } = useTranslation();
  const navigation = useNavigation<MainTabScreenProps<'Profile'>['navigation']>();
  const { emailSignInStore, snackbarStore, authStore } = useStore();
  const passwordRef = useRef<CustomTextInputRef>(null);

  const initialValues = {
    email: emailSignInStore.email,
    password: emailSignInStore.password,
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('member.message.email_error'))
      .required(t('member.message.email_required')),
    password: yup.string().required(t('member.message.password_required')),
  });

  useEffect(() => {
    return () => {
      emailSignInStore.reset();
      snackbarStore.reset();
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, action) => {
        try {
          if (!values.email) {
            action.setFieldError('email', t('member.message.email_required'));
            return;
          }
          if (!values.password) {
            action.setFieldError('password', t('member.message.password_required'));
            return;
          }

          const result = await emailSignInStore.signIn({
            email: values.email,
            password: values.password,
          });

          if (!result?.jwt || !result?.user) {
            // TODO: 회원가입 안내 창 띄우기
            snackbarStore.showSnackbar(t('member.message.signin_response_data_empty'), 'error');
            return;
          }

          // TODO: confirmed user, blocked user

          // if result exists, set session in sessionStorage.
          // and then, navigate home screen
          await authStore.sessionIn({
            token: result.jwt,
            provider: result.user.oauthProvider,
            email: result.user.email,
            username: result.user.username,
            // TODO: add avatarUrl
            avatarUrl: undefined,
          });
          navigation.navigate('HomeStack');
        } catch (e: unknown) {
          if (e instanceof AppError) {
            snackbarStore.showSnackbar(e.message, 'error');
          }
        }
      }}
    >
      {({ errors, handleSubmit, handleChange, handleBlur, touched, values, dirty, isValid }) => (
        <>
          {/** TODO: move focusing when enter */}
          <CustomTextInput
            label={t('member.message.email_placeholder')}
            placeholder={t('member.message.email_placeholder')}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={touched.email && !!errors.email}
            errorText={touched.email ? errors.email : undefined}
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            disabled={emailSignInStore.loading}
          />
          <CustomTextInput
            ref={passwordRef}
            style={{ marginTop: SPACE.$3 }}
            label={t('member.message.password_placeholder')}
            placeholder={t('member.message.password_placeholder')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={touched.password && !!errors.password}
            errorText={touched.password ? errors.password : undefined}
            textContentType="password"
            returnKeyType="done"
            secureTextEntry={true}
            onSubmitEditing={handleSubmit}
            disabled={emailSignInStore.loading}
          />
          <CustomButton
            style={styles.buttonStyle}
            labelStyle={styles.buttonLabelStyle}
            onPress={handleSubmit}
            disabled={!dirty || !isValid || emailSignInStore.loading}
            loading={emailSignInStore.loading}
          >
            {t('common.signIn')}
          </CustomButton>
        </>
      )}
    </Formik>
  );
});

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: SPACE.$4,
  },
  buttonLabelStyle: {
    ...textStyles.strong,
    ...textStyles.contrast,
    marginVertical: SPACE.$4,
  },
});

export default SignInForm;

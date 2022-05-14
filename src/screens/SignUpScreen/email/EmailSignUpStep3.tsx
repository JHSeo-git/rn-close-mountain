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

type EmailSignUpStep3 = {
  handleNextStep: () => void;
};

const EmailSignUpStep3 = observer(({ handleNextStep }: EmailSignUpStep3) => {
  const { t } = useTranslation();
  const { emailStore, emailSignUpStore, snackbarStore } = useStore();

  const passwordRef = useRef<CustomTextInputRef>(null);

  const initialValues = {
    password: emailSignUpStore.password,
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(t('member.message.password_required'))
      .min(8, t('verification.validate.password_length_error', { min: 8 }))
      .matches(
        /[~`!@#$%^&*()-_=+[\]\\|{};:'",<.>/?]+/,
        t('verification.validate.password_length_error'),
      ),
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
              // if (!values.email) {
              //   action.setFieldError('email', t('member.message.email_required'));
              //   return;
              // }

              // emailSignUpStore.setEmail(values.email);

              // const result = await emailStore.sendEmail({
              //   email: values.email,
              // });

              // if (!result.success) {
              //   snackbarStore.showSnackbar(
              //     t('common.message.failed_msg', { msg: t('verification.send_email') }),
              //     'error',
              //   );
              //   return;
              // }
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
                  subTitle={t('verification.message.password_input_information')}
                />
                <View style={styles.inputBox}>
                  <CustomTextInput
                    ref={passwordRef}
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
                    // disabled={emailSignInStore.loading}
                  />
                </View>
              </ScrollView>
              <View style={styles.footerBox}>
                <View style={styles.buttonBox}>
                  <CustomButton
                    disabled={!dirty || !isValid || emailStore.loading}
                    loading={emailStore.loading}
                    labelStyle={{ marginVertical: 15 }}
                    onPress={handleSubmit}
                  >
                    <UIText as="h4_contrast">{t('verification.send_email')}</UIText>
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

export default EmailSignUpStep3;

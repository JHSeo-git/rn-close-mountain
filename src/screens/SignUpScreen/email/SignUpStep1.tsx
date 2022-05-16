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

type SignUpStep1Props = {
  handleNextStep: () => void;
};

const SignUpStep1 = observer(({ handleNextStep }: SignUpStep1Props) => {
  const { t } = useTranslation();
  const { emailStore, emailSignUpStore, snackbarStore } = useStore();

  const emailRef = useRef<CustomTextInputRef>(null);

  const initialValues = {
    email: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('member.message.email_error'))
      .required(t('member.message.email_required')),
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
              if (!values.email) {
                action.setFieldError('email', t('member.message.email_required'));
                return;
              }

              emailSignUpStore.setEmail(values.email);

              await emailStore.sendEmail({
                email: values.email,
                verifyUseType: 'signup',
                verifyProvider: 'email',
              });
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
                  subTitle={t('verification.message.email_input_information')}
                />
                <View style={styles.inputBox}>
                  <CustomTextInput
                    ref={emailRef}
                    label={t('member.message.email_placeholder')}
                    placeholder={t('member.message.email_placeholder')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={touched.email && !!errors.email}
                    errorText={touched.email ? errors.email : undefined}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    disabled={emailStore.loading}
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

export default SignUpStep1;

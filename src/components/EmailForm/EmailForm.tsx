import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '../UIText';
import CustomButton from '../CustomButton';
import DismissKeyboard from '../DismissKeyboard';
import UIScreenTitleView from '../UIScreenTitleView';
import CustomTextInput, { CustomTextInputRef } from '../CustomTextInput';
import AppError from '../../utils/error/AppError';
import { useStore } from '../../contexts/StoreContext';
import { SPACE } from '../../constants/design-token';

type EmailFormProps = {
  title: string;
  setEmail: (email: string) => void;
  onSuccess: () => void;
};

const EmailForm = observer(({ title, setEmail, onSuccess }: EmailFormProps) => {
  const { t } = useTranslation();
  const { verificationStore, snackbarStore } = useStore();

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

            const result = await verificationStore.sendVerificationCode({
              targetForSendCode: values.email,
              verificationProvider: 'email',
              verificationUseType: 'signup',
            });

            // if success then set up store
            // and onSuccess event call
            if (result) {
              setEmail(values.email);
              onSuccess();
            }
          } catch (e: unknown) {
            if (e instanceof AppError) {
              snackbarStore.showSnackbar(e.message, 'error');
            }
          }
        }}
      >
        {({ errors, handleSubmit, handleChange, handleBlur, touched, values, dirty, isValid }) => (
          <View style={styles.mainBox}>
            <ScrollView>
              <UIScreenTitleView
                title={title}
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
                  disabled={verificationStore.loading}
                />
              </View>
            </ScrollView>
            <View style={styles.footerBox}>
              <View style={styles.buttonBox}>
                <CustomButton
                  disabled={!dirty || !isValid || verificationStore.loading}
                  loading={verificationStore.loading}
                  labelStyle={{ marginVertical: 15 }}
                  onPress={handleSubmit}
                >
                  <UIText as="h4_contrast">{t('common.send')}</UIText>
                </CustomButton>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </DismissKeyboard>
  );
});

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
  },
  inputBox: {
    marginTop: SPACE.$10,
  },
  footerBox: {
    marginTop: SPACE.$8,
  },
  buttonBox: {
    paddingTop: SPACE.$5,
  },
});

export default EmailForm;

import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '../UIText';
import CustomButton from '../CustomButton';
import DismissKeyboard from '../DismissKeyboard';
import UIScreenTitleView from '../UIScreenTitleView';
import CustomTextInput, { CustomTextInputRef } from '../CustomTextInput';
import { useStore } from '../../contexts/StoreContext';
import AppError from '../../utils/error/AppError';
import { SPACE } from '../../constants/design-token';

type UsernameFormProps = {
  title: string;
  setUsername: (username: string) => void;
  onSuccess: () => void;
};

const UsernameForm = ({ title, setUsername, onSuccess }: UsernameFormProps) => {
  const { t } = useTranslation();
  const { verificationStore, snackbarStore } = useStore();

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

            const result = await verificationStore.checkUsername({
              username: values.username,
            });

            if (!result) {
              action.setFieldError('username', t('member.message.username_exists'));
              return;
            }

            // 성공하면 set-up username and onSuccess event call
            setUsername(values.username);
            onSuccess();
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
                  <UIText as="h4_contrast">{t('common.next')}</UIText>
                </CustomButton>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </DismissKeyboard>
  );
};

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

export default UsernameForm;

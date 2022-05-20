import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '..//UIText';
import UIHelperText from '..//UIHelperText';
import CustomButton from '..//CustomButton';
import DismissKeyboard from '..//DismissKeyboard';
import UIScreenTitleView from '..//UIScreenTitleView';
import CustomTextInput, { CustomTextInputRef } from '..//CustomTextInput';
import AppError from '../../utils/error/AppError';
import { useStore } from '../../contexts/StoreContext';
import { SPACE } from '../../constants/design-token';

const speiclaRegex = /[~`!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+/;

type PasswordValidateError = {
  password?: {
    required: boolean;
    min: boolean;
    special: boolean;
  };
  passwordConfirm?: {
    matched: boolean;
  };
};

type PasswordFormProps = {
  title: string;
  setPassword: (password: string) => void;
  onSuccess: () => void;
};

const PasswordForm = observer(({ title, setPassword, onSuccess }: PasswordFormProps) => {
  const { t } = useTranslation();
  const { snackbarStore } = useStore();

  const passwordRef = useRef<CustomTextInputRef>(null);
  const passwordConfirmRef = useRef<CustomTextInputRef>(null);

  const initialValues = {
    password: '',
    passwordConfirm: '',
  };

  // const validationSchema = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required(t('member.message.password_required'))
  //     .min(8, t('verification.validate.password_length_error', { min: 8 }))
  //     .matches(
  //       /[~`!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+/,
  //       t('verification.validate.password_special_error'),
  //     ),
  // });

  const validate = (values: {
    password: string | undefined;
    passwordConfirm: string | undefined;
  }) => {
    let errors: PasswordValidateError = {};

    if (!values.password) {
      errors = {
        password: {
          required: true,
          min: true,
          special: true,
        },
        passwordConfirm: {
          matched: true,
        },
      };
      return errors;
    }

    const min = values.password.length < 8;
    const special = !speiclaRegex.test(values.password);
    const matched = values.password !== values.passwordConfirm;

    if (min || special || matched) {
      errors = {
        password: {
          required: false,
          min,
          special,
        },
        passwordConfirm: {
          matched,
        },
      };
      return errors;
    }

    return {};
  };

  useEffect(() => {
    return () => {
      snackbarStore.reset();
    };
  }, []);

  return (
    <DismissKeyboard>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        validate={validate}
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => {
          try {
            if (!values.password) {
              snackbarStore.showSnackbar(t('member.message.password_required'), 'error');
              return;
            }

            // if success then setup store and onSuccess event call
            setPassword(values.password);
            onSuccess();
          } catch (e: unknown) {
            if (e instanceof AppError) {
              snackbarStore.showSnackbar(e.message, 'error');
            }
          }
        }}
      >
        {({ errors, handleSubmit, handleChange, handleBlur, values, dirty, isValid }) => {
          const validatedErrors = errors as unknown as ReturnType<typeof validate>;
          const isErrorPassword =
            validatedErrors.password &&
            Object.values(validatedErrors.password).some(errored => !!errored);
          const isErrorPasswordConfirm =
            validatedErrors.passwordConfirm &&
            Object.values(validatedErrors.passwordConfirm).some(errored => !!errored);

          return (
            <View style={styles.mainBox}>
              <ScrollView>
                <UIScreenTitleView
                  title={title}
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
                    error={isErrorPassword}
                    textContentType="password"
                    returnKeyType="next"
                    secureTextEntry={true}
                    onSubmitEditing={() => {
                      passwordConfirmRef.current?.focus();
                    }}
                    // disabled={emailSignInStore.loading}
                  />
                  <View style={styles.helperBox}>
                    <UIHelperText touched={dirty} error={validatedErrors.password?.required}>
                      {t('member.message.password_required')}
                    </UIHelperText>
                    <UIHelperText touched={dirty} error={validatedErrors.password?.min}>
                      {t('verification.validate.password_length_error', { min: 8 })}
                    </UIHelperText>
                    <UIHelperText touched={dirty} error={validatedErrors.password?.special}>
                      {t('verification.validate.password_special_error')}
                    </UIHelperText>
                  </View>
                  <CustomTextInput
                    style={{ marginTop: 8 }}
                    ref={passwordConfirmRef}
                    label={t('member.message.password_confirm_placeholder')}
                    placeholder={t('member.message.password_confirm_placeholder')}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    value={values.passwordConfirm}
                    error={isErrorPasswordConfirm}
                    textContentType="password"
                    returnKeyType="done"
                    secureTextEntry={true}
                    onSubmitEditing={handleSubmit}
                  />
                  <View style={styles.helperBox}>
                    <UIHelperText touched={dirty} error={validatedErrors.passwordConfirm?.matched}>
                      {t('verification.validate.password_confirm_error')}
                    </UIHelperText>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.footerBox}>
                <View style={styles.buttonBox}>
                  <CustomButton
                    disabled={!dirty || !isValid}
                    labelStyle={{ marginVertical: 15 }}
                    onPress={handleSubmit}
                  >
                    <UIText as="h4_contrast">{t('common.next')}</UIText>
                  </CustomButton>
                </View>
              </View>
            </View>
          );
        }}
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
  helperBox: {
    marginTop: SPACE.$2,
  },
});

export default PasswordForm;

import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '../../../components/UIText';
import UIHelperText from '../../../components/UIHelperText';
import CustomButton from '../../../components/CustomButton';
import DismissKeyboard from '../../../components/DismissKeyboard';
import UIScreenTitleView from '../../../components/UIScreenTitleView';
import CustomTextInput, { CustomTextInputRef } from '../../../components/CustomTextInput';
import AppError from '../../../utils/error/AppError';
import { useStore } from '../../../contexts/StoreContext';
import styles from './EmailSignUp.styles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';

type PasswordValidateError = {
  password?: {
    required: boolean;
    min: boolean;
    special: boolean;
  };
};

type SignUpStep3 = {
  handleNextStep: () => void;
};

const SignUpStep3 = observer(({ handleNextStep }: SignUpStep3) => {
  const { t } = useTranslation();
  const { emailStore, emailSignUpStore, snackbarStore } = useStore();

  const passwordRef = useRef<CustomTextInputRef>(null);

  const initialValues = {
    password: '',
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

  const validate = (values: { password: string | undefined }) => {
    let errors: PasswordValidateError = {};

    if (!values.password) {
      errors = {
        password: {
          required: true,
          min: true,
          special: true,
        },
      };
      return errors;
    }

    const min = values.password.length < 8;
    const special = !/[~`!@#$%^&*()\-_=+[\]\\|{};:'",<.>/?]+/.test(values.password);

    if (min || special) {
      errors = {
        password: {
          required: false,
          min,
          special,
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
      <View style={viewStyles.flex_1_padding_20}>
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

              emailSignUpStore.setPassword(values.password);

              // if success then go next step
              handleNextStep();
            } catch (e: unknown) {
              if (e instanceof AppError) {
                snackbarStore.showSnackbar(e.message, 'error');
              }
            }
          }}
        >
          {({ errors, handleSubmit, handleChange, handleBlur, values, dirty, isValid }) => {
            const validatedErrors = errors as unknown as ReturnType<typeof validate>;
            const isError =
              validatedErrors.password &&
              Object.values(validatedErrors.password).some(errored => !!errored);

            return (
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
                      error={isError}
                      textContentType="password"
                      returnKeyType="done"
                      secureTextEntry={true}
                      onSubmitEditing={handleSubmit}
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
                  </View>
                </ScrollView>
                <View style={styles.footerBox}>
                  <View style={styles.buttonBox}>
                    <CustomButton
                      disabled={!dirty || !isValid || emailStore.loading}
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
      </View>
    </DismissKeyboard>
  );
});

export default SignUpStep3;

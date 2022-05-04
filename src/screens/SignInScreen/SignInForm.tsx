import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { useStore } from '../../contexts/StoreContext';
import { SPACE } from '../../constants/design-token';
import * as textStyles from '../../constants/global-styles/textStyles';

const SignInForm = observer(() => {
  const { t } = useTranslation();
  const { SignInStore } = useStore();

  const initialValues = {
    email: SignInStore.email,
    password: SignInStore.password,
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('member.message.email_error'))
      .required(t('member.message.email_required')),
    password: yup.string().required(t('member.message.password_required')),
  });

  const onSubmit = () => {};

  useEffect(() => {
    return () => {
      SignInStore.reset();
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
      }) => (
        <>
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
          />
          <CustomTextInput
            style={{ marginTop: SPACE.$2 }}
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
          />
          <CustomButton
            style={styles.buttonStyle}
            labelStyle={styles.buttonLabelStyle}
            onPress={handleSubmit}
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

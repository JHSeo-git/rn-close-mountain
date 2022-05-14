import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import EmailSignUpStep1 from './EmailSignUpStep1';
import EmailSignUpStep2 from './EmailSignUpStep2';
import Header from '../../../components/Header';
import { useStore } from '../../../contexts/StoreContext';
import type { RootStackScreenProps } from '../../types';
import EmailSignUpStep3 from './EmailSignUpStep3';

const EmailSignUp = observer(() => {
  const { emailSignUpStore } = useStore();
  const navigation = useNavigation<RootStackScreenProps<'SignUp'>['navigation']>();
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    return () => {
      emailSignUpStore.reset();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        // title={t('common.signUp')}
        rightIcon="close"
        onRightIconPress={() => navigation.goBack()}
      />
      {step === 1 && <EmailSignUpStep1 handleNextStep={handleNextStep} />}
      {step === 2 && <EmailSignUpStep2 handleNextStep={handleNextStep} />}
      {step === 3 && <EmailSignUpStep3 handleNextStep={handleNextStep} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EmailSignUp;

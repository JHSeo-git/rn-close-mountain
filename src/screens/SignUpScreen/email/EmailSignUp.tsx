import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';
import SignUpStep3 from './SignUpStep3';
import SignUpStep4 from './SignUpStep4';
import Header from '../../../components/Header';
import { useStore } from '../../../contexts/StoreContext';
import type { RootStackScreenProps } from '../../types';

const EmailSignUp = observer(() => {
  const { emailSignUpStore } = useStore();
  const navigation = useNavigation<RootStackScreenProps<'SignUp'>['navigation']>();
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const onBackPress = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
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
        leftIcon="back"
        onLeftIconPress={onBackPress}
        rightIcon="close"
        onRightIconPress={() => navigation.goBack()}
      />
      {step === 1 && <SignUpStep1 handleNextStep={handleNextStep} />}
      {step === 2 && <SignUpStep2 handleNextStep={handleNextStep} />}
      {step === 3 && <SignUpStep3 handleNextStep={handleNextStep} />}
      {step === 4 && <SignUpStep4 handleNextStep={handleNextStep} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EmailSignUp;

import { SafeAreaView } from 'react-native-safe-area-context';
import EmailSignUp from './email/EmailSignUp';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { RootStackScreenProps } from '../types';

type SignUpScreenProps = RootStackScreenProps<'SignUp'>;

const SignUpScreen = ({ route }: SignUpScreenProps) => {
  const provider = route.params?.provider ? route.params.provider : 'email';
  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      {provider === 'email' && <EmailSignUp />}
    </SafeAreaView>
  );
};

export default SignUpScreen;

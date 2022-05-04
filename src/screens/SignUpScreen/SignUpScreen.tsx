import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import * as viewStyles from '../../constants/global-styles/viewStyles';

const SignUpScreen = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.signUp')} />
      <View style={viewStyles.flex_1_padding_20}>
        <UIText>SignUp</UIText>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

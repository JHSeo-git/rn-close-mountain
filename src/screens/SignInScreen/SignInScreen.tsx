import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignInForm from './SignInForm';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import DismissKeyboard from '../../components/DismissKeyboard';
import CustomButton from '../../components/CustomButton';
import { SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { RootStackScreenProps } from '../types';

import LockGIF from '../../assets/images/lock.gif';

type SignInScreenProps = {} & RootStackScreenProps<'SignIn'>;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { t } = useTranslation();

  return (
    <DismissKeyboard>
      <SafeAreaView style={viewStyles.flex_1_bg_white}>
        <Header
          title={t('common.signIn')}
          rightIcon="close"
          onRightIconPress={() => navigation.pop()}
        />
        <View style={viewStyles.flex_1_padding_20}>
          <View style={styles.titleBox}>
            <UIText as="h3">{t('common.signIn')}</UIText>
            <UIText as="content" style={{ marginTop: SPACE.$2 }}>
              {t('common.message.signin_main')}
            </UIText>
            <Image source={LockGIF} style={styles.titleImage} />
          </View>
          <View style={styles.formBox}>
            <SignInForm />
          </View>
          <View style={styles.belowBox}>
            <CustomButton mode="text" onPress={() => {}}>
              {t('member.message.forgot_password')}
            </CustomButton>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  titleBox: {
    marginTop: SPACE.$10,
    alignItems: 'center',
  },
  titleImage: {
    width: 156,
    height: 156,
  },
  formBox: {
    marginTop: SPACE.$2,
  },
  belowBox: {
    marginTop: SPACE.$4,
    alignItems: 'center',
  },
});

export default SignInScreen;

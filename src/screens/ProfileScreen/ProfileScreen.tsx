import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInNavigateButton from './SignInNavigateButton';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import UIBottomSheetModal, {
  UIBottomSheetModalRef,
} from '../../components/UIBottomSheetModal';
import { useStore } from '../../contexts/StoreContext';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import { COLORS, SPACE } from '../../constants/design-token';
import type { MainTabScreenProps } from '../types';

import PersonSvg from '../../assets/icons/person.svg';
import AppError from '../../utils/error/AppError';
import CustomButton from '../../components/CustomButton';

type ProfileScreenProps = MainTabScreenProps<'Profile'>;

const ProfileScreen = observer(({ navigation }: ProfileScreenProps) => {
  const { t } = useTranslation();
  const { googleSignInStore, snackbarStore, authStore } = useStore();
  const bottomSheetRef = useRef<UIBottomSheetModalRef>(null);

  const onGoogleSignIn = async () => {
    try {
      const result = await googleSignInStore.signIn();

      if (!result?.jwt || !result?.user) {
        // TODO: if sign in failed, show sign up information
        // 회원가입 안내 창 띄우기
        snackbarStore.showSnackbar(
          t('member.message.signin_response_data_empty'),
          'error',
        );
        return;
      }

      // TODO: confirmed user, blocked user

      // if result exists, set session in sessionStorage.
      // and then, navigate home screen
      await authStore.sessionIn({ token: result.jwt, provider: 'google' });
      navigation.navigate('HomeStack');
    } catch (e: unknown) {
      if (e instanceof AppError) {
        snackbarStore.showSnackbar(e.message, 'error');
      }
    }
  };

  useEffect(() => {
    return () => {
      googleSignInStore.reset();
    };
  }, []);

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header
        title={t('common.profile')}
        rightIcon="setting"
        onRightIconPress={() => navigation.navigate('Setting')}
      />
      <View style={viewStyles.flex_1_padding_x_20}>
        <View style={styles.avatarBox}>
          <View style={styles.avatar}>
            <PersonSvg width={40} height={40} color={COLORS.gray9} />
          </View>
          <UIText as="h3" style={{ marginTop: SPACE.$4 }}>
            {t('common.login')}
          </UIText>
          <UIText as="small" style={{ marginTop: SPACE.$2 }}>
            {t('common.message.profile_login')}
          </UIText>
        </View>
        <View style={styles.listBox}>
          <View>
            <SignInNavigateButton
              provider="email"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
          <View style={styles.mt}>
            <SignInNavigateButton provider="google" onPress={onGoogleSignIn} />
          </View>
          {Platform.OS === 'ios' && (
            <View style={styles.mt}>
              <SignInNavigateButton provider="apple" onPress={() => {}} />
            </View>
          )}
        </View>
        <View style={styles.bottomBox}>
          <CustomButton
            mode="text"
            onPress={() => bottomSheetRef.current?.present()}
          >
            {t('common.signUp')}
          </CustomButton>
        </View>
      </View>
      <UIBottomSheetModal title={t('common.signUp')} ref={bottomSheetRef}>
        <View style={{ padding: SPACE.$4 }}>
          <View>
            <SignInNavigateButton
              provider="email"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
          <View style={styles.mt}>
            <SignInNavigateButton provider="google" onPress={() => {}} />
          </View>
          {Platform.OS === 'ios' && (
            <View style={styles.mt}>
              <SignInNavigateButton provider="apple" onPress={() => {}} />
            </View>
          )}
        </View>
      </UIBottomSheetModal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  avatarBox: {
    marginTop: SPACE.$8,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gray2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  listBox: {
    marginTop: SPACE.$8,
  },
  bottomBox: {
    marginTop: SPACE.$3,
    alignItems: 'center',
  },
  mt: {
    marginTop: SPACE.$2,
  },
});

export default ProfileScreen;

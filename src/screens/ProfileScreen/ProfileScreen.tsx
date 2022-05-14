import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import CustomButton from '../../components/CustomButton';
import ProviderButton from '../../components/ProviderButton';
import UIBottomSheetModal, { UIBottomSheetModalRef } from '../../components/UIBottomSheetModal';
import AppError from '../../utils/error/AppError';
import { useStore } from '../../contexts/StoreContext';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import { COLORS, SPACE } from '../../constants/design-token';
import type { MainTabScreenProps } from '../types';

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
        snackbarStore.showSnackbar(t('member.message.signin_response_data_empty'), 'error');
        return;
      }

      // TODO: confirmed user, blocked user

      // if result exists, set session in sessionStorage.
      // and then, navigate home screen
      await authStore.sessionIn({
        token: result.jwt,
        email: result.user.email,
        username: result.user.username,
        provider: result.user.oauthProvider,
        // TODO: add avatarUrl
        avatarUrl: undefined,
      });
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
          {authStore.sessionInfo?.avatarUrl ? (
            <Avatar.Image source={{ uri: authStore.sessionInfo?.avatarUrl }} size={120} />
          ) : (
            <Avatar.Icon icon="account" size={120} color={COLORS.gray8} style={styles.avatar} />
          )}
          <UIText as="h3" style={{ marginTop: SPACE.$4 }}>
            {t('common.login')}
          </UIText>
          <UIText as="small" style={{ marginTop: SPACE.$2 }}>
            {t('common.message.profile_login')}
          </UIText>
        </View>
        <View style={styles.listBox}>
          <View>
            <ProviderButton provider="email" onPress={() => navigation.navigate('SignIn')} />
          </View>
          <View style={styles.mt}>
            <ProviderButton provider="google" onPress={onGoogleSignIn} />
          </View>
          {Platform.OS === 'ios' && (
            <View style={styles.mt}>
              <ProviderButton provider="apple" onPress={() => {}} />
            </View>
          )}
        </View>
        <View style={styles.bottomBox}>
          <CustomButton mode="text" onPress={() => bottomSheetRef.current?.present()}>
            {t('common.signUp')}
          </CustomButton>
        </View>
      </View>
      <UIBottomSheetModal title={t('common.signUp')} ref={bottomSheetRef}>
        <View style={{ padding: SPACE.$4 }}>
          <View>
            <ProviderButton
              provider="email"
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate('SignUp');
              }}
            />
          </View>
          <View style={styles.mt}>
            <ProviderButton provider="google" onPress={() => {}} />
          </View>
          {Platform.OS === 'ios' && (
            <View style={styles.mt}>
              <ProviderButton provider="apple" onPress={() => {}} />
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
    backgroundColor: COLORS.gray2,
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

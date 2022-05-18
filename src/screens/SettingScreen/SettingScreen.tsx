import { useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import SettingItem from './SettingItem';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import UIBottomSheetModal, { UIBottomSheetModalRef } from '../../components/UIBottomSheetModal';
import { useStore } from '../../contexts/StoreContext';
import { COLORS, SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import * as textStyles from '../../constants/global-styles/textStyles';
import type { RootStackScreenProps } from '../types';
import CustomTouchableRipple from '../../components/CustomTouchableRipple';
import CustomButton from '../../components/CustomButton';

type SettingScreenProps = RootStackScreenProps<'Setting'>;

const SettingScreen = observer(({ navigation }: SettingScreenProps) => {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<UIBottomSheetModalRef>(null);
  const { appSettingStore, authStore } = useStore();

  const onLogoutPress = async () => {
    // 로그아웃 후 MainTab으로 이동
    const result = await authStore.signOut();
    console.log('logout : ', result ? 'true success' : 'false success');
    navigation.navigate('MainTab');
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={viewStyles.flex_1_bg_white}>
      <Header
        title={t('setting.title')}
        leftIcon="back"
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View>
          <SettingItem
            leftIcon="biometric"
            rightType="toggle"
            toggleState={appSettingStore.isUseBiometric}
            onTogglePress={() => appSettingStore.toggleUseBiometric()}
          >
            <UIText as="h4">
              {Platform.OS === 'android' ? t('setting.touchId') : t('setting.faceId')}
            </UIText>
          </SettingItem>
        </View>
        <View style={styles.mtBorder}>
          <SettingItem
            leftIcon="payment"
            rightType="link"
            linkText="Payment"
            onLinkPress={() => {}}
          >
            <UIText as="h4">{t('setting.payment')}</UIText>
          </SettingItem>
        </View>
        <CustomTouchableRipple style={styles.mt} onPress={() => bottomSheetRef.current?.present()}>
          <SettingItem leftIcon="logout">
            <UIText as="h4">{t('common.logout')}</UIText>
          </SettingItem>
        </CustomTouchableRipple>
      </View>
      <UIBottomSheetModal title={t('common.logout')} ref={bottomSheetRef}>
        <View style={{ paddingTop: SPACE.$4, paddingHorizontal: SPACE.$4 }}>
          <View style={{ alignItems: 'center' }}>
            <UIText as="p" style={{ color: COLORS.primary }}>
              {t('setting.message.logout_message')}
            </UIText>
          </View>
          <View style={{ marginTop: SPACE.$8 }}>
            <CustomButton
              style={styles.logoutButton}
              labelStyle={styles.logoutButtonLabel}
              onPress={onLogoutPress}
            >
              {t('common.logout')}
            </CustomButton>
          </View>
          <View style={{ alignItems: 'center', marginTop: SPACE.$4 }}>
            <CustomButton
              mode="text"
              style={styles.notnowButton}
              labelStyle={styles.notnowButtonLabel}
              onPress={() => bottomSheetRef.current?.close()}
            >
              {t('setting.message.not_now')}
            </CustomButton>
          </View>
        </View>
      </UIBottomSheetModal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  mtBorder: {
    marginTop: 1,
  },
  mt: {
    marginTop: SPACE.$4,
  },
  logoutButton: {
    borderRadius: 9999,
  },
  logoutButtonLabel: {
    marginVertical: SPACE.$3,
    ...textStyles.h4,
    ...textStyles.contrast,
  },
  notnowButton: {},
  notnowButtonLabel: {
    marginVertical: SPACE.$2,
    marginHorizontal: SPACE.$3,
    ...textStyles.strong,
  },
});

export default SettingScreen;

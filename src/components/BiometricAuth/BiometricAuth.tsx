import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { COLORS, SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import { MainTabScreenProps } from '../../screens/types';
import UIBottomSheetModal, { UIBottomSheetModalRef } from '../UIBottomSheetModal';
import UIIcon from '../UIIcon';
import UIText from '../UIText';

// TODO: change to screen navigate
const BiometricAuth = observer(() => {
  const bottomSheetRef = useRef<UIBottomSheetModalRef>(null);
  const { t } = useTranslation();
  const { appSettingStore, biometricStore, authStore } = useStore();
  const navigation = useNavigation<MainTabScreenProps<'Profile'>['navigation']>();

  const title = Platform.OS === 'android' ? t('setting.touchId') : t('setting.faceId');

  useEffect(() => {
    const process = async () => {
      // 로그인 되어 있지 않으면 체크하지 않음
      if (!authStore.isAuthenticated) {
        return;
      }
      // 생체 인증 설정되어 있지 않으면 체크하지 않음
      if (!appSettingStore.isUseBiometric) {
        return;
      }

      const isValidReady = await biometricStore.checkBiometric();
      if (!isValidReady) {
        // 생체 인증 준비가 되어 있지 않으면 체크하지 않고
        // 생체 인증 사용 토글 false
        await appSettingStore.setUseBiometric(false);
        return;
      }

      const result = await biometricStore.authenticate();

      if (!result.success) {
        // 1. 생체인증 사용 토글 false
        // 2. 로그아웃
        bottomSheetRef.current?.present();
        await appSettingStore.setUseBiometric(false);
        await authStore.signOut();
        navigation.navigate('Profile');
      }
    };

    process();
  }, [appSettingStore.isUseBiometric, authStore.isAuthenticated]);

  return (
    <UIBottomSheetModal title={title} ref={bottomSheetRef}>
      <View style={styles.container}>
        <View>
          <UIIcon name="alert-outline" color={COLORS.error} size={100} />
        </View>
        <View style={{ marginTop: SPACE.$4 }}>
          <UIText as="strong" style={{ color: COLORS.error }}>
            {t('biometric.message.authenticate_fail')}
          </UIText>
        </View>
      </View>
    </UIBottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACE.$2,
  },
});

export default BiometricAuth;

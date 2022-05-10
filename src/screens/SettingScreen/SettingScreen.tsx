import { View, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import SettingItem from './SettingItem';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import { useStore } from '../../contexts/StoreContext';
import { COLORS, SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { RootStackScreenProps } from '../types';
import CustomTouchableRipple from '../../components/CustomTouchableRipple';

type SettingScreenProps = RootStackScreenProps<'Setting'>;

const SettingScreen = observer(({ navigation }: SettingScreenProps) => {
  const { t } = useTranslation();
  const { appSettingStore } = useStore();

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={viewStyles.flex_1_bg_white}
    >
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
              {Platform.OS === 'android'
                ? t('setting.touchId')
                : t('setting.faceId')}
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
        <CustomTouchableRipple style={styles.mt} onPress={() => {}}>
          <SettingItem leftIcon="logout">
            <UIText as="h4">{t('common.logout')}</UIText>
          </SettingItem>
        </CustomTouchableRipple>
      </View>
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
});

export default SettingScreen;

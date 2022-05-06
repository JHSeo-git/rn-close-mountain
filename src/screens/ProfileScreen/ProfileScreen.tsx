import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInNavigateButton from './SignInNavigateButton';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import { useStore } from '../../contexts/StoreContext';
import { COLORS, SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { MainTabScreenProps } from '../types';

import PersonSvg from '../../assets/icons/person.svg';

type ProfileScreenProps = MainTabScreenProps<'Profile'>;

const ProfileScreen = observer(({ navigation }: ProfileScreenProps) => {
  const { t } = useTranslation();
  const { googleSignInStore } = useStore();

  const onGoogleSignIn = () => {
    googleSignInStore.signIn();
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
        onRightIconPress={() => {}}
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
          <View style={styles.listItem}>
            <SignInNavigateButton
              provider="email"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
          <View style={Platform.OS === 'ios' && styles.listItem}>
            <SignInNavigateButton provider="google" onPress={onGoogleSignIn} />
          </View>
          {Platform.OS === 'ios' && (
            <View>
              <SignInNavigateButton provider="apple" onPress={() => {}} />
            </View>
          )}
        </View>
      </View>
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
  listItem: {
    marginBottom: SPACE.$2,
  },
});

export default ProfileScreen;

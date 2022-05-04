import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import { COLORS, SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';

import PersonSvg from '../../assets/icons/person.svg';

import type { MainTabScreenProps } from '../types';
import SignInNavigateButton from './SignInNavigateButton';

type ProfileScreenProps = MainTabScreenProps<'Profile'>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { t } = useTranslation();

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
            Login
          </UIText>
          <UIText as="small" style={{ marginTop: SPACE.$2 }}>
            Login for using all features
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
            <SignInNavigateButton provider="google" onPress={() => {}} />
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
};

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

import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import UIText from '../UIText';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import { AllOrNone } from '../../utils/types/type-utils';

import ChevronLeftSvg from '../../assets/icons/chevron-left.svg';
import GearSvg from '../../assets/icons/gear.svg';
import HamburgerMenuSvg from '../../assets/icons/hamburger-menu.svg';
import SearchSvg from '../../assets/icons/search.svg';
import CloseSvg from '../../assets/icons/close.svg';

type DefaultProps = {
  title?: string;
  hasGoback?: boolean;
};

type RightButtonProps = {
  rightIcon: 'gear' | 'hamberger-menu' | 'search' | 'close';
  onRightIconPress: () => void;
};

type HeaderProps = DefaultProps & AllOrNone<RightButtonProps>;

const Header = ({
  title,
  hasGoback = false,
  rightIcon,
  onRightIconPress,
}: HeaderProps) => {
  const navigation = useNavigation();

  const renderRightIcon = () => {
    return (
      <>
        {rightIcon === 'gear' && (
          <GearSvg width={24} height={24} color={COLORS.hiContrast} />
        )}
        {rightIcon === 'hamberger-menu' && (
          <HamburgerMenuSvg width={24} height={24} color={COLORS.hiContrast} />
        )}
        {rightIcon === 'search' && (
          <SearchSvg width={24} height={24} color={COLORS.hiContrast} />
        )}
        {rightIcon === 'close' && (
          <CloseSvg width={24} height={24} color={COLORS.hiContrast} />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        {hasGoback && (
          <Pressable
            style={({ pressed }) => [
              Platform.OS === 'ios' && pressed && { opacity: 0.6 },
            ]}
            onPress={() => navigation.goBack()}
            android_ripple={{ color: COLORS.gray2 }}
          >
            <ChevronLeftSvg width={32} height={32} color={COLORS.hiContrast} />
          </Pressable>
        )}
      </View>
      <View style={styles.centerBox}>
        {title && <UIText as="h2">{title}</UIText>}
      </View>
      <View style={styles.rightBox}>
        {rightIcon && (
          <Pressable
            style={({ pressed }) => [
              Platform.OS === 'ios' && pressed && { opacity: 0.6 },
            ]}
            onPress={onRightIconPress}
            android_ripple={{ color: COLORS.gray2 }}
          >
            {renderRightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.headerHeight,
    paddingHorizontal: SPACE.$5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBox: {},
  centerBox: {
    ...StyleSheet.absoluteFillObject,
    ...viewStyles.center,
    zIndex: -1,
  },
  rightBox: {},
});

export default Header;

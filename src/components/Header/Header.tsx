import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import UIText from '../UIText';
import { IconButton } from 'react-native-paper';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { AllOrNone } from '../../utils/types/type-utils';

import ChevronLeftSvg from '../../assets/icons/chevron-left.svg';
import CustomTouchableRipple from '../CustomTouchableRipple';
import { useCallback } from 'react';

type DefaultProps = {
  style?: StyleProp<ViewStyle>;
  title?: React.ReactNode;
};

type LeftButtonProps = {
  leftIcon: 'back';
  onLeftIconPress: () => void;
};

type RightButtonProps = {
  rightIcon: 'setting' | 'hamberger-menu' | 'search' | 'close';
  onRightIconPress: () => void;
};

type HeaderProps = DefaultProps & AllOrNone<LeftButtonProps> & AllOrNone<RightButtonProps>;

const Header = ({
  style,
  title,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
}: HeaderProps) => {
  const renderLeft = useCallback(() => {
    return (
      <>
        {leftIcon === 'back' && (
          <CustomTouchableRipple
            borderless
            onPress={onLeftIconPress}
            style={{
              borderRadius: 16,
            }}
          >
            <ChevronLeftSvg width={32} height={32} color={COLORS.hiContrast} />
          </CustomTouchableRipple>
        )}
      </>
    );
  }, []);

  const renderRight = useCallback(() => {
    return (
      <>
        {rightIcon === 'setting' && (
          <IconButton icon="cog" size={24} color={COLORS.hiContrast} onPress={onRightIconPress} />
        )}
        {rightIcon === 'hamberger-menu' && (
          <IconButton icon="menu" size={24} color={COLORS.hiContrast} onPress={onRightIconPress} />
        )}
        {rightIcon === 'search' && (
          <IconButton
            icon="magnify"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
          />
        )}
        {rightIcon === 'close' && (
          <IconButton icon="close" size={24} color={COLORS.hiContrast} onPress={onRightIconPress} />
        )}
      </>
    );
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftBox}>{renderLeft()}</View>
      <View style={styles.centerBox}>
        {typeof title === 'string' ? <UIText as="h2">{title}</UIText> : title}
      </View>
      <View style={styles.rightBox}>{renderRight()}</View>
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
  leftBox: {
    ...viewStyles.center,
  },
  centerBox: {
    ...StyleSheet.absoluteFillObject,
    ...viewStyles.center,
    zIndex: -1,
    paddingTop: Platform.OS === 'android' ? SPACE.$2 : 0,
  },
  rightBox: {
    ...viewStyles.center,
  },
});

export default Header;

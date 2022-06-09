import { useCallback } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle, Animated } from 'react-native';
import UIText from '../UIText';
import { IconButton } from 'react-native-paper';
import CustomTouchableRipple from '../CustomTouchableRipple';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import ChevronLeftSvg from '../../assets/icons/chevron-left.svg';
import type { AllOrNone } from '../../utils/types/type-utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type DefaultProps = {
  style?: StyleProp<ViewStyle>;
  animatedStyle?: Animated.AnimatedProps<ViewStyle>;
  title?: React.ReactNode;
  onTitlePress?: () => void;
  transparent?: boolean;
};

type LeftButtonProps = {
  leftIcon: 'back';
  onLeftIconPress: () => void;
};

type RightButtonProps = {
  rightIcon: 'setting' | 'hamberger-menu' | 'search' | 'close' | 'filter' | 'share';
  onRightIconPress: () => void;
};

type HeaderProps = DefaultProps & AllOrNone<LeftButtonProps> & AllOrNone<RightButtonProps>;

const Header = ({
  style,
  animatedStyle,
  title,
  onTitlePress,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  transparent = false,
}: HeaderProps) => {
  const renderLeft = useCallback(() => {
    return (
      <>
        {leftIcon === 'back' && (
          <CustomTouchableRipple
            borderless
            onPress={onLeftIconPress}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            rippleColor={transparent ? COLORS.gray1 : undefined}
          >
            <ChevronLeftSvg width={24} height={24} color={COLORS.hiContrast} />
          </CustomTouchableRipple>
        )}
      </>
    );
  }, [transparent]);

  const renderRight = useCallback(() => {
    return (
      <>
        {rightIcon === 'setting' && (
          <IconButton
            icon="cog"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
            rippleColor={transparent ? COLORS.gray1 : undefined}
            style={{ backgroundColor: COLORS.loContrast }}
          />
        )}
        {rightIcon === 'hamberger-menu' && (
          <IconButton
            icon="menu"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
            rippleColor={transparent ? COLORS.gray1 : undefined}
            style={{ backgroundColor: COLORS.loContrast }}
          />
        )}
        {rightIcon === 'search' && (
          <IconButton
            icon="magnify"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
            rippleColor={transparent ? COLORS.gray1 : undefined}
            style={{ backgroundColor: COLORS.loContrast }}
          />
        )}
        {rightIcon === 'close' && (
          <IconButton
            icon="close"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
            rippleColor={transparent ? COLORS.gray1 : undefined}
            style={{ backgroundColor: COLORS.loContrast }}
          />
        )}
        {rightIcon === 'filter' && (
          <IconButton
            icon="filter-variant"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
            rippleColor={transparent ? COLORS.gray1 : undefined}
            style={{ backgroundColor: COLORS.loContrast }}
          />
        )}
        {rightIcon === 'share' && (
          <IconButton
            icon="share-variant-outline"
            size={24}
            color={COLORS.hiContrast}
            onPress={onRightIconPress}
            rippleColor={transparent ? COLORS.gray1 : undefined}
            style={{ backgroundColor: COLORS.loContrast }}
          />
        )}
      </>
    );
  }, [transparent]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftBox}>{renderLeft()}</View>
      <Animated.View style={[styles.centerBox, animatedStyle]}>
        <TouchableWithoutFeedback onPress={onTitlePress}>
          {typeof title === 'string' ? <UIText as="h2">{title}</UIText> : title}
        </TouchableWithoutFeedback>
      </Animated.View>
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
    zIndex: 1,
    opacity: 1,
  },
  centerBox: {
    ...StyleSheet.absoluteFillObject,
    ...viewStyles.center,
    zIndex: 0,
    paddingTop: Platform.OS === 'android' ? SPACE.$2 : 0,
    backgroundColor: COLORS.loContrast,
  },
  rightBox: {
    ...viewStyles.center,
    zIndex: 1,
  },
});

export default Header;

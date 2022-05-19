import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import UIIcon from '../../components/UIIcon';
import type { AllOrNone } from '../../utils/types/type-utils';

import FaceIdSvg from '../../assets/icons/face-id.svg';
import { Switch } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import UIText from '../../components/UIText';

type LeftIcon = 'biometric' | 'payment' | 'logout';

type LeftSide = {
  leftIcon?: LeftIcon;
};
type CenterSide = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
type RightSide =
  | {
      rightType: 'toggle';
      toggleState: boolean;
      onTogglePress: () => void;
      linkText?: never;
      onLinkPress?: never;
    }
  | {
      rightType: 'link';
      toggleState?: never;
      onTogglePress?: never;
      linkText: string;
      onLinkPress: () => void;
    }
  | {
      rightType?: never;
      toggleState?: never;
      onTogglePress?: never;
      linkText?: never;
      onLinkPress?: never;
    }
  | undefined;

type BottomAddon = {
  addonComponent: React.ReactNode;
};

type SettingItemProps = LeftSide & CenterSide & RightSide & AllOrNone<BottomAddon>;

const SettingItem = ({
  leftIcon,
  rightType,
  toggleState,
  onTogglePress,
  linkText,
  onLinkPress,
  style,
  children,
  addonComponent,
}: SettingItemProps) => {
  const renderLeft = () => {
    if (!leftIcon) {
      return null;
    }
    return (
      <View style={styles.left}>
        {leftIcon === 'biometric' && Platform.OS === 'android' && (
          <UIIcon name="fingerprint" size={24} color={COLORS.text.secondary} />
        )}
        {leftIcon === 'biometric' && Platform.OS === 'ios' && (
          <FaceIdSvg width={24} height={24} color={COLORS.text.secondary} />
        )}
        {leftIcon === 'payment' && (
          <UIIcon name="credit-card-outline" size={24} color={COLORS.text.secondary} />
        )}
        {leftIcon === 'logout' && <UIIcon name="logout" size={24} color={COLORS.text.secondary} />}
      </View>
    );
  };

  const renderRight = () => {
    if (!rightType) {
      return null;
    }

    return (
      <View style={styles.right}>
        {rightType === 'toggle' && <Switch value={toggleState} onValueChange={onTogglePress} />}
        {rightType === 'link' && (
          <CustomButton
            labelStyle={{
              marginHorizontal: SPACE.$2,
              marginVertical: SPACE.$1,
            }}
            mode="text"
            onPress={onLinkPress}
          >
            <UIText as="small_bold_primary">{linkText}</UIText>
          </CustomButton>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.box, style]}>
      <View style={styles.firstRow}>
        {renderLeft()}
        <View style={styles.center}>{children}</View>
        {renderRight()}
      </View>
      {addonComponent && <View style={styles.secondRow}>{addonComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACE.$5,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: SIZES.$14,
  },
  secondRow: {
    minHeight: SIZES.$10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  left: {
    minWidth: SIZES.$8,
    marginRight: SPACE.$2,
  },
  center: {
    flex: 1,
  },
  right: {
    marginLeft: SPACE.$2,
  },
});

export default SettingItem;

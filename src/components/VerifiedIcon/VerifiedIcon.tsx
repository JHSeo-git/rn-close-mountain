import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import VerifiedSvg from '../../assets/icons/verified-icon.svg';
import type { SvgProps } from 'react-native-svg';
import { COLORS } from '../../constants/design-token';

type VerifiedIconProps = {
  visible?: boolean;
  size?: number;
  boxStyle?: StyleProp<ViewStyle>;
} & SvgProps;

const VerifiedIcon = ({ visible, size = 20, boxStyle, style, ...props }: VerifiedIconProps) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.verifiedIconBox, boxStyle]}>
      <VerifiedSvg
        {...props}
        width={size}
        height={size}
        style={[styles.verifiedIcon, style]}
        color={COLORS.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verifiedIconBox: {
    backgroundColor: COLORS.loContrast,
    padding: 1,

    borderRadius: 9999,

    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedIcon: {},
});

export default VerifiedIcon;

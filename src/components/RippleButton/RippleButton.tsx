import { Pressable, Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/design-token';

type RippleButtonProps = {} & React.ComponentProps<typeof Pressable>;

const RippleButton = ({ style, ...props }: RippleButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        Platform.OS === 'ios' && pressed && styles.pressed,
        style ?? styles.empty,
      ]}
      android_ripple={{ color: COLORS.gray2 }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  empty: {},
  pressed: {
    opacity: 0.6,
  },
});

export default RippleButton;

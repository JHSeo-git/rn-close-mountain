import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';
import { styles } from './SampleButton.styles';

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  style?: StyleProp<ViewStyle>;
};

const Button = ({ children, style, ...props }: ButtonProps) => {
  return (
    <Animated.View style={styles.box}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.buttonRound,
          pressed && styles.buttonPressed,
          style,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default Button;

import { Animated, StyleSheet } from 'react-native';
import * as textStyles from '../../constants/global-styles/textStyles';

type UIAnimatedTextProps = {
  as?: keyof typeof textStyles;
} & React.ComponentProps<typeof Animated.Text>;

const UIAnimatedText = ({ as = 'content', style, ...props }: UIAnimatedTextProps) => {
  return (
    <Animated.Text
      style={StyleSheet.compose(
        [
          //
          styles.default,
          textStyles[as],
        ],
        style,
      )}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  default: {},
});

export default UIAnimatedText;

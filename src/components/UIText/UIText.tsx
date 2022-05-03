import { StyleSheet, Text } from 'react-native';
import * as textStyles from '../../constants/global-styles/textStyles';

type UITextProps = {
  as?: keyof typeof textStyles;
} & React.ComponentProps<typeof Text>;

const UIText = ({ as = 'content', style, ...props }: UITextProps) => {
  return (
    <Text
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

export default UIText;

import MaskedView from '@react-native-masked-view/masked-view';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants/design-token';
import UIText from '../UIText';

type UIGradientTextProps = {
  angle?: number;
  colors?: string[];
} & React.ComponentProps<typeof UIText>;

const UIGradientText = ({
  angle,
  colors = [COLORS.amber9, COLORS.cyan9],
  style,
  ...props
}: UIGradientTextProps) => {
  return (
    <MaskedView maskElement={<UIText style={[styles.text, style]} {...props} />}>
      <LinearGradient angle={angle} useAngle={!!angle} colors={colors}>
        <UIText style={[styles.text, style, { opacity: 0 }]} {...props} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {},
});

export default UIGradientText;

import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SPACE } from '../../constants/design-token';
import UIText from '../UIText';

type SectionViewProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  titleViewStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const SectionView = ({ style, title, titleViewStyle, children }: SectionViewProps) => {
  return (
    <View style={[styles.conatiner, style]}>
      <View style={[styles.header, titleViewStyle]}>
        <UIText as="h3" style={{ textAlign: 'center' }}>
          {title}
        </UIText>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    paddingVertical: SPACE.$8,
    backgroundColor: COLORS.loContrast,
  },
  header: {
    marginBottom: SPACE.$5,
  },
});

export default SectionView;

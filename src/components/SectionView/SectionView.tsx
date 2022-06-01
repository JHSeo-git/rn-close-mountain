import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SPACE } from '../../constants/design-token';
import UIText from '../UIText';

type SectionViewProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleViewStyle?: StyleProp<ViewStyle>;
  titleTextAlign?: 'left' | 'center' | 'right';
  children: React.ReactNode;
};

const SectionView = ({
  style,
  title,
  titleViewStyle,
  titleTextAlign = 'left',
  children,
}: SectionViewProps) => {
  return (
    <View style={[styles.conatiner, style]}>
      {title && (
        <View style={[styles.header, titleViewStyle]}>
          <UIText as="h3" style={{ textAlign: titleTextAlign }}>
            {title}
          </UIText>
        </View>
      )}
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
    paddingHorizontal: SPACE.$5,
  },
});

export default SectionView;

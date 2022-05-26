import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SPACE } from '../../constants/design-token';
import UIText from '../UIText';

type SectionViewProps = {
  title: string;
  titleViewStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const SectionView = ({ title, titleViewStyle, children }: SectionViewProps) => {
  return (
    <View>
      <View style={[styles.header, titleViewStyle]}>
        <UIText as="h3">{title}</UIText>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACE.$2,
  },
});

export default SectionView;

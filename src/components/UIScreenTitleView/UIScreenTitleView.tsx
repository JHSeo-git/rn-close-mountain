import { View, StyleSheet } from 'react-native';
import { SPACE } from '../../constants/design-token';
import UIText from '../UIText';

type UIScreenTitleViewProps = {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
};

const UIScreenTitleView = ({ title, subTitle, children }: UIScreenTitleViewProps) => {
  return (
    <View style={styles.titleBox}>
      <UIText as="h1" style={styles.textStyle}>
        {title}
      </UIText>
      <UIText as="content" style={[styles.textStyle, styles.mt]}>
        {subTitle}
      </UIText>
      {children && <View style={[styles.mt, styles.childBox]}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  titleBox: {},
  textStyle: {
    textAlign: 'center',
  },
  mt: {
    marginTop: SPACE.$2,
  },
  childBox: {
    alignItems: 'center',
  },
});

export default UIScreenTitleView;

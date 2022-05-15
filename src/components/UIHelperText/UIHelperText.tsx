import { StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import UIIcon from '../UIIcon';
import { COLORS, SPACE } from '../../constants/design-token';

type UIHelperTextProps = {
  children: React.ReactNode;
  touched?: boolean;
  error?: boolean;
};

const UIHelperText = ({ children, touched, error }: UIHelperTextProps) => {
  const color = (() => {
    if (!touched) {
      return COLORS.gray11;
    }
    return error ? COLORS.error : COLORS.success;
  })();

  return (
    <View style={styles.container}>
      <UIIcon name="check" color={color} />
      <HelperText type={error ? 'error' : 'info'} style={[styles.helperText, { color }]}>
        {children}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SPACE.$2,
  },
  helperText: {
    paddingLeft: SPACE.$1,
  },
});

export default UIHelperText;

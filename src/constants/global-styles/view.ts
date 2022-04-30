import { StyleSheet } from 'react-native';
import { COLORS } from '../design-token';

export const viewStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_1_bg_white: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

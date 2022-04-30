import { StyleSheet } from 'react-native';
import { COLORS, SPACE } from '../design-token';

export const viewStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex_1_bg_white: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex_1_padding_x_20: {
    flex: 1,
    paddingHorizontal: SPACE.$5,
  },
  flex_1_padding_20: {
    flex: 1,
    padding: SPACE.$5,
  },
});

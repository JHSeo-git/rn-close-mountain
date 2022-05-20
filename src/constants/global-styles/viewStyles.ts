import { COLORS, SPACE } from '../design-token';
import type { ViewStyle } from 'react-native';

export const center: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const flex_1_bg_white: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.white,
};

export const flex_1_bg_gray2: ViewStyle = {
  flex: 1,
  backgroundColor: COLORS.gray2,
};

export const flex_1_padding_x_20: ViewStyle = {
  flex: 1,
  paddingHorizontal: SPACE.$5,
};

export const flex_1_padding_y_20: ViewStyle = {
  flex: 1,
  paddingVertical: SPACE.$5,
};

export const flex_1_padding_20: ViewStyle = {
  flex: 1,
  padding: SPACE.$5,
};

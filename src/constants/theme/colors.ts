import * as colors from '@radix-ui/colors';

export const COLORS = {
  ...colors.gray,
  ...colors.red,
  ...colors.crimson,
  ...colors.blue,
  ...colors.cyan,
  ...colors.teal,
  ...colors.green,
  ...colors.amber,

  // semantic
  primary: colors.blue.blue10,
  secondary: colors.cyan.cyan10,
  tertiary: colors.teal.teal10,

  success: colors.green.green10,
  warning: colors.amber.amber10,
  danger: colors.crimson.crimson10,

  hiContrast: colors.gray.gray11,
  loContrast: '#fff',

  white: '#fff',
  shadow: colors.gray.gray10,
};

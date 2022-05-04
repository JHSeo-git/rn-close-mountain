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

  disabled: colors.gray.gray8,
  success: colors.green.green10,
  warning: colors.amber.amber10,
  error: colors.crimson.crimson10,

  hiContrast: colors.gray.gray12,
  loContrast: '#fff',
  transparent: 'transparent',

  white: '#fff',
  shadow: colors.gray.gray10,
} as const;

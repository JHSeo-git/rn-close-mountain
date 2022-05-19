/**
 * @see https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale
 */
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

  ...colors.grayA,

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

  borderColor: colors.gray.gray7,

  text: {
    primary: colors.gray.gray12,
    secondary: colors.gray.gray11,
    thirdary: colors.gray.gray10,
  },

  white: '#fff',
  shadow: colors.grayA.grayA10,
} as const;

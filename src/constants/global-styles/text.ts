import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTSIZES } from '../design-token';

export const text = StyleSheet.create({
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES['4xl'],
    color: COLORS.loContrast,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES['2xl'],
    color: COLORS.loContrast,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES.xl,
    color: COLORS.loContrast,
  },
  h4: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES.base,
    color: COLORS.loContrast,
  },
  content: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES.base,
    color: COLORS.loContrast,
  },
  p: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES.base,
    color: COLORS.loContrast,
  },
  em: {
    fontFamily: FONTS.regularItalic,
    fontSize: FONTSIZES.base,
    color: COLORS.loContrast,
  },
  strong: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES.sm,
    color: COLORS.loContrast,
  },
  small: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES.sm,
    color: COLORS.loContrast,
  },
});

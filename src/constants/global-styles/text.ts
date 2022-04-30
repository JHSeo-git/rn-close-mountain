import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONTSIZES } from '../design-token';

export const textStyles = StyleSheet.create({
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES['4xl'],
    color: COLORS.hiContrast,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES['2xl'],
    color: COLORS.hiContrast,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES.xl,
    color: COLORS.hiContrast,
  },
  h4: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES.base,
    color: COLORS.hiContrast,
  },
  content: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES.base,
    color: COLORS.hiContrast,
  },
  p: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES.base,
    color: COLORS.hiContrast,
  },
  em: {
    fontFamily: FONTS.regularItalic,
    fontSize: FONTSIZES.base,
    color: COLORS.hiContrast,
  },
  strong: {
    fontFamily: FONTS.bold,
    fontSize: FONTSIZES.base,
    color: COLORS.hiContrast,
  },
  small: {
    fontFamily: FONTS.regular,
    fontSize: FONTSIZES.sm,
    color: COLORS.hiContrast,
  },
});

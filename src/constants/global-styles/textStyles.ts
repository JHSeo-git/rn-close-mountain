import { COLORS, FONTS, FONTSIZES } from '../design-token';
import type { TextStyle } from 'react-native';

export const h1: TextStyle = {
  fontFamily: FONTS.poppins.bold,
  fontSize: FONTSIZES['4xl'],
  color: COLORS.hiContrast,
};

export const h2: TextStyle = {
  fontFamily: FONTS.poppins.bold,
  fontSize: FONTSIZES['2xl'],
  color: COLORS.hiContrast,
};

export const h3: TextStyle = {
  fontFamily: FONTS.poppins.bold,
  fontSize: FONTSIZES.xl,
  color: COLORS.hiContrast,
};

export const h4: TextStyle = {
  fontFamily: FONTS.poppins.bold,
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const content: TextStyle = {
  fontFamily: FONTS.poppins.regular,
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const p: TextStyle = {
  fontFamily: FONTS.poppins.regular,
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const em: TextStyle = {
  fontFamily: FONTS.poppins.regular,
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const strong: TextStyle = {
  fontFamily: FONTS.poppins.bold,
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const small: TextStyle = {
  fontFamily: FONTS.poppins.regular,
  fontSize: FONTSIZES.sm,
  color: COLORS.hiContrast,
};

export const primary: TextStyle = {
  color: COLORS.primary,
};

export const contrast: TextStyle = {
  color: COLORS.loContrast,
};

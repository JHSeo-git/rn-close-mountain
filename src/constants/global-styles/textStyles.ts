import { COLORS, FONTS, FONTSIZES } from '../design-token';
import type { TextStyle } from 'react-native';

export const primary: TextStyle = {
  color: COLORS.primary,
};
export const contrast: TextStyle = {
  color: COLORS.loContrast,
};
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
export const h1_primary: TextStyle = {
  ...h1,
  ...primary,
};
export const h1_contrast: TextStyle = {
  ...h1,
  ...contrast,
};
export const h2_primary: TextStyle = {
  ...h2,
  ...primary,
};
export const h2_contrast: TextStyle = {
  ...h2,
  ...contrast,
};
export const h3_primary: TextStyle = {
  ...h3,
  ...primary,
};
export const h3_contrast: TextStyle = {
  ...h3,
  ...contrast,
};
export const h4_primary: TextStyle = {
  ...h4,
  ...primary,
};
export const h4_contrast: TextStyle = {
  ...h4,
  ...contrast,
};
export const content_primary: TextStyle = {
  ...content,
  ...primary,
};
export const content_contrast: TextStyle = {
  ...content,
  ...contrast,
};
export const p_primary: TextStyle = {
  ...p,
  ...primary,
};
export const p_contrast: TextStyle = {
  ...p,
  ...contrast,
};
export const strong_primary: TextStyle = {
  ...strong,
  ...primary,
};
export const strong_contrast: TextStyle = {
  ...strong,
  ...contrast,
};
export const small_primary: TextStyle = {
  ...small,
  ...primary,
};
export const small_contrast: TextStyle = {
  ...small,
  ...contrast,
};
export const small_bold: TextStyle = {
  ...small,
  fontFamily: FONTS.poppins.bold,
};
export const small_bold_primary: TextStyle = {
  ...small_bold,
  ...primary,
};

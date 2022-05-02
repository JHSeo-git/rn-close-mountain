import { COLORS, FONTSIZES } from '../design-token';
import type { TextStyle } from 'react-native';

export const h1: TextStyle = {
  fontSize: FONTSIZES['4xl'],
  color: COLORS.hiContrast,
};

export const h2: TextStyle = {
  fontSize: FONTSIZES['2xl'],
  color: COLORS.hiContrast,
};

export const h3: TextStyle = {
  fontSize: FONTSIZES.xl,
  color: COLORS.hiContrast,
};

export const h4: TextStyle = {
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const content: TextStyle = {
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const p: TextStyle = {
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const em: TextStyle = {
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const strong: TextStyle = {
  fontSize: FONTSIZES.base,
  color: COLORS.hiContrast,
};

export const small: TextStyle = {
  fontSize: FONTSIZES.sm,
  color: COLORS.hiContrast,
};

export const primary: TextStyle = {
  color: COLORS.primary,
};

export const contrast: TextStyle = {
  color: COLORS.loContrast,
};

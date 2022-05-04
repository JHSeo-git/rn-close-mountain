import { DefaultTheme } from 'react-native-paper';
import { COLORS, FONTS } from '../design-token';

const theme: typeof DefaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.loContrast,
    // surface: '',
    // accent: '',
    error: COLORS.error,
    text: COLORS.hiContrast,
    // onSurface: '',
    disabled: COLORS.disabled,
    placeholder: COLORS.gray11,
    backdrop: COLORS.shadow,
    // notification: '',
  },
  fonts: {
    medium: {
      fontFamily: FONTS.poppins.medium,
    },
    regular: {
      fontFamily: FONTS.poppins.regular,
    },
    light: {
      fontFamily: FONTS.poppins.light,
    },
    thin: {
      fontFamily: FONTS.poppins.thin,
    },
  },
};

export default theme;

// export declare type Theme = {
//   dark: boolean;
//   mode?: Mode;
//   roundness: number;
//   colors: {
//       primary: string;
//       background: string;
//       surface: string;
//       accent: string;
//       error: string;
//       text: string;
//       onSurface: string;
//       disabled: string;
//       placeholder: string;
//       backdrop: string;
//       notification: string;
//   };
//   fonts: Fonts;
//   animation: {
//       scale: number;
//   };
// };

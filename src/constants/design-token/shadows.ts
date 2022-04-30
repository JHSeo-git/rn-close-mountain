import { Platform, ViewStyle } from 'react-native';
import { COLORS } from './colors';

export const SHADOWS = {
  light: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

    overflow: Platform.select({ android: 'hidden' }) as ViewStyle['overflow'],
  },
  base: {
    // iOS 전용 그림자 설정
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 안드로이드 전용 그림자 설정
    elevation: 5,
    // 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
    // iOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
    overflow: Platform.select({ android: 'hidden' }) as ViewStyle['overflow'],
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

    overflow: Platform.select({ android: 'hidden' }) as ViewStyle['overflow'],
  },
  dark: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,

    overflow: Platform.select({ android: 'hidden' }) as ViewStyle['overflow'],
  },
};

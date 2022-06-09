import { Dimensions } from 'react-native';
import { COLORS } from '../constants/design-token';

const { width } = Dimensions.get('window');

export const viewportWidth = width;
export function widthByPercent(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export type SkeletonItem = {
  id: number;
};
export const generateSkeletonList = (length = 3): SkeletonItem[] =>
  Array.from({ length }).map((_, index) => ({ id: index }));

const randomColors = [
  COLORS.blue5,
  COLORS.amber5,
  COLORS.green5,
  COLORS.red5,
  COLORS.crimson5,
  COLORS.cyan5,
  COLORS.gray5,
];

export const getRandomColor = () => randomColors[Math.floor(Math.random() * randomColors.length)];

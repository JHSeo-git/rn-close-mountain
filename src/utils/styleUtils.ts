import { Dimensions } from 'react-native';

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

import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const viewportWidth = width;
export function widthByPercent(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

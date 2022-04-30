import { StyleSheet } from 'react-native';
import { COLORS, RADII, SHADOWS } from '../../../constants/design-token';

export const buttonStyles = StyleSheet.create({});

export const styles = StyleSheet.create({
  box: {
    ...SHADOWS.base,
    borderRadius: RADII.xl,
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSmooth: {
    borderRadius: RADII.xl,
  },
  buttonRound: {
    borderRadius: RADII.pill,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

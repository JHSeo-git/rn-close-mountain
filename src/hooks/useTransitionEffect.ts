import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type UseTransitionEffectProps = {
  toggleState: boolean;
  fromValue?: number;
  toValue?: number;
  duration?: number;
};

export default function useTransitionEffect({
  toggleState,
  fromValue = 0,
  toValue = 1,
  duration = 500,
}: UseTransitionEffectProps) {
  const transitionValue = useRef(new Animated.Value(fromValue)).current;

  useEffect(() => {
    if (toggleState) {
      Animated.timing(transitionValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transitionValue, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, [toggleState]);

  return transitionValue;
}

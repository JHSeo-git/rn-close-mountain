import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function useSkeleton() {
  const opacity = useRef(new Animated.Value(1)).current;
  const flash = Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
  );

  useEffect(() => {
    flash.start();

    return () => {
      flash.stop();
    };
  }, []);

  return { opacity };
}

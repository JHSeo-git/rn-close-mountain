import { useRef } from 'react';
import { Animated } from 'react-native';

export default function useOnScroll() {
  const y = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: false,
  });

  return {
    y,
    onScroll,
  };
}

import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const opacityScrollEndOffset = 10;

export default function useZoomOnScroll() {
  const [isOpacityScrollEnd, setIsOpacityScrollEnd] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pan.addListener(({ value }) => {
      if (value > opacityScrollEndOffset) {
        setIsOpacityScrollEnd(true);
      } else {
        setIsOpacityScrollEnd(false);
      }
    });
  }, [pan]);

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: pan },
        },
      },
    ],
    {
      useNativeDriver: false,
    },
  );

  const scale = pan.interpolate({
    inputRange: [-3000, 0, 150],
    outputRange: [20, 2, 1],
    extrapolate: 'clamp',
  });

  const translateY = pan.interpolate({
    inputRange: [-1000, 0],
    outputRange: [-100, 0],
    extrapolate: 'clamp',
  });

  const opacity = pan.interpolate({
    inputRange: [0, opacityScrollEndOffset],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return {
    onScroll,
    scale,
    translateY,
    opacity,
    isOpacityScrollEnd,
  };
}

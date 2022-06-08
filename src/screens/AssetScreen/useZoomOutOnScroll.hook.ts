import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const opacityScrollEndOffset = 10;

export default function useZoomOutOnScroll(height: number) {
  const [isOpacityScrollEnd, setIsOpacityScrollEnd] = useState(false);
  const [touchDown, setTouchDown] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pan.addListener(({ value }) => {
      if (value > opacityScrollEndOffset) {
        setIsOpacityScrollEnd(true);
      } else {
        setIsOpacityScrollEnd(false);
      }

      if (value >= height) {
        setTouchDown(true);
      } else {
        setTouchDown(false);
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
    inputRange: [0, height],
    outputRange: [1, 0.25],
    extrapolate: 'clamp',
  });

  const translateY = pan.interpolate({
    inputRange: [0, height],
    outputRange: [0, height / 2],
    extrapolate: 'clamp',
  });

  const opacity = pan.interpolate({
    inputRange: [0, opacityScrollEndOffset],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return {
    onScroll,
    touchDown,
    isOpacityScrollEnd,
    scale,
    opacity,
    translateY,
  };
}

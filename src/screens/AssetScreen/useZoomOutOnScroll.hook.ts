import { useEffect, useState } from 'react';
import useOnScroll from '../../hooks/useOnScroll';

const OPACITY_OFFSET = 10;

export default function useZoomOutOnScroll(height: number) {
  const [transparent, setTransparent] = useState(false);
  const [touchDown, setTouchDown] = useState(false);
  const { y: pan, onScroll } = useOnScroll();

  useEffect(() => {
    pan.addListener(({ value }) => {
      if (value > OPACITY_OFFSET) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }

      if (value >= height) {
        setTouchDown(true);
      } else {
        setTouchDown(false);
      }
    });
    return () => {
      pan.removeAllListeners();
    };
  }, [pan]);

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
    inputRange: [0, OPACITY_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return {
    onScroll,
    touchDown,
    transparent,
    scale,
    opacity,
    translateY,
    pan,
  };
}

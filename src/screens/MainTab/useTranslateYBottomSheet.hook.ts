import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useStore } from '../../contexts/StoreContext';

export default function useTranslateYBottomSheet() {
  const { bottomTabStore } = useStore();
  const originY = 0;
  const translateY = useRef(new Animated.Value(originY)).current;

  useEffect(() => {
    if (bottomTabStore.visible) {
      Animated.timing(translateY, {
        toValue: originY,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [bottomTabStore.visible]);

  return {
    translateY,
  };
}

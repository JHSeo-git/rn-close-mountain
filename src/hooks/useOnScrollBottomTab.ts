import { useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../contexts/StoreContext';

export default function useOnScrollBottomTab() {
  const prevOffset = useRef(0);
  const { bottomTabStore } = useStore();

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    if (currentOffset > prevOffset.current) {
      // down
      bottomTabStore.hide();
    } else {
      // up
      bottomTabStore.show();
    }
    prevOffset.current = currentOffset;
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomTabStore.reset();
      };
    }, []),
  );

  return { onScroll };
}

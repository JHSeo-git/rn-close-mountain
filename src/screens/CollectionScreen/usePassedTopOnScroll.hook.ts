import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UsePassedTopOnScrollOptions = {
  offset?: number;
  useSafeInSets?: boolean;
};

export default function usePassedTopOnScroll(
  ref: React.RefObject<View>,
  options: UsePassedTopOnScrollOptions = {
    offset: 0,
    useSafeInSets: true,
  },
) {
  const [isPassedTop, setIsPassedTop] = useState(false);
  const safeAreaInsets = useSafeAreaInsets();

  const topOffset = useMemo(() => {
    if (options.useSafeInSets) {
      return safeAreaInsets.top + (options.offset ?? 0);
    }
    return 0;
  }, [safeAreaInsets.top, options.offset, options.useSafeInSets]);

  const onScroll = () => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      if (pageY <= topOffset) {
        setIsPassedTop(true);
      } else {
        setIsPassedTop(false);
      }
    });
  };

  return {
    isPassedTop,
    onScroll,
  };
}

/**
 * android issue:
 * @see https://github.com/gorhom/react-native-bottom-sheet/issues/800#issuecomment-1003698288
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type GestureBottomSheetModalProviderProps = {
  children: React.ReactNode;
};

const GestureBottomSheetModalProvider = ({
  children,
}: GestureBottomSheetModalProviderProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default GestureBottomSheetModalProvider;

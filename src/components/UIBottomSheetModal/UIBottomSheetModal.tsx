import { forwardRef, useCallback, useEffect, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import UIText from '../UIText';
import { SPACE } from '../../constants/design-token';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UIBottomSheetModalProps = {
  title: string;
} & Omit<BottomSheetModalProps, 'snapPoints'>;
export type UIBottomSheetModalRef = BottomSheetModal;

const UIBottomSheetModal = forwardRef<UIBottomSheetModalRef, UIBottomSheetModalProps>(
  ({ title, children, enablePanDownToClose = true, ...props }, forwardedRef) => {
    const { dismiss } = useBottomSheetModal();
    const { bottom: safeBottomArea } = useSafeAreaInsets();

    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const contentContainerStyle = useMemo(
      () => ({
        paddingBottom: safeBottomArea || 6,
      }),
      [safeBottomArea],
    );

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...backdropProps}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        {...props}
        ref={forwardedRef}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={enablePanDownToClose}
      >
        <BottomSheetView style={contentContainerStyle} onLayout={handleContentLayout}>
          <View style={styles.titleBox}>
            <UIText as="h3">{title}</UIText>
          </View>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBox: {
    paddingVertical: SPACE.$3,
    paddingHorizontal: SPACE.$4,
  },
});

export default UIBottomSheetModal;

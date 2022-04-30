import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textStyles, viewStyles } from '../../../constants/global-styles';
import Header from '../../../components/Header';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import SampleButton from '../../../components/__sample__/SampleButton';
import { COLORS, SHADOWS, SPACE } from '../../../constants/design-token';

const SampleBottomSheetModal = () => {
  const { t } = useTranslation();
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['35%'], []);

  const handlePresentPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
    setBottomSheetIndex(index);
  }, []);

  // renders
  // pressBehavior: backdrop을 눌렀을 때 어떤 액션을 할지 설정하는 것
  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={viewStyles.flex_1_bg_white}>
        <Header title={t('sample.sample_bottomsheet_modal')} hasGoback />
        <View style={styles.main}>
          <Text style={textStyles.strong}>Sample Bottom Sheet Modal</Text>
          <Text style={textStyles.small}>
            Bottom Sheet Modal Index: {bottomSheetIndex}
          </Text>
          <View style={styles.buttonBox}>
            <SampleButton onPress={handlePresentPress}>
              <Text style={styles.buttonText}>
                {t('sample.sample_present')}
              </Text>
            </SampleButton>
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          detached={true}
          snapPoints={snapPoints}
          bottomInset={SPACE.$10}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          style={styles.bottomSheetModal}
        >
          <View style={styles.modalContainer}>
            <View style={[viewStyles.center, { flex: 1 }]}>
              <Text style={textStyles.h2}>Awesome 🎉</Text>
            </View>
            <View style={styles.closeButtonBox}>
              <SampleButton onPress={handleDismissPress}>
                <Text style={styles.buttonText}>
                  {t('sample.sample_dismiss')}
                </Text>
              </SampleButton>
            </View>
            <View style={styles.closeButtonBox}>
              <SampleButton onPress={handleClosePress}>
                <Text style={styles.buttonText}>
                  {t('sample.sample_close')}
                </Text>
              </SampleButton>
            </View>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  main: {
    ...viewStyles.flex_1_padding_20,
  },
  buttonBox: {
    marginVertical: SPACE.$2,
  },
  buttonText: {
    ...textStyles.strong,
    color: COLORS.white,
  },
  bottomSheetModal: {
    ...SHADOWS.base,
    marginHorizontal: SPACE.$6,
  },
  modalContainer: {
    flex: 1,
  },
  closeButtonBox: {
    marginBottom: SPACE.$4,
    marginHorizontal: SPACE.$6,
  },
});

export default SampleBottomSheetModal;

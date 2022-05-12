import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Header from '../../../components/Header';
import UIText from '../../../components/UIText';
import SampleButton from '../../../components/__sample__/SampleButton';
import * as textStyles from '../../../constants/global-styles/textStyles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
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
        <Header title={t('sample.sample_bottomsheet_modal')} />
        <View style={styles.main}>
          <UIText style={textStyles.strong}>Sample Bottom Sheet Modal</UIText>
          <UIText style={textStyles.small}>Bottom Sheet Modal Index: {bottomSheetIndex}</UIText>
          <View style={styles.buttonBox}>
            <SampleButton onPress={handlePresentPress}>
              <UIText style={styles.buttonText}>{t('sample.sample_present')}</UIText>
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
              <UIText style={textStyles.h2}>Awesome 🎉</UIText>
            </View>
            <View style={styles.closeButtonBox}>
              <SampleButton onPress={handleDismissPress}>
                <UIText style={styles.buttonText}>{t('sample.sample_dismiss')}</UIText>
              </SampleButton>
            </View>
            <View style={styles.closeButtonBox}>
              <SampleButton onPress={handleClosePress}>
                <UIText style={styles.buttonText}>{t('sample.sample_close')}</UIText>
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

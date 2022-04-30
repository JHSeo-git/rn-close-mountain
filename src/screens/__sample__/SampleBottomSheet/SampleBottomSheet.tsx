import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Header from '../../../components/Header';
import SampleButton from '../../../components/__sample__/SampleButton';
import { COLORS, SHADOWS, SPACE } from '../../../constants/design-token';
import { textStyles, viewStyles } from '../../../constants/global-styles';

const SampleBottomSheet = () => {
  const { t } = useTranslation();
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<
    'none' | 'close' | 'collapse'
  >('collapse');

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleTogglePressBehavior = useCallback(() => {
    setBackdropPressBehavior(state => {
      switch (state) {
        case 'none':
          return 'close';
        case 'close':
          return 'collapse';
        case 'collapse':
          return 'none';
      }
    });
  }, []);

  const handleSheetChange = useCallback(index => {
    // console.log('handleSheetChange', index);
    setBottomSheetIndex(index);
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // renders
  // pressBehavior: backdrop을 눌렀을 때 어떤 액션을 할지 설정하는 것
  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
    ),
    [backdropPressBehavior],
  );

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('sample.sample_bottomsheet')} hasGoback />
      <View style={styles.main}>
        <Text style={textStyles.strong}>Sample Bottom Sheet</Text>
        <Text style={textStyles.small}>
          Bottom Sheet Index: {bottomSheetIndex}
        </Text>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleSnapPress(2)}>
            <Text style={styles.buttonText}>
              {t('sample.sample_snap_to', { percent: '90' })}
            </Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleSnapPress(1)}>
            <Text style={styles.buttonText}>
              {t('sample.sample_snap_to', { percent: '50' })}
            </Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleSnapPress(0)}>
            <Text style={styles.buttonText}>
              {t('sample.sample_snap_to', { percent: '25' })}
            </Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleExpandPress()}>
            <Text style={styles.buttonText}>{t('sample.sample_expand')}</Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleCollapsePress()}>
            <Text style={styles.buttonText}>{t('sample.sample_collapse')}</Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleClosePress()}>
            <Text style={styles.buttonText}>{t('sample.sample_close')}</Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => handleTogglePressBehavior()}>
            <Text style={styles.buttonText}>
              {t('sample.sample_backdrop_click_mode')}
              {`: ${backdropPressBehavior}`}
            </Text>
          </SampleButton>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        style={{
          ...SHADOWS.dark,
        }}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.bottomSheet}>
          <Text style={textStyles.h2}>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
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
  bottomSheet: {
    ...viewStyles.flex_1_bg_white,
    ...viewStyles.center,
    backgroundColor: COLORS.gray4,
  },
});

export default SampleBottomSheet;

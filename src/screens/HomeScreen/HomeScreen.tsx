import { useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import { SIZES, SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import type { HomeStackScreenProps } from '../types';
import FeaturedAssetSecion from './sections/FeaturedAssetSecion';
import NotableDropsSection from './sections/NotableDropsSection';

type HomeScreenProps = {} & HomeStackScreenProps<'Home'>;

const HomeScreen = observer(({}: HomeScreenProps) => {
  const { t } = useTranslation();
  const { bottomTabStore, mainHomeStore } = useStore();
  const prevOffset = useRef(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    if (currentOffset > prevOffset.current) {
      // down
      bottomTabStore.hide();
    } else {
      // up
      bottomTabStore.show();
    }
    prevOffset.current = currentOffset;
  };

  useFocusEffect(
    useCallback(() => {
      // 초당 4개(Get의 경우)까지 허용되는 testnets api를 호출하기 위해
      // sequential 호출
      const fetchData = async () => {
        await mainHomeStore.retrieveFeaturedAsset();
        await mainHomeStore.retrieveNotableDrops();
      };

      fetchData();

      return () => {
        bottomTabStore.reset();
      };
    }, []),
  );

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.home')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <FeaturedAssetSecion asset={mainHomeStore.featuredAsset} />
        <NotableDropsSection notableDrops={mainHomeStore.notableDrops} />
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: SIZES.iosBottomTabHeight,
  },
});

export default HomeScreen;

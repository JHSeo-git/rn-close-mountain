import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import FeaturedAssetSecion from './sections/FeaturedAssetSecion';
import NotableDropsSection from './sections/NotableDropsSection';
import { useStore } from '../../contexts/StoreContext';
import useOnScrollBottomTab from '../../hooks/useOnScrollBottomTab';
import { SIZES } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { HomeStackScreenProps } from '../types';

type HomeScreenProps = {} & HomeStackScreenProps<'Home'>;

const HomeScreen = observer(({}: HomeScreenProps) => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const { onScroll } = useOnScrollBottomTab();

  useFocusEffect(
    useCallback(() => {
      // 초당 4개(Get의 경우)까지 허용되는 testnets api를 호출하기 위해
      // sequential 호출
      const fetchData = async () => {
        Promise.all([mainHomeStore.retrieveFeaturedAsset(), mainHomeStore.retrieveNotableDrops()]);
      };

      fetchData();
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
        <FeaturedAssetSecion
          asset={mainHomeStore.featuredAsset}
          loading={mainHomeStore.retrieveFeaturedAssetLoading}
        />
        <NotableDropsSection
          notableDrops={mainHomeStore.notableDrops}
          loading={mainHomeStore.retrieveNotableDropsLoading}
        />
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

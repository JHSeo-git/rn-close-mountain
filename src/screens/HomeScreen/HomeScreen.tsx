import { RefreshControl, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import CategoriesSection from './sections/CategoriesSection';
import MostActiveSection from './sections/MostActiveSection';
import NotableDropsSection from './sections/NotableDropsSection';
import TrendingCollectionsSection from './sections/TrendingCollectionsSection';
import useOnScrollBottomTab from '../../hooks/useOnScrollBottomTab';
import { SIZES } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import ExpiredSoonSection from './sections/ExpiredSoonSection';
import type { HomeStackScreenProps } from '../types';
import { useStore } from '../../contexts/StoreContext';
import { useCallback } from 'react';
import { wait } from '../../utils/commonUtils';

type HomeScreenProps = {} & HomeStackScreenProps<'Home'>;

const HomeScreen = observer(({}: HomeScreenProps) => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const { onScroll } = useOnScrollBottomTab();

  const { pullToRefresh, setPullToRefresh } = mainHomeStore;
  const onRefresh = useCallback(() => {
    setPullToRefresh(true);
    wait(2000).then(() => setPullToRefresh(false));
  }, []);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.home')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={pullToRefresh} onRefresh={onRefresh} />}
      >
        <CategoriesSection />
        <NotableDropsSection />
        <TrendingCollectionsSection />
        <MostActiveSection />
        <ExpiredSoonSection />
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

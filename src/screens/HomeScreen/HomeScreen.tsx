import { StyleSheet } from 'react-native';
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

type HomeScreenProps = {} & HomeStackScreenProps<'Home'>;

const HomeScreen = observer(({}: HomeScreenProps) => {
  const { t } = useTranslation();
  const { onScroll } = useOnScrollBottomTab();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.home')} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={onScroll}
        scrollEventThrottle={16}
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

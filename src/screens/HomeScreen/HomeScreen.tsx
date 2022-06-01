import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import FeaturedAssetSecion from './sections/FeaturedAssetSecion';
import NotableDropsSection from './sections/NotableDropsSection';
import useOnScrollBottomTab from '../../hooks/useOnScrollBottomTab';
import { COLORS, SIZES } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { HomeStackScreenProps } from '../types';
import FooterSection from './sections/FooterSection';
import BrowseByCategorySection from './sections/BrowseByCategorySection';

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
        <FeaturedAssetSecion />
        <NotableDropsSection />
        <BrowseByCategorySection />
        <FooterSection />
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: SIZES.iosBottomTabHeight,
    backgroundColor: COLORS.primary,
  },
});

export default HomeScreen;

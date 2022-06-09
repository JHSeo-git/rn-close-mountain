import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZES } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import { HomeStackScreenProps } from '../types';
import AssetScreenHeader from './AssetScreen.Header';
import AssetScreenMainView from './AssetScreen.MainView';
import AssetScreenTabBar from './AssetScreen.TabBar';
import AssetScreenTabView from './AssetScreen.TabView';
import AssetScreenTabViewDetailsScene from './AssetScreenTabView.DetailsScene';
import AssetScreenTabViewOffersScene from './AssetScreenTabView.OffersScene';
import useZoomOutOnScroll from './useZoomOutOnScroll.hook';

const HERO_IMAGE_HEIGHT = 300;

export type TabRoute = {
  key: 'details' | 'offers' | 'listings' | 'item-activity';
  title: string;
  icon: string;
};

export type TabItemRenderProps = {
  route: TabRoute;
  focused?: boolean;
};
type AssetScreenProps = HomeStackScreenProps<'Asset'>;

const AssetScreen = observer(({ route }: AssetScreenProps) => {
  const { assetContractAddress, tokenId } = route.params;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { assetStore } = useStore();

  useEffect(() => {
    assetStore.retrieveAsset({ asset_contract_address: assetContractAddress, token_id: tokenId });
  }, []);

  /**
   * states
   */
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState<TabRoute[]>([
    {
      key: 'details',
      title: t('common.details'),
      icon: 'format-list-text',
    },
    {
      key: 'offers',
      title: t('common.offers'),
      icon: 'tag-outline',
    },
    {
      key: 'listings',
      title: t('common.listings'),
      icon: 'format-list-bulleted',
    },
    {
      key: 'item-activity',
      title: t('common.item_activity'),
      icon: 'chart-line-variant',
    },
  ]);

  /**
   * custom hooks
   */
  const zoomOut = useZoomOutOnScroll(HERO_IMAGE_HEIGHT);
  const interpolateY = zoomOut.pan.interpolate({
    inputRange: [0, HERO_IMAGE_HEIGHT],
    outputRange: [0, -HERO_IMAGE_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <AssetScreenHeader
        touchDown={zoomOut.touchDown}
        heroImageHeight={HERO_IMAGE_HEIGHT}
        headerAnimatedStyle={{ opacity: zoomOut.opacity }}
        headerTransparent={zoomOut.transparent}
        gradientAnimatedStyle={{ transform: [{ translateY: interpolateY }] }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flexShrink: 0 }}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: SIZES.iosBottomTabHeight + SIZES.headerHeight + insets.top },
        ]}
        onScroll={zoomOut.onScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
      >
        <AssetScreenMainView
          heroImageHeight={HERO_IMAGE_HEIGHT}
          heroImageAnimatedstyle={{
            transform: [{ scale: zoomOut.scale }, { translateY: zoomOut.translateY }],
          }}
        />
        <AssetScreenTabBar routes={routes} setTabIndex={setTabIndex} tabIndex={tabIndex} />
        <AssetScreenTabView tabKey={routes[tabIndex].key} />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.iosBottomTabHeight,
  },
});

export default AssetScreen;

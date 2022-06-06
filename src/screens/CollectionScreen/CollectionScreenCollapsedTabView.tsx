import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  LayoutChangeEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import CollectionMoreArea from './CollectionMoreArea';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import FadeOutGradient from '../../components/FadeOutGradient';
import useZoomOnScroll from './useZoomOnScroll.hook';
import usePassedTopOnScroll from './usePassedTopOnScroll.hook';
import useFlashOpacity from '../../hooks/useFlashOpacity';
import { useStore } from '../../contexts/StoreContext';
import { getChainInfo } from '../../utils/openseaUtils';
import { heuristicNumber } from '../../utils/formatUtils';
import { COLORS, RADII, SIZES, SPACE } from '../../constants/design-token';
import VerifiedIcon from '../../assets/icons/verified-icon.svg';
import type { HomeStackScreenProps } from '../types';
import UIIcon from '../../components/UIIcon';
import CollectionItemsScene from './CollectionItemsScene';
import CollectionActivityScene from './CollectionActivityScene';
import { TabBar, TabView } from 'react-native-tab-view';
import useTransitionEffect from '../../hooks/useTransitionEffect';

const CollectionDashboardItem = ({
  iconUrl,
  label,
  value,
}: {
  iconUrl?: string;
  label: string;
  value: string | number;
}) => {
  return (
    <View style={styles.titleSectionDashboardItem}>
      <View style={styles.flexBox}>
        {iconUrl && (
          <SvgUri uri={iconUrl ?? null} width={15} height={15} style={{ marginRight: SPACE.$1 }} />
        )}
        <UIText as="small_bold" numberOfLines={1} style={styles.titleSectionDashboardItemText}>
          {value}
        </UIText>
      </View>
      <UIText as="xsmall" numberOfLines={1} style={styles.titleSectionDashboardItemLabel}>
        {label}
      </UIText>
    </View>
  );
};

const TabBarTop = {
  tabWidth: 120,
};

type Routes = {
  key: string;
  title: string;
  icon: string;
};

type TabItemRenderProps = {
  route: Routes;
  focused?: boolean;
};

type CollectionScreenCollapsedTabViewProps = {};

const CollectionScreenCollapsedTabView = observer(({}: CollectionScreenCollapsedTabViewProps) => {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();

  const { t } = useTranslation();
  const { collectionStore } = useStore();
  const navigation = useNavigation<HomeStackScreenProps<'Collection'>['navigation']>();

  const { collection, retrieveCollectionLoading: loading } = collectionStore;
  const chainInfo = getChainInfo(collection?.paymentTokens);
  /**
   * states
   */
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState<Routes[]>([
    { key: 'items', title: t('common.items'), icon: 'chart-bar' },
    { key: 'activity', title: t('common.activity'), icon: 'chart-line-variant' },
  ]);
  /**
   * refs
   */
  const logoRef = useRef<View>(null);
  /**
   * custom hooks
   */
  const { opacity: skeletonOpacity } = useFlashOpacity();
  const {
    onScroll: onScrollZoom,
    opacity,
    scale,
    translateY,
    isOpacityScrollEnd,
    pan,
  } = useZoomOnScroll();
  const { onScroll: onScrollPassedTop, isPassedTop } = usePassedTopOnScroll(logoRef);
  const titleImageScale = useTransitionEffect({ toggleState: isPassedTop });
  /**
   * interpolate
   */
  const headerTranslateY = pan.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });
  /**
   * onlayout event
   */
  const headerOnLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);
  const tabBarOnLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setTabBarHeight(height);
  }, []);

  const renderHeaderTitle = useCallback(() => {
    return (
      <Animated.Image
        source={{
          uri: collection?.imageUrl,
        }}
        style={[styles.headerTitleImage, { transform: [{ scale: titleImageScale }] }]}
      />
    );
  }, [isPassedTop]);

  const renderSkeleton = useCallback(() => {
    return (
      <>
        <View style={styles.heroImageBox}>
          <Animated.View
            style={[styles.heroImageForSkeleton, styles.skeleton, { opacity: skeletonOpacity }]}
          />
        </View>
        <View style={styles.titleSection}>
          <View style={styles.titleSectionDim}>
            <View style={styles.titleSectionLogoBox}>
              <Animated.View
                style={[styles.titleSectionLogo, styles.skeleton, { opacity: skeletonOpacity }]}
              />
            </View>
          </View>
          <View style={styles.titleSectionContent}>
            <Animated.View
              style={[
                styles.skeleton,
                { height: SIZES.$10, width: '50%', borderRadius: RADII.lg },
                { opacity: skeletonOpacity },
              ]}
            />
          </View>
        </View>
      </>
    );
  }, []);

  const renderScene = useCallback(
    ({ route }: TabItemRenderProps) => {
      switch (route.key) {
        case 'items':
          return (
            <CollectionItemsScene
              contentContainerStyle={{
                marginTop: headerHeight + tabBarHeight,
                minHeight: layout.height - insets.top + headerHeight,
              }}
              onScroll={e => {
                onScrollZoom(e);
                onScrollPassedTop();
              }}
              scrollEventThrottle={16}
            />
          );
        case 'activity':
          return <CollectionActivityScene />;
        default:
          return null;
      }
    },
    [headerHeight, tabBarHeight],
  );

  const renderLabel = useCallback(({ route, focused }: TabItemRenderProps) => {
    return (
      <UIText as="small_bold" style={{ color: focused ? COLORS.text.primary : COLORS.disabled }}>
        {route.title}
      </UIText>
    );
  }, []);

  const renderIcon = useCallback(({ route, focused }: TabItemRenderProps) => {
    return (
      <UIIcon
        name={route.icon}
        size={18}
        color={focused ? COLORS.text.primary : COLORS.disabled}
        style={{ marginRight: SPACE.$1 }}
      />
    );
  }, []);

  const renderTabBar = useCallback(
    ({ ...props }) => {
      const tabBarY = pan.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [headerHeight, 0],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[styles.tabBarBox, { transform: [{ translateY: tabBarY }] }]}
          onLayout={tabBarOnLayout}
        >
          <TabBar
            {...props}
            renderLabel={renderLabel}
            renderIcon={renderIcon}
            style={[styles.tabBarContainer, { width: TabBarTop.tabWidth * routes.length }]}
            tabStyle={styles.tabBar}
            indicatorStyle={styles.tabBarIndicator}
          />
        </Animated.View>
      );
    },
    [headerHeight],
  );

  useEffect(() => {
    return () => {
      collectionStore.collectionCleanup();
    };
  }, []);

  console.log('rerender');

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <Animated.View style={[styles.headerBox]}>
        <Animated.View style={[styles.headerBoxPad, { height: insets.top }, { opacity }]} />
        <Header
          transparent={!isOpacityScrollEnd}
          title={renderHeaderTitle()}
          leftIcon="back"
          onLeftIconPress={() => navigation.goBack()}
          rightIcon="filter"
          // TODO:
          onRightIconPress={() => {}}
          animatedStyle={{ opacity }}
        />
      </Animated.View>
      <Animated.View
        style={[styles.headerContainer, { transform: [{ translateY: headerTranslateY }] }]}
        onLayout={headerOnLayout}
      >
        <View style={{ flexGrow: 1 }}>
          {loading
            ? renderSkeleton()
            : collection && (
                <>
                  <View style={styles.heroImageBox}>
                    <Animated.Image
                      source={{
                        uri: collection.bannerImageUrl,
                      }}
                      style={[
                        styles.heroImage,
                        {
                          transform: [{ scale }, { translateY }],
                        },
                      ]}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.titleSection}>
                    <FadeOutGradient style={styles.titleSectionDim}>
                      <View ref={logoRef} style={styles.titleSectionLogoBox}>
                        <Image
                          style={styles.titleSectionLogo}
                          source={{
                            uri: collection.imageUrl,
                          }}
                        />
                      </View>
                      <IconButton
                        icon="share-variant-outline"
                        size={24}
                        style={{ margin: 0 }}
                        color={COLORS.text.secondary}
                        // TODO:
                        onPress={() => {}}
                      />
                    </FadeOutGradient>
                    <View style={styles.titleSectionContent}>
                      <View style={styles.titleSectionContentTop}>
                        <UIText as="h3" numberOfLines={1} style={{ flexShrink: 1 }}>
                          {collection.name}
                        </UIText>
                        {collection.safelistRequestStatus === 'verified' && (
                          <VerifiedIcon
                            width={32}
                            height={32}
                            style={{ marginLeft: SPACE.$2 }}
                            color={COLORS.primary}
                          />
                        )}
                      </View>
                      {collection.description && (
                        <CollectionMoreArea text={collection.description} />
                      )}
                    </View>
                    <View style={styles.titleSectionDashboard}>
                      <CollectionDashboardItem
                        label={t('common.items')}
                        value={heuristicNumber(collection.stats.count)}
                      />
                      <CollectionDashboardItem
                        label={t('common.owners')}
                        value={heuristicNumber(collection.stats.numOwners)}
                      />
                      <CollectionDashboardItem
                        iconUrl={chainInfo?.iconUrl}
                        label={t('common.floor_price')}
                        value={heuristicNumber(
                          collection.stats.floorPrice * (chainInfo?.multiplier ?? 1),
                        )}
                      />
                      <CollectionDashboardItem
                        iconUrl={chainInfo?.iconUrl}
                        label={t('common.traded')}
                        value={heuristicNumber(
                          collection.stats.totalSales *
                            collection.stats.averagePrice *
                            (chainInfo?.multiplier ?? 1),
                        )}
                      />
                    </View>
                  </View>
                  {/* {children && <View style={{ flex: 1 }}>{children}</View>} */}
                </>
              )}
        </View>
      </Animated.View>
      <TabView
        style={styles.tabView}
        navigationState={{ index: tabIndex, routes }}
        onIndexChange={setTabIndex}
        initialLayout={{ width: layout.width }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  // header
  headerContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerInnerContainer: {
    position: 'relative',
  },
  headerBox: {
    // backgroundColor: COLORS.loContrast,
    backgroundColor: COLORS.transparent,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerBoxPad: {
    backgroundColor: COLORS.loContrast,
  },
  headerTitleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  heroImageBox: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    height: 150,
  },
  heroImageForSkeleton: {
    height: 200,
  },
  titleSection: {
    marginTop: -175,
  },
  titleSectionDim: {
    paddingTop: 25,
    paddingHorizontal: SPACE.$5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleSectionLogoBox: {},
  titleSectionLogo: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
  titleSectionContent: {
    marginTop: SPACE.$2,
    paddingHorizontal: SPACE.$5,
  },
  titleSectionContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSectionDashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACE.$2,
    paddingHorizontal: SPACE.$2,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  titleSectionDashboardItem: {
    flex: 1,
  },
  titleSectionDashboardItemText: {
    flexShrink: 1,
    textAlign: 'center',
  },
  titleSectionDashboardItemLabel: {
    flexShrink: 1,
    textAlign: 'center',
    color: COLORS.text.secondary,
    marginTop: SPACE.$1,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: COLORS.skeleton,
  },

  // flatlist
  flatList: {
    paddingVertical: SPACE.$1,
    paddingRight: SPACE.$5,
  },
  card: {
    marginLeft: SPACE.$3,
  },
  listLeft: {
    marginLeft: SPACE.$5,
  },

  // tabbar
  tabView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  tabBarBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBarContainer: {
    backgroundColor: COLORS.transparent,
  },
  tabBar: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: TabBarTop.tabWidth,
  },
  tabBarIndicator: {
    backgroundColor: COLORS.primary,
  },
});

export default CollectionScreenCollapsedTabView;

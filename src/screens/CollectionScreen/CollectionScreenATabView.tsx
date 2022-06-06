import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import CollectionItemsScene from './CollectionItemsScene';
import CollectionActivityScene from './CollectionActivityScene';
import UIIcon from '../../components/UIIcon';
import UIText from '../../components/UIText';
import { COLORS, RADII, SIZES, SPACE } from '../../constants/design-token';
import CollectionScreenHeader from './CollectionScreenHeader';
import useZoomOnScroll from './useZoomOnScroll.hook';
import usePassedTopOnScroll from './usePassedTopOnScroll.hook';
import useTransitionEffect from '../../hooks/useTransitionEffect';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../contexts/StoreContext';
import { getChainInfo } from '../../utils/openseaUtils';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../types';
import useFlashOpacity from '../../hooks/useFlashOpacity';
import FadeOutGradient from '../../components/FadeOutGradient';
import { IconButton } from 'react-native-paper';
import VerifiedIcon from '../../assets/icons/verified-icon.svg';
import CollectionMoreArea from './CollectionMoreArea';
import { SvgUri } from 'react-native-svg';
import { heuristicNumber } from '../../utils/formatUtils';

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

type CollectionScreenATabViewProps = {};

const CollectionScreenATabView = observer(({}: CollectionScreenATabViewProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const { collectionStore } = useStore();
  const navigation = useNavigation<HomeStackScreenProps<'Collection'>['navigation']>();

  const { collection, retrieveCollectionLoading: loading } = collectionStore;
  const chainInfo = getChainInfo(collection?.paymentTokens);
  /**
   * stats
   */
  const [headerHeight, setHeaderHeight] = useState(0);
  const [index, setIndex] = useState(0);
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
  const {
    onScroll: onScrollZoom,
    opacity,
    scale,
    translateY,
    isOpacityScrollEnd,
  } = useZoomOnScroll();
  const { onScroll: onScrollPassedTop, isPassedTop } = usePassedTopOnScroll(logoRef);
  const titleImageScale = useTransitionEffect({ toggleState: isPassedTop });
  const { opacity: skeletonOpacity } = useFlashOpacity();

  /**
   * events
   */
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScrollZoom(e);
    onScrollPassedTop();
  };

  const renderScene = useCallback(({ route }: TabItemRenderProps) => {
    switch (route.key) {
      case 'items':
        return (
          <CollectionItemsScene
            contentContainerStyle={{
              // paddingTop: headerHeight + tabBarHeight,
              paddingTop: headerHeight + 50,
            }}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />
        );
      case 'activity':
        return <CollectionActivityScene />;
      default:
        return null;
    }
  }, []);

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

  /**
   * render method
   */
  const renderHeaderTitle = useCallback(() => {
    return (
      <Animated.Image
        source={{
          uri: collection?.imageUrl,
        }}
        style={[
          styles.headerTitleImage,
          {
            transform: [
              {
                scale: titleImageScale,
              },
            ],
          },
        ]}
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

  useEffect(() => {
    return () => {
      collectionStore.collectionCleanup();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container]} onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}>
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
                </>
              )}
        </View>
      </View>
      <TabView
        style={styles.tabView}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => {
          return (
            <View style={styles.tabBarBox}>
              <TabBar
                {...props}
                renderLabel={renderLabel}
                renderIcon={renderIcon}
                style={[styles.tabBarContainer, { width: TabBarTop.tabWidth * routes.length }]}
                tabStyle={styles.tabBar}
                indicatorStyle={styles.tabBarIndicator}
              />
            </View>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    overflow: 'hidden',
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
    // marginTop: -175,
    transform: [{ translateY: -175 }],
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

  tabView: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  tabBarBox: {
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

export default CollectionScreenATabView;

import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import useFlashOpacity from '../../hooks/useFlashOpacity';
import useTransitionEffect from '../../hooks/useTransitionEffect';
import { useStore } from '../../contexts/StoreContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../types';
import { getChainInfo } from '../../utils/openseaUtils';
import { COLORS, RADII, SIZES, SPACE } from '../../constants/design-token';
import useZoomOutOnScroll from './useZoomOutOnScroll.hook';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import LinearGradient from 'react-native-linear-gradient';
import UIIcon from '../../components/UIIcon';
import { numberWithCommas } from '../../utils/formatUtils';
import AssetScreenTabView from './AssetScreenTabView';

const HERO_IMAGE_HEIGHT = 300;
const randomColors = [
  COLORS.blue5,
  COLORS.amber5,
  COLORS.green5,
  COLORS.red5,
  COLORS.crimson5,
  COLORS.cyan5,
  COLORS.gray5,
];

type DashboardItemProps = {
  icon: string;
  value: string;
  label: string;
};
const DashboardItem = ({ icon, value, label }: DashboardItemProps) => {
  return (
    <View style={styles.dashboardBoxItem}>
      <UIIcon name={icon} size={24} color={COLORS.text.secondary} />
      <UIText as="small_bold" style={{ marginTop: SPACE.$2 }}>
        {value}
      </UIText>
      <UIText as="xsmall" style={{ marginTop: SPACE.$1, color: COLORS.text.secondary }}>
        {label}
      </UIText>
    </View>
  );
};

const AssetScreenView = observer(() => {
  const { assetStore } = useStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackScreenProps<'Asset'>['navigation']>();

  const { asset, retrieveAssetLoading: loading } = assetStore;
  const chainInfo = getChainInfo(asset?.lastSale?.paymentToken ?? undefined);

  /**
   * custom hooks
   */
  const { opacity: skeletonOpacity } = useFlashOpacity();
  const {
    //
    onScroll,
    isOpacityScrollEnd,
    scale,
    touchDown,
    opacity,
    translateY,
  } = useZoomOutOnScroll(HERO_IMAGE_HEIGHT);
  const titleImageScale = useTransitionEffect({ toggleState: touchDown });

  const renderHeaderTitle = useCallback(() => {
    return (
      <Animated.Image
        source={{ uri: asset?.imageUrl }}
        style={[styles.headerTitleImage, { transform: [{ scale: titleImageScale }] }]}
      />
    );
  }, [touchDown]);

  const renderSkeleton = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: insets.top + SIZES.headerHeight }}>
          <View style={styles.heroImageBox}>
            <Animated.View
              style={[styles.heroImage, styles.skeleton, { opacity: skeletonOpacity }]}
            />
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerBox]}>
        <Animated.View style={[styles.headerBoxPad, { height: insets.top }, { opacity }]} />
        <Header
          transparent={!isOpacityScrollEnd}
          title={renderHeaderTitle()}
          leftIcon="back"
          onLeftIconPress={() => navigation.goBack()}
          rightIcon="share"
          // TODO:
          onRightIconPress={() => {}}
          animatedStyle={{ opacity }}
        />
      </Animated.View>
      <LinearGradient
        style={[
          styles.gradientBackground,
          { height: SIZES.headerHeight + insets.top + HERO_IMAGE_HEIGHT },
        ]}
        colors={[randomColors[(asset?.id ?? 0) % randomColors.length], COLORS.transparent]}
      />
      <ScrollView
        // showsVerticalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZES.iosBottomTabHeight }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        // stickyHeaderIndices={loading ? [3] : undefined}
      >
        {loading ? (
          renderSkeleton()
        ) : (
          <>
            <View style={{ paddingTop: SIZES.headerHeight + insets.top }}>
              <View style={styles.heroImageBox}>
                <Animated.Image
                  source={{ uri: asset?.imageUrl }}
                  style={[styles.heroImage, { transform: [{ scale }, { translateY }] }]}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={styles.contentBox}>
              <UIText as="h4_primary">{asset?.collection.name}</UIText>
              <UIText as="h4" style={{ marginTop: SPACE.$2 }}>
                {asset?.name}
              </UIText>
            </View>
            <View style={styles.dashboardBox}>
              <DashboardItem
                icon="note-outline"
                value={numberWithCommas(asset?.collection.stats.numReports ?? 0)}
                label={t('common.reports')}
              />
              <DashboardItem
                icon="account-circle-outline"
                value={numberWithCommas(asset?.collection.stats.numOwners ?? 0)}
                label={t('common.owners')}
              />
              <DashboardItem
                icon="note-multiple-outline"
                value={numberWithCommas(asset?.numSales ?? 0)}
                label={t('common.sales')}
              />
            </View>
            <AssetScreenTabView />
          </>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
    borderRadius: RADII.lg,
  },
  heroImageBox: {
    position: 'relative',
    padding: SPACE.$2,
  },
  heroImage: {
    height: HERO_IMAGE_HEIGHT,
    borderRadius: RADII.lg,
  },
  contentBox: {
    marginTop: SPACE.$4,
    paddingHorizontal: SPACE.$5,
  },
  dashboardBox: {
    marginVertical: SPACE.$6,
    paddingHorizontal: SPACE.$4,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardBoxItem: {
    flex: 1,
    alignItems: 'center',
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: COLORS.skeleton,
  },
});

export default AssetScreenView;

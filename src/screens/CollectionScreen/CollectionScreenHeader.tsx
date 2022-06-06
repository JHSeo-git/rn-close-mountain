import { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
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
import useFlashOpacity from '../../hooks/useFlashOpacity';
import { useStore } from '../../contexts/StoreContext';
import { getChainInfo } from '../../utils/openseaUtils';
import { heuristicNumber } from '../../utils/formatUtils';
import { COLORS, RADII, SIZES, SPACE } from '../../constants/design-token';
import VerifiedIcon from '../../assets/icons/verified-icon.svg';
import type { HomeStackScreenProps } from '../types';

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

const CollectionSkeleton = () => {
  const { opacity: skeletonOpacity } = useFlashOpacity();

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
};

type CollectionScreenHeaderProps = {
  style?: StyleProp<ViewStyle>;
  isPassedTop?: boolean;
  isOpacityScrollEnd?: boolean;
  headerTitleImageAnimatedStyle?: Animated.AnimatedProps<ImageStyle>;
  headerAnimatedStyle?: Animated.AnimatedProps<ViewStyle>;
  heroImageAnimatedStyle?: Animated.AnimatedProps<ImageStyle>;
};

const CollectionScreenHeader = observer(
  ({
    style,
    isPassedTop,
    isOpacityScrollEnd,
    headerTitleImageAnimatedStyle,
    headerAnimatedStyle,
    heroImageAnimatedStyle,
  }: CollectionScreenHeaderProps) => {
    const { t } = useTranslation();
    const navigation = useNavigation<HomeStackScreenProps<'Collection'>['navigation']>();
    const insets = useSafeAreaInsets();
    const { collectionStore } = useStore();

    const { collection, retrieveCollectionLoading: loading } = collectionStore;
    const chainInfo = getChainInfo(collection?.paymentTokens);

    /**
     * refs
     */
    const logoRef = useRef<View>(null);
    /**
     * custom hooks
     */
    // const { opacity: skeletonOpacity } = useFlashOpacity();

    const renderHeaderTitle = useCallback(() => {
      return (
        <Animated.Image
          source={{
            uri: collection?.imageUrl,
          }}
          style={[styles.headerTitleImage, headerTitleImageAnimatedStyle]}
        />
      );
    }, [isPassedTop]);

    // const renderSkeleton = useCallback(() => {
    //   return (
    //     <>
    //       <View style={styles.heroImageBox}>
    //         <Animated.View
    //           style={[styles.heroImageForSkeleton, styles.skeleton, { opacity: skeletonOpacity }]}
    //         />
    //       </View>
    //       <View style={styles.titleSection}>
    //         <View style={styles.titleSectionDim}>
    //           <View style={styles.titleSectionLogoBox}>
    //             <Animated.View
    //               style={[styles.titleSectionLogo, styles.skeleton, { opacity: skeletonOpacity }]}
    //             />
    //           </View>
    //         </View>
    //         <View style={styles.titleSectionContent}>
    //           <Animated.View
    //             style={[
    //               styles.skeleton,
    //               { height: SIZES.$10, width: '50%', borderRadius: RADII.lg },
    //               { opacity: skeletonOpacity },
    //             ]}
    //           />
    //         </View>
    //       </View>
    //     </>
    //   );
    // }, []);

    useEffect(() => {
      return () => {
        collectionStore.collectionCleanup();
      };
    }, []);

    return (
      <View style={[styles.container, style]}>
        <Animated.View style={[styles.headerBox]}>
          <Animated.View
            style={[styles.headerBoxPad, { height: insets.top }, headerAnimatedStyle]}
          />
          <Header
            transparent={!isOpacityScrollEnd}
            title={renderHeaderTitle()}
            leftIcon="back"
            onLeftIconPress={() => navigation.goBack()}
            rightIcon="filter"
            // TODO:
            onRightIconPress={() => {}}
            animatedStyle={headerAnimatedStyle}
          />
        </Animated.View>
        <View>
          {loading ? (
            <CollectionSkeleton />
          ) : (
            collection && (
              <>
                <View style={styles.heroImageBox}>
                  <Animated.Image
                    source={{
                      uri: collection.bannerImageUrl,
                    }}
                    style={[styles.heroImage, heroImageAnimatedStyle]}
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
                    {collection.description && <CollectionMoreArea text={collection.description} />}
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
            )
          )}
        </View>
      </View>
    );
  },
);

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
});

export default CollectionScreenHeader;

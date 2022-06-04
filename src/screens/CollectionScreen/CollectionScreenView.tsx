import { useCallback, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import CollectionMoreArea from './CollectionMoreArea';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import FadeOutGradient from '../../components/FadeOutGradient';
import useZoomOnScroll from './useZoomOnScroll.hook';
import usePassedTopOnScroll from './usePassedTopOnScroll.hook';
import useSkeleton from '../../hooks/useSkeleton';
import useScaleInOut from '../../hooks/useScaleInOut';
import { useStore } from '../../contexts/StoreContext';
import { COLORS, RADII, SIZES, SPACE } from '../../constants/design-token';
import VerifiedIcon from '../../assets/icons/verified-icon.svg';
import type { HomeStackScreenProps } from '../types';

type CollectionScreenViewProps = {
  children: React.ReactNode;
};

const CollectionScreenView = observer(({ children }: CollectionScreenViewProps) => {
  const logoRef = useRef<View>(null);
  const { opacity: skeletonOpacity } = useSkeleton();
  const {
    onScroll: onScrollZoom,
    opacity,
    scale,
    translateY,
    isOpacityScrollEnd,
  } = useZoomOnScroll();
  const { onScroll: onScrollPassedTop, isPassedTop } = usePassedTopOnScroll(logoRef);
  const { scale: titleImageScale } = useScaleInOut(isPassedTop);
  const { collectionStore } = useStore();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackScreenProps<'Collection'>['navigation']>();

  const { collection, retrieveCollectionLoading: loading } = collectionStore;

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
                style={[
                  styles.titleSectionLogo,
                  styles.skeleton,
                  {
                    opacity: skeletonOpacity,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.titleSectionContent}>
            <Animated.View
              style={[
                { height: SIZES.$10, width: '50%', borderRadius: RADII.lg },
                styles.skeleton,
                { opacity: skeletonOpacity },
              ]}
            />
          </View>
        </View>
      </>
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
          rightIcon="filter"
          // TODO:
          onRightIconPress={() => {}}
          animatedStyle={{ opacity }}
        />
      </Animated.View>
      <ScrollView
        onScroll={e => {
          onScrollZoom(e);
          onScrollPassedTop();
        }}
        scrollEventThrottle={16}
      >
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
                    {collection.description && <CollectionMoreArea text={collection.description} />}
                  </View>
                </View>
              </>
            )}
        {children}
      </ScrollView>
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
    paddingHorizontal: SPACE.$5,
    marginTop: SPACE.$2,
  },
  titleSectionContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: COLORS.skeleton,
  },
});

export default CollectionScreenView;

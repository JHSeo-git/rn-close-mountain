import { useCallback, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import useZoomOnScroll from './useZoomOnScroll.hook';
import usePassedTopOnScroll from './usePassedTopOnScroll.hook';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import type { HomeStackScreenProps } from '../types';
import useScaleInOut from '../../hooks/useScaleInOut';

type CollectionScreenViewProps = {
  bannerImageUrl?: string;
  logoImageUrl?: string;
  children: React.ReactNode;
};

const CollectionScreenView = ({
  bannerImageUrl,
  logoImageUrl,
  children,
}: CollectionScreenViewProps) => {
  const logoRef = useRef<View>(null);
  const {
    onScroll: onScrollZoom,
    opacity,
    scale,
    translateY,
    isOpacityScrollEnd,
  } = useZoomOnScroll();
  const { onScroll: onScrollPassedTop, isPassedTop } = usePassedTopOnScroll(logoRef);
  const { scale: titleImageScale } = useScaleInOut(isPassedTop);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackScreenProps<'Collection'>['navigation']>();

  const renderHeaderTitle = useCallback(() => {
    return (
      <Animated.Image
        source={{
          uri: logoImageUrl,
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
        <View style={styles.heroImageBox}>
          <Animated.Image
            source={{
              uri: bannerImageUrl,
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
          <LinearGradient
            style={styles.titleSectionDim}
            colors={[COLORS.transparent, COLORS.loContrast]}
            locations={[0, 0.5]}
          >
            <View ref={logoRef} style={styles.titleSectionLogoBox}>
              <Image
                style={styles.titleSectionLogo}
                source={{
                  uri: logoImageUrl,
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
          </LinearGradient>
        </View>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    position: 'relative',
  },
  heroImageBox: {
    position: 'relative',
    height: 300,
  },
  heroImage: {
    height: 150,
  },
  titleSection: {
    marginTop: -200,
  },
  titleSectionDim: {
    paddingTop: 50,
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
});

export default CollectionScreenView;

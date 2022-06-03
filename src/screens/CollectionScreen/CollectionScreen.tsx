import { Animated, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { COLORS, SPACE } from '../../constants/design-token';
import useZoomOnScroll from './useZoomOnScroll.hook';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { HomeStackScreenProps } from '../types';
import { IconButton } from 'react-native-paper';

type CollectionScreenProps = HomeStackScreenProps<'Collection'>;

const CollectionScreen = ({ navigation, route }: CollectionScreenProps) => {
  const { onScroll, opacity, scale, translateY, isOpacityScrollEnd } = useZoomOnScroll();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerBox]}>
        <Animated.View style={[styles.headerBoxPad, { height: insets.top }, { opacity }]} />
        <Header
          dim={!isOpacityScrollEnd}
          leftIcon="back"
          onLeftIconPress={() => navigation.goBack()}
          animatedStyle={{ opacity }}
        />
      </Animated.View>
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <View style={styles.heroImageBox}>
          <Animated.Image
            source={{
              uri: 'https://lh3.googleusercontent.com/BSggcaM3RbfXxiHnnWtO97FMZr6Amu8QgzQQI3xV8oTxj1tcMSOLEMdf_CtEwHaGiruYy9bVXKPa9LRSJcZD9kbKfMfPZicbk-KD=h600',
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
            <View style={styles.titleSectionLogoBox}>
              <Image
                style={styles.titleSectionLogo}
                source={{
                  uri: 'https://lh3.googleusercontent.com/cDfIiQMlap3KmoLnlgridUvdhfGDCXVosa5zURHQNMES_r0otI8MEkUtqFUN7pKkr9U-3ItBTp1XKLg7ScxvziOBfbDd706q9eGS=s170',
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
        <View style={styles.dummy} />
        <View style={styles.dummy} />
        <View style={styles.dummy} />
        <View style={styles.dummy} />
        <View style={styles.dummy} />
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
  dummy: {
    height: 300,
    backgroundColor: COLORS.gray10,
    marginTop: 20,
  },
});

export default CollectionScreen;

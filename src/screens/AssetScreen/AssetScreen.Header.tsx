import { useCallback } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import { useStore } from '../../contexts/StoreContext';
import useTransitionEffect from '../../hooks/useTransitionEffect';
import { getRandomColor } from '../../utils/styleUtils';
import { COLORS, RADII, SIZES } from '../../constants/design-token';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AssetScreenHeaderProps = {
  headerTransparent: boolean;
  headerAnimatedStyle: Animated.AnimatedProps<ViewStyle>;
  touchDown: boolean;
  heroImageHeight: number;
  gradientAnimatedStyle: Animated.AnimatedProps<ViewStyle>;
};

const AssetScreenHeader = observer(
  ({
    headerTransparent,
    headerAnimatedStyle,
    touchDown,
    heroImageHeight,
    gradientAnimatedStyle,
  }: AssetScreenHeaderProps) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { assetStore } = useStore();
    const { asset } = assetStore;

    /**
     * custom hooks
     */
    const scale = useTransitionEffect({ toggleState: touchDown });

    const renderHeaderTitle = useCallback(() => {
      return (
        <Animated.Image
          source={{ uri: asset?.imageUrl }}
          style={[styles.headerTitleImage, { transform: [{ scale }] }]}
        />
      );
    }, [touchDown]);

    return (
      <View style={styles.container}>
        <Animated.View style={gradientAnimatedStyle}>
          <LinearGradient
            style={[
              styles.gradientBackground,
              { height: SIZES.headerHeight + insets.top + heroImageHeight },
            ]}
            colors={[getRandomColor(), COLORS.transparent]}
          />
        </Animated.View>
        <View style={[styles.headerBox]}>
          <Animated.View
            style={[styles.headerBoxPad, { height: insets.top }, headerAnimatedStyle]}
          />
          <Header
            transparent={headerTransparent}
            title={renderHeaderTitle()}
            leftIcon="back"
            onLeftIconPress={() => navigation.goBack()}
            rightIcon="share"
            // TODO:
            onRightIconPress={() => {}}
            animatedStyle={headerAnimatedStyle}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  headerBox: {
    backgroundColor: COLORS.transparent,
  },
  headerBoxPad: {
    backgroundColor: COLORS.loContrast,
    zIndex: 1,
  },
  headerTitleImage: {
    width: 40,
    height: 40,
    borderRadius: RADII.lg,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
});

export default AssetScreenHeader;

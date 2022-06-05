import { View, StyleProp, ViewStyle, StyleSheet, Image, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import UIText from '../../../components/UIText';
import { COLORS, RADII, SPACE } from '../../../constants/design-token';
import useFlashOpacity from '../../../hooks/useFlashOpacity';

type TrendingCollectionCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  logoImageUrl: string;
  username: string;
  name: string;
  onPress?: () => void;
  onUserPress?: () => void;
};

const TrendingCollectionCard = ({
  style,
  coverImageUrl,
  logoImageUrl,
  name,
  username,
  onPress,
  onUserPress,
}: TrendingCollectionCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <Card.Cover source={{ uri: coverImageUrl }} style={styles.cardCover} />
      <View style={styles.cardContent}>
        <Image source={{ uri: logoImageUrl }} style={styles.cardContentCircleCenterImage} />
        <UIText as="small_bold" numberOfLines={1}>
          {name}
        </UIText>
        <UIText
          as="small_primary"
          numberOfLines={1}
          style={{ marginTop: SPACE.$1 }}
          onPress={onUserPress}
        >
          {username}
        </UIText>
      </View>
    </Card>
  );
};

const Skeleton = ({ style }: Pick<TrendingCollectionCardProps, 'style'>) => {
  const { opacity } = useFlashOpacity();

  return (
    <Card style={[styles.card, style]}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </Card>
  );
};

TrendingCollectionCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: RADII.lg,
  },
  skeleton: {
    flex: 1,
    backgroundColor: COLORS.skeleton,
    borderRadius: RADII.lg,
  },
  cardCover: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: RADII.lg,
    borderTopRightRadius: RADII.lg,
  },
  cardContent: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: SPACE.$3,
    paddingTop: SPACE.$8,
    alignItems: 'center',
  },
  cardContentCircleCenterImage: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    top: 0,
    left: '50%',
    resizeMode: 'contain',
    transform: [{ translateX: -12.5 }, { translateY: -25 }],
    borderWidth: 2,
    borderColor: COLORS.loContrast,
    backgroundColor: COLORS.loContrast,
    zIndex: 1,
  },
});

export default TrendingCollectionCard;

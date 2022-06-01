import { View, StyleProp, ViewStyle, StyleSheet, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import UIText from '../UIText';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import useSkeleton from '../../hooks/useSkeleton';

type CategoryCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  name: string;
  onPress?: () => void;
};

const CategoryCard = ({ style, coverImageUrl, name, onPress }: CategoryCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <LinearGradient style={styles.backdrop} colors={['transparent', COLORS.grayA8]} />
      <Card.Cover source={{ uri: coverImageUrl }} style={styles.cardCover} />
      <View style={styles.cardContent}>
        <UIText as="h4_contrast" numberOfLines={2}>
          {name}
        </UIText>
      </View>
    </Card>
  );
};

const Skeleton = ({ style }: Pick<CategoryCardProps, 'style'>) => {
  const { opacity } = useSkeleton();

  return (
    <Card style={[styles.card, style]}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </Card>
  );
};

CategoryCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
  skeleton: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderRadius: RADII.lg,
    zIndex: 1,
  },
  card: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: RADII.lg,
  },
  cardCover: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderRadius: RADII.lg,
    borderTopLeftRadius: RADII.lg,
    borderTopRightRadius: RADII.lg,
  },
  cardContent: {
    position: 'absolute',
    left: SPACE.$3,
    right: SPACE.$3,
    bottom: SPACE.$3,
    zIndex: 1,
  },
});

export default CategoryCard;

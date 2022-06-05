import { View, StyleProp, ViewStyle, StyleSheet, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import UIText from '../../../components/UIText';
import useFlashOpacity from '../../../hooks/useFlashOpacity';
import { COLORS, RADII, SPACE } from '../../../constants/design-token';

type NotableDropCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  name: string;
  onPress?: () => void;
};

const NotableDropCard = ({ style, coverImageUrl, name, onPress }: NotableDropCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <Card.Cover source={{ uri: coverImageUrl }} style={styles.cardCover} />
      <View style={styles.cardContent}>
        <UIText as="small_bold" numberOfLines={1}>
          {name}
        </UIText>
      </View>
    </Card>
  );
};

const Skeleton = ({ style }: Pick<NotableDropCardProps, 'style'>) => {
  const { opacity } = useFlashOpacity();

  return (
    <Card style={[styles.card, style]}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </Card>
  );
};

NotableDropCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    width: 160,
    height: 160,
    borderRadius: RADII.lg,
  },
  skeleton: {
    flex: 1,
    backgroundColor: COLORS.skeleton,
    borderRadius: RADII.lg,
  },
  cardCover: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: RADII.lg,
    borderTopRightRadius: RADII.lg,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: SPACE.$2,
    justifyContent: 'center',
  },
});

export default NotableDropCard;

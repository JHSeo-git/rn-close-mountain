import { View, StyleSheet, StyleProp, ViewStyle, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import UIText from '../../../components/UIText';
import useSkeleton from '../../../hooks/useSkeleton';
import { COLORS, RADII, SPACE } from '../../../constants/design-token';

type NotableDropCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  name: string;
  description?: string;
  chipText: string;
  onPress?: () => void;
};

const NotableDropCard = ({
  style,
  coverImageUrl,
  name,
  description,
  chipText,
  onPress,
}: NotableDropCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <LinearGradient style={styles.backdrop} colors={['transparent', COLORS.grayA8]} />
      <View style={styles.chip}>
        <UIText as="small_bold_contrast">{chipText}</UIText>
      </View>
      <Card.Cover style={styles.cardCover} source={{ uri: coverImageUrl ?? undefined }} />
      <View style={styles.cardContent}>
        <UIText as="h3_contrast">{name}</UIText>
        {description && (
          <UIText as="h4_contrast" style={{ marginTop: SPACE.$4 }}>
            {description}
          </UIText>
        )}
      </View>
    </Card>
  );
};

const Skeleton = () => {
  const { opacity } = useSkeleton();

  return (
    <Card style={styles.card}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </Card>
  );
};

const Empty = () => {
  const { t } = useTranslation();

  return (
    <Card style={styles.card}>
      <View style={styles.skeleton} />
      <View style={styles.emptyContent}>
        <UIText as="small_bold">{t('home.empty_notable_drops_message')}</UIText>
      </View>
    </Card>
  );
};

NotableDropCard.Skeleton = Skeleton;
NotableDropCard.Empty = Empty;

const styles = StyleSheet.create({
  card: {
    height: 500,
    position: 'relative',
    borderRadius: RADII.base,
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gray6,
  },
  cardCover: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: RADII.base,
    borderTopRightRadius: RADII.base,
    zIndex: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    opacity: 0.5,
  },
  cardContent: {
    position: 'absolute',
    bottom: SPACE.$4,
    left: SPACE.$4,
    right: SPACE.$4,
    zIndex: 1,
  },
  chip: {
    position: 'absolute',
    top: SPACE.$4,
    right: SPACE.$4,

    borderRadius: RADII.lg,
    borderWidth: 2,
    borderColor: COLORS.white,
    paddingVertical: SPACE.$1,
    paddingHorizontal: SPACE.$2,

    backgroundColor: COLORS.grayA9,
    zIndex: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotableDropCard;

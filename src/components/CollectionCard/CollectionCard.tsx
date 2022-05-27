import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import UIText from '../UIText';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import type { CollectionInfo } from '../../api/strapi/collection/types';

type CollectionCardProps = {
  collection: CollectionInfo;
};

const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { name, creator, category, logo } = collection;

  return (
    <Card style={styles.card}>
      <Card.Cover style={styles.cardCover} source={{ uri: logo ?? undefined }} />
      <View style={styles.cardContent}>
        <UIText as="h3_contrast">{name}</UIText>
        <UIText as="h4_contrast">{creator.data.attributes.username}</UIText>
      </View>
      <View style={styles.category}>
        <LinearGradient
          angle={90}
          useAngle={true}
          style={styles.gradientBorder}
          colors={[COLORS.amber9, COLORS.cyan9]}
        >
          <View style={styles.chip}>
            <UIText as="small_contrast">{category}</UIText>
          </View>
        </LinearGradient>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // overflow: 'hidden',
    position: 'relative',
    height: 300,
  },
  cardCover: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    position: 'absolute',
    left: SPACE.$4,
    bottom: SPACE.$4,
  },
  chip: {
    borderRadius: 9999,
    backgroundColor: COLORS.gray12,
    paddingVertical: SPACE.$1,
    paddingHorizontal: SPACE.$2,
  },
  category: {
    position: 'absolute',
    top: SPACE.$4,
    right: SPACE.$4,
    zIndex: 1,

    marginTop: SPACE.$1,
    flexDirection: 'row',
  },
  gradientBorder: {
    borderRadius: 9999,
    padding: SIZES.$1,
  },
});

export default CollectionCard;

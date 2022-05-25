import { View, StyleSheet } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import UIText from '../UIText';
import { COLORS, SPACE } from '../../constants/design-token';

type CollectionCardProps = {
  name: string;
  creator: string;
  category: string;
  logo?: string;
};

const CollectionCard = ({ name, creator, category, logo }: CollectionCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Cover style={styles.cardCover} source={{ uri: logo }} />
      <View style={styles.cardContent}>
        <UIText as="h3_contrast">{name}</UIText>
        <UIText as="h4_contrast">{creator}</UIText>
        <View style={styles.category}>
          <LinearGradient style={styles.gradientBorder} colors={[COLORS.amber9, COLORS.cyan9]}>
            <Chip style={{ backgroundColor: COLORS.gray1 }}>
              <UIText as="small">{category}</UIText>
            </Chip>
          </LinearGradient>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
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
    bottom: SPACE.$8,
  },
  category: {
    marginTop: SPACE.$1,
    flexDirection: 'row',
  },
  gradientBorder: {
    borderRadius: 9999,
    padding: 2,
  },
});

export default CollectionCard;

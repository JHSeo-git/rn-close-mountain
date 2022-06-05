import { View, StyleSheet, StyleProp, ViewStyle, Animated } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { COLORS, SIZES, SPACE } from '../../../constants/design-token';
import UIText from '../../../components/UIText';
import useFlashOpacity from '../../../hooks/useFlashOpacity';
import { useTranslation } from 'react-i18next';

type FeaturedAssetCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  profileImageUrl: string;
  name: string;
  username?: string;
  onPress?: () => void;
  onIconPress?: () => void;
};

const FeaturedAssetCard = ({
  style,
  coverImageUrl,
  profileImageUrl,
  name,
  username,
  onPress,
  onIconPress,
}: FeaturedAssetCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <Card.Cover style={styles.cardCover} source={{ uri: coverImageUrl }} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardContentHead}>
          <Avatar.Image size={SIZES.$10} source={{ uri: profileImageUrl }} />
          <View style={styles.cardContentHeadInner}>
            <UIText as="small_bold" numberOfLines={1}>
              {name}
            </UIText>
            <UIText as="small_primary" numberOfLines={1}>
              {username}
            </UIText>
          </View>
        </View>
        <View style={styles.cardContentTail}>
          <IconButton
            size={SIZES.$6}
            icon="alert-circle-outline"
            color={COLORS.text.secondary}
            onPress={onIconPress}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const Skeleton = () => {
  const { opacity } = useFlashOpacity();
  return (
    <Card style={styles.card}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
      <Card.Content style={[styles.cardContent, { height: 80 }]}>
        <Animated.View style={[styles.skeleton, { opacity, height: 40 }]} />
      </Card.Content>
    </Card>
  );
};

const Empty = () => {
  const { t } = useTranslation();
  return (
    <Card style={styles.card}>
      <View style={styles.skeleton} />
      <Card.Content style={styles.cardContent}>
        <UIText as="small_bold">{t('home.empty_featured_message')}</UIText>
      </Card.Content>
    </Card>
  );
};

FeaturedAssetCard.Skeleton = Skeleton;
FeaturedAssetCard.Empty = Empty;

const styles = StyleSheet.create({
  card: {
    height: 350,
    marginTop: SPACE.$10,
  },
  skeleton: {
    flex: 1,
    backgroundColor: COLORS.skeleton,
  },
  cardCover: {
    flex: 1,
  },
  cardContent: {
    paddingVertical: SPACE.$4,
    paddingHorizontal: SPACE.$4,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContentHead: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentHeadInner: {
    flex: 1,

    marginLeft: SPACE.$4,
  },
  cardContentTail: {
    marginLeft: SPACE.$2,
  },
});

export default FeaturedAssetCard;

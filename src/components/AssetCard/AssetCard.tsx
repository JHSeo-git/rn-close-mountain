import { Animated, View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import UIText from '../UIText';
import UIIcon from '../UIIcon';
import ChainIcon from '../ChainIcon';
import useSkeleton from '../../hooks/useSkeleton';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import type { Chain } from '../../api/testnets/asset/types';
import VerifiedIcon from '../../assets/icons/verified-icon.svg';

type AssetCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  isVerified: boolean;
  collectionName: string;
  name: string;
  chain: Chain;
  price: number;
  favoritesCount: number;
  onPress?: () => void;
};

const AssetCard = ({
  style,
  coverImageUrl,
  isVerified,
  collectionName,
  name,
  chain,
  price,
  favoritesCount,
  onPress,
}: AssetCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <Card.Cover source={{ uri: coverImageUrl }} style={styles.cardCover} />
      <View style={styles.cardContent}>
        <View style={styles.cardContentHead}>
          <View style={styles.cardContentHeadTop}>
            <UIText as="xsmall" style={{ flexShrink: 1 }} numberOfLines={1}>
              {collectionName}
            </UIText>
            {isVerified && (
              <VerifiedIcon
                width={12}
                height={12}
                color={COLORS.primary}
                style={{ marginLeft: SPACE.$1 }}
              />
            )}
          </View>
          <UIText as="xsmall_bold" numberOfLines={2} style={{ marginTop: SPACE.$1 }}>
            {name}
          </UIText>
        </View>
        <View style={styles.cardContentTail}>
          <View style={styles.flexBox}>
            <ChainIcon chain={chain} size={12} />
            <UIText as="xsmall_bold" style={{ marginLeft: SPACE.$1 }}>
              {price}
            </UIText>
          </View>
          <View style={styles.flexBox}>
            <UIIcon name="heart-outline" size={12} color={COLORS.text.secondary} />
            <UIText as="xsmall" style={{ marginLeft: SPACE.$1, color: COLORS.text.secondary }}>
              {favoritesCount}
            </UIText>
          </View>
        </View>
      </View>
    </Card>
  );
};

const Skeleton = ({ style }: Pick<AssetCardProps, 'style'>) => {
  const { opacity } = useSkeleton();

  return <Animated.View style={[styles.card, styles.skeleton, { opacity }, style]} />;
};

AssetCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
  skeleton: {
    flex: 1,
    backgroundColor: COLORS.skeleton,
    borderRadius: RADII.lg,
  },
  card: {
    flex: 1,
    width: 170,
    height: 280,
    borderRadius: RADII.lg,
  },
  cardCover: {
    height: 170,
    borderTopLeftRadius: RADII.lg,
    borderTopRightRadius: RADII.lg,
  },
  cardContent: {
    flex: 1,
    padding: SPACE.$2,
  },
  cardContentHead: {
    flex: 1,
  },
  cardContentHeadTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentTail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AssetCard;

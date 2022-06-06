import { Animated, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-paper';
import UIText from '../../components/UIText';
import CustomTouchableRipple from '../../components/CustomTouchableRipple';
import { COLORS, RADII, SIZES, SPACE } from '../../constants/design-token';
import { SvgUri } from 'react-native-svg';
import type { OpenSeaCollection } from '../../utils/types/opensea/types';
import useFlashOpacity from '../../hooks/useFlashOpacity';

type RankingsItemCardProps = {
  rankNo: number;
  collection: OpenSeaCollection;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const RankingsItemCard = ({ rankNo, collection, onPress, style }: RankingsItemCardProps) => {
  return (
    <CustomTouchableRipple style={{ flex: 1 }} onPress={onPress}>
      <View style={[styles.card, style]}>
        <View style={styles.head}>
          <UIText as="xsmall_bold" style={styles.rankNo}>
            {rankNo}
          </UIText>
          {collection.imageUrl ? (
            <Avatar.Image size={SIZES.$10} source={{ uri: collection.imageUrl }} />
          ) : (
            <Avatar.Text
              size={SIZES.$10}
              label={collection.name.length > 2 ? collection.name.substring(0, 2) : collection.name}
            />
          )}
          <View style={styles.name}>
            <UIText as="xsmall_bold" numberOfLines={1} style={{ flexShrink: 1 }}>
              {collection.name}
            </UIText>
          </View>
        </View>
        <View style={styles.tail}>
          {collection.paymentTokens && collection.paymentTokens.length > 0 ? (
            <>
              <SvgUri
                uri={collection.paymentTokens[0].imageUrl ?? null}
                width={15}
                height={15}
                style={{ marginRight: SPACE.$1 }}
              />
              <UIText as="xsmall_bold" style={styles.price}>
                {collection.stats.averagePrice *
                  parseInt(collection.paymentTokens[0].ethPrice ?? '1', 10)}
              </UIText>
            </>
          ) : (
            <>
              <SvgUri
                uri="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                width={15}
                height={15}
                style={{ marginRight: SPACE.$1 }}
              />
              <UIText as="xsmall_bold" style={styles.price}>
                0
              </UIText>
            </>
          )}
        </View>
      </View>
    </CustomTouchableRipple>
  );
};

const Skeleton = ({ style }: Pick<RankingsItemCardProps, 'style'>) => {
  const { opacity } = useFlashOpacity();
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.head]}>
        <Animated.View
          style={[
            styles.rankNo,
            styles.skeleton,
            { minWidth: SIZES.$5, height: SIZES.$5, borderRadius: SIZES.$5 / 2 },
            { opacity },
          ]}
        />
        <Animated.View
          style={[
            styles.skeleton,
            {
              marginLeft: SPACE.$2,
              width: SIZES.$10,
              height: SIZES.$10,
              borderRadius: SIZES.$10 / 2,
            },
            { opacity },
          ]}
        />
        <Animated.View
          style={[
            styles.skeleton,
            {
              marginLeft: SPACE.$2,
              width: '70%',
              height: SIZES.$5,
              borderRadius: RADII.base,
            },
            { opacity },
          ]}
        />
      </View>
    </View>
  );
};

RankingsItemCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: SPACE.$5,
    paddingHorizontal: SPACE.$4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tail: {
    marginLeft: SPACE.$2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNo: {
    minWidth: SIZES.$7,
    textAlign: 'left',
  },
  name: {
    flex: 1,
    marginLeft: SPACE.$2,
  },
  price: {
    marginLeft: SPACE.$2,
  },
  skeleton: {
    backgroundColor: COLORS.skeleton,
  },
});

export default RankingsItemCard;

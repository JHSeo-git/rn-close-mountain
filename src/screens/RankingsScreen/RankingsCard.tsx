import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-paper';
import UIText from '../../components/UIText';
import CustomTouchableRipple from '../../components/CustomTouchableRipple';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import UIIcon from '../../components/UIIcon';
import SolanaSvg from '../../assets/icons/solana.svg';
import type { CollectionInfo } from '../../api/collection/types';

type RankingsCardProps = {
  rankNo: number;
  collection: CollectionInfo;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const RankingsCard = ({ rankNo, collection, onPress, style }: RankingsCardProps) => {
  return (
    <CustomTouchableRipple onPress={onPress}>
      <View style={[styles.card, style]}>
        <View style={styles.head}>
          <UIText as="small_bold" style={styles.rankNo}>
            {rankNo}
          </UIText>
          {collection.logo ? (
            <Avatar.Image
              style={styles.avatar}
              size={SIZES.$12}
              source={{ uri: collection.logo }}
            />
          ) : (
            <Avatar.Text
              size={SIZES.$12}
              label={collection.name.length > 2 ? collection.name.substring(0, 2) : collection.name}
            />
          )}
          <View style={styles.name}>
            <UIText as="h4">{collection.name}</UIText>
          </View>
        </View>
        <View style={styles.tail}>
          {collection.nfts.data && collection.nfts.data.length > 0 && (
            <>
              {collection.nfts.data[0].attributes.paymentAsset === 'ETH' && (
                <UIIcon size={20} name="ethereum" />
              )}
              {collection.nfts.data[0].attributes.paymentAsset === 'SOL' && (
                <SolanaSvg width={15} />
              )}
              <UIText as="h4" style={styles.price}>
                {collection.nfts.data[0].attributes.price}
              </UIText>
            </>
          )}
        </View>
      </View>
    </CustomTouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: SPACE.$5,
    paddingHorizontal: SPACE.$4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNo: {
    minWidth: SIZES.$5,
    textAlign: 'right',
  },
  avatar: {
    marginLeft: SPACE.$2,
    backgroundColor: COLORS.disabled,
  },
  name: {
    marginLeft: SPACE.$2,
  },
  price: {
    marginLeft: SPACE.$2,
  },
});

export default RankingsCard;

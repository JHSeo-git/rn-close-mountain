import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import UIText from '../UIText';
import UIIcon from '../UIIcon';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import SolanaSvg from '../../assets/icons/solana.svg';
import type { NFTInfo } from '../../api/nft/types';

type NFTCardProps = {
  nft: NFTInfo;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  const collection = nft.collection?.data.attributes;
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: nft.logo ?? undefined }} style={styles.cardCover} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardContentTop}>
          <UIText as="small" style={{ color: COLORS.text.secondary }}>
            {collection?.category ?? 'N/A'}
          </UIText>
          <UIText as="small_bold">{nft.name}</UIText>
        </View>
        <View style={styles.cardContentBottom}>
          {nft.paymentAsset === 'ETH' && <UIIcon size={20} name="ethereum" />}
          {nft.paymentAsset === 'SOL' && <SolanaSvg height={20} />}
          <UIText as="small" style={{ marginLeft: SPACE.$1 }}>
            {nft.price}
          </UIText>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // overflow: 'hidden',
    position: 'relative',
    height: 300,
    width: 175,
    borderRadius: RADII.base,
  },
  cardCover: {
    height: 175,
    width: '100%',
    borderTopRightRadius: RADII.base,
    borderTopLeftRadius: RADII.base,
  },
  cardContent: {
    flex: 1,
    paddingVertical: SPACE.$2,
    paddingHorizontal: SPACE.$2,

    justifyContent: 'space-between',
  },
  cardContentTop: {},
  cardContentBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default NFTCard;

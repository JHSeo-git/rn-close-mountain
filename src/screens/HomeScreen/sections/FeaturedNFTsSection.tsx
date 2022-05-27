import { FlatList, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import SectionView from '../../../components/SectionView';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../../constants/design-token';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../contexts/StoreContext';
import { useFocusEffect } from '@react-navigation/native';
import NFTCard from '../../../components/NFTCard';

const FeaturedNFTsSection = observer(() => {
  const { t } = useTranslation();
  const { nftStore } = useStore();

  useFocusEffect(
    useCallback(() => {
      nftStore.retrieveNFTs();

      return () => {
        nftStore.reset();
      };
    }, []),
  );

  return (
    <SectionView title={t('home.featured_nfts')} titleViewStyle={styles.sectionHeader}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.listWrapper}
        keyExtractor={item => `${item.attributes.tokenId}`}
        data={nftStore.nfts}
        renderItem={({ item, index }) => (
          <NFTCard
            style={[
              styles.itemWrapper,
              index === 0 && styles.itemHead,
              index === nftStore.nfts.length - 1 && styles.itemTail,
            ]}
            nft={item.attributes}
          />
        )}
      />
    </SectionView>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: SPACE.$5,
  },
  listWrapper: {},
  itemWrapper: {
    marginLeft: SPACE.$2,
    paddingVertical: SPACE.$1,
  },
  itemHead: {
    marginLeft: SPACE.$4,
  },
  itemTail: {
    marginRight: SPACE.$4,
  },
});

export default FeaturedNFTsSection;

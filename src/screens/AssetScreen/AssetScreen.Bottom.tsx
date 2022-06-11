import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { SPACE } from '../../constants/design-token';
import UIText from '../../components/UIText';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import AssetCard from '../../components/AssetCard';

const AssetScreenBottom = observer(() => {
  const { t } = useTranslation();
  const { assetStore } = useStore();
  const { asset, moreAssets, retrieveMoreAssets, retrieveMoreAssetsLoading: loading } = assetStore;

  useEffect(() => {
    if (asset?.collection.slug) {
      retrieveMoreAssets({ limit: 2, collection_slug: asset.collection.slug });
    }
  }, [asset?.collection.slug]);

  return (
    <View style={styles.container}>
      <UIText as="h4">{t('collection.more_asset_info_title')}</UIText>
      {moreAssets.map(moreAsset => {
        <AssetCard
          key={moreAsset.id}
          coverImageUrl={moreAsset.imageUrl}
          collectionName={moreAsset.collection.name}
          name={moreAsset.name ?? ''}
          isVerified={moreAsset.collection.safelistRequestStatus === 'verified'}
          favoritesCount={moreAsset.numSales}
          chain="ETHEREUM"
          // TODO: 가격은 어떻게 계산?가져오는거야?
          price={0.19}
          // TODO: onPress
          onPress={() => {}}
        />;
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: SPACE.$4,
  },
});

export default AssetScreenBottom;

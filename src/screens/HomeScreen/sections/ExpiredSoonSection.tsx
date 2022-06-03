import { StyleSheet } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { FlatList } from 'react-native-gesture-handler';
import AssetCard from '../../../components/AssetCard';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import { generateSkeletonList } from '../../../utils/styleUtils';
import type { ExpiredSoonAsset } from '../../../api/testnets/asset/getExpiredSoonAssets';
import type { ChainScalar } from '../../../graphql/types/generated';

const ExpiredSoonSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const flatListRef = useRef<FlatList<ExpiredSoonAsset>>(null);

  const {
    pullToRefresh,
    expiredSoonAssets,
    retrieveExpiredSoonAssets,
    retrieveExpiredSoonAssetsLoading: loading,
  } = mainHomeStore;

  useEffect(() => {
    retrieveExpiredSoonAssets();
  }, []);

  useEffect(() => {
    if (pullToRefresh) {
      retrieveExpiredSoonAssets();
    }
  }, [pullToRefresh]);

  useEffect(() => {
    if (!loading) {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  }, [loading]);

  const renderSkeleton = useCallback(() => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={generateSkeletonList(3)}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <AssetCard.Skeleton
            style={[styles.card, index === 0 && styles.listLeft, index === 2 && styles.listRight]}
          />
        )}
      />
    );
  }, []);

  return (
    <SectionView title={t('home.expired_soon')}>
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={expiredSoonAssets}
          keyExtractor={item => `${item.asset.id}`}
          renderItem={({ item, index }) => (
            <AssetCard
              style={[
                styles.card,
                index === 0 && styles.listLeft,
                index === expiredSoonAssets.length - 1 && styles.listRight,
              ]}
              coverImageUrl={item.asset.displayImageUrl}
              collectionName={item.asset.collection.name}
              name={item.asset.name ?? ''}
              isVerified={item.asset.collection.isVerified}
              favoritesCount={item.asset.favoritesCount}
              chain={item.asset.assetContract.chain as ChainScalar}
              // TODO: 가격은 어떻게 계산?가져오는거야?
              price={0.19}
              // TODO: onPress
              onPress={() => {}}
            />
          )}
        />
      )}
    </SectionView>
  );
});

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: SPACE.$1,
  },
  card: {
    marginLeft: SPACE.$3,
  },
  listLeft: {
    marginLeft: SPACE.$5,
  },
  listRight: {
    marginRight: SPACE.$5,
  },
});

export default ExpiredSoonSection;

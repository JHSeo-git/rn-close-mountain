import { StyleSheet } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { FlatList } from 'react-native-gesture-handler';
import AssetCard from '../../../components/AssetCard';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import type { ExpiredSoonAsset } from '../../../api/opensea/asset/getExpiredSoonAssets';
import type { ChainScalar } from '../../../graphql/types/generated';
import type { SkeletonItem } from '../../../utils/styleUtils';
import useSkeletonItems from '../../../hooks/useSkeletonItems';
import { HomeStackScreenProps } from '../../types';
import { useNavigation } from '@react-navigation/native';

const ExpiredSoonSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const navigation = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const flatListRef = useRef<FlatList<ExpiredSoonAsset>>(null);
  const skeletonItems = useSkeletonItems();

  const {
    pullToRefresh,
    expiredSoonAssets,
    retrieveExpiredSoonAssets,
    retrieveExpiredSoonAssetsLoading: loading,
  } = mainHomeStore;

  const renderSkeletonItem = useCallback(
    ({ item, index }: { item: SkeletonItem; index: number }) => {
      return <AssetCard.Skeleton style={[styles.card, index === 0 && styles.listLeft]} />;
    },
    [],
  );

  const renderSkeleton = useCallback(() => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={skeletonItems}
        keyExtractor={item => `${item.id}`}
        renderItem={renderSkeletonItem}
      />
    );
  }, []);

  const renderListItem = useCallback(
    ({ item, index }: { item: ExpiredSoonAsset; index: number }) => {
      return (
        <AssetCard
          style={[styles.card, index === 0 && styles.listLeft]}
          coverImageUrl={item.asset.displayImageUrl}
          collectionName={item.asset.collection.name}
          name={item.asset.name ?? ''}
          isVerified={item.asset.collection.isVerified}
          favoritesCount={item.asset.favoritesCount}
          chain={item.asset.assetContract.chain as ChainScalar}
          // TODO: 가격은 어떻게 계산?가져오는거야?
          price={0.19}
          // TODO: onPress
          onPress={() =>
            navigation.navigate('Asset', {
              assetContractAddress: item.asset.assetContract.address,
              tokenId: item.asset.tokenId,
            })
          }
        />
      );
    },
    [],
  );

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
          renderItem={renderListItem}
        />
      )}
    </SectionView>
  );
});

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: SPACE.$1,
    paddingRight: SPACE.$5,
  },
  card: {
    marginLeft: SPACE.$3,
  },
  listLeft: {
    marginLeft: SPACE.$5,
  },
});

export default ExpiredSoonSection;

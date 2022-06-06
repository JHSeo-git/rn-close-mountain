import { Animated, FlatListProps, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import AssetCard from '../../components/AssetCard';
import { useCallback, useRef } from 'react';
import { SelectedCollection } from '../../api/opensea/asset/getSelectedCollections';
import { SPACE } from '../../constants/design-token';
import { SkeletonItem } from '../../utils/styleUtils';
import useSkeletonItems from '../../hooks/useSkeletonItems';
import { ChainScalar } from '../../graphql/types/generated';

type CollectionItemsSceneProps = Omit<
  FlatListProps<SelectedCollection>,
  'data' | 'numColumns' | 'renderItem'
>;

const CollectionItemsScene = observer(
  ({ contentContainerStyle, ...props }: CollectionItemsSceneProps) => {
    const flatListRef = useRef<Animated.FlatList<SelectedCollection>>(null);
    const { collectionStore } = useStore();
    const { selectedCollections, retrieveSelectedCollectionsLoading: loading } = collectionStore;
    const skeletonItems = useSkeletonItems(6);

    const renderSkeletonItem = useCallback(
      ({ item, index }: { item: SkeletonItem; index: number }) => {
        return <AssetCard.Skeleton style={[styles.card]} />;
      },
      [],
    );

    const renderSkeleton = useCallback(() => {
      return (
        <Animated.FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.flatList, contentContainerStyle]}
          data={skeletonItems}
          keyExtractor={item => `${item.id}`}
          renderItem={renderSkeletonItem}
        />
      );
    }, []);

    const renderListItem = useCallback(
      ({ item, index }: { item: SelectedCollection; index: number }) => {
        return (
          <AssetCard
            style={[styles.card]}
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
        );
      },
      [],
    );

    return (
      <>
        {loading ? (
          renderSkeleton()
        ) : (
          <Animated.FlatList
            {...props}
            ref={flatListRef}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.flatList, contentContainerStyle]}
            data={selectedCollections}
            keyExtractor={item => `${item.asset.id}`}
            renderItem={renderListItem}
          />
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: SPACE.$2,
    paddingVertical: SPACE.$2,
  },
  card: {
    marginHorizontal: SPACE.$2,
    marginVertical: SPACE.$2,
  },
});

export default CollectionItemsScene;

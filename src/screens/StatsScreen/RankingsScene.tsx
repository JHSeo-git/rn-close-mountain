import { View, Text, FlatList, FlatListProps, StyleSheet } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import type { OpenSeaCollection } from '../../utils/types/opensea/types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import RankingsItemCard from './RankingsItemCard';
import { SIZES } from '../../constants/design-token';
import useSkeletonItems from '../../hooks/useSkeletonItems';

type RankingsSceneProps = {} & Omit<FlatListProps<OpenSeaCollection>, 'data' | 'renderItem'>;

type RenderItemProps = {
  item: OpenSeaCollection;
  index: number;
};

const RankingsItemSkeleton = () => {
  const skeletonItems = useSkeletonItems(2);
  return (
    <>
      {skeletonItems.map((item, index) => (
        <RankingsItemCard.Skeleton key={index} />
      ))}
    </>
  );
};

const RankingsScene = observer(({ contentContainerStyle, ...props }: RankingsSceneProps) => {
  const { rankingsStore } = useStore();
  const {
    collections,
    retrieveCollections,
    retrieveNextCollections,
    retrieveCollectionsLoading: loading,
  } = rankingsStore;

  const renderItem = useCallback(({ item, index }: RenderItemProps) => {
    return <RankingsItemCard rankNo={index + 1} collection={item} onPress={() => {}} />;
  }, []);

  useEffect(() => {
    retrieveCollections();
  }, []);

  return (
    <>
      <FlatList
        {...props}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        onEndReached={retrieveNextCollections}
        data={collections}
        renderItem={renderItem}
        ListFooterComponent={<RankingsItemSkeleton />}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.iosBottomTabHeight,
  },
});

export default RankingsScene;

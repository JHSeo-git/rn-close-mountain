import { forwardRef, useCallback, useEffect } from 'react';
import { FlatList, FlatListProps, StyleSheet, RefreshControl, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import RankingsItemCard from './RankingsItemCard';
import useSkeletonItems from '../../hooks/useSkeletonItems';
import { useStore } from '../../contexts/StoreContext';
import { COLORS, SIZES } from '../../constants/design-token';
import { wait } from '../../utils/commonUtils';
import type { OpenSeaCollection } from '../../utils/types/opensea/types';
import RankingsListHeader from './RankingsListHeader';

type RankingsSceneProps = {} & Omit<FlatListProps<OpenSeaCollection>, 'data' | 'renderItem'>;

type RenderItemProps = {
  item: OpenSeaCollection;
  index: number;
};

const RankingsItemSkeleton = ({ length = 2 }: { length?: number }) => {
  const skeletonItems = useSkeletonItems(length);
  return (
    <>
      {skeletonItems.map((item, index) => (
        <RankingsItemCard.Skeleton style={styles.borderBottom} key={index} />
      ))}
    </>
  );
};

export type RankingsSceneRef = FlatList<OpenSeaCollection>;
const RankingsScene = observer(
  forwardRef<RankingsSceneRef, RankingsSceneProps>(
    ({ contentContainerStyle, ...props }, forwardedRef) => {
      const { rankingsStore } = useStore();
      const {
        collections,
        retrieveCollections,
        retrieveNextCollections,
        retrieveCollectionsLoading: loading,
        fetchCodes,
        pullToRefresh,
        setPullToRefresh,
      } = rankingsStore;

      const renderItem = useCallback(({ item, index }: RenderItemProps) => {
        return (
          <RankingsItemCard
            style={styles.borderBottom}
            rankNo={index + 1}
            collection={item}
            onPress={() => {}}
          />
        );
      }, []);

      const onRefresh = useCallback(() => {
        retrieveCollections(true);
        setPullToRefresh(true);
        wait(2000).then(() => setPullToRefresh(false));
      }, []);

      useEffect(() => {
        const fetch = async () => {
          await fetchCodes();
          await retrieveCollections();
        };

        fetch();
      }, []);

      return (
        <View style={{ flex: 1 }}>
          <View style={styles.borderBottom}>
            <RankingsListHeader />
          </View>
          <FlatList
            {...props}
            ref={forwardedRef}
            refreshControl={<RefreshControl refreshing={pullToRefresh} onRefresh={onRefresh} />}
            contentContainerStyle={[styles.container, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            onEndReached={retrieveNextCollections}
            data={collections}
            renderItem={renderItem}
            ListEmptyComponent={<RankingsItemSkeleton length={10} />}
            ListFooterComponent={<RankingsItemSkeleton />}
          />
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.iosBottomTabHeight,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
});

export default RankingsScene;

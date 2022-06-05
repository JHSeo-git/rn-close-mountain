import { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import CategoryCard from '../../../components/CategoryCard';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import useSkeletonItems from '../../../hooks/useSkeletonItems';
import type { Category } from '../../../api/opensea/collection/getCategories';
import type { SkeletonItem } from '../../../utils/styleUtils';

const CategoriesSection = observer(() => {
  const { mainHomeStore } = useStore();
  const {
    pullToRefresh,
    categories,
    retrieveCategories,
    retrieveCategoriesLoading: loading,
  } = mainHomeStore;
  const skeletonItems = useSkeletonItems();

  const renderSkeletonItem = useCallback(
    ({ item, index }: { item: SkeletonItem; index: number }) => {
      return <CategoryCard.Skeleton style={[styles.card, index === 0 && styles.listLeft]} />;
    },
    [],
  );

  const renderListItem = useCallback(({ item, index }: { item: Category; index: number }) => {
    return (
      <CategoryCard
        style={[styles.card, index === 0 && styles.listLeft]}
        coverImageUrl={item.coverImageUrl ?? ''}
        name={item.name ?? ''}
        // TODO: onPress
        onPress={() => {}}
      />
    );
  }, []);

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

  useEffect(() => {
    retrieveCategories();
  }, []);

  useEffect(() => {
    if (pullToRefresh) {
      retrieveCategories();
    }
  }, [pullToRefresh]);

  return (
    <SectionView>
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={categories}
          keyExtractor={item => `${item.id}`}
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

export default CategoriesSection;

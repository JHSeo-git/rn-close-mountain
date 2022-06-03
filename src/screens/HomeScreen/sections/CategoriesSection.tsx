import { useCallback, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import CategoryCard from '../../../components/CategoryCard';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import { generateSkeletonList } from '../../../utils/styleUtils';

const CategoriesSection = observer(() => {
  const { mainHomeStore } = useStore();
  const {
    pullToRefresh,
    categories,
    retrieveCategories,
    retrieveCategoriesLoading: loading,
  } = mainHomeStore;

  const renderSkeleton = useCallback(() => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={generateSkeletonList()}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <CategoryCard.Skeleton
            style={[styles.card, index === 0 && styles.listLeft, index === 2 && styles.listRight]}
          />
        )}
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
          renderItem={({ item, index }) => (
            <CategoryCard
              style={[
                styles.card,
                index === 0 && styles.listLeft,
                index === categories.length - 1 && styles.listRight,
              ]}
              coverImageUrl={item.coverImageUrl ?? ''}
              name={item.name ?? ''}
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

export default CategoriesSection;

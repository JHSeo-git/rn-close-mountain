import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import BrowseByCategoryCard from './BrowseByCategoryCard';
import SectionView from '../../../components/SectionView';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';

const BrowseByCategorySection = observer(() => {
  const { mainHomeStore } = useStore();
  const { categories, retrieveCategories, retrieveCategoriesLoading: loading } = mainHomeStore;

  useEffect(() => {
    retrieveCategories();
  }, []);

  return (
    <SectionView title="Browse by category">
      <View style={styles.cardWrapper}>
        {loading ? (
          <BrowseByCategoryCard.Skeleton />
        ) : categories.length === 0 ? (
          <BrowseByCategoryCard.Empty />
        ) : (
          categories.map((category, index) => (
            <BrowseByCategoryCard
              style={[index !== 0 && styles.cardMargin]}
              key={category.id}
              coverImageUrl={category.coverImageUrl ?? ''}
              name={category.name ?? ''}
            />
          ))
        )}
      </View>
    </SectionView>
  );
});

const styles = StyleSheet.create({
  cardWrapper: {
    alignItems: 'center',
  },
  cardMargin: {
    marginTop: SPACE.$8,
  },
});

export default BrowseByCategorySection;

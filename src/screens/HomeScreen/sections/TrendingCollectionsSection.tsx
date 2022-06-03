import { FlatList, StyleSheet } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import TrendingCollectionCard from './TrendingCollectionCard';
import SectionView from '../../../components/SectionView';
import { generateSkeletonList } from '../../../utils/styleUtils';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';

const TrendingCollectionsSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const flatListRef = useRef<FlatList>(null);

  const {
    pullToRefresh,
    trendingCollections,
    retrieveTrendingCollections,
    retrieveTrendingCollectionsLoading: loading,
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
          <TrendingCollectionCard.Skeleton
            style={[styles.card, index === 0 && styles.listLeft, index === 2 && styles.listRight]}
          />
        )}
      />
    );
  }, []);

  useEffect(() => {
    retrieveTrendingCollections();
  }, []);

  useEffect(() => {
    if (pullToRefresh) {
      retrieveTrendingCollections();
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
    <SectionView title={t('home.trending_collection')}>
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={trendingCollections}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => (
            <TrendingCollectionCard
              style={[
                styles.card,
                index === 0 && styles.listLeft,
                index === trendingCollections.length - 1 && styles.listRight,
              ]}
              coverImageUrl={item.banner}
              logoImageUrl={item.logo}
              name={item.name}
              username={item.owner.displayName ?? ''}
              onPress={() => {}}
              onUserPress={() => {}}
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
  slider: {},
  sliderContentContainer: {
    paddingVertical: SPACE.$2,
  },
});

export default TrendingCollectionsSection;

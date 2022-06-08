import { FlatList, StyleSheet } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import TrendingCollectionCard from './TrendingCollectionCard';
import SectionView from '../../../components/SectionView';
import useSkeletonItems from '../../../hooks/useSkeletonItems';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import type { SkeletonItem } from '../../../utils/styleUtils';
import type { TrendingCollection } from '../../../api/opensea/collection/getCollectionsScroller';
import type { HomeStackScreenProps } from '../../types';

const TrendingCollectionsSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const navigation = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const flatListRef = useRef<FlatList>(null);
  const skeletonItems = useSkeletonItems();

  const {
    pullToRefresh,
    trendingCollections,
    retrieveTrendingCollections,
    retrieveTrendingCollectionsLoading: loading,
  } = mainHomeStore;

  const renderSkeletonItem = useCallback(
    ({ item, index }: { item: SkeletonItem; index: number }) => {
      return (
        <TrendingCollectionCard.Skeleton style={[styles.card, index === 0 && styles.listLeft]} />
      );
    },
    [],
  );

  const renderListItem = useCallback(
    ({ item, index }: { item: TrendingCollection; index: number }) => {
      return (
        <TrendingCollectionCard
          style={[styles.card, index === 0 && styles.listLeft]}
          coverImageUrl={item.banner}
          logoImageUrl={item.logo}
          name={item.name}
          username={item.owner.displayName ?? ''}
          onPress={() => navigation.navigate('Collection', { collectionSlug: item.slug })}
          // TODO: onUserPress
          onUserPress={() => {}}
        />
      );
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
  slider: {},
  sliderContentContainer: {
    paddingVertical: SPACE.$2,
  },
});

export default TrendingCollectionsSection;

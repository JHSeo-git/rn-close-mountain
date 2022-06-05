import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import NotableDropCard from './NotableDropCard';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { getSlugFromLink } from '../../../utils/openseaUtils';
import { SPACE } from '../../../constants/design-token';
import type { HomeStackScreenProps } from '../../types';
import type { SkeletonItem } from '../../../utils/styleUtils';
import type { Promotion } from '../../../api/opensea/collection/getPromotion';
import useSkeletonItems from '../../../hooks/useSkeletonItems';

const NotableDropsSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const navigation = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const flatListRef = useRef<FlatList<Promotion>>(null);
  const skeletonItems = useSkeletonItems();

  const {
    pullToRefresh,
    notableDrops,
    retrieveNotableDrops,
    retrieveNotableDropsLoading: loading,
  } = mainHomeStore;

  const renderSkeletonItem = useCallback(
    ({ item, index }: { item: SkeletonItem; index: number }) => {
      return <NotableDropCard.Skeleton style={[styles.card, index === 0 && styles.listLeft]} />;
    },
    [],
  );

  const renderListItem = useCallback(({ item, index }: { item: Promotion; index: number }) => {
    return (
      <NotableDropCard
        style={[styles.card, index === 0 && styles.listLeft]}
        coverImageUrl={item.promoCardImg}
        name={item.promoHeader}
        onPress={() => {
          const collectionSlug = getSlugFromLink(item.promoCardLink);
          if (collectionSlug) {
            navigation.navigate('Collection', {
              collectionSlug,
            });
          }
        }}
      />
    );
  }, []);

  useEffect(() => {
    retrieveNotableDrops();
  }, []);

  useEffect(() => {
    if (pullToRefresh) {
      retrieveNotableDrops();
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
        data={skeletonItems}
        keyExtractor={item => `${item.id}`}
        renderItem={renderSkeletonItem}
      />
    );
  }, []);

  return (
    <SectionView title={t('home.notable_drops')}>
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={notableDrops}
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

export default NotableDropsSection;

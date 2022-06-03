import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { FlatList } from 'react-native-gesture-handler';
import NotableDropCard from './NotableDropCard';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import { generateSkeletonList } from '../../../utils/styleUtils';
import { useNavigation } from '@react-navigation/native';
import type { HomeStackScreenProps } from '../../types';
import type { Promotion } from '../../../api/testnets/collection/getPromotion';

const NotableDropsSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const navigation = useNavigation<HomeStackScreenProps<'Home'>['navigation']>();
  const flatListRef = useRef<FlatList<Promotion>>(null);

  const {
    pullToRefresh,
    notableDrops,
    retrieveNotableDrops,
    retrieveNotableDropsLoading: loading,
  } = mainHomeStore;

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
        data={generateSkeletonList()}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <NotableDropCard.Skeleton
            style={[styles.card, index === 0 && styles.listLeft, index === 2 && styles.listRight]}
          />
        )}
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
          renderItem={({ item, index }) => (
            <NotableDropCard
              style={[
                styles.card,
                index === 0 && styles.listLeft,
                index === notableDrops.length - 1 && styles.listRight,
              ]}
              coverImageUrl={item.promoCardImg}
              name={item.promoHeader}
              onPress={() =>
                item.id &&
                navigation.navigate('Collection', {
                  collectionId: item.id,
                })
              }
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

export default NotableDropsSection;

// <SectionView title={t('home.notable_drops')} titleViewStyle={styles.sectionHeader}>
//   {loading ? (
//     <View style={{ marginHorizontal: SPACE.$5 }}>
//       <NotableDropCarouselCard.Skeleton />
//     </View>
//   ) : notableDrops.length > 0 ? (
//     <>
//       <Carousel
//         ref={carouselRef}
//         sliderWidth={sliderWidth}
//         itemWidth={itemWidth}
//         inactiveSlideScale={1}
//         containerCustomStyle={styles.slider}
//         contentContainerCustomStyle={styles.sliderContentContainer}
//         onSnapToItem={index => setActiveSlide(index)}
//         data={notableDrops}
//         keyExtractor={item => `${item.id}`}
//         renderItem={({ item }) => (
//           <NotableDropCarouselCard
//             style={{ marginHorizontal: itemHorizontalMargin }}
//             coverImageUrl={item.promoCardImg}
//             name={item.promoHeader}
//             cardColor={item.cardColor}
//             chipText="Live"
//             onPress={() => {}}
//           />
//         )}
//       />
//       <UICarouselDots
//         dotsLength={notableDrops.length}
//         activeSlide={activeSlide}
//         carouselRef={carouselRef}
//       />
//     </>
//   ) : (
//     <View style={{ marginHorizontal: SPACE.$5 }}>
//       <NotableDropCarouselCard.Empty />
//     </View>
//   )}
// </SectionView>

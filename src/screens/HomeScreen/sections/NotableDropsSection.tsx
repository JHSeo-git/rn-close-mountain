import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-snap-carousel';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import SectionView from '../../../components/SectionView';
import UICarouselDots from '../../../components/UICarouselDots';
import CollectionCard from '../../../components/CollectionCard';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import { viewportWidth, widthByPercent } from '../../../utils/styleUtils';

const slideWidth = widthByPercent(100);
const itemHorizontalMargin = widthByPercent(2);
const itemInnerHorizontalMargin = itemHorizontalMargin / 2;

const sliderWidth = viewportWidth;
const itemWidth = slideWidth - itemHorizontalMargin * 2;

const NotableDropsSection = observer(() => {
  const { t } = useTranslation();
  const { collectionStore } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>();

  useFocusEffect(
    useCallback(() => {
      collectionStore.retrieveCollection({ category: 'NEW' });

      return () => {
        collectionStore.reset();
      };
    }, []),
  );

  return (
    <SectionView title={t('home.notable_drops')} titleViewStyle={styles.sectionHeader}>
      <Carousel
        ref={carouselRef}
        data={collectionStore.collections}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: itemInnerHorizontalMargin }}>
            <CollectionCard key={item.id} collection={item.attributes} />
          </View>
        )}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <UICarouselDots
        dotsLength={collectionStore.collections.length}
        activeSlide={activeSlide}
        carouselRef={carouselRef}
      />
    </SectionView>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: SPACE.$5,
  },
  slider: {},
  sliderContentContainer: {
    paddingVertical: SPACE.$2,
  },
});

export default NotableDropsSection;

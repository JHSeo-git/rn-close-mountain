import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-snap-carousel';
import { observer } from 'mobx-react-lite';
import NotableDropCard from './NotableDropCard';
import SectionView from '../../../components/SectionView';
import UICarouselDots from '../../../components/UICarouselDots';
import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import { viewportWidth, widthByPercent } from '../../../utils/styleUtils';
import { useFocusEffect } from '@react-navigation/native';

const slideWidth = widthByPercent(100);
const slideHorizontalMargin = SPACE.$5;

const sliderWidth = viewportWidth;
const itemHorizontalMargin = slideHorizontalMargin / 2;
const itemWidth = slideWidth - itemHorizontalMargin * 2;

const NotableDropsSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>();

  const {
    notableDrops,
    retrieveNotableDrops,
    retrieveNotableDropsLoading: loading,
  } = mainHomeStore;

  useFocusEffect(
    useCallback(() => {
      retrieveNotableDrops();
    }, []),
  );

  return (
    <SectionView title={t('home.notable_drops')} titleViewStyle={styles.sectionHeader}>
      {loading ? (
        <View style={{ marginHorizontal: SPACE.$5 }}>
          <NotableDropCard.Skeleton />
        </View>
      ) : notableDrops.length > 0 ? (
        <>
          <Carousel
            ref={carouselRef}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={1}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            onSnapToItem={index => setActiveSlide(index)}
            data={notableDrops}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <NotableDropCard
                style={{ marginHorizontal: itemHorizontalMargin }}
                coverImageUrl={item.imageUrl}
                name={item.name}
                chipText="Live"
                onPress={() => {}}
              />
            )}
          />
          <UICarouselDots
            dotsLength={notableDrops.length}
            activeSlide={activeSlide}
            carouselRef={carouselRef}
          />
        </>
      ) : (
        <View style={{ marginHorizontal: SPACE.$5 }}>
          <NotableDropCard.Empty />
        </View>
      )}
    </SectionView>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    flex: 1,
    paddingHorizontal: SPACE.$5,
  },
  slider: {},
  sliderContentContainer: {
    paddingVertical: SPACE.$2,
  },
});

export default NotableDropsSection;

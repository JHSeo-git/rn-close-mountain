import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-snap-carousel';
import NotableDropCard from './NotableDropCard';
import SectionView from '../../../components/SectionView';
import UICarouselDots from '../../../components/UICarouselDots';
import { SPACE } from '../../../constants/design-token';
import { viewportWidth, widthByPercent } from '../../../utils/styleUtils';
import { OpenSeaAsset } from '../../../utils/types/opensea/types';
import UIText from '../../../components/UIText';

const slideWidth = widthByPercent(100);
const slideHorizontalMargin = SPACE.$5;

const sliderWidth = viewportWidth;
const itemHorizontalMargin = slideHorizontalMargin / 2;
const itemWidth = slideWidth - itemHorizontalMargin * 2;

type NotableDropsSectionProps = {
  notableDrops: OpenSeaAsset[];
  loading: boolean;
};

const NotableDropsSection = ({ notableDrops, loading }: NotableDropsSectionProps) => {
  const { t } = useTranslation();

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>();

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
        <UIText>Empty</UIText>
      )}
    </SectionView>
  );
};

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

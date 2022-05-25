import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import { useStore } from '../../contexts/StoreContext';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { HomeStackScreenProps } from '../types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useCallback, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, SPACE } from '../../constants/design-token';
import { viewportWidth, widthByPercent } from '../../utils/styleUtils';
import CollectionCard from '../../components/CollectionCard';
import { useFocusEffect } from '@react-navigation/native';

const slideWidth = widthByPercent(100);
const itemHorizontalMargin = widthByPercent(2);
const itemInnerHorizontalMargin = itemHorizontalMargin / 2;

const sliderWidth = viewportWidth;
const itemWidth = slideWidth - itemHorizontalMargin * 2;

type HomeScreenProps = {} & HomeStackScreenProps<'Home'>;

const HomeScreen = observer(({}: HomeScreenProps) => {
  const { t } = useTranslation();
  const { authStore, collectionStore } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>();

  useFocusEffect(
    useCallback(() => {
      collectionStore.retrieveCollection();

      return () => {
        collectionStore.reset();
      };
    }, []),
  );

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.home')} />
      <ScrollView contentContainerStyle={viewStyles.flex_1_bg_white}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <UIText as="h3">Focused</UIText>
          </View>
          <Carousel
            ref={carouselRef}
            data={collectionStore.collections}
            renderItem={({ item }) => {
              const collection = item.attributes;
              const user = collection?.creator?.data?.attributes ?? '';
              return (
                <View style={{ marginHorizontal: itemInnerHorizontalMargin }}>
                  <CollectionCard
                    key={item.id}
                    name={collection.name}
                    creator={user.username}
                    category={collection.category}
                    logo={collection.logo ?? undefined}
                  />
                </View>
              );
            }}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            // hasParallaxImages={true}
            // firstItem={SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={1}
            // inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            // loop={true}
            // loopClonesPerSide={2}
            // autoplay={true}
            // autoplayDelay={500}
            // autoplayInterval={3000}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={collectionStore.collections.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor={COLORS.primary}
            dotStyle={styles.paginationDot}
            inactiveDotColor={COLORS.disabled}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            carouselRef={carouselRef?.current}
            tappableDots={!!carouselRef?.current}
            animatedDuration={100}
            //animatedFriction={4}
            animatedTension={50}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  section: {},
  sectionHeader: {
    paddingHorizontal: SPACE.$5,
  },
  card: {
    // overflow: 'hidden',
  },
  cardCover: {
    resizeMode: 'cover',
  },
  cardContent: {
    paddingVertical: SPACE.$4,
    paddingHorizontal: SPACE.$4,
  },
  slider: {},
  sliderContentContainer: {
    paddingVertical: 10,
  },
  paginationContainer: {
    paddingVertical: SPACE.$4,
  },
  paginationDot: {},
});

export default HomeScreen;

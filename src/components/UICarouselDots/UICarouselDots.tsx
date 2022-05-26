import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import { COLORS, SPACE } from '../../constants/design-token';

type UICarouselDotsProps = {
  dotsLength: number;
  activeSlide: number;
  carouselRef?: any;
};

const UICarouselDots = ({ dotsLength, activeSlide, carouselRef }: UICarouselDotsProps) => {
  return (
    <Pagination
      dotsLength={dotsLength}
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
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: SPACE.$4,
  },
  paginationDot: {},
});

export default UICarouselDots;

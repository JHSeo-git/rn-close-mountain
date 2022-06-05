import { View, StyleProp, ViewStyle, StyleSheet, Animated } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';
import { COLORS, SPACE } from '../../../constants/design-token';
import UIText from '../../../components/UIText';
import useFlashOpacity from '../../../hooks/useFlashOpacity';
import { useTranslation } from 'react-i18next';

type BrowseByCategoryCardProps = {
  style?: StyleProp<ViewStyle>;
  coverImageUrl: string;
  name: string;
  onPress?: () => void;
};

const BrowseByCategoryCard = ({
  style,
  coverImageUrl,
  name,
  onPress,
}: BrowseByCategoryCardProps) => {
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <Card.Cover source={{ uri: coverImageUrl }} style={styles.cardCover} />
      <View style={styles.cardContent}>
        <UIText as="h4">{name}</UIText>
      </View>
    </Card>
  );
};

const Skeleton = () => {
  const { opacity } = useFlashOpacity();
  return (
    <Card style={styles.card}>
      <Animated.View style={[styles.cardCover, styles.skeleton, { opacity }]} />
      <View style={styles.cardContent}>
        <Animated.View style={[styles.skeleton, { opacity, width: '50%', height: 40 }]} />
      </View>
    </Card>
  );
};

const Empty = () => {
  const { t } = useTranslation();
  return (
    <Card style={styles.card}>
      <View style={[styles.cardCover, styles.skeleton]} />
      <View style={styles.cardContent}>
        <UIText as="h4">{t('home.empty_browse_by_category')}</UIText>
      </View>
    </Card>
  );
};

BrowseByCategoryCard.Skeleton = Skeleton;
BrowseByCategoryCard.Empty = Empty;

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 250,
  },
  skeleton: {
    backgroundColor: COLORS.gray6,
  },
  cardCover: {
    height: 180,
  },
  cardContent: {
    flex: 1,
    paddingVertical: SPACE.$4,
    paddingHorizontal: SPACE.$4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BrowseByCategoryCard;

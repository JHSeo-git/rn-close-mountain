import { useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar, Card, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { observer } from 'mobx-react-lite';
import UIText from '../../../components/UIText';
import CustomButton from '../../../components/CustomButton';
import { useStore } from '../../../contexts/StoreContext';
import { COLORS, SIZES, SPACE } from '../../../constants/design-token';
import * as viewStyle from '../../../constants/global-styles/viewStyles';
import { useFocusEffect } from '@react-navigation/native';

const FeaturedAssetSecion = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();

  const asset = mainHomeStore.featuredAsset;

  useFocusEffect(
    useCallback(() => {
      mainHomeStore.retrieveFeaturedAsset();
    }, []),
  );

  return (
    <View style={styles.container}>
      {asset?.imageUrl && (
        <MaskedView
          style={styles.backdrop}
          maskElement={<LinearGradient style={{ flex: 1 }} colors={['white', 'transparent']} />}
        >
          <Image style={styles.backdropImage} source={{ uri: asset.imageUrl }} blurRadius={8} />
        </MaskedView>
      )}
      <View style={styles.inner}>
        <UIText as="h2" style={styles.title}>
          {t('home.featured_title')}
        </UIText>
        <UIText as="content" style={styles.description}>
          {t('home.featured_description')}
        </UIText>
        <CustomButton style={styles.button} onPress={() => {}}>
          <UIText as="strong_contrast">{t('common.explore')}</UIText>
        </CustomButton>
        {asset ? (
          <Card style={styles.card}>
            <Card.Cover style={styles.cardCover} source={{ uri: asset.imageUrl }} />
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardContentHead}>
                <Avatar.Image size={SIZES.$10} source={{ uri: asset.owner.profileImgUrl }} />
                <View style={styles.cardContentHeadInner}>
                  <UIText as="small_bold" numberOfLines={1}>
                    {asset.name}
                  </UIText>
                  <UIText as="small_primary" numberOfLines={1}>
                    {asset.owner.user?.username}
                  </UIText>
                </View>
              </View>
              <View style={styles.cardContentTail}>
                <IconButton
                  size={SIZES.$6}
                  icon="alert-circle-outline"
                  color={COLORS.text.secondary}
                  onPress={() => {}}
                />
              </View>
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.card}>
            <Card.Cover style={styles.cardCover} source={{ uri: undefined }} />
            <Card.Content style={[styles.cardContent, { height: 80 }]}>
              {/* TODO: skeleton */}
            </Card.Content>
          </Card>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.$8,
    position: 'relative',
  },
  inner: {
    ...viewStyle.flex_1_padding_x_20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    flex: 1,
  },
  backdropImage: {
    opacity: 0.3,
    resizeMode: 'cover',
    height: '100%',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    marginTop: SPACE.$4,
    textAlign: 'center',
  },
  button: {
    marginTop: SPACE.$4,
  },
  card: {
    height: 350,
    marginTop: SPACE.$10,
  },
  cardCover: {
    flex: 1,
  },
  cardContent: {
    paddingVertical: SPACE.$4,
    paddingHorizontal: SPACE.$4,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContentHead: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
  },
  cardContentHeadInner: {
    marginLeft: SPACE.$4,
  },
  cardContentTail: {
    marginLeft: SPACE.$2,
  },
});

export default FeaturedAssetSecion;

import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { observer } from 'mobx-react-lite';
import FeaturedAssetCard from './FeaturedAssetCard';
import UIText from '../../../components/UIText';
import CustomButton from '../../../components/CustomButton';
import { useStore } from '../../../contexts/StoreContext';
import { COLORS, SPACE } from '../../../constants/design-token';
import * as viewStyle from '../../../constants/global-styles/viewStyles';

const FeaturedAssetSecion = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();

  const {
    pullToRefresh,
    featuredAsset: asset,
    retrieveFeaturedAsset,
    retrieveFeaturedAssetLoading: loading,
  } = mainHomeStore;

  useEffect(() => {
    retrieveFeaturedAsset();
  }, []);

  useEffect(() => {
    if (pullToRefresh) {
      retrieveFeaturedAsset();
    }
  }, [pullToRefresh]);

  return (
    <View style={styles.container}>
      {asset?.imageUrl && (
        <MaskedView
          style={styles.backdrop}
          maskElement={
            <LinearGradient style={styles.backgropGradient} colors={['white', 'transparent']} />
          }
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
        {loading ? (
          <FeaturedAssetCard.Skeleton />
        ) : asset ? (
          <FeaturedAssetCard
            coverImageUrl={asset.imageUrl}
            profileImageUrl={asset.owner.profileImgUrl}
            name={asset.name}
            username={asset.owner.user?.username}
            onPress={() => {}}
            onIconPress={() => {}}
          />
        ) : (
          <FeaturedAssetCard.Empty />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACE.$8,
    backgroundColor: COLORS.loContrast,
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
  backgropGradient: {
    flex: 1,
  },
  backdropImage: {
    opacity: 0.5,
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
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentHeadInner: {
    flex: 1,

    marginLeft: SPACE.$4,
  },
  cardContentTail: {
    marginLeft: SPACE.$2,
  },
});

export default FeaturedAssetSecion;

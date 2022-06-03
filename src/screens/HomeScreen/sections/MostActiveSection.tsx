import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import MostActiveCard from './MostActiveCard';
import UIText from '../../../components/UIText';
import SectionView from '../../../components/SectionView';
import { useStore } from '../../../contexts/StoreContext';
import { generateSkeletonList } from '../../../utils/styleUtils';
import { SPACE } from '../../../constants/design-token';
import CustomButton from '../../../components/CustomButton';

const MostActiveSection = observer(() => {
  const { t } = useTranslation();
  const { mainHomeStore } = useStore();
  const listRef = useRef<ScrollView>(null);

  const {
    pullToRefresh,
    topCollections,
    retrieveTopCollections,
    retrieveTopCollectionsLoading: loading,
  } = mainHomeStore;

  const renderSkeleton = useCallback(() => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.list}
      >
        {generateSkeletonList(3).map((item, index) => (
          <MostActiveCard.Skeleton
            style={[styles.card, index === 0 && styles.listLeft, index === 2 && styles.listRight]}
            key={item.id}
          />
        ))}
      </ScrollView>
    );
  }, []);

  useEffect(() => {
    retrieveTopCollections();
  }, []);

  useEffect(() => {
    if (pullToRefresh) {
      retrieveTopCollections();
    }
  }, [pullToRefresh]);

  useEffect(() => {
    if (!loading) {
      listRef.current?.scrollTo({
        animated: true,
        x: 0,
        y: 0,
      });
    }
  }, [loading]);

  return (
    <SectionView title={t('home.most_active')}>
      {loading ? (
        renderSkeleton()
      ) : topCollections.length > 0 ? (
        <ScrollView
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.list}
        >
          {topCollections.map((collection, index) => (
            <MostActiveCard
              style={[styles.card, index === 0 && styles.listLeft]}
              key={collection.id}
              logoImageUrl={collection.logo ?? ''}
              name={collection.name ?? ''}
              isVerified={!!collection.isVerified}
              changedRatio={collection.statsV2?.thirtyDayChange ?? undefined}
              // TODO: onPress
              onPress={() => {}}
            />
          ))}
          <CustomButton
            mode="contained"
            icon="chevron-right"
            style={styles.buttonStyle}
            labelStyle={styles.buttonLabelStyle}
            contentStyle={{ flexDirection: 'row-reverse' }}
            // TODO: onPress
            onPress={() => {}}
          >
            {t('common.see_all')}
          </CustomButton>
        </ScrollView>
      ) : (
        <UIText>{/* TODO: empty */}empty</UIText>
      )}
    </SectionView>
  );
});

const styles = StyleSheet.create({
  list: {
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
  buttonStyle: {
    flex: 1,
    marginHorizontal: SPACE.$5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabelStyle: {
    marginVertical: SPACE.$5,
  },
});

export default MostActiveSection;

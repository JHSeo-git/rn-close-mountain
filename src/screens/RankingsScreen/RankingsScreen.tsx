import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import RankingsCard from './RankingsCard';
import Header from '../../components/Header';
import UIPicker from '../../components/UIPicker';
import UIScreenTitleView from '../../components/UIScreenTitleView';
import { COLORS, SIZES, SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { PaymentAsset } from '../../api/strapi/collection/types';
import type { PeriodCode } from '../../api/strapi/commonCode/types';
import type { RankingsStackScreenProps } from '../types';
import UISelect from '../../components/UISelect';

type RankingsFilter = 'period' | 'category' | 'chain';
type RankingsScreenProps = RankingsStackScreenProps<'Rankings'>;

const RankingsScreen = observer(({}: RankingsScreenProps) => {
  const { rankingsStore, collectionStore } = useStore();
  const { t } = useTranslation();

  const onFilterChange = async (
    filter: RankingsFilter,
    selectedFilter: string,
    selectedLabel: string,
  ) => {
    // if (filter === 'period') {
    //   rankingsStore.setSelectedPeriod(selectedFilter);
    //   rankingsStore.setSelectedPeriodLabel(selectedLabel);
    // } else if (filter === 'category') {
    //   rankingsStore.setSelectedCategory(selectedFilter);
    //   rankingsStore.setSelectedCategoryLabel(selectedLabel);
    // } else if (filter === 'chain') {
    //   rankingsStore.setSelectedChain(selectedFilter);
    //   rankingsStore.setSelectedChainLabel(selectedLabel);
    // }
    // await collectionStore.retrieveCollectionRankings({
    //   period: rankingsStore.selectedPeriod as PeriodCode,
    //   nftPaymentAsset: rankingsStore.selectedChain as PaymentAsset,
    //   // TODO: category,
    // });
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        rankingsStore.retrievePeriods(),
        rankingsStore.retrieveCategories(),
        rankingsStore.retrieveChains(),
      ]);
      await collectionStore.retrieveCollectionRankings({});
    };

    init();

    return () => {
      rankingsStore.reset();
    };
  }, []);

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.rankings')} />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={collectionStore.collectionRankings}
          keyExtractor={item => item.attributes.slug}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.top}>
                <UIScreenTitleView title={t('rankings.title')} subTitle={t('rankings.subTitle')} />
              </View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.filtersWrapper}
              >
                <View style={[styles.filterBox, styles.filterBoxHead]}>
                  <UISelect
                    leftIcon="update"
                    title={t('common.period')}
                    placeholder={t('common.period')}
                    selectedItem={rankingsStore.selectedPeriodItem}
                    setSelectedItem={rankingsStore.setSelectedPeriodItem}
                    items={rankingsStore.periodItems}
                  />
                </View>
                <View style={styles.filterBox}>
                  <UISelect
                    leftIcon="atom"
                    title={t('common.category')}
                    placeholder={t('common.category')}
                    selectedItem={rankingsStore.selectedCategoryItem}
                    setSelectedItem={rankingsStore.setSelectedCategoryItem}
                    items={rankingsStore.categoryItems}
                  />
                </View>
                <View style={[styles.filterBox, styles.filterBoxTail]}>
                  <UISelect
                    leftIcon="link-variant"
                    title={t('common.chain')}
                    placeholder={t('common.chain')}
                    selectedItem={rankingsStore.selectedChainItem}
                    setSelectedItem={rankingsStore.setSelectedChainItem}
                    items={rankingsStore.chainItems}
                  />
                </View>
              </ScrollView>
            </>
          }
          renderItem={({ item, index }) => (
            <RankingsCard
              rankNo={index + 1}
              collection={item.attributes}
              onPress={() => {}}
              style={[styles.bb, index === 0 && styles.bt]}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  top: {
    // paddingHorizontal: SPACE.$5,
  },
  flatList: {
    paddingTop: SIZES.$5,
    paddingBottom: SIZES.iosBottomTabHeight,
  },
  filtersWrapper: {
    marginTop: SPACE.$8,
    marginBottom: SPACE.$5,
  },
  filterBox: {
    flex: 1,
    marginLeft: SPACE.$2,
  },
  filterBoxHead: {
    marginLeft: SPACE.$5,
  },
  filterBoxTail: {
    marginRight: SPACE.$5,
  },
  main: {
    flex: 1,
  },
  bt: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
  bb: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
});

export default RankingsScreen;

import { useCallback, useEffect } from 'react';
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
import type { PaymentAsset } from '../../api/collection/types';
import type { PeriodCode } from '../../api/commonCode/types';
import type { RankingsStackScreenProps } from '../types';
import { useFocusEffect } from '@react-navigation/native';

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
    if (filter === 'period') {
      rankingsStore.setSelectedPeriod(selectedFilter);
      rankingsStore.setSelectedPeriodLabel(selectedLabel);
    } else if (filter === 'category') {
      rankingsStore.setSelectedCategory(selectedFilter);
      rankingsStore.setSelectedCategoryLabel(selectedLabel);
    } else if (filter === 'chain') {
      rankingsStore.setSelectedChain(selectedFilter);
      rankingsStore.setSelectedChainLabel(selectedLabel);
    }

    await collectionStore.retrieveCollectionRankings({
      period: rankingsStore.selectedPeriod as PeriodCode,
      nftPaymentAsset: rankingsStore.selectedChain as PaymentAsset,
      // TODO: category,
    });
  };

  // useEffect(() => {
  //   // TODO: filters
  //   const init = async () => {
  //     await Promise.all([
  //       rankingsStore.retrievePeriods(),
  //       rankingsStore.retrieveCategories(),
  //       rankingsStore.retrieveChains(),
  //     ]);
  //     await collectionStore.retrieveCollectionRankings({});
  //   };

  //   init();

  //   return () => {
  //     rankingsStore.reset();
  //     collectionStore.reset();
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
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
        collectionStore.reset();
      };
    }, []),
  );

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.rankings')} />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={collectionStore.collections}
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
                <View style={styles.filterBox}>
                  <UIPicker
                    leftIcon="update"
                    title={t('common.period')}
                    placeholder={t('common.period')}
                    selectedValue={rankingsStore.selectedPeriod}
                    selectedLabel={rankingsStore.selectedPeriodLabel}
                    onValueChange={(item, index) =>
                      onFilterChange(
                        'period',
                        item,
                        rankingsStore.periods[index - 1].attributes.codeName,
                      )
                    }
                  >
                    {rankingsStore.periods.map((item, index) => (
                      <UIPicker.Item
                        key={index}
                        label={item.attributes.codeName}
                        value={item.attributes.code}
                      />
                    ))}
                  </UIPicker>
                </View>
                <View style={styles.filterBox}>
                  <UIPicker
                    leftIcon="atom"
                    title={t('common.category')}
                    placeholder={t('common.category')}
                    selectedValue={rankingsStore.selectedCategory}
                    selectedLabel={rankingsStore.selectedCategoryLabel}
                    onValueChange={(item, index) =>
                      onFilterChange(
                        'category',
                        item,
                        rankingsStore.categories[index - 1].attributes.codeName,
                      )
                    }
                  >
                    {rankingsStore.categories.map((item, index) => (
                      <UIPicker.Item
                        key={index}
                        label={item.attributes.codeName}
                        value={item.attributes.code}
                      />
                    ))}
                  </UIPicker>
                </View>
                <View style={[styles.filterBox, styles.mr]}>
                  <UIPicker
                    leftIcon="link-variant"
                    title={t('common.chain')}
                    placeholder={t('common.chain')}
                    selectedValue={rankingsStore.selectedChain}
                    selectedLabel={rankingsStore.selectedChainLabel}
                    onValueChange={(item, index) =>
                      onFilterChange(
                        'chain',
                        item,
                        rankingsStore.chains[index - 1].attributes.codeName,
                      )
                    }
                  >
                    {rankingsStore.chains.map((item, index) => (
                      <UIPicker.Item
                        key={index}
                        label={item.attributes.codeName}
                        value={item.attributes.code}
                      />
                    ))}
                  </UIPicker>
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
    marginBottom: SPACE.$2,
  },
  filterBox: {
    flex: 1,
    marginLeft: SPACE.$2,
  },
  mr: {
    marginRight: SPACE.$2,
  },
  main: {
    flex: 1,
    marginTop: SPACE.$2,
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

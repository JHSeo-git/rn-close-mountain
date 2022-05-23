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
import type { RankingsStackScreenProps } from '../types';

type RankingsFilter = 'category' | 'chain';
type RankingsScreenProps = RankingsStackScreenProps<'Rankings'>;

const RankingsScreen = observer(({}: RankingsScreenProps) => {
  const { rankingsStore, collectionStore } = useStore();
  const { t } = useTranslation();

  const onFilterChange = (filter: RankingsFilter, selectedFilter: string) => {
    if (filter === 'category') {
      rankingsStore.setSelectedCategory(selectedFilter);
    } else if (filter === 'chain') {
      rankingsStore.setSelectedChain(selectedFilter);
    }
  };

  useEffect(() => {
    // TODO: filters
    const process = async () => {
      await rankingsStore.initFilter();
      await collectionStore.retrieveCollectionRankings();
    };

    process();

    return () => {
      rankingsStore.reset();
      collectionStore.reset();
    };
  }, []);

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
                    leftIcon="atom"
                    title={t('common.category')}
                    placeholder={t('common.category')}
                    selectedValue={rankingsStore.selectedCategory}
                    onValueChange={(item, index) => onFilterChange('category', item)}
                  >
                    {rankingsStore.categories.map((item, index) => (
                      <UIPicker.Item key={index} label={item} value={item} />
                    ))}
                  </UIPicker>
                </View>
                <View style={styles.filterBox}>
                  <UIPicker
                    leftIcon="link-variant"
                    title={t('common.chain')}
                    placeholder={t('common.chain')}
                    selectedValue={rankingsStore.selectedChain}
                    onValueChange={(item, index) => onFilterChange('chain', item)}
                  >
                    {rankingsStore.chains.map((item, index) => (
                      <UIPicker.Item key={index} label={item} value={item} />
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

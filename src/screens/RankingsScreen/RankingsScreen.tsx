import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { RankingsStackScreenProps } from '../types';
import CustomTextInput from '../../components/CustomTextInput';
import UIPicker from '../../components/UIPicker';
import UIScreenTitleView from '../../components/UIScreenTitleView';
import { SPACE } from '../../constants/design-token';
import { ScrollView } from 'react-native-gesture-handler';
import UIText from '../../components/UIText';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';

type RankingsScreenProps = RankingsStackScreenProps<'Rankings'>;

const RankingsScreen = observer(({}: RankingsScreenProps) => {
  const { rankingsStore } = useStore();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChain, setSelectedChain] = useState('');

  useEffect(() => {
    rankingsStore.getCategories();
    rankingsStore.getChains();
  }, []);

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.rankings')} />
      <View style={viewStyles.flex_1_padding_y_20}>
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
              selectedValue={selectedCategory}
              onValueChange={(item, index) => setSelectedCategory(item)}
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
              selectedValue={selectedChain}
              onValueChange={(item, index) => setSelectedChain(item)}
            >
              {rankingsStore.chains.map((item, index) => (
                <UIPicker.Item key={index} label={item} value={item} />
              ))}
            </UIPicker>
          </View>
          <View style={styles.filterBox}>
            <UIPicker
              leftIcon="link-variant"
              title={t('common.chain')}
              placeholder={t('common.chain')}
              selectedValue={selectedChain}
              onValueChange={(item, index) => setSelectedChain(item)}
            >
              {rankingsStore.chains.map((item, index) => (
                <UIPicker.Item key={index} label={item} value={item} />
              ))}
            </UIPicker>
          </View>
          <View style={[styles.filterBox, styles.mr]}>
            <UIPicker
              leftIcon="link-variant"
              title={t('common.chain')}
              placeholder={t('common.chain')}
              selectedValue={selectedChain}
              onValueChange={(item, index) => setSelectedChain(item)}
            >
              {rankingsStore.chains.map((item, index) => (
                <UIPicker.Item key={index} label={item} value={item} />
              ))}
            </UIPicker>
          </View>
        </ScrollView>
        <ScrollView>
          <View style={styles.main}>
            <UIText>Item</UIText>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  top: {
    paddingHorizontal: SPACE.$5,
  },
  filtersWrapper: {
    marginTop: SPACE.$8,
  },
  filterBox: {
    flex: 1,
    marginLeft: SPACE.$2,
  },
  mr: {
    marginRight: SPACE.$2,
  },
  main: {
    ...viewStyles.flex_1_padding_x_20,
    flex: 1,
    marginTop: SPACE.$8,
  },
});

export default RankingsScreen;

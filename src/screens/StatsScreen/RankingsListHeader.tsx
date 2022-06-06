import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import UISelect from '../../components/UISelect';
import { useStore } from '../../contexts/StoreContext';
import { COLORS, SPACE } from '../../constants/design-token';

const RankingsListHeader = observer(() => {
  const { t } = useTranslation();
  const { rankingsStore } = useStore();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flexShrink: 0 }}
      contentContainerStyle={styles.listHeader}
    >
      <View style={styles.filterBox}>
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
      <View style={styles.filterBox}>
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
  );
});

const styles = StyleSheet.create({
  listHeader: {
    paddingVertical: SPACE.$3,
    paddingRight: SPACE.$3,
  },
  filterBox: {
    marginLeft: SPACE.$3,
  },
});

export default RankingsListHeader;

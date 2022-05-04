import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { MainTabScreenProps } from '../types';

type SearchScreenProps = MainTabScreenProps<'Search'>;

const SearchScreen = ({}: SearchScreenProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.search')} />
      <View style={viewStyles.flex_1_padding_20}>
        <UIText>Search</UIText>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

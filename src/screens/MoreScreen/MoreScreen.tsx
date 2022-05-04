import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { MainTabScreenProps } from '../types';

type MoreScreenProps = MainTabScreenProps<'More'>;

const MoreScreen = ({}: MoreScreenProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.more')} />
      <View style={viewStyles.flex_1_padding_20}>
        <UIText>More</UIText>
      </View>
    </SafeAreaView>
  );
};

export default MoreScreen;

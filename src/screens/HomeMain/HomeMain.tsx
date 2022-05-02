import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { HomeStackScreenProps } from '../../navigation/types';

type HomeMainProps = {} & HomeStackScreenProps<'HomeMain'>;

const HomeMain = ({}: HomeMainProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('common.main')} />
      <View style={viewStyles.flex_1_padding_20}>
        <UIText>HomeMain</UIText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeMain;

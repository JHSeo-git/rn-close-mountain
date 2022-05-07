import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UIText from '../../components/UIText';
import * as viewStyles from '../../constants/global-styles/viewStyles';
import type { HomeStackScreenProps } from '../types';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';

type HomeScreenProps = {} & HomeStackScreenProps<'Home'>;

const HomeScreen = observer(({}: HomeScreenProps) => {
  const { t } = useTranslation();
  const { authStore } = useStore();

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title={t('common.home')} />
      <View style={viewStyles.flex_1_padding_20}>
        <UIText>
          {authStore.isAuthenticated ? 'Welcome My Lord' : 'Not Logged in'}
        </UIText>
      </View>
    </SafeAreaView>
  );
});

export default HomeScreen;

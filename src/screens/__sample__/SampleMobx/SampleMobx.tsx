import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../contexts/StoreContext';
import Header from '../../../components/Header';
import UIText from '../../../components/UIText';
import SampleButton from '../../../components/__sample__/SampleButton';
import { SPACE } from '../../../constants/design-token';
import * as textStyles from '../../../constants/global-styles/textStyles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';

const SampleMobx = observer(() => {
  const { t } = useTranslation();
  const { SampleStore } = useStore();

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title="Mobx" hasGoback />
      <View style={viewStyles.flex_1_padding_20}>
        <UIText style={textStyles.h3}>Count: {SampleStore.count}</UIText>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => SampleStore.increment()}>
            <UIText style={[textStyles.strong, textStyles.contrast]}>
              {t('common.increment')}
            </UIText>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => SampleStore.decrement()}>
            <UIText style={[textStyles.strong, textStyles.contrast]}>
              {t('common.decrement')}
            </UIText>
          </SampleButton>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  buttonBox: {
    marginVertical: SPACE.$2,
  },
});

export default SampleMobx;

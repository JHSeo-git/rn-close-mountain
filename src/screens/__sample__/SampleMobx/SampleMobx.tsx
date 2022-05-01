import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header';
import { textStyles, viewStyles } from '../../../constants/global-styles';

import { useStore } from '../../../contexts/StoreContext';
import { SPACE } from '../../../constants/design-token';
import SampleButton from '../../../components/__sample__/SampleButton';

const SampleMobx = observer(() => {
  const { t } = useTranslation();
  const { SampleStore } = useStore();

  return (
    <SafeAreaView style={viewStyles.flex_1_bg_white}>
      <Header title="Mobx" hasGoback />
      <View style={viewStyles.flex_1_padding_20}>
        <Text style={textStyles.h3}>Count: {SampleStore.count}</Text>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => SampleStore.increment()}>
            <Text style={[textStyles.strong, textStyles.contrast]}>
              {t('common.increment')}
            </Text>
          </SampleButton>
        </View>
        <View style={styles.buttonBox}>
          <SampleButton onPress={() => SampleStore.decrement()}>
            <Text style={[textStyles.strong, textStyles.contrast]}>
              {t('common.decrement')}
            </Text>
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

import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { useStore } from '../../contexts/StoreContext';
import { COLORS } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';

const Loader = observer(() => {
  const { loaderStore } = useStore();

  if (!loaderStore.loading) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.container}>
        <ActivityIndicator animating={loaderStore.loading} size="large" color={COLORS.primary} />
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  container: {
    ...viewStyles.center,
    flex: 1,
    zIndex: 9999,
    backgroundColor: COLORS.grayA8,
  },
});

export default Loader;

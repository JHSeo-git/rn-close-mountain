import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { useStore } from '../../contexts/StoreContext';
import { COLORS } from '../../constants/design-token';
import * as viewStyles from '../../constants/global-styles/viewStyles';

type LoaderProps = {
  force?: boolean;
};

const Loader = observer(({ force = false }: LoaderProps) => {
  const { loaderStore } = useStore();

  if (!force && !loaderStore.visible) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.container}>
        <ActivityIndicator animating={loaderStore.visible} size="large" color={COLORS.primary} />
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  container: {
    ...viewStyles.center,
    flex: 1,
    zIndex: 9999,
    backgroundColor: COLORS.grayA11,
  },
});

export default Loader;

import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import UIIcon from '../UIIcon';
import UIText from '../UIText';
import PatchSnackbar from '../__paper__/PatchSnackbar';

type CustomSnackbarProps = {};

const CustomSnackbar = observer(({}: CustomSnackbarProps) => {
  const { snackbarStore } = useStore();

  return (
    <PatchSnackbar
      duration={PatchSnackbar.DURATION_SHORT}
      visible={snackbarStore.visible}
      style={styles.container}
      wrapperStyle={{ zIndex: 500 }}
      onDismiss={() => snackbarStore.hideSnackbar()}
    >
      <View style={styles.contentBox}>
        {snackbarStore.type === 'info' && (
          <View style={styles.iconBox}>
            <UIIcon name="alert-circle-outline" size={24} color={COLORS.loContrast} />
          </View>
        )}
        {snackbarStore.type === 'success' && (
          <View style={styles.iconBox}>
            <UIIcon name="check-circle-outline" size={24} color={COLORS.success} />
          </View>
        )}
        {snackbarStore.type === 'error' && (
          <View style={styles.iconBox}>
            <UIIcon name="alert-outline" size={24} color={COLORS.error} />
          </View>
        )}
        <UIText as="h4" style={styles.text}>
          {snackbarStore.message}
        </UIText>
      </View>
    </PatchSnackbar>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: RADII.md,
  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    marginRight: SPACE.$2,
  },
  text: {
    color: COLORS.loContrast,
  },
});

export default CustomSnackbar;

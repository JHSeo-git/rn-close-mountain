import { View, StyleSheet, Animated, ImageStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import UIText from '../../components/UIText';
import UIIcon from '../../components/UIIcon';
import { useStore } from '../../contexts/StoreContext';
import { numberWithCommas } from '../../utils/formatUtils';
import { COLORS, RADII, SPACE } from '../../constants/design-token';

type DashboardItemProps = {
  icon: string;
  value: string;
  label: string;
};
const DashboardItem = ({ icon, value, label }: DashboardItemProps) => {
  return (
    <View style={styles.dashboardBoxItem}>
      <UIIcon name={icon} size={24} color={COLORS.text.secondary} />
      <UIText as="small_bold" style={{ marginTop: SPACE.$2 }}>
        {value}
      </UIText>
      <UIText as="xsmall" style={{ marginTop: SPACE.$1, color: COLORS.text.secondary }}>
        {label}
      </UIText>
    </View>
  );
};

type AssetScreenMainViewProps = {
  heroImageHeight: number;
  heroImageAnimatedstyle: Animated.AnimatedProps<ImageStyle>;
};

const AssetScreenMainView = observer(
  ({ heroImageHeight, heroImageAnimatedstyle }: AssetScreenMainViewProps) => {
    const { t } = useTranslation();
    const { assetStore } = useStore();
    const { asset } = assetStore;

    return (
      <View style={styles.container}>
        <View style={[styles.heroImageBox, { height: heroImageHeight }]}>
          <Animated.Image
            source={{ uri: asset?.imageUrl }}
            style={[styles.heroImage, heroImageAnimatedstyle]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentBox}>
          <UIText as="h4_primary">{asset?.collection.name}</UIText>
          <UIText as="h4" style={{ marginTop: SPACE.$2 }}>
            {asset?.name}
          </UIText>
        </View>
        <View style={styles.dashboardBox}>
          <DashboardItem
            icon="note-outline"
            value={numberWithCommas(asset?.collection.stats.numReports ?? 0)}
            label={t('common.reports')}
          />
          <DashboardItem
            icon="account-circle-outline"
            value={numberWithCommas(asset?.collection.stats.numOwners ?? 0)}
            label={t('common.owners')}
          />
          <DashboardItem
            icon="note-multiple-outline"
            value={numberWithCommas(asset?.numSales ?? 0)}
            label={t('common.sales')}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {},
  heroImageBox: {
    padding: SPACE.$2,
  },
  heroImage: {
    height: '100%',
    width: '100%',
    borderRadius: RADII.lg,
  },
  contentBox: {
    marginTop: SPACE.$4,
    paddingHorizontal: SPACE.$5,
  },
  dashboardBox: {
    marginVertical: SPACE.$6,
    paddingHorizontal: SPACE.$4,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardBoxItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AssetScreenMainView;

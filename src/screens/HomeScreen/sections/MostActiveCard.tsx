import { Animated, Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import UIText from '../../../components/UIText';
import CustomTouchableRipple from '../../../components/CustomTouchableRipple';
import { COLORS, RADII, SPACE } from '../../../constants/design-token';
import VerifiedIcon from '../../../assets/icons/verified-icon.svg';
import useSkeleton from '../../../hooks/useSkeleton';

type MostActiveCardProps = {
  style?: StyleProp<ViewStyle>;
  logoImageUrl: string;
  isVerified: boolean;
  name: string;
  changedRatio?: number;
  onPress?: () => void;
};

const generateChangedRatioText = (changedRatio?: number) => {
  if (!changedRatio) {
    return '-';
  }
  const symbol = changedRatio > 0 ? '+' : '';
  return `${symbol}${(changedRatio * 100).toFixed(2)}%`;
};
const generateChangedRatioColor = (changedRatio?: number) => {
  if (!changedRatio || changedRatio === 0) {
    return COLORS.text.secondary;
  }
  return changedRatio > 0 ? COLORS.success : COLORS.error;
};

const MostActiveCard = ({
  style,
  logoImageUrl,
  isVerified,
  name,
  changedRatio,
  onPress,
}: MostActiveCardProps) => {
  return (
    <CustomTouchableRipple style={[styles.card, style]} onPress={onPress}>
      <>
        <View style={styles.head}>
          <Image source={{ uri: logoImageUrl }} style={styles.logo} resizeMode="cover" />
          {isVerified && (
            <View style={styles.verifiedIconBox}>
              <VerifiedIcon
                width={20}
                height={20}
                style={styles.verifiedIcon}
                color={COLORS.primary}
              />
            </View>
          )}
        </View>
        <View style={styles.tail}>
          <UIText as="small_bold" numberOfLines={1}>
            {name}
          </UIText>
          <UIText
            as="small"
            numberOfLines={1}
            style={{ marginTop: SPACE.$1, color: generateChangedRatioColor(changedRatio) }}
          >
            {generateChangedRatioText(changedRatio)}
          </UIText>
        </View>
      </>
    </CustomTouchableRipple>
  );
};

const Skeleton = ({ style }: Pick<MostActiveCardProps, 'style'>) => {
  const { opacity } = useSkeleton();

  return <Animated.View style={[styles.card, styles.skeleton, { opacity }, style]} />;
};

MostActiveCard.Skeleton = Skeleton;

const styles = StyleSheet.create({
  card: {
    height: 60,
    width: 200,
    borderRadius: RADII.lg,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeleton: {
    flex: 1,
    backgroundColor: COLORS.skeleton,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  verifiedIconBox: {
    position: 'absolute',
    right: -SPACE.$1,
    bottom: -SPACE.$1,

    backgroundColor: COLORS.loContrast,
    padding: 1,

    borderRadius: 9999,

    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedIcon: {},
  head: {
    position: 'relative',
  },
  tail: {
    flex: 1,
    marginLeft: SPACE.$3,
    paddingRight: SPACE.$3,
  },
});

export default MostActiveCard;

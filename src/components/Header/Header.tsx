import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  COLORS,
  FONTS,
  FONTSIZES,
  SIZES,
  SPACE,
} from '../../constants/design-token';
import { viewStyles } from '../../constants/global-styles';
import ChevronLeftSvg from '../../assets/icons/chevron-left.svg';

type HeaderProps = {
  title?: string;
  hasGoback?: boolean;
};

const Header = ({ title, hasGoback }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        {hasGoback && (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftSvg width={32} height={32} color={COLORS.hiContrast} />
          </Pressable>
        )}
      </View>
      <View style={styles.centerBox}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.rightBox}>
        <Text> </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.headerHeight,
    paddingHorizontal: SPACE.$5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBox: {},
  centerBox: {
    ...StyleSheet.absoluteFillObject,
    ...viewStyles.center,
    zIndex: -1,
  },
  rightBox: {},
  title: {
    fontSize: FONTSIZES.xl,
    fontFamily: FONTS.bold,
  },
});

export default Header;

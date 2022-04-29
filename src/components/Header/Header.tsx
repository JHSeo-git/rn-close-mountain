import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';

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
            <Text>back</Text>
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
    height: 44,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBox: {},
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
  rightBox: {},
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
});

export default Header;

import { View, Text, StyleSheet } from 'react-native';

type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}></View>
      <View style={styles.centerBox}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.rightBox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBox: {},
  centerBox: {},
  rightBox: {},
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
});

export default Header;

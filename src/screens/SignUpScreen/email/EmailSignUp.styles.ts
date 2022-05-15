import { StyleSheet } from 'react-native';
import { COLORS, SPACE } from '../../../constants/design-token';

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
  },
  inputBox: {
    marginTop: SPACE.$10,
  },
  inputBelowBox: {
    marginTop: SPACE.$2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  footerBox: {
    marginTop: SPACE.$8,
  },
  buttonBox: {
    paddingTop: SPACE.$5,
  },
  helperBox: {
    marginTop: SPACE.$2,
  },
  textButtonLabel: {
    marginVertical: SPACE.$2,
    marginHorizontal: SPACE.$3,
  },
  timerText: {
    color: COLORS.gray11,
    marginHorizontal: SPACE.$3,
  },
});

export default styles;

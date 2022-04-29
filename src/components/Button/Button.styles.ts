import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    // iOS 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 안드로이드 전용 그림자 설정
    elevation: 5,
    // 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
    // iOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
    overflow: Platform.select({ android: 'hidden' }),
  },
  button: {
    padding: 10,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSmooth: {
    borderRadius: 10,
  },
  buttonRound: {
    borderRadius: 9999,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default styles;

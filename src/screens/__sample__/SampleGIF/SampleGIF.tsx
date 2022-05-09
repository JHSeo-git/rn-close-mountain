import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import UIText from '../../../components/UIText';
import * as textStyles from '../../../constants/global-styles/textStyles';
import * as viewStyles from '../../../constants/global-styles/viewStyles';
import { SPACE } from '../../../constants/design-token';

import SampleGifImage from '../../../assets/images/sample.gif';

const SampleGIF = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="GIF" />
      <View style={styles.main}>
        <View style={styles.spaceView}>
          <UIText style={textStyles.strong}>Sample GIF (200 X 200)</UIText>
          <Image source={SampleGifImage} style={styles.image} />
        </View>
        <View style={styles.spaceView}>
          <UIText style={textStyles.strong}>Sample GIF (width: 100%)</UIText>
          <Image source={SampleGifImage} style={styles.imageMax} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...viewStyles.flex_1_bg_white,
  },
  main: {
    ...viewStyles.flex_1_padding_x_20,
  },
  text: {
    ...textStyles.content,
  },
  spaceView: {
    marginVertical: SPACE.$5,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageMax: {
    width: '100%',
  },
});

export default SampleGIF;

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import UIText from '../../components/UIText';
import FadeOutGradient from '../../components/FadeOutGradient';
import CustomTouchableRipple from '../../components/CustomTouchableRipple';
import { SPACE } from '../../constants/design-token';

type CollectionMoreAreaProps = {
  style?: StyleProp<ViewStyle>;
  text: string;
};

// TODO: better animating
const CollectionMoreArea = ({ style, text }: CollectionMoreAreaProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const height = useRef(new Animated.Value(0)).current;
  const interpolateHeight = height.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  const interpolateOpacity = height.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
  });

  useEffect(() => {
    if (open) {
      Animated.timing(height, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [open]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textBox,
          {
            height: interpolateHeight,
          },
          style,
        ]}
      >
        <UIText as="xsmall" numberOfLines={open ? undefined : 2}>
          {text}
        </UIText>
      </Animated.View>
      <View style={styles.buttonArea}>
        <Animated.View style={[styles.backdrop, { opacity: interpolateOpacity }]}>
          <FadeOutGradient style={{ flex: 1 }} />
        </Animated.View>
        <CustomTouchableRipple style={styles.buttonStyle}>
          <UIText as="xsmall_primary" onPress={() => setOpen(!open)}>
            {open ? t('common.less-') : t('common.more+')}
          </UIText>
        </CustomTouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACE.$2,
  },
  textBox: {
    overflow: 'hidden',
    flexShrink: 1,
    minHeight: 36, // 12(font height) * 2(two) * 1.5(line height)
  },
  buttonArea: {
    position: 'relative',
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    top: '-100%',
  },
  buttonStyle: {
    marginTop: SPACE.$2,
  },
});

export default CollectionMoreArea;

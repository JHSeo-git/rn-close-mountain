import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import UIText from '../UIText';
import { COLORS, SPACE } from '../../constants/design-token';
import CustomTouchableRipple from '../CustomTouchableRipple';

type UISelectItemProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  selected: boolean;
  onPress: () => void;
};

const UISelectItem = ({ style, label, selected, onPress }: UISelectItemProps) => {
  return (
    <CustomTouchableRipple style={[styles.container, style]} onPress={onPress}>
      <UIText as="small" style={{ color: selected ? COLORS.primary : COLORS.text.primary }}>
        {label}
      </UIText>
    </CustomTouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.$4,
    paddingHorizontal: SPACE.$4,

    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UISelectItem;

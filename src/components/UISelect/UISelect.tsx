import { View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import UIBottomSheetModal, { UIBottomSheetModalRef } from '../UIBottomSheetModal';
import UISelectItem from './UISelectItem';
import CustomTouchableRipple from '../CustomTouchableRipple';
import UIIcon from '../UIIcon';
import { COLORS, RADII, SPACE } from '../../constants/design-token';
import UIText from '../UIText';

export type SelectItem = {
  key: string | number;
  label: string;
  value: string;
};

type UISelectProps = {
  leftIcon?: React.ReactNode;
  title: string;
  placeholder: string;
  numberOfLines?: number;
  items: SelectItem[];
  selectedItem?: SelectItem;
  setSelectedItem: (value: SelectItem) => void;
};
const UISelect = ({
  leftIcon,
  title,
  items,
  placeholder,
  numberOfLines = 1,
  selectedItem,
  setSelectedItem,
}: UISelectProps) => {
  const ref = useRef<UIBottomSheetModalRef>(null);

  const onPress = () => {
    ref.current?.present();
  };
  const onSelect = (item: SelectItem) => {
    setSelectedItem(item);
    ref.current?.dismiss();
  };

  return (
    <>
      <CustomTouchableRipple style={styles.button} onPress={onPress}>
        <View style={styles.buttonBox}>
          {leftIcon &&
            (typeof leftIcon === 'string' ? (
              <UIIcon
                name={leftIcon}
                size={20}
                color={COLORS.secondary}
                style={{ marginRight: SPACE.$2 }}
              />
            ) : (
              leftIcon
            ))}
          {selectedItem ? (
            <UIText numberOfLines={numberOfLines} as="small" style={{ flex: 1 }}>
              {selectedItem.label}
            </UIText>
          ) : (
            <UIText
              numberOfLines={numberOfLines}
              as="small"
              style={{ color: COLORS.text.teritary }}
            >
              {placeholder}
            </UIText>
          )}
          <UIIcon
            name="chevron-down"
            size={20}
            color={COLORS.text.secondary}
            style={{ marginLeft: SPACE.$2 }}
          />
        </View>
      </CustomTouchableRipple>
      <UIBottomSheetModal ref={ref} title={title}>
        <View style={styles.list}>
          {items.map((item, index) => (
            <UISelectItem
              style={index !== 0 && styles.borderTop}
              key={item.key}
              label={item.label}
              selected={item.key === selectedItem?.key}
              onPress={() => onSelect(item)}
            />
          ))}
        </View>
      </UIBottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingVertical: SPACE.$3,
    paddingLeft: SPACE.$4,
    paddingRight: SPACE.$3,
    borderRadius: RADII.lg,
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
});

export default UISelect;

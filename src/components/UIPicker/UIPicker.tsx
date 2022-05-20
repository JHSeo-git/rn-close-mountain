import { useRef, useState } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker, PickerItemProps, PickerProps } from '@react-native-picker/picker';
import UIText from '../UIText';
import UIIcon from '../UIIcon';
import CustomTouchableRipple from '../CustomTouchableRipple';
import UIBottomSheetModal, { UIBottomSheetModalRef } from '../UIBottomSheetModal';
import * as textStyles from '../../constants/global-styles/textStyles';
import { COLORS, RADII, SPACE } from '../../constants/design-token';

const UIPickerItem = ({ ...props }: PickerItemProps) => {
  return <Picker.Item {...props} />;
};

type UIPickerProps = {
  title: string;
  placeholder: string;
  numberOfLines?: number;
  boxStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
} & PickerProps<string>;

const UIAOSPicker = ({ style, boxStyle, children, ...props }: UIPickerProps) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.pickerButtonWrapper, boxStyle]}>
      <Picker {...props} style={[style, styles.picker]} itemStyle={styles.pickerItem}>
        <UIPickerItem color={COLORS.gray7} label={t('common.not_selected')} value="" />
        {children}
      </Picker>
    </View>
  );
};

const UIIOSPicker = ({
  title,
  placeholder,
  numberOfLines = 1,
  children,
  selectedValue,
  onValueChange,
  boxStyle,
  style,
  leftIcon,
  ...props
}: UIPickerProps) => {
  const { t } = useTranslation();
  const ref = useRef<UIBottomSheetModalRef>(null);
  const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);
  const [localSelectedIndex, setLocalSelectedIndex] = useState<number | undefined>();

  const onPress = () => {
    ref.current?.present();
  };

  const onSave = () => {
    if (onValueChange) {
      onValueChange(localSelectedValue ?? '', localSelectedIndex ?? 0);
      ref.current?.dismiss();
    }
  };

  return (
    <>
      <View style={styles.pickerButtonWrapper}>
        <CustomTouchableRipple style={[styles.pickerButton, boxStyle]} onPress={onPress}>
          <View style={styles.pickerButtonInner}>
            <View style={styles.pickerButtonInnerLeft}>
              {leftIcon &&
                (typeof leftIcon === 'string' ? (
                  <UIIcon
                    name={leftIcon}
                    size={20}
                    color={COLORS.secondary}
                    style={styles.pickerButtonLeftIcon}
                  />
                ) : (
                  leftIcon
                ))}
              {selectedValue ? (
                <UIText numberOfLines={numberOfLines} as="p" style={{ flex: 1 }}>
                  {selectedValue}
                </UIText>
              ) : (
                <UIText
                  numberOfLines={numberOfLines}
                  as="p"
                  style={{ color: COLORS.text.secondary }}
                >
                  {placeholder}
                </UIText>
              )}
            </View>
            <UIIcon
              name="chevron-down"
              size={20}
              color={COLORS.text.secondary}
              style={styles.pickerButtonRightIcon}
            />
          </View>
        </CustomTouchableRipple>
      </View>
      <UIBottomSheetModal
        ref={ref}
        title={title}
        rightTopbuttonText={t('common.save')}
        rightTopButtonOnPress={onSave}
      >
        <Picker
          {...props}
          style={[style, styles.picker]}
          itemStyle={styles.pickerItem}
          selectedValue={localSelectedValue}
          onValueChange={(value, index) => {
            setLocalSelectedValue(value);
            setLocalSelectedIndex(index);
          }}
        >
          <UIPickerItem color={COLORS.gray7} label={t('common.not_selected')} value="" />
          {children}
        </Picker>
      </UIBottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  pickerButtonWrapper: {
    minHeight: 64,
    paddingTop: 6,
  },
  pickerButton: {
    minHeight: 58,
    justifyContent: 'center',
    paddingLeft: SPACE.$4,
    paddingRight: SPACE.$2,
    borderRadius: RADII.sm,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  pickerButtonInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonInnerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerButtonLeftIcon: {
    marginRight: SPACE.$2,
  },
  pickerButtonRightIcon: {
    marginLeft: SPACE.$2,
  },
  picker: {
    ...textStyles.p,
  },
  pickerItem: {
    ...textStyles.h3,
  },
});

UIAOSPicker.Item = UIPickerItem;
UIIOSPicker.Item = UIPickerItem;

const UIPicker = Platform.OS === 'ios' ? UIIOSPicker : UIAOSPicker;

export default UIPicker;

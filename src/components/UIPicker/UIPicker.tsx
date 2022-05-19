import { useRef } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker, PickerItemProps, PickerProps } from '@react-native-picker/picker';
import UIText from '../UIText';
import UIIcon from '../UIIcon';
import CustomTouchableRipple from '../CustomTouchableRipple';
import UIBottomSheetModal, { UIBottomSheetModalRef } from '../UIBottomSheetModal';
import * as textStyles from '../../constants/global-styles/textStyles';
import { COLORS, RADII, SPACE } from '../../constants/design-token';

type UIPickerItemProps = {} & PickerItemProps;

const UIPickerItem = ({ ...props }: UIPickerItemProps) => {
  return <Picker.Item {...props} />;
};

type UIPickerProps = {
  title: string;
  placeholder: string;
  numberOfLines?: number;
  boxStyle?: StyleProp<ViewStyle>;
} & PickerProps<string>;

const UIPicker = ({
  title,
  placeholder,
  numberOfLines = 1,
  children,
  selectedValue,
  boxStyle,
  style,
  ...props
}: UIPickerProps) => {
  const { t } = useTranslation();
  const ref = useRef<UIBottomSheetModalRef>(null);

  const onPress = () => {
    ref.current?.present();
  };

  return (
    <>
      <View style={styles.pickerButtonWrapper}>
        <CustomTouchableRipple style={[styles.pickerButton, boxStyle]} onPress={onPress}>
          <View style={styles.pickerButtonInner}>
            {selectedValue ? (
              <UIText numberOfLines={numberOfLines} as="p" style={{ flex: 1 }}>
                {selectedValue}
              </UIText>
            ) : (
              <UIText numberOfLines={numberOfLines} as="p" style={{ color: COLORS.text.secondary }}>
                {placeholder}
              </UIText>
            )}
            <UIIcon
              name="chevron-down"
              size={20}
              color={COLORS.text.secondary}
              style={styles.pickerButtonIcon}
            />
          </View>
        </CustomTouchableRipple>
      </View>
      <UIBottomSheetModal ref={ref} title={title} enablePanDownToClose={false}>
        <Picker
          {...props}
          style={[style, styles.picker]}
          itemStyle={styles.pickerItem}
          selectedValue={selectedValue}
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
    height: 58,
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
  pickerButtonIcon: {
    marginLeft: SPACE.$2,
  },
  picker: {
    ...textStyles.p,
  },
  pickerItem: {
    ...textStyles.h3,
  },
});

UIPicker.Item = UIPickerItem;
export default UIPicker;

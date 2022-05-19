import { View, StyleSheet } from 'react-native';
import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import UIText from '../UIText';
import { COLORS, RADII, SPACE } from '../../constants/design-token';

type UICodeFieldsProps = {
  cellCount: number;
  value: string;
  setValue: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
};

const UICodeFields = ({ cellCount, value, setValue, error, disabled }: UICodeFieldsProps) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    // https://github.com/retyui/react-native-confirmation-code-field/issues/45#issuecomment-646588118
    setValue: val => {
      if (!disabled) {
        setValue(val);
      }
    },
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      editable={!disabled}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          style={[
            styles.cell,
            index !== 0 && styles.ml,
            isFocused && styles.focusedCell,
            disabled && styles.disabledCell,
            error && styles.errorCell,
          ]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          <UIText as="h1" style={[disabled && styles.disabledText]}>
            {symbol ?? (isFocused ? <Cursor /> : null)}
          </UIText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    height: 80,
    borderRadius: RADII.base,
    borderWidth: 2,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedCell: {
    borderWidth: 2,
    borderColor: COLORS.gray12,
  },
  errorCell: {
    borderWidth: 2,
    borderColor: COLORS.error,
  },
  disabledCell: {
    borderWidth: 2,
    backgroundColor: COLORS.gray3,
    borderColor: COLORS.borderColor,
  },
  disabledText: {
    color: COLORS.gray9,
  },
  ml: {
    marginLeft: SPACE.$1,
  },
});

export default UICodeFields;

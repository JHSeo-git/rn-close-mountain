import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import UIText from '../UIText';

type UICodeFieldsProps = {
  cellCount: number;
  value: string;
  setValue: (value: string) => void;
};

const UICodeFields = ({ cellCount, value, setValue }: UICodeFieldsProps) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View key={index} onLayout={getCellOnLayoutHandler(index)}>
          <UIText as="strong">{symbol ?? (isFocused ? <Cursor /> : null)}</UIText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeBox: {
    flex: 1,
    height: 80,
  },
});

export default UICodeFields;

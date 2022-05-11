import { forwardRef } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { COLORS } from '../../constants/design-token';

type CustomTextInputProps = {
  errorText?: string;
} & React.ComponentPropsWithoutRef<typeof TextInput>;
export type CustomTextInputRef = RNTextInput;

const CustomTextInput = forwardRef<CustomTextInputRef, CustomTextInputProps>(
  (
    {
      errorText,
      mode = 'outlined',
      outlineColor = COLORS.gray6,
      autoCapitalize = 'none',
      style,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <>
        <TextInput
          {...props}
          ref={forwardedRef}
          mode={mode}
          style={[styles.defaultStyle, style]}
          outlineColor={outlineColor}
          autoCapitalize={autoCapitalize}
        />
        {errorText && (
          <HelperText type="error" visible={!!errorText}>
            {errorText}
          </HelperText>
        )}
      </>
    );
  },
);

CustomTextInput.displayName = 'CustomTextInput';

const styles = StyleSheet.create({
  defaultStyle: {},
});

export default CustomTextInput;

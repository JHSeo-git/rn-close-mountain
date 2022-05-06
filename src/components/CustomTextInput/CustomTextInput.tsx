import { forwardRef } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { COLORS } from '../../constants/design-token';

type CustomTextInputProps = {
  errorText?: string;
} & React.ComponentPropsWithRef<typeof TextInput>;

const CustomTextInput = forwardRef<RNTextInput, CustomTextInputProps>(
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
          ref={forwardedRef as any}
          mode={mode}
          style={[styles.defaultStyle, style]}
          outlineColor={outlineColor}
          autoCapitalize={autoCapitalize}
          {...props}
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

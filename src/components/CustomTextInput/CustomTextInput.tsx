import { StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { COLORS } from '../../constants/design-token';

type CustomTextInputProps = {
  errorText?: string;
} & React.ComponentProps<typeof TextInput>;

const CustomTextInput = ({
  errorText,
  mode = 'outlined',
  outlineColor = COLORS.gray6,
  autoCapitalize = 'none',
  style,
  ...props
}: CustomTextInputProps) => {
  return (
    <>
      <TextInput
        mode={mode}
        style={[styles.defaultStyle, style]}
        outlineColor={outlineColor}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      <HelperText type="error" visible={!!errorText}>
        {errorText}
      </HelperText>
    </>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {},
});

export default CustomTextInput;

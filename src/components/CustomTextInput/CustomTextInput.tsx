import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, SPACE } from '../../constants/design-token';
import UIText from '../UIText';

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
      {errorText && (
        <UIText as="small" style={styles.errorStyle}>
          {errorText}
        </UIText>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {},
  errorStyle: {
    color: COLORS.error,
    marginTop: SPACE.$1,
    marginLeft: SPACE.$3,
  },
});

export default CustomTextInput;

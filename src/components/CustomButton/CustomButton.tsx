import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type CustomButtonProps = {} & React.ComponentProps<typeof Button>;

const CustomButton = ({
  mode = 'contained',
  style,
  labelStyle,
  uppercase = false,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      mode={mode}
      style={[styles.buttonDefault, style]}
      labelStyle={[styles.labelDefault, labelStyle]}
      uppercase={uppercase}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  buttonDefault: {},
  labelDefault: {},
});

export default CustomButton;

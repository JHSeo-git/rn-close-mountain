import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type CustomButtonProps = {} & React.ComponentProps<typeof Button>;

const CustomButton = ({ style, labelStyle, ...props }: CustomButtonProps) => {
  return (
    <Button
      style={[styles.buttonDefault, style]}
      labelStyle={[styles.labelDefault, labelStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  buttonDefault: {},
  labelDefault: {},
});

export default CustomButton;

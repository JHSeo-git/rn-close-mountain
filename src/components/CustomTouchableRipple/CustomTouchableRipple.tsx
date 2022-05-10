import { TouchableRipple } from 'react-native-paper';

type CustomTouchableRippleProps = {} & React.ComponentProps<
  typeof TouchableRipple
>;

const CustomTouchableRipple = ({ ...props }: CustomTouchableRippleProps) => {
  return <TouchableRipple {...props} />;
};

export default CustomTouchableRipple;

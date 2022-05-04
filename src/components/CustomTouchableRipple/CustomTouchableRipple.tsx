import { TouchableRipple } from 'react-native-paper';
import { COLORS } from '../../constants/design-token';

type CustomTouchableRippleProps = {} & React.ComponentProps<
  typeof TouchableRipple
>;

const CustomTouchableRipple = ({
  rippleColor = COLORS.gray2,
  ...props
}: CustomTouchableRippleProps) => {
  return <TouchableRipple rippleColor={rippleColor} {...props} />;
};

export default CustomTouchableRipple;

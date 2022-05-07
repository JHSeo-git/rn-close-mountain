import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type UIIconProps = {} & React.ComponentProps<typeof MaterialCommunityIcon>;

const UIIcon = ({ ...props }: UIIconProps) => {
  return <MaterialCommunityIcon {...props} />;
};

export default UIIcon;

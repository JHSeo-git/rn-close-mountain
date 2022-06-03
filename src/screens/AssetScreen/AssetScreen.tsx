import { View, Text } from 'react-native';
import { HomeStackScreenProps } from '../types';

type AssetScreenProps = HomeStackScreenProps<'Asset'>;

const AssetScreen = ({ route }: AssetScreenProps) => {
  return (
    <View>
      <Text>AssetScreen</Text>
    </View>
  );
};

export default AssetScreen;

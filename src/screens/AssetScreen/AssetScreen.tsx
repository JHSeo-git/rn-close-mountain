import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useStore } from '../../contexts/StoreContext';
import { HomeStackScreenProps } from '../types';
import AssetScreenView from './AssetScreenView';

type AssetScreenProps = HomeStackScreenProps<'Asset'>;

const AssetScreen = observer(({ route }: AssetScreenProps) => {
  const { assetContractAddress, tokenId } = route.params;
  const { assetStore } = useStore();

  useEffect(() => {
    assetStore.retrieveAsset({ asset_contract_address: assetContractAddress, token_id: tokenId });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AssetScreenView />
    </View>
  );
});

export default AssetScreen;

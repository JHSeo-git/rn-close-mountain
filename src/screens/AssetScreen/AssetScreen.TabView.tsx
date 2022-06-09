import { TabRoute } from './AssetScreen';
import AssetScreenTabViewDetailsScene from './AssetScreenTabView.DetailsScene';
import AssetScreenTabViewOffersScene from './AssetScreenTabView.OffersScene';
import AssetScreenTabViewListingsScene from './AssetScreenTabView.ListingsScene';
import AssetScreenTabViewItemActivityScene from './AssetScreenTabView.ItemActivityScene';

type AssetScreenTabViewProps = {
  tabKey: TabRoute['key'];
};

const AssetScreenTabView = ({ tabKey }: AssetScreenTabViewProps) => {
  return (
    <>
      {tabKey === 'details' && <AssetScreenTabViewDetailsScene />}
      {tabKey === 'offers' && <AssetScreenTabViewOffersScene />}
      {tabKey === 'listings' && <AssetScreenTabViewListingsScene />}
      {tabKey === 'item-activity' && <AssetScreenTabViewItemActivityScene />}
    </>
  );
};

export default AssetScreenTabView;

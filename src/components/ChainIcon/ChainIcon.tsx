import SolanaSvg from '../../assets/icons/solana.svg';
import UIIcon from '../../components/UIIcon';
import type { Chain } from '../../api/testnets/asset/types';

type ChainIconProps = {
  chain: Chain;
  size?: number;
};

const ChainIcon = ({ chain, size = 20 }: ChainIconProps) => {
  return (
    <>
      {chain === 'ETHEREUM' && <UIIcon size={size} name="ethereum" />}
      {chain === 'SOLANA' && <SolanaSvg width={size - 5} />}
    </>
  );
};

export default ChainIcon;

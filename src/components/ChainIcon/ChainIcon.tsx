import SolanaSvg from '../../assets/icons/solana.svg';
import UIIcon from '../../components/UIIcon';
import type { ChainScalar } from '../../graphql/types/generated';

type ChainIconProps = {
  chain: ChainScalar;
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

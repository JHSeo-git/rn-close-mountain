import type { OpenSeaFungibleToken } from './types/opensea/types';

export const getSlugFromLink = (link: string) => link.split('/').pop();
export function getChainInfo(paymentTokens?: OpenSeaFungibleToken[]) {
  if (!paymentTokens || paymentTokens.length === 0) {
    return null;
  }

  return {
    chainType: paymentTokens[0].symbol,
    iconUrl: paymentTokens[0].imageUrl,
    multiplier: parseInt(paymentTokens[0].ethPrice ?? '1', 10),
  };
}

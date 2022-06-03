import type { OpenseaQuery } from './types/generated';

const openseaQuery: OpenseaQuery = {
  AccountCollectionsQuery: {
    key: '6a4fb63f7aed7a90955c5c6f5622d47caa8460388cf9983efeb1b8e561b43167',
    query: null,
  },
  AccountFavoritesQuery: {
    key: '52feffe3ef8bf791ccd3281605104bdb6edf88879b5287e6ddc18db0cf97c5bc',
    query: null,
  },
  AccountPageQuery: {
    key: 'b71595a47ed46481e30e95fb03f5cf6dfc247b6b7c52ccae33bbb8a6ae201f0a',
    query: null,
  },
  AccountSelectQuery: {
    key: 'dd7f3284688a2a69cc91b12ea1c84db3b247a5124aa1a9153b448582c855c279',
    query: null,
  },
  AccountSettingsFormMutation: {
    key: '38666227cba3f44bdd5ba013b9c73122fa217e43d1e2d82f2936ba0a3e489df6',
    query: null,
  },
  AccountSettingsFormResendMutation: {
    key: '0095f267a3ce60845f89908534bf160402f860e611d5598a08221b44e4ec56a5',
    query: null,
  },
  AccountSettingsQuery: {
    key: 'e4bb59329bd8356a2b0c6786294ed75d75609083b1aa145deaf2cfad8d4f8030',
    query: null,
  },
  ActiveListingsPaginationQuery: {
    key: '40caa06ccc5e2027bf75064ac6f2b7e4a8ea923d5172c0fb46a23a42b0762903',
    query: null,
  },
  ActiveListingsQuery: {
    key: 'c974860312c8a4e786e845876e096ea3ca4012379e266f91f0bfa205f9b391ae',
    query: null,
  },
  ActivityPageQuery: {
    key: '00304c099d0223c637050bc4430e230ce3f994bc0b500708c8d36b7ffef59f0e',
    query: null,
  },
  ActivitySearchQuery: {
    key: '133f597c0a34464dd50e72174e0fa4d0fdb1086f28f6a97cac832ea3a3176516',
    query: null,
  },
  AddAuthorizedEditorModalContentMutation: {
    key: '65ebc31fe62548599fe75d34da4111a6d2e109a38fba3f70e9207ee37f8580ad',
    query: null,
  },
  AddFundsModalQuery: {
    key: 'f0d949aee7e1f429d72e2da45fe9db98f4610bd9e2ecdb6ce4361f7f60ec9e0f',
    query: null,
  },
  AssetChangeCollectionModalMutation: {
    key: '3bb2e1d141923953f2bda6194ce8eeccb78381c3a21c7c3cb3269a45722b5cd1',
    query: null,
  },
  AssetContextMenuMutation: {
    key: '0429c4d21572d59b6648685a4afbcd5c65d24bbc61460b7a2fc43ee1f0e9b93b',
    query: null,
  },
  AssetCreatePageMutation: {
    key: '48eedd80c226460383d007a0d4ea605c3c392ec8b3c660829629f48f8df17979',
    query: null,
  },
  AssetCreatePageQuery: {
    key: 'deaaad532ebb7ed2e35f48743f091025a1412c6efe997eb7b4ebc0365db5e902',
    query: null,
  },
  AssetEditPageDeleteMutation: {
    key: '01b1da6e7cdd92b7e660b415dc21d6590d961edacaa2b2072cba8d163d938318',
    query: null,
  },
  AssetEditPageMutation: {
    key: '2e64543f3326fc8cb661f2c83d3103f4a520b9fcc0483cece67179ab74c9ecfb',
    query: null,
  },
  AssetEditPageQuery: {
    key: '2793fe0d89607d3845a593d0c629c7bbca7ab5b0fae06aa71f6bdd2106c55097',
    query: null,
  },
  AssetFavoritedByListLazyQuery: {
    key: '2c91b8e6955ef4d149abd09d453da3e5d240fbfe4cc3e21bb1bbec28f6d52ddd',
    query: null,
  },
  AssetFavoritedByListQuery: {
    key: '791e5192113930d83cfb8881ba5491ff564bf4362a661c4f3ff2f681600aa274',
    query: null,
  },
  AssetMediaTestQuery: {
    key: '23fa4fada72a4b66ecaf7907ffd906c21b7b813d112443105228b4f9cd715909',
    query: null,
  },
  AssetPageQuery: {
    key: 'c23081761bb5cd1a125519f24bb91bbec2385e83d46f5d7d6f4933d5e7ab7254',
    query:
      'query AssetPageQuery(\n  $tokenId: String!\n  $contractAddress: AddressScalar!\n  $chain: ChainScalar!\n) {\n  nft(tokenId: $tokenId, contractAddress: $contractAddress, chain: $chain) {\n    ...AssetCardAnnotations_asset\n    ...asset_display_name\n    ...ContentAuthenticity_data\n    assetContract {\n      address\n      chain\n      ...CollectionLink_assetContract\n      id\n    }\n    assetOwners(first: 1) {\n      edges {\n        node {\n          quantity\n          owner {\n            ...AccountLink_data\n            id\n          }\n          id\n        }\n      }\n      count\n    }\n    creator {\n      ...AccountLink_data\n      id\n    }\n    animationUrl\n    backgroundColor\n    collection {\n      description\n      displayData {\n        cardDisplayStyle\n      }\n      hidden\n      imageUrl\n      name\n      slug\n      ...CollectionLink_collection\n      ...Boost_collection\n      ...Property_collection\n      ...NumericTrait_collection\n      ...SocialBar_data\n      id\n    }\n    decimals\n    description\n    imageUrl\n    name\n    isDelisted\n    isListable\n    isReportedSuspicious\n    relayId\n    tokenId\n    hasUnlockableContent\n    favoritesCount\n    traits(first: 100) {\n      edges {\n        node {\n          relayId\n          displayType\n          floatValue\n          intValue\n          traitType\n          value\n          ...Boost_trait\n          ...Property_trait\n          ...NumericTrait_trait\n          ...Date_trait\n          id\n        }\n      }\n    }\n    ...AssetMedia_asset\n    ...Toolbar_asset\n    ...asset_url\n    ...itemEvents_data\n    ...itemEvents_viewItem_data\n    ...ChainInfo_data\n    ownedQuantity(identity: {})\n    totalQuantity\n    ...TradeStation_archetype_3wquQ2\n    ...BidModalContent_data_3wquQ2\n    id\n  }\n  tradeSummary(archetype: {assetContractAddress: $contractAddress, tokenId: $tokenId, chain: $chain}) {\n    bestAsk {\n      closedAt\n      orderType\n      maker {\n        ...wallet_accountKey\n        id\n      }\n      relayId\n      id\n    }\n    ...BidModalContent_trade\n    ...TradeStation_data\n  }\n  assetEvents(archetype: {assetContractAddress: $contractAddress, tokenId: $tokenId, chain: $chain}, first: 11) {\n    edges {\n      node {\n        relayId\n        id\n      }\n    }\n  }\n}\n\nfragment AccountLink_data on AccountType {\n  address\n  config\n  isCompromised\n  user {\n    publicUsername\n    id\n  }\n  displayName\n  ...ProfileImage_data\n  ...wallet_accountKey\n  ...accounts_url\n}\n\nfragment AskPrice_data on OrderV2Type {\n  dutchAuctionFinalPrice\n  openedAt\n  priceFnEndedAt\n  makerAssetBundle {\n    assetQuantities(first: 30) {\n      edges {\n        node {\n          ...quantity_data\n          id\n        }\n      }\n    }\n    id\n  }\n  takerAssetBundle {\n    assetQuantities(first: 1) {\n      edges {\n        node {\n          ...AssetQuantity_data\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment AssetCardAnnotations_asset on AssetType {\n  assetContract {\n    chain\n    id\n  }\n  decimals\n  relayId\n  favoritesCount\n  isDelisted\n  isFavorite\n  isFrozen\n  hasUnlockableContent\n  ...AssetCardBuyNow_data\n  orderData {\n    bestAsk {\n      orderType\n      relayId\n      maker {\n        address\n        id\n      }\n    }\n  }\n}\n\nfragment AssetCardBuyNow_data on AssetType {\n  tokenId\n  relayId\n  assetContract {\n    address\n    chain\n    id\n  }\n  collection {\n    slug\n    id\n  }\n  orderData {\n    bestAsk {\n      relayId\n    }\n  }\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  backgroundColor\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n  isDelisted\n  imageUrl\n  displayImageUrl\n}\n\nfragment AssetQuantity_data on AssetQuantityType {\n  asset {\n    ...Price_data\n    id\n  }\n  quantity\n}\n\nfragment BidModalContent_data_3wquQ2 on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  decimals\n  relayId\n  collection {\n    slug\n    paymentAssets(chain: $chain) {\n      relayId\n      asset {\n        assetContract {\n          address\n          chain\n          id\n        }\n        decimals\n        symbol\n        usdSpotPrice\n        relayId\n        id\n      }\n      ...PaymentTokenInputV2_data\n      id\n    }\n    ...verification_data\n    id\n  }\n  totalQuantity\n  ownedQuantity(identity: {})\n}\n\nfragment BidModalContent_trade on TradeSummaryType {\n  bestAsk {\n    closedAt\n    isFulfillable\n    oldOrder\n    orderType\n    relayId\n    makerAssetBundle {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              collection {\n                ...verification_data\n                id\n              }\n              id\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n    takerAssetBundle {\n      assetQuantities(first: 1) {\n        edges {\n          node {\n            quantity\n            asset {\n              decimals\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n  bestBid {\n    relayId\n    makerAssetBundle {\n      assetQuantities(first: 1) {\n        edges {\n          node {\n            quantity\n            asset {\n              decimals\n              id\n            }\n            ...AssetQuantity_data\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Boost_collection on CollectionType {\n  numericTraits {\n    key\n    value {\n      max\n      min\n    }\n  }\n  slug\n}\n\nfragment Boost_trait on TraitType {\n  displayType\n  floatValue\n  intValue\n  traitType\n}\n\nfragment ChainInfo_data on AssetType {\n  assetContract {\n    openseaVersion\n    address\n    chain\n    blockExplorerLink\n    tokenStandard\n    id\n  }\n  isEditableByOwner {\n    value\n  }\n  tokenId\n  isFrozen\n  frozenAt\n  tokenMetadata\n}\n\nfragment CollectionLink_assetContract on AssetContractType {\n  address\n  blockExplorerLink\n}\n\nfragment CollectionLink_collection on CollectionType {\n  name\n  ...collection_url\n  ...verification_data\n}\n\nfragment CollectionWatchlistButton_data on CollectionType {\n  relayId\n  isWatching\n}\n\nfragment ContentAuthenticity_data on AssetType {\n  authenticityMetadata {\n    signedOn\n    signedBy\n    producedWith\n    walletAddress\n    id\n  }\n  imageUrl\n  creator {\n    address\n    id\n  }\n}\n\nfragment Date_trait on TraitType {\n  traitType\n  floatValue\n  intValue\n}\n\nfragment NumericTrait_collection on CollectionType {\n  numericTraits {\n    key\n    value {\n      max\n      min\n    }\n  }\n  slug\n}\n\nfragment NumericTrait_trait on TraitType {\n  displayType\n  floatValue\n  intValue\n  maxValue\n  traitType\n}\n\nfragment PaymentAsset_data on PaymentAssetType {\n  asset {\n    assetContract {\n      chain\n      id\n    }\n    imageUrl\n    symbol\n    id\n  }\n}\n\nfragment PaymentTokenInputV2_data on PaymentAssetType {\n  relayId\n  asset {\n    decimals\n    symbol\n    usdSpotPrice\n    id\n  }\n  ...PaymentAsset_data\n}\n\nfragment Price_data on AssetType {\n  decimals\n  imageUrl\n  symbol\n  usdSpotPrice\n  assetContract {\n    blockExplorerLink\n    chain\n    id\n  }\n}\n\nfragment ProfileImage_data on AccountType {\n  imageUrl\n}\n\nfragment Property_collection on CollectionType {\n  ...collection_url\n  stats {\n    totalSupply\n    id\n  }\n}\n\nfragment Property_trait on TraitType {\n  displayType\n  traitCount\n  traitType\n  value\n}\n\nfragment SocialBar_data on CollectionType {\n  relayId\n  discordUrl\n  externalUrl\n  instagramUsername\n  mediumUsername\n  slug\n  telegramUrl\n  twitterUsername\n  ...collection_url\n  ...CollectionWatchlistButton_data\n}\n\nfragment Toolbar_asset on AssetType {\n  ...asset_url\n  ...itemEvents_data\n  assetContract {\n    address\n    chain\n    id\n  }\n  collection {\n    externalUrl\n    name\n    slug\n    id\n  }\n  externalLink\n  name\n  relayId\n  tokenId\n}\n\nfragment TradeStation_archetype_3wquQ2 on AssetType {\n  assetContract {\n    chain\n    id\n  }\n  assetOwners(first: 1) {\n    edges {\n      node {\n        owner {\n          ...wallet_accountKey\n          id\n        }\n        id\n      }\n    }\n  }\n  collection {\n    ...verification_data\n    id\n  }\n  isListable\n  relayId\n  ...BidModalContent_data_3wquQ2\n}\n\nfragment TradeStation_data on TradeSummaryType {\n  bestAsk {\n    closedAt\n    dutchAuctionFinalPrice\n    openedAt\n    orderType\n    priceFnEndedAt\n    englishAuctionReservePrice\n    relayId\n    maker {\n      address\n      ...wallet_accountKey\n      id\n    }\n    makerAssetBundle {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              tokenId\n              assetContract {\n                chain\n                address\n                id\n              }\n              collection {\n                slug\n                ...verification_data\n                id\n              }\n              ...itemEvents_data\n              id\n            }\n            ...quantity_data\n            id\n          }\n        }\n      }\n      id\n    }\n    taker {\n      ...wallet_accountKey\n      id\n    }\n    takerAssetBundle {\n      assetQuantities(first: 1) {\n        edges {\n          node {\n            quantity\n            asset {\n              symbol\n              decimals\n              relayId\n              usdSpotPrice\n              assetContract {\n                address\n                id\n              }\n              tokenId\n              id\n            }\n            ...AssetQuantity_data\n            id\n          }\n        }\n      }\n      id\n    }\n    ...AskPrice_data\n    ...orderLink_data\n    ...quantity_remaining\n    id\n  }\n  bestBid {\n    makerAssetBundle {\n      assetQuantities(first: 1) {\n        edges {\n          node {\n            quantity\n            ...AssetQuantity_data\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n  ...BidModalContent_trade\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment asset_display_name on AssetType {\n  tokenId\n  name\n}\n\nfragment asset_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n\nfragment collection_url on CollectionType {\n  slug\n}\n\nfragment itemEvents_data on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n\nfragment itemEvents_viewItem_data on AssetType {\n  ...itemEvents_data\n  collection {\n    ...verification_data\n    id\n  }\n  isReportedSuspicious\n}\n\nfragment orderLink_data on OrderV2Type {\n  makerAssetBundle {\n    assetQuantities(first: 30) {\n      edges {\n        node {\n          asset {\n            externalLink\n            collection {\n              externalUrl\n              id\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment quantity_data on AssetQuantityType {\n  asset {\n    decimals\n    id\n  }\n  quantity\n}\n\nfragment quantity_remaining on OrderV2Type {\n  makerAsset: makerAssetBundle {\n    assetQuantities(first: 1) {\n      edges {\n        node {\n          asset {\n            decimals\n            id\n          }\n          quantity\n          id\n        }\n      }\n    }\n    id\n  }\n  takerAsset: takerAssetBundle {\n    assetQuantities(first: 1) {\n      edges {\n        node {\n          asset {\n            decimals\n            id\n          }\n          quantity\n          id\n        }\n      }\n    }\n    id\n  }\n  remainingQuantity\n  side\n}\n\nfragment verification_data on CollectionType {\n  isMintable\n  isSafelisted\n  isVerified\n}\n\nfragment wallet_accountKey on AccountType {\n  address\n}\n',
  },
  AssetSearchFilterLazyQuery: {
    key: '40e06f99a154248a107a837c75a898aa22346bcd5f6c6d5fce44b12a3d074cbb',
    query: null,
  },
  AssetSearchListPaginationQuery: {
    key: '2d11834d02890a72f241a2622e9c8b26f0cf1cf3cdfb64575f34d068718a74b7',
    query: null,
  },
  AssetSearchQuery: {
    key: '8305260a50fc51a99603924f36a860bef838705ee8db238c5de9feea263aa5a8',
    query:
      'query AssetSearchQuery(\n  $categories: [CollectionSlug!]\n  $chains: [ChainScalar!]\n  $collection: CollectionSlug\n  $collectionQuery: String\n  $collectionSortBy: CollectionSort\n  $collections: [CollectionSlug!]\n  $count: Int\n  $cursor: String\n  $identity: IdentityInputType\n  $includeHiddenCollections: Boolean\n  $numericTraits: [TraitRangeType!]\n  $paymentAssets: [PaymentAssetSymbol!]\n  $priceFilter: PriceFilterType\n  $query: String\n  $resultModel: SearchResultModel\n  $showContextMenu: Boolean = false\n  $shouldShowQuantity: Boolean = false\n  $sortAscending: Boolean\n  $sortBy: SearchSortBy\n  $stringTraits: [TraitInputType!]\n  $toggles: [SearchToggle!]\n  $creator: IdentityInputType\n  $assetOwner: IdentityInputType\n  $isPrivate: Boolean\n  $safelistRequestStatuses: [SafelistRequestStatus!]\n) {\n  query {\n    ...AssetSearch_data_2hBjZ1\n  }\n}\n\nfragment AssetCardAnnotations_assetBundle on AssetBundleType {\n  assetCount\n}\n\nfragment AssetCardAnnotations_asset_3Aax2O on AssetType {\n  assetContract {\n    chain\n    id\n  }\n  decimals\n  ownedQuantity(identity: $identity) @include(if: $shouldShowQuantity)\n  relayId\n  favoritesCount\n  isDelisted\n  isFavorite\n  isFrozen\n  hasUnlockableContent\n  ...AssetCardBuyNow_data\n  orderData {\n    bestAsk {\n      orderType\n      relayId\n      maker {\n        address\n        id\n      }\n    }\n  }\n  ...AssetContextMenu_data_3z4lq0 @include(if: $showContextMenu)\n}\n\nfragment AssetCardBuyNow_data on AssetType {\n  tokenId\n  relayId\n  assetContract {\n    address\n    chain\n    id\n  }\n  collection {\n    slug\n    id\n  }\n  orderData {\n    bestAsk {\n      relayId\n    }\n  }\n}\n\nfragment AssetCardContent_asset on AssetType {\n  relayId\n  name\n  ...AssetMedia_asset\n  assetContract {\n    address\n    chain\n    openseaVersion\n    id\n  }\n  tokenId\n  collection {\n    slug\n    id\n  }\n  isDelisted\n}\n\nfragment AssetCardContent_assetBundle on AssetBundleType {\n  assetQuantities(first: 18) {\n    edges {\n      node {\n        asset {\n          relayId\n          ...AssetMedia_asset\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment AssetCardFooter_assetBundle on AssetBundleType {\n  ...AssetCardAnnotations_assetBundle\n  name\n  assetCount\n  assetQuantities(first: 18) {\n    edges {\n      node {\n        asset {\n          collection {\n            name\n            relayId\n            slug\n            isVerified\n            ...collection_url\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  assetEventData {\n    lastSale {\n      unitPriceQuantity {\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n  orderData {\n    bestBid {\n      orderType\n      paymentAssetQuantity {\n        ...AssetQuantity_data\n        id\n      }\n    }\n    bestAsk {\n      maker {\n        address\n        id\n      }\n      closedAt\n      orderType\n      dutchAuctionFinalPrice\n      openedAt\n      priceFnEndedAt\n      quantity\n      decimals\n      paymentAssetQuantity {\n        quantity\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n}\n\nfragment AssetCardFooter_asset_3Aax2O on AssetType {\n  ...AssetCardAnnotations_asset_3Aax2O\n  name\n  tokenId\n  collection {\n    slug\n    name\n    isVerified\n    ...collection_url\n    id\n  }\n  isDelisted\n  assetContract {\n    address\n    chain\n    openseaVersion\n    id\n  }\n  assetEventData {\n    lastSale {\n      unitPriceQuantity {\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n  orderData {\n    bestBid {\n      orderType\n      paymentAssetQuantity {\n        ...AssetQuantity_data\n        id\n      }\n    }\n    bestAsk {\n      maker {\n        address\n        id\n      }\n      closedAt\n      orderType\n      dutchAuctionFinalPrice\n      openedAt\n      priceFnEndedAt\n      quantity\n      decimals\n      paymentAssetQuantity {\n        quantity\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n}\n\nfragment AssetContextMenu_data_3z4lq0 on AssetType {\n  ...asset_edit_url\n  ...asset_url\n  ...itemEvents_data\n  relayId\n  isDelisted\n  isEditable {\n    value\n    reason\n  }\n  isListable\n  ownership(identity: {}) {\n    isPrivate\n    quantity\n  }\n  creator {\n    address\n    id\n  }\n  collection {\n    isAuthorizedEditor\n    id\n  }\n  imageUrl\n  ownedQuantity(identity: {})\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  backgroundColor\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n  isDelisted\n  imageUrl\n  displayImageUrl\n}\n\nfragment AssetQuantity_data on AssetQuantityType {\n  asset {\n    ...Price_data\n    id\n  }\n  quantity\n}\n\nfragment AssetSearchFilter_data_3KTzFc on Query {\n  ...CollectionFilter_data_2qccfC\n  collection(collection: $collection) {\n    numericTraits {\n      key\n      value {\n        max\n        min\n      }\n      ...NumericTraitFilter_data\n    }\n    stringTraits {\n      key\n      ...StringTraitFilter_data\n    }\n    id\n  }\n  ...PaymentFilter_data_2YoIWt\n}\n\nfragment AssetSearchList_data_3Aax2O on SearchResultType {\n  asset {\n    assetContract {\n      address\n      chain\n      id\n    }\n    collection {\n      isVerified\n      relayId\n      id\n    }\n    relayId\n    tokenId\n    ...AssetSelectionItem_data\n    ...asset_url\n    id\n  }\n  assetBundle {\n    relayId\n    id\n  }\n  ...Asset_data_3Aax2O\n}\n\nfragment AssetSearch_data_2hBjZ1 on Query {\n  ...AssetSearchFilter_data_3KTzFc\n  ...SearchPills_data_2Kg4Sq\n  search(after: $cursor, chains: $chains, categories: $categories, collections: $collections, first: $count, identity: $identity, numericTraits: $numericTraits, paymentAssets: $paymentAssets, priceFilter: $priceFilter, querystring: $query, resultType: $resultModel, sortAscending: $sortAscending, sortBy: $sortBy, stringTraits: $stringTraits, toggles: $toggles, creator: $creator, isPrivate: $isPrivate, safelistRequestStatuses: $safelistRequestStatuses) {\n    edges {\n      node {\n        ...AssetSearchList_data_3Aax2O\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AssetSelectionItem_data on AssetType {\n  backgroundColor\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    imageUrl\n    id\n  }\n  imageUrl\n  name\n  relayId\n}\n\nfragment Asset_data_3Aax2O on SearchResultType {\n  asset {\n    relayId\n    isDelisted\n    ...AssetCardContent_asset\n    ...AssetCardFooter_asset_3Aax2O\n    ...AssetMedia_asset\n    ...asset_url\n    ...itemEvents_data\n    orderData {\n      bestAsk {\n        paymentAssetQuantity {\n          quantityInEth\n          id\n        }\n      }\n    }\n    id\n  }\n  assetBundle {\n    relayId\n    ...bundle_url\n    ...AssetCardContent_assetBundle\n    ...AssetCardFooter_assetBundle\n    orderData {\n      bestAsk {\n        paymentAssetQuantity {\n          quantityInEth\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment CollectionFilter_data_2qccfC on Query {\n  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {\n    edges {\n      node {\n        assetCount\n        imageUrl\n        name\n        slug\n        isVerified\n        id\n      }\n    }\n  }\n  collections(assetOwner: $assetOwner, assetCreator: $creator, onlyPrivateAssets: $isPrivate, chains: $chains, first: 100, includeHidden: $includeHiddenCollections, parents: $categories, query: $collectionQuery, sortBy: $collectionSortBy) {\n    edges {\n      node {\n        assetCount\n        imageUrl\n        name\n        slug\n        isVerified\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment CollectionModalContent_data on CollectionType {\n  description\n  imageUrl\n  name\n  slug\n}\n\nfragment NumericTraitFilter_data on NumericTraitTypePair {\n  key\n  value {\n    max\n    min\n  }\n}\n\nfragment PaymentFilter_data_2YoIWt on Query {\n  paymentAssets(first: 10) {\n    edges {\n      node {\n        symbol\n        relayId\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  PaymentFilter_collection: collection(collection: $collection) {\n    paymentAssets {\n      symbol\n      relayId\n      id\n    }\n    id\n  }\n}\n\nfragment Price_data on AssetType {\n  decimals\n  imageUrl\n  symbol\n  usdSpotPrice\n  assetContract {\n    blockExplorerLink\n    chain\n    id\n  }\n}\n\nfragment SearchPills_data_2Kg4Sq on Query {\n  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {\n    edges {\n      node {\n        imageUrl\n        name\n        slug\n        ...CollectionModalContent_data\n        id\n      }\n    }\n  }\n}\n\nfragment StringTraitFilter_data on StringTraitType {\n  counts {\n    count\n    value\n  }\n  key\n}\n\nfragment asset_edit_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n  collection {\n    slug\n    id\n  }\n}\n\nfragment asset_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n\nfragment bundle_url on AssetBundleType {\n  slug\n}\n\nfragment collection_url on CollectionType {\n  slug\n}\n\nfragment itemEvents_data on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n',
  },
  AssetSelectQuery: {
    key: '33e9f517941a21be917f66ab5fe5c4c6af2329cf4f29015dbb369b7e894fc4e3',
    query: null,
  },
  AssetSelectionSetPrivacyMutation: {
    key: '76bfedb6347a46b1e94eb9bd6ea445cff873538d64b2b0a0d28f0779c43c5609',
    query: null,
  },
  AssetSellPageQuery: {
    key: '1c4a26cd8472fea3e65f9cc8d31742f5cf36efa662a116f0a4dca326ad183cc5',
    query: null,
  },
  AssetSuccessModalContentOrderQuery: {
    key: 'f8e79a9f98cdf2e6a41bc95906cff1255648c8a519ce79a6372422af38a47023',
    query: null,
  },
  AssetSuccessModalContentQuery: {
    key: 'ad1980105ac4664598152503ad04bd4b45937b704081f12a573a3db628826497',
    query: null,
  },
  AssetsPageQuery: {
    key: '40408013d727bd7d52be611b09493a050dc8c8e7f9c6db985703740e28c5c9da',
    query: null,
  },
  BulkCancelOrdersQuery: {
    key: '45be5a8579596527cf53dcb26652ba1d82e43e3c2b5147d424f2a4407c62b38d',
    query: null,
  },
  BulkTransferPageListingsQuery: {
    key: '50607e850c31f131038d11bd1678f292ff8ff90ca24387abb511edf188fae3e3',
    query: null,
  },
  BundlePageQuery: {
    key: '7be1bd30144522ff956f180b444ac098775b0b058ddefd5402b455204764f208',
    query: null,
  },
  BundleSellPageQuery: {
    key: 'd0199985fd4c2dc40f86f65d9a3b59cbef700e4e3b127206836dd7b57f173b8e',
    query: null,
  },
  BuyNowCheckoutModalContentQuery: {
    key: 'd75e970c2a1db739fcc49ef8e0820b73b356914a437e285d24e2b76a655552ad',
    query: null,
  },
  CancelOrderActionModalQuery: {
    key: '93f92d585c5609ec37e0fa77762bc3338119f2e818ddb7d3e055bf2f48e55a7f',
    query: null,
  },
  CheckoutModalQuery: {
    key: '89fb249ef29253b528a8b098a384ebba0a6c674138030354aa65ceccdcd955f4',
    query: null,
  },
  CollectionCreateOrUpdatePageCreateMutation: {
    key: 'feb4c86d3de114d1deea6c03088b696f701c75b6da73f5c45324b198d6862825',
    query: null,
  },
  CollectionCreateOrUpdatePageEditMutation: {
    key: 'ec49e0651a671dfaa9f69f7e6d2d2a279297b76ee63ecca6d1e97fc256b68a21',
    query: null,
  },
  CollectionCreateOrUpdatePageQuery: {
    key: '8ea347ddec4b6c608c109330fa2c14c2627ad37145c24b7c08263e55cd71f2a1',
    query: null,
  },
  CollectionDetailsModalQuery: {
    key: '12320f3f30e45663bf42000ee7429280c5988c4c2009bfe3144053e209ec1417',
    query: null,
  },
  CollectionFilterQuery: {
    key: '893f910dbf229bcbf5ebf6a7820e0b657f519c71e24142a903ba5a4a54296cfb',
    query: null,
  },
  CollectionFormAuthorizedEditorsMutation: {
    key: '1dd031f773a9662f99014c10e790612612f9f14602c890bbc6022b81ed1f9fe0',
    query: null,
  },
  CollectionFormCollectionConnectedNetworkCreateMutation: {
    key: '5e0ed93d8d3c1d24c8a3b501ecb15b031e177926739ae2fb3af96a2ea8a0260b',
    query: null,
  },
  CollectionFormCollectionConnectedNetworkDeleteMutation: {
    key: '70cae18cfa09194c792ac96b93af8ddeed151525275d524032d245bb8e6e0cfb',
    query: null,
  },
  CollectionFormDeleteMutation: {
    key: '1fa3fe4383f73f6cf12ee3673c864c177d48155c959c99907bb20bc0ef18db8f',
    query: null,
  },
  CollectionNameInputQuery: {
    key: '3b6762e1dc5ff976827d49f1ffdb87092be7692e1c76f92e90d1f0d08c7a1e18',
    query: null,
  },
  CollectionPageQuery: {
    key: 'd9e3dae19e0dab32ca1c79a08105386033295775569388a13345f80ea96be262',
    query:
      'query CollectionPageQuery(\n  $collection: CollectionSlug!\n  $collections: [CollectionSlug!]\n  $collectionQuery: String\n  $includeHiddenCollections: Boolean\n  $numericTraits: [TraitRangeType!]\n  $query: String\n  $sortAscending: Boolean\n  $sortBy: SearchSortBy\n  $stringTraits: [TraitInputType!]\n  $toggles: [SearchToggle!]\n  $showContextMenu: Boolean\n  $includeCollectionFilter: Boolean!\n) {\n  collection(collection: $collection) {\n    bannerImageUrl\n    name\n    description\n    imageUrl\n    relayId\n    connectedTwitterUsername\n    assetContracts(first: 2) {\n      edges {\n        node {\n          chain\n          id\n        }\n      }\n    }\n    representativeAsset {\n      assetContract {\n        chain\n        openseaVersion\n        id\n      }\n      id\n    }\n    slug\n    ...verification_data\n    ...collection_url\n    ...CollectionHeader_data\n    owner {\n      ...AccountLink_data\n      id\n    }\n    ...PhoenixCollectionSocialBar_data\n    ...PhoenixCollectionActionBar_data\n    ...PhoenixCollectionInfo_data\n    id\n  }\n  assets: query {\n    ...AssetSearch_data_40oIf9\n  }\n}\n\nfragment AccountLink_data on AccountType {\n  address\n  config\n  isCompromised\n  user {\n    publicUsername\n    id\n  }\n  displayName\n  ...ProfileImage_data\n  ...wallet_accountKey\n  ...accounts_url\n}\n\nfragment AssetCardAnnotations_assetBundle on AssetBundleType {\n  assetCount\n}\n\nfragment AssetCardAnnotations_asset_1OrK6u on AssetType {\n  assetContract {\n    chain\n    id\n  }\n  decimals\n  relayId\n  favoritesCount\n  isDelisted\n  isFavorite\n  isFrozen\n  hasUnlockableContent\n  ...AssetCardBuyNow_data\n  orderData {\n    bestAsk {\n      orderType\n      relayId\n      maker {\n        address\n        id\n      }\n    }\n  }\n  ...AssetContextMenu_data_3z4lq0 @include(if: $showContextMenu)\n}\n\nfragment AssetCardBuyNow_data on AssetType {\n  tokenId\n  relayId\n  assetContract {\n    address\n    chain\n    id\n  }\n  collection {\n    slug\n    id\n  }\n  orderData {\n    bestAsk {\n      relayId\n      decimals\n      paymentAssetQuantity {\n        asset {\n          usdSpotPrice\n          decimals\n          id\n        }\n        quantity\n        id\n      }\n    }\n  }\n}\n\nfragment AssetCardContent_asset on AssetType {\n  relayId\n  name\n  ...AssetMedia_asset\n  assetContract {\n    address\n    chain\n    openseaVersion\n    id\n  }\n  tokenId\n  collection {\n    slug\n    id\n  }\n  isDelisted\n}\n\nfragment AssetCardContent_assetBundle on AssetBundleType {\n  assetQuantities(first: 18) {\n    edges {\n      node {\n        asset {\n          relayId\n          ...AssetMedia_asset\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment AssetCardFooter_assetBundle on AssetBundleType {\n  ...AssetCardAnnotations_assetBundle\n  name\n  assetCount\n  assetQuantities(first: 18) {\n    edges {\n      node {\n        asset {\n          collection {\n            name\n            relayId\n            slug\n            isVerified\n            ...collection_url\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  assetEventData {\n    lastSale {\n      unitPriceQuantity {\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n  orderData {\n    bestBid {\n      orderType\n      paymentAssetQuantity {\n        quantity\n        ...AssetQuantity_data\n        id\n      }\n    }\n    bestAsk {\n      maker {\n        address\n        id\n      }\n      closedAt\n      orderType\n      dutchAuctionFinalPrice\n      openedAt\n      priceFnEndedAt\n      quantity\n      decimals\n      paymentAssetQuantity {\n        quantity\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n}\n\nfragment AssetCardFooter_asset_1OrK6u on AssetType {\n  ...AssetCardAnnotations_asset_1OrK6u\n  name\n  tokenId\n  collection {\n    slug\n    name\n    isVerified\n    ...collection_url\n    id\n  }\n  isDelisted\n  assetContract {\n    address\n    chain\n    openseaVersion\n    id\n  }\n  assetEventData {\n    lastSale {\n      unitPriceQuantity {\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n  orderData {\n    bestBid {\n      orderType\n      paymentAssetQuantity {\n        quantity\n        ...AssetQuantity_data\n        id\n      }\n    }\n    bestAsk {\n      maker {\n        address\n        id\n      }\n      closedAt\n      orderType\n      dutchAuctionFinalPrice\n      openedAt\n      priceFnEndedAt\n      quantity\n      decimals\n      paymentAssetQuantity {\n        quantity\n        ...AssetQuantity_data\n        id\n      }\n    }\n  }\n}\n\nfragment AssetContextMenu_data_3z4lq0 on AssetType {\n  ...asset_edit_url\n  ...asset_url\n  ...itemEvents_data\n  relayId\n  isDelisted\n  isEditable {\n    value\n    reason\n  }\n  isListable\n  ownership(identity: {}) {\n    isPrivate\n    quantity\n  }\n  creator {\n    address\n    id\n  }\n  collection {\n    isAuthorizedEditor\n    id\n  }\n  imageUrl\n  ownedQuantity(identity: {})\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  backgroundColor\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n  isDelisted\n  imageUrl\n  displayImageUrl\n}\n\nfragment AssetQuantity_data on AssetQuantityType {\n  asset {\n    ...Price_data\n    id\n  }\n  quantity\n}\n\nfragment AssetSearchFilter_data_PFx8Z on Query {\n  ...CollectionFilter_data_tXjHb @include(if: $includeCollectionFilter)\n  collection(collection: $collection) {\n    numericTraits {\n      key\n      value {\n        max\n        min\n      }\n      ...NumericTraitFilter_data\n    }\n    stringTraits {\n      key\n      ...StringTraitFilter_data\n    }\n    defaultChain {\n      identifier\n    }\n    id\n  }\n  ...PaymentFilter_data_2YoIWt\n}\n\nfragment AssetSearchList_data_gVyhu on SearchResultType {\n  asset {\n    assetContract {\n      address\n      chain\n      id\n    }\n    collection {\n      isVerified\n      relayId\n      id\n    }\n    relayId\n    tokenId\n    ...AssetSelectionItem_data\n    ...asset_url\n    id\n  }\n  assetBundle {\n    relayId\n    id\n  }\n  ...Asset_data_gVyhu\n}\n\nfragment AssetSearch_data_40oIf9 on Query {\n  ...AssetSearchFilter_data_PFx8Z\n  ...SearchPills_data_2Kg4Sq\n  search(collections: $collections, first: 32, numericTraits: $numericTraits, querystring: $query, resultType: ASSETS, sortAscending: $sortAscending, sortBy: $sortBy, stringTraits: $stringTraits, toggles: $toggles) {\n    edges {\n      node {\n        ...AssetSearchList_data_gVyhu\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AssetSelectionItem_data on AssetType {\n  backgroundColor\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    imageUrl\n    id\n  }\n  imageUrl\n  name\n  relayId\n}\n\nfragment Asset_data_gVyhu on SearchResultType {\n  asset {\n    relayId\n    isDelisted\n    ...AssetCardContent_asset\n    ...AssetCardFooter_asset_1OrK6u\n    ...AssetMedia_asset\n    ...asset_url\n    ...itemEvents_data\n    orderData {\n      bestAsk {\n        paymentAssetQuantity {\n          quantityInEth\n          id\n        }\n      }\n    }\n    id\n  }\n  assetBundle {\n    relayId\n    ...bundle_url\n    ...AssetCardContent_assetBundle\n    ...AssetCardFooter_assetBundle\n    orderData {\n      bestAsk {\n        paymentAssetQuantity {\n          quantityInEth\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment CollectionFilter_data_tXjHb on Query {\n  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {\n    edges {\n      node {\n        assetCount\n        imageUrl\n        name\n        slug\n        isVerified\n        id\n      }\n    }\n  }\n  collections(first: 100, includeHidden: $includeHiddenCollections, query: $collectionQuery, sortBy: SEVEN_DAY_VOLUME) {\n    edges {\n      node {\n        assetCount\n        imageUrl\n        name\n        slug\n        isVerified\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment CollectionHeader_data on CollectionType {\n  name\n  description\n  imageUrl\n  bannerImageUrl\n  relayId\n  slug\n  owner {\n    ...AccountLink_data\n    id\n  }\n  ...CollectionStatsBar_data\n  ...SocialBar_data\n  ...verification_data\n  ...CollectionWatchlistButton_data\n}\n\nfragment CollectionModalContent_data on CollectionType {\n  description\n  imageUrl\n  name\n  slug\n}\n\nfragment CollectionStatsBar_data on CollectionType {\n  stats {\n    numOwners\n    totalSupply\n    id\n  }\n  nativePaymentAsset {\n    ...PaymentAssetLogo_data\n    id\n  }\n  ...collection_url\n  ...collection_stats\n}\n\nfragment CollectionWatchlistButton_data on CollectionType {\n  relayId\n}\n\nfragment NumericTraitFilter_data on NumericTraitTypePair {\n  key\n  value {\n    max\n    min\n  }\n}\n\nfragment PaymentAssetLogo_data on PaymentAssetType {\n  symbol\n  asset {\n    imageUrl\n    id\n  }\n}\n\nfragment PaymentFilter_data_2YoIWt on Query {\n  paymentAssets(first: 10) {\n    edges {\n      node {\n        symbol\n        relayId\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  PaymentFilter_collection: collection(collection: $collection) {\n    paymentAssets {\n      symbol\n      relayId\n      id\n    }\n    id\n  }\n}\n\nfragment PhoenixCollectionActionBar_data on CollectionType {\n  relayId\n  assetContracts(first: 2) {\n    edges {\n      node {\n        address\n        blockExplorerLink\n        chain\n        chainData {\n          blockExplorerName\n        }\n        id\n      }\n    }\n  }\n  discordUrl\n  externalUrl\n  instagramUsername\n  mediumUsername\n  telegramUrl\n  twitterUsername\n  connectedTwitterUsername\n  ...collection_url\n  ...CollectionWatchlistButton_data\n}\n\nfragment PhoenixCollectionInfo_data on CollectionType {\n  description\n  name\n  nativePaymentAsset {\n    ...PaymentAssetLogo_data\n    id\n  }\n  ...collection_url\n  ...collection_stats\n}\n\nfragment PhoenixCollectionSocialBar_data on CollectionType {\n  assetContracts(first: 2) {\n    edges {\n      node {\n        address\n        blockExplorerLink\n        chain\n        chainData {\n          blockExplorerName\n        }\n        id\n      }\n    }\n  }\n  discordUrl\n  externalUrl\n  instagramUsername\n  mediumUsername\n  telegramUrl\n  twitterUsername\n  connectedTwitterUsername\n  ...collection_url\n}\n\nfragment Price_data on AssetType {\n  decimals\n  imageUrl\n  symbol\n  usdSpotPrice\n  assetContract {\n    blockExplorerLink\n    chain\n    id\n  }\n}\n\nfragment ProfileImage_data on AccountType {\n  imageUrl\n  user {\n    publicUsername\n    id\n  }\n  displayName\n}\n\nfragment SearchPills_data_2Kg4Sq on Query {\n  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {\n    edges {\n      node {\n        imageUrl\n        name\n        slug\n        ...CollectionModalContent_data\n        id\n      }\n    }\n  }\n}\n\nfragment SocialBar_data on CollectionType {\n  relayId\n  discordUrl\n  externalUrl\n  instagramUsername\n  mediumUsername\n  slug\n  telegramUrl\n  twitterUsername\n  connectedTwitterUsername\n  assetContracts(first: 2) {\n    edges {\n      node {\n        blockExplorerLink\n        chainData {\n          blockExplorerName\n        }\n        id\n      }\n    }\n  }\n  ...collection_url\n  ...CollectionWatchlistButton_data\n}\n\nfragment StringTraitFilter_data on StringTraitType {\n  counts {\n    count\n    value\n  }\n  key\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment asset_edit_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n  collection {\n    slug\n    id\n  }\n}\n\nfragment asset_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n\nfragment bundle_url on AssetBundleType {\n  slug\n}\n\nfragment collection_stats on CollectionType {\n  statsV2 {\n    numOwners\n    totalSupply\n    totalVolume {\n      unit\n    }\n    floorPrice {\n      unit\n    }\n  }\n}\n\nfragment collection_url on CollectionType {\n  slug\n}\n\nfragment itemEvents_data on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n\nfragment verification_data on CollectionType {\n  isMintable\n  isSafelisted\n  isVerified\n}\n\nfragment wallet_accountKey on AccountType {\n  address\n}\n',
  },
  CollectionPayoutsPageQuery: {
    key: 'a7eca3467d85025f9edc187cc9b151e4b9aeb712c823e7c3bed0755917155366',
    query: null,
  },
  CollectionSearchScrollerQuery: {
    key: 'd0c43d17601b0af10f9e79c16e1ecac40f08f8dd4a23c3b89b49776d6caae80b',
    query: null,
  },
  CollectionSelectQuery: {
    key: 'bff6b77052fe02aa760a8dae512001c8dbce9843eaef08aaeb51dc4c28141d08',
    query: null,
  },
  CollectionSlugInputQuery: {
    key: '707d4394d4cf39f76f8ba73eba5210b1827b344cb93faa8f6d7c1b0a4bb48d5e',
    query: null,
  },
  CollectionTooltipQuery: {
    key: '8a3132b21da6fb7a038715e79043bfb78564aa240e1401cb3722323fb20fc391',
    query: null,
  },
  CollectionWatchlistButtonMutation: {
    key: 'e8c1a958780ca42d2ddab2a76c618eddc1e3587c8c7cd807b566a484c45ed925',
    query: null,
  },
  CollectionsScrollerQuery: {
    key: 'b9be9aa9b280fc490a3c4c6d70c71f625fbe0f4b9a63e38e99a635adb964b29d',
    query:
      'query CollectionsScrollerQuery(\n  $categories: [CategorySlug!]\n  $chains: [ChainScalar!]\n) {\n  trendingCollections(first: 12, categories: $categories, chains: $chains) {\n    edges {\n      node {\n        ...CollectionCard_data\n        id\n      }\n    }\n  }\n}\n\nfragment AccountLink_data on AccountType {\n  address\n  config\n  isCompromised\n  user {\n    publicUsername\n    id\n  }\n  displayName\n  ...ProfileImage_data\n  ...wallet_accountKey\n  ...accounts_url\n}\n\nfragment CollectionCardContextMenu_data on CollectionType {\n  ...collection_url\n}\n\nfragment CollectionCard_data on CollectionType {\n  ...CollectionCardContextMenu_data\n  ...CollectionCard_getShowCollectionCardData\n  ...collection_url\n  description\n  name\n  shortDescription\n  slug\n  logo\n  banner\n  isVerified\n  owner {\n    ...AccountLink_data\n    id\n  }\n  stats {\n    totalSupply\n    id\n  }\n  defaultChain {\n    identifier\n  }\n}\n\nfragment CollectionCard_getShowCollectionCardData on CollectionType {\n  logo\n  banner\n}\n\nfragment ProfileImage_data on AccountType {\n  imageUrl\n  user {\n    publicUsername\n    id\n  }\n  displayName\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment collection_url on CollectionType {\n  slug\n}\n\nfragment wallet_accountKey on AccountType {\n  address\n}\n',
  },
  CreatorEarningsSettingsQuery: {
    key: 'c8081d2d64b4780cf1dacd7463af56ca4c7f61c68d6d79cdf5a717ef0b6331ca',
    query: null,
  },
  EventHistoryPollQuery: {
    key: 'b378a4b4b0c856ddf8f38fe5bba4cc8cc7462ab2400396dd3fb12bb6bb03cff1',
    query: null,
  },
  EventHistoryQuery: {
    key: '5b621f3bcbfe37c6c1515656f07e8277ddaaf464c571c3c9b074494793f45a72',
    query: null,
  },
  ExplorePageQuery: {
    key: '73a6d6f99c5ba845cdc16d04b9d2c2adb73627bbbbaa03301eeb42d2eb5071bb',
    query: null,
  },
  FiatOnrampsBetaFeatureFlagQuery: {
    key: '63d491fd8bfcfa5658aee93258eadee2b5cd20b64bc407dbf5c034ed28bca4fb',
    query: null,
  },
  FreezeAssetMetadataModalContentActionQuery: {
    key: 'e6002bebc9a60155a609964701008e506c0ca6c839881feb754dc5fd63379707',
    query: null,
  },
  FreezeAssetMetadataModalContentMutation: {
    key: 'ec59bb702797a8231c6ff6bff74bc1e34d94b6430e24dd9a0b4c4aee1ee51743',
    query: null,
  },
  FulfillActionModalQuery: {
    key: '6630593c6f854692045e5c6f9153aeca538bec9487da01035095214071fe1005',
    query: null,
  },
  GetListedStepTwoPageValidateContractQuery: {
    key: 'a704e9b5746e5724780fd52bdf86e192e91e13941d528a4fce4380ecfee377fb',
    query: null,
  },
  HomePageQuery: {
    key: 'a06b8a36ebf031093e0dccfe8b4b2d01bfc4d28a7c9583a1d37d112fbcca2b62',
    query:
      'query HomePageQuery {\n  promotions(promotionType: HOMEPAGE) {\n    ...Promotions_promotions\n    id\n  }\n  featuredAsset(featuredAssetType: HOMEPAGE) {\n    ...Featured_data\n    id\n  }\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  backgroundColor\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n  isDelisted\n  imageUrl\n  displayImageUrl\n}\n\nfragment Featured_data on AssetType {\n  name\n  imagePreviewUrl\n  imageUrl\n  creator {\n    imageUrl\n    user {\n      publicUsername\n      id\n    }\n    id\n  }\n  ...asset_url\n  ...AssetMedia_asset\n  ...itemEvents_data\n}\n\nfragment Promotions_promotions on PromotionType {\n  id\n  promoCardImg\n  promoCardLink\n  promoCardVideo\n  promoCardVideoMimeType\n  promoHeader\n  cardColor\n  promoSubtitle\n  saleStartTime\n  saleEndTime\n}\n\nfragment asset_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n\nfragment itemEvents_data on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n}\n',
  },
  InactiveListingsPaginationQuery: {
    key: 'e87a827be25f874f45b4fc746907d4d02c3babf43ba862e49bd60b490c00107c',
    query: null,
  },
  InactiveListingsQuery: {
    key: '58b9d63e2853f38e95afd83d8bddcefb4c5470a0804c0da81caf13fff8b52a38',
    query: null,
  },
  ItemOwnersListLazyQuery: {
    key: '8905175e04df1aae15b614c77bd64cabec63b9fc0b6a91cad71c6ac062bce54e',
    query: null,
  },
  ItemOwnersListQuery: {
    key: 'c0443a5882aa2747a80fe9e4966acf88a5505cbb6479598a58534d3c3a7155a0',
    query: null,
  },
  ItemTransferPageQuery: {
    key: '4834bceb1f1a59e93546e96f9e4583d78c77de1bb4d4bfefba3cfa28e7b5af0a',
    query: null,
  },
  ListingSearchQuery: {
    key: '53bf54e676afbd1162af26c3675dc814c7b16ec5913aa57b05a28317272d42b2',
    query: null,
  },
  ListingSuccessModalQuery: {
    key: '33739f59a8d781df557cd00bfaf62f98e41e0363037525d0af5913c94708f59c',
    query: null,
  },
  MarkAccountAsCompromisedMutation: {
    key: 'a897c254999c63c2dc94f0f2b439d79b1a6fe47a9d14bf5a86e9e64e17f519b8',
    query: null,
  },
  MigrateListingButtonMutation: {
    key: '5285ac4312aa1390096c0f42c7beb4cdc5b9236e7768145c9fe35ec751232e4c',
    query: null,
  },
  MigrateListingsPaginationQuery: {
    key: '7dcaaa6f20dc385a722b420d874e4cb8a9be9151202eab56221fdfdf1bb95b14',
    query: null,
  },
  MigrateListingsQuery: {
    key: 'ae3f7aea5a94413f36f9c79ef1fe4cb69d53cd2cff5283678dd7ceae9ce3a2d0',
    query: null,
  },
  MoonPayCheckoutModalQuery: {
    key: '37c9346e8be2c9177ce5375a5ceb7fdd48a14db86e8697d232cc1e85231d6948',
    query: null,
  },
  MoonPayTopupModalQuery: {
    key: 'de88467d6c4e2af08714f70607d91c00689b24fd6d691dd0622f0da61e6a6d33',
    query: null,
  },
  MultiChainTradingGateMutation: {
    key: '526627263ef07ebf9b0668341d407560fc9869a87413d9f3d455b1f1ce16783b',
    query: null,
  },
  MyCollectionsPageQuery: {
    key: 'd057718c4626327a455f6d7f32b953594fc6c94d0b0ebfb711e74fd0c0b195b3',
    query: null,
  },
  NavSearchAssetsQuery: {
    key: '6e38f220a9949b3ecd91380495efd71b1ddf218a09d636dd0bdb9fef22d9e657',
    query: null,
  },
  NavSearchQuery: {
    key: '839b8114bb188073b406ed4db5e1f658994fa66dfd0947c96a90d5ebad58237d',
    query: null,
  },
  NavbarQuery: {
    key: '4e0b5ead4b23cc35c83b1f4d7a32ff633ffe167064c90f0c826866e74c67bef0',
    query: null,
  },
  NetworkUnsupportedGateChainQuery: {
    key: '33127437c3750929cf90e9a774a3dcb4e529fa29c5b2883f8b8d2bd8672ca312',
    query: null,
  },
  NotificationSettingsMutation: {
    key: '6e80da18e3a6196e44d0fd4588ed1710595a19778af3fff25324f32e3c72c865',
    query: null,
  },
  NotificationSettingsQuery: {
    key: '36ff518ec560811f710b8cecfa5c02572712d114ee9091bc57f7f17495047d5f',
    query: null,
  },
  OfferSearchQuery: {
    key: 'fe93b8ff1b0bb5117e6d8acc8c884f95c11380298b294bcfcf5197727b72cc6c',
    query: null,
  },
  OfferSettingsQuery: {
    key: 'acafc043d978ea4af43747bf48fe7eb93a461cb78416c9bafbb836d39359bda7',
    query: null,
  },
  OfferSettingsTableAccountPaginationQuery: {
    key: '901b8be12694aef7f64ee45e72e52df80b7de39551bbb1169f3269d86898ffad',
    query: null,
  },
  OfferSettingsTableCollectionMutation: {
    key: '73bb595e664f468488e9d7e055b845ebdfeb0e373f549b9f7e6b03cb747b680e',
    query: null,
  },
  OrderCreateActionModalQuery: {
    key: 'b5a9159c14f1d74f828d7e23e454a8b3f247b10fbf46edbc4e66975072a9fda7',
    query: null,
  },
  OrderManagerQuery: {
    key: '3c3ea19e951e0b58a53f5fa44dd53b608507fba71eee960217287688db014b18',
    query: null,
  },
  OrdersQuery: {
    key: 'a4e81e21b9350f9b851b1274f4d326441e313870311f3f79311bf6eb19cf4614',
    query: null,
  },
  PartnershipPageQuery: {
    key: '3fd79a1a0a52f6c9a9fa74ba63896b651c6e0709cef551f02cb7e252ef2a12d9',
    query: null,
  },
  PaymentFilterQuery: {
    key: '1a71e00a5a64c6565a1532e42005fec0c190c4d3078a979eb460c6c701ee4e7f',
    query:
      'query PaymentFilterQuery(\n  $collection: CollectionSlug\n  $count: Int\n  $cursor: String\n  $query: String\n) {\n  query {\n    ...PaymentFilter_data_2ArDfe\n  }\n}\n\nfragment PaymentFilter_data_2ArDfe on Query {\n  paymentAssets(after: $cursor, symbolIcontains: $query, first: $count) {\n    edges {\n      node {\n        symbol\n        relayId\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  PaymentFilter_collection: collection(collection: $collection) {\n    paymentAssets {\n      symbol\n      relayId\n      id\n    }\n    id\n  }\n}\n',
  },
  PaymentSettingsQuery: {
    key: '1f62c48aa3b54f15756485006a80bc6245aeddc4aca7000f78ec127e7850a09a',
    query: null,
  },
  PriceHistoryQuery: {
    key: '2296b822653e386debc6d90b742dada63460cce0443010fde34fef05739e50da',
    query: null,
  },
  PrivateListingBannerQuery: {
    key: '46f9a81a5ec61addb3054e0f051b7741c3f9661945da67458ce19d207dfed08c',
    query: null,
  },
  ProfileBannerMutation: {
    key: '915ba228a3918fea345de3d04c776afb72797162da504395bfbe805cb035b4c3',
    query: null,
  },
  ProfileImageMutation: {
    key: '01645a71b56f268ff4131371231286baf892d17adbed2b7e1202bf62e53b100b',
    query: null,
  },
  RankingsPagePaginationQuery: {
    key: '5e11da3100169985a664bb72243114e47bc33a1cdc21ffddd396f20ea209815e',
    query: null,
  },
  RankingsPageQuery: {
    key: 'c9e930e4edb22588d672233ed06bcd592177894fa5ad9c1821edf2a92f92dfef',
    query: null,
  },
  RefreshStatsButtonMutation: {
    key: 'c372cf41c47711c206969e80747509d3518b9f495091ca8b476e91031615d008',
    query: null,
  },
  RelistListingButtonMutation: {
    key: 'ceac6268eddbb1d0baf6f8746f62109a1180a403cef845680a7036bb3a99540f',
    query: null,
  },
  RelistListingsPaginationQuery: {
    key: '5f9636761d1c0a18bfb31f60159731f14e61622c25bfec3606c24ca662fd0233',
    query: null,
  },
  RelistListingsQuery: {
    key: '6b6068ae00d3d68f3d1a22f2f3c02ce3877d4776ea49e9f9d1a9455c9aa1c3bd',
    query: null,
  },
  ReportModalContentMutation: {
    key: 'e3d4e401593e4ffb55601bb4dd3eba7c75eafeb4c0331ad1b164e4e734ce6943',
    query: null,
  },
  SafelistPageCollectionConfigureVisibilityMutation: {
    key: 'a107fd117c3763b74b6c25ee4046b22acc3d3a9b9c8093f782402fe796cc0f15',
    query: null,
  },
  SafelistPageCollectionDelistMutation: {
    key: '68ffbfba6a4a0733db114f6b690da0789a1ad75405ad040cec4f5af68259cd0e',
    query: null,
  },
  SafelistPageCollectionSafelistRequestStatusMutation: {
    key: '8d84a2732f402ae241b1b6ac6fea694cb8ed7b65901765068fdd9e2f30405262',
    query: null,
  },
  SafelistPageQuery: {
    key: '53b1f56277b27af2df43167992f82a1b267c6425a35803c724d33b6ddcd9f01e',
    query: null,
  },
  SellAssetSelectQuery: {
    key: '61201b6921e85c226f2f639a6a8a686cbe16b1934983413466ea518e1aa03636',
    query: null,
  },
  SellFiatQuery: {
    key: '125ab588d58d3fe84822450ffee7be61401df8699b96220226415dfdee207056',
    query: null,
  },
  SwapModalContentFromQuery: {
    key: 'e562e47d85b8618663115504a8fb376149673c70b954bf58ce6f16305313802f',
    query: null,
  },
  SwapModalContentToQuery: {
    key: 'a98d17778ebed2efe298f6223f9a84537f5f9ac3a2b118d4825e9e5032237ea5',
    query: null,
  },
  ToolbarAssetRefreshMutation: {
    key: 'aca8db96dceca728d85769b3c7fc210d9d7f8eae6448bd2a81bbf8f7f6a48370',
    query: null,
  },
  ToolbarHideAssetMutation: {
    key: 'c925c636c8bd3e8b9b3c6fb40a90ac6119fe415b0253f2008ff3fcc081bdfa1b',
    query: null,
  },
  ToolbarNsfwAssetMutation: {
    key: '4bcd61db358f32c5036bc3eee9774853fe2cb9c7e0ca4373f7428e079aa214cd',
    query: null,
  },
  TopCollectionsLazyQuery: {
    key: '397ba50a698d9087152a07b723e0c376b7ea0a98929470779f46cae77e031128',
    query:
      'query TopCollectionsLazyQuery(\n  $sortBy: CollectionSort\n) {\n  ...TopCollections_data_34jhwD\n}\n\nfragment PaymentAssetLogo_data on PaymentAssetType {\n  symbol\n  asset {\n    imageUrl\n    id\n  }\n}\n\nfragment TopCollections_data_34jhwD on Query {\n  collections(first: 15, sortBy: $sortBy, sortAscending: false, includeHidden: true) {\n    edges {\n      node {\n        ...collection_url\n        id\n        name\n        logo\n        createdDate\n        isVerified\n        nativePaymentAsset {\n          ...PaymentAssetLogo_data\n          id\n        }\n        statsV2 {\n          floorPrice {\n            unit\n          }\n          oneDayChange\n          oneDayVolume {\n            unit\n          }\n          sevenDayChange\n          sevenDayVolume {\n            unit\n          }\n          thirtyDayChange\n          thirtyDayVolume {\n            unit\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment collection_url on CollectionType {\n  slug\n}\n',
  },
  TopCollectionsListQuery: {
    key: '97ec48cb45c0ce2c0589d41b286556236709e3cf1e919978093517b7aabc3a59',
    query: null,
  },
  TransferActionsModalContentQuery: {
    key: '2b0e99bc94f56ac10e187fc871bd495b2413938b6d87af6fe43e7a283a0b56a6',
    query: null,
  },
  TransferModalContentQuery: {
    key: '3dc9da682f912bd9ae3211014170425f6362505273bec43bff7f16598cf16a39',
    query: null,
  },
  TrendingCollectionsListQuery: {
    key: 'aa4783956a61f0f2d5dc2a05231b17c88abef40a16c9f3dc4512ae4bbbdd178b',
    query: null,
  },
  UnlockableContentModalQuery: {
    key: 'c3565d95e0e5812f769d15ffba782b6f9ecb5d8287b2b9acbb73b9c568f803e3',
    query: null,
  },
  WalletFundsQuery: {
    key: '3714d9ca76bd14a84bde66279afe7358621e859eca14fd37a2e98dbfc1a95e6a',
    query: null,
  },
  WalletMenuRefreshFundsMutation: {
    key: '7e4adab04b92ba99c3af3ac6a7f726406f8445427c31bb0e5246730afa766a47',
    query: null,
  },
  WatchlistPagePaginationQuery: {
    key: 'c2e1c02c58c26b1b50702fdd99da8c94e5b486a8fd3a5b1b6b3907deccec0061',
    query: null,
  },
  WatchlistPageQuery: {
    key: '9d07a5b10c51475e8cf7619e69c91ef49b661dd471d12c8ba023b02a667e2fbe',
    query: null,
  },
  WatchlistTableMutation: {
    key: '1c88dbc213e662e85fee030268ef843fd5816823674f8a9797d0058903c3e3a7',
    query: null,
  },
  addressesAccountQuery: {
    key: 'e692b1cdbc8174a8b12e7685fa47ddfc6e62528fb9e67f240d0088b2527230cf',
    query: null,
  },
  announcementBannerQuery: {
    key: 'f046aa868a74a8c9eac72e8da051507a3b799aac8e14fc13592cedc595b92551',
    query: null,
  },
  assetsVisitorUpdateMutation: {
    key: '8293e481d872a25d437f59187b707ccc4db3f8349ecad730739612ab1d72bb6d',
    query: null,
  },
  authLoginMutation: {
    key: 'c59037126bd280c25d87029e968b165b74c6722a1ee4c8457d35a88dba54472b',
    query: null,
  },
  categoriesQuery: {
    key: '6eafbe253feb44670327504e4139528713ed8af529a9a738b1db5ba8ec103095',
    query: 'query categoriesQuery {\n  categories {\n    slug\n  }\n}\n',
  },
  challengeLoginMessageQuery: {
    key: '05649d324b3f3db988d5065ea33599bca390adf00e3f46952dd59ff5cc61e1e0',
    query: null,
  },
  ensQuery: {
    key: '8e463ace0a33640ca644de3f22fa55d0de7ee9dff7e067661e813501f32113b5',
    query: null,
  },
  ordersTermsAcceptanceMutation: {
    key: '226aaa95e37a06a3e28e53a64e8e92e54e2a6fd93cf013f204c90d8898f3b6a5',
    query: null,
  },
  ordersWillReactivateBundleListingsQuery: {
    key: '9e8fda9387dd12ddc5642ff5fd5cc224b32620534fb7f9cbfdb094fc7cf91ad2',
    query: null,
  },
  ordersWillReactivateListingsQuery: {
    key: '9d2b48924bdeabd32dcd1b819e16c92ce18743188dd739d7607d00a5998d5f09',
    query: null,
  },
  swapActionsQuery: {
    key: '23ad637b6d7ae18df265ec68712dea1e23267689a66a9d21545db512cc5872fd',
    query: null,
  },
  traderBridgingEventsQuery: {
    key: '5886597826b568d17a28c489e860854ab8873e079c630c6a0ed3036854acb1bc',
    query: null,
  },
  traderCancelOrderMutation: {
    key: 'a030a528f67ee824eda990cb6b9715e4edb1ba81777a278520a79599b78c6ea6',
    query: null,
  },
  traderCreateOrderMutation: {
    key: '507b60d2ec363ff1cdea2a6bb69e550cf37f0c0ca9f169aa1d0e8142c0da46bc',
    query: null,
  },
  traderOrderFulfillmentActionsQuery: {
    key: '2aa96e6c3f93e966aeb501c291dca10a4b2ba4971de23f027cdcab0136b2e002',
    query: null,
  },
  traderRelayMetaTransactionMutation: {
    key: 'e554b5f0fb86421f992be6cce237c125e793c3c234fc11f9fda7c3422e271911',
    query: null,
  },
  traderTransactionQuery: {
    key: '663d2109e44b392b9cfcd959e55238d334039dfbc736176b3b1799f9f4ad4f3f',
    query: null,
  },
  useAssetFavoriteMutation: {
    key: 'd3f55288dd86ea745448362b88dacd4316547c5c4259bfd33caff7e3b3c1b333',
    query: null,
  },
  useMoonpayKycStatusQuery: {
    key: '03b7ca64a42258238c84e9948c01971b5de423ada780f3f3f64e573d3068e868',
    query: null,
  },
  useNoSuspenseLazyLoadQuerySpecQuery: {
    key: 'a4a6ca9bd9d91d5138858f310b01dc22905553b67ccad326d8f1f745b0666f06',
    query: null,
  },
  useUsernameInputQuery: {
    key: 'a9cd73839b4d9812117ef3ffed5d5fc9af5fac19c3e9c39ba603febac550abf1',
    query: null,
  },
  walletBalanceBySymbolQuery: {
    key: '23d50cb45c4ca4194cb7ab3074ffb1124f1b2d905fe55cff7e6224c520ae5374',
    query: null,
  },
  walletBalanceQuery: {
    key: '49f7f251e697a7dfa40e24bb426f9fcf28ad404e9f3b77d70b88a9b742653011',
    query: null,
  },
  walletMultiQuery: {
    key: 'ed8a476fb18b01b836dbb51e4bc4af32ca69c9a13337d7e12b5cacb862401bc6',
    query: null,
  },
  walletQuery: {
    key: '0bab16fe61983a3f986e75c7211ed6250c19d1df953554ff20bbd857f39d367c',
    query: null,
  },
};

export default openseaQuery;

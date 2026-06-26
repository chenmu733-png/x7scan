import type { Block, Transaction, Wallet, Token, Validator, Vault, MarketData, NetworkStats, LeaderboardEntry, WhaleTransaction, LendingAsset, NFTCollection, Alert } from '@/types';

const randomHex = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
const randomAddress = () => `0x${randomHex(40)}`;
const randomHash = () => `0x${randomHex(64)}`;

export function generateBlocks(count: number): Block[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    height: 1050027935 - i,
    hash: randomHash(),
    timestamp: now - i * 500,
    transactions: Math.floor(Math.random() * 3000) + 100,
    gasUsed: Math.floor(Math.random() * 10000000),
    gasLimit: 30000000,
    proposer: randomAddress(),
  }));
}

export function generateTransactions(count: number): Transaction[] {
  const now = Date.now();
  const methods = ['Transfer', 'Buy', 'Sell', 'Close Long', 'Close Short', 'Open Long', 'Open Short', 'Withdraw', 'Deposit', 'InternalTransfer', 'Spot Dust Conversion', 'Genesis'];
  const tokens = ['USDC', 'HYPE', 'UBTC', 'UETH', 'USOL', 'MELANIA-USD', 'TRUMP-USD', 'MAX', 'USDH', 'USDT'];
  const tokenAddresses: Record<string, string> = {
    USDC: '0x6d1e7cde53ba9467b783cb7c530ce054',
    HYPE: '0x0d01dc56dcaaca66ad901c959b4011ec',
    UBTC: '0x8f254b963e8468305d409b33aa137c67',
    UETH: '0xe1edd30daaf5caac3fe63569e24748da',
    USOL: '0x49b67c39f5566535de22b29b0e51e685',
    'MELANIA-USD': '0xabc123',
    'TRUMP-USD': '0xdef456',
    MAX: '0x6781b92b6ea5d8ed37d275eb201f64af',
    USDH: '0x54e00a5988577cb0b0c9ab0cb6ef7f4b',
    USDT: '0x25faedc3f054130dbb4e4203aca63567',
  };

  return Array.from({ length: count }, (_, i) => {
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    const amount = Math.random() * 1000000;
    const price = token === 'USDC' || token === 'USDT' || token === 'USDH' ? 1 : Math.random() * 100000;
    return {
      hash: randomHash(),
      blockHeight: 1050027935 - Math.floor(Math.random() * 100),
      timestamp: now - i * 2000,
      from: randomAddress(),
      to: randomAddress(),
      amount,
      token,
      tokenAddress: tokenAddresses[token] || randomAddress(),
      method: methods[Math.floor(Math.random() * methods.length)],
      price,
      usdValue: amount * price,
      status: Math.random() > 0.05 ? 'success' : 'failed',
    };
  });
}

export function generateWallet(address?: string): Wallet {
  const addr = address || randomAddress();
  const balance = Math.random() * 5000000;
  const pnl = (Math.random() - 0.3) * 2000000;

  return {
    address: addr,
    alias: Math.random() > 0.7 ? `Trader_${randomHex(4)}` : '',
    balance,
    perpsValue: Math.random() * 500000,
    spotValue: Math.random() * 200000,
    lendingValue: Math.random() * 50000,
    vaultValue: Math.random() * 100000,
    stakedValue: Math.random() * 300000,
    evmValue: Math.random() * 2000000,
    portfolio: Array.from({ length: 6 }, () => ({
      token: ['HYPE', 'USDC', 'UBTC', 'UETH', 'USOL', 'USDE'][Math.floor(Math.random() * 6)],
      tokenAddress: randomAddress(),
      amount: Math.random() * 10000,
      value: Math.random() * 500000,
      price: Math.random() * 100000,
      change24h: (Math.random() - 0.5) * 20,
      allocation: Math.random() * 50,
    })),
    pnl,
    roi: (pnl / balance) * 100,
    winRate: 40 + Math.random() * 40,
    profitFactor: 0.5 + Math.random() * 3,
    sharpeRatio: -2 + Math.random() * 6,
    maxDrawdown: -(Math.random() * 50),
    tradingStats: {
      totalTrades: Math.floor(Math.random() * 5000),
      winTrades: Math.floor(Math.random() * 3000),
      lossTrades: Math.floor(Math.random() * 2000),
      totalPnl: pnl,
      avgPnl: pnl / 100,
      bestTrade: Math.random() * 500000,
      worstTrade: -(Math.random() * 200000),
      avgHoldTime: Math.random() * 86400000 * 7,
      tradingDays: Math.floor(Math.random() * 365),
      currentStreak: Math.floor(Math.random() * 20),
      bestStreak: Math.floor(Math.random() * 50),
    },
    positions: Array.from({ length: Math.floor(Math.random() * 10) }, () => ({
      id: randomHex(8),
      market: ['BTC', 'ETH', 'SOL', 'HYPE', 'MELANIA'][Math.floor(Math.random() * 5)],
      side: Math.random() > 0.5 ? 'long' as const : 'short' as const,
      size: Math.random() * 1000,
      entryPrice: Math.random() * 100000,
      markPrice: Math.random() * 100000,
      liquidationPrice: Math.random() * 100000,
      leverage: Math.floor(Math.random() * 50) + 1,
      margin: Math.random() * 50000,
      pnl: (Math.random() - 0.4) * 100000,
      roe: (Math.random() - 0.4) * 200,
      fundingPaid: Math.random() * 5000,
      fundingReceived: Math.random() * 3000,
      openTime: Date.now() - Math.random() * 86400000 * 30,
      duration: Math.random() * 86400000 * 30,
      tp: Math.random() > 0.5 ? Math.random() * 100000 : null,
      sl: Math.random() > 0.5 ? Math.random() * 100000 : null,
      status: 'open' as const,
    })),
    followers: Math.floor(Math.random() * 10000),
    following: Math.floor(Math.random() * 500),
    firstSeen: Date.now() - Math.random() * 86400000 * 365,
    riskScore: Math.random() * 100,
    leaderboardRank: Math.floor(Math.random() * 1000),
    isWatched: false,
    isFavorite: false,
    tags: [],
    notes: '',
  };
}

export function generateTokens(count: number): Token[] {
  const names = ['HYPE', 'UBTC', 'UETH', 'USOL', 'UZEC', 'XMR1', 'LEAP', 'PVP', 'COKE', 'KING', 'POP', 'JEFE', 'ANGY', 'DOG', 'MOON', 'GIGA', 'FELIX', 'AZUR', 'FAN', 'ROUTE'];
  
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const price = name.startsWith('U') ? 1000 + Math.random() * 100000 : Math.random() * 100;
    return {
      address: randomAddress(),
      name,
      symbol: name,
      price,
      change24h: (Math.random() - 0.5) * 30,
      volume24h: Math.random() * 100000000,
      marketCap: Math.random() * 1000000000,
      fdv: Math.random() * 2000000000,
      liquidity: Math.random() * 50000000,
      tlv: Math.random() * 100000000,
      supply: Math.random() * 1000000000,
      circulatingSupply: Math.random() * 800000000,
      holderCount: Math.floor(Math.random() * 100000),
      buySellRatio: 0.5 + Math.random() * 1.5,
      whaleDistribution: Math.random() * 60,
      isFavorite: false,
    };
  });
}

export function generateValidators(): Validator[] {
  const validators = [
    { name: 'Hyper Foundation 1', description: 'Hyper Foundation 1', commission: 3, stake: 52450000 },
    { name: 'Hyper Foundation 2', description: 'Hyper Foundation 2', commission: 3, stake: 55580000 },
    { name: 'Hyper Foundation 3', description: 'Hyper Foundation 3', commission: 3, stake: 55400000 },
    { name: 'Hyper Foundation 4', description: 'Hyper Foundation 4', commission: 3, stake: 34680000 },
    { name: 'Hyper Foundation 5', description: 'Hyper Foundation 5', commission: 3, stake: 15290000 },
    { name: 'Anchorage By Figment', description: 'Anchorage and Figment have partnered to run institutional-grade validator infrastructure on Hyperliquid.', commission: 10, stake: 26740000 },
    { name: 'Hypurrscanning', description: 'L1 Explorer', commission: 1, stake: 23200000 },
    { name: 'Hyperliquid Strategies x Unit', description: 'The Hyperliquid Strategies x Unit validator is a partnership between Hyperliquid Strategies Inc and Unit Labs.', commission: 2, stake: 22440000 },
    { name: 'Nansen x HypurrCollective', description: 'HypurrCollective x Nansen is the collaboration between HypurrCollective and Nansen.', commission: 2, stake: 22230000 },
    { name: 'infinitefield.xyz', description: 'HFT market making infrastructure', commission: 0, stake: 17940000 },
    { name: 'HyperStake', description: 'Secure Hyperliquid with the most performant validator', commission: 0, stake: 9770000 },
    { name: 'Imperator.co', description: 'HypeRPC.app validator infrastructure', commission: 5, stake: 8500000 },
    { name: 'CMI', description: 'Institutional grade staking infrastructure', commission: 5, stake: 6200000 },
    { name: 'ASXN', description: 'ASXN Data validator', commission: 4, stake: 5100000 },
    { name: 'HypurrCorea', description: 'Spacebar x DeSpread', commission: 3, stake: 4800000 },
    { name: 'Bitwise Onchain Solutions x FalconX', description: 'Institutional staking by Bitwise and FalconX', commission: 10, stake: 3500000 },
    { name: 'Purrposeful x HyBridge x PiP', description: 'Multi-sig validator infrastructure', commission: 1, stake: 2900000 },
    { name: 'USDT0 x Luganodes', description: 'Stablecoin infrastructure validator', commission: 5, stake: 2500000 },
    { name: 'Kinetiq x Hyperion', description: 'High performance validator infrastructure', commission: 3, stake: 2200000 },
    { name: 'ValiDAO', description: 'Decentralized validator governance', commission: 2, stake: 1800000 },
  ];

  const totalStake = validators.reduce((sum, v) => sum + v.stake, 0);

  return validators.map((v, i) => ({
    address: randomAddress(),
    name: v.name,
    description: v.description,
    stake: v.stake,
    stakePercentage: (v.stake / totalStake) * 100,
    blocks: Math.floor(Math.random() * 20),
    status: 'purring' as const,
    commission: v.commission,
    uptime: 95 + Math.random() * 5,
    apr: 2 + Math.random() * 8,
    delegators: Math.floor(Math.random() * 5000),
    rewards: v.stake * 0.03,
    slashingHistory: [],
    isUp: true,
  }));
}

export function generateVaults(): Vault[] {
  const names = ['HyperVault Alpha', 'HYPE Max Yield', 'StableVault Pro', 'Delta Neutral BTC', 'ETH Momentum', 'SOL Staking Vault'];

  return names.map((name) => ({
    address: randomAddress(),
    name,
    strategy: ['Delta Neutral', 'Long Only', 'Market Making', 'Yield Farming', 'Arbitrage'][Math.floor(Math.random() * 5)],
    tvl: Math.random() * 100000000,
    apr: Math.random() * 30,
    pnl: (Math.random() - 0.3) * 5000000,
    depositors: Math.floor(Math.random() * 5000),
    allocation: Array.from({ length: 3 }, () => ({
      token: ['USDC', 'HYPE', 'UBTC'][Math.floor(Math.random() * 3)],
      percentage: Math.random() * 60,
      value: Math.random() * 50000000,
    })),
    historicalPerformance: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - i * 86400000,
      value: 1000000 + Math.random() * 500000,
      pnl: (Math.random() - 0.4) * 50000,
    })),
    isFavorite: false,
  }));
}

export function generateLendingAssets(): LendingAsset[] {
  const tokens = ['USDC', 'USDT', 'HYPE', 'UBTC', 'UETH', 'USOL'];
  return tokens.map((token) => ({
    token,
    symbol: token,
    supplyApy: Math.random() * 15,
    borrowApy: Math.random() * 20,
    supplied: Math.random() * 100000000,
    borrowed: Math.random() * 50000000,
    collateralFactor: 0.5 + Math.random() * 0.3,
    healthFactor: 1.5 + Math.random() * 3,
    liquidationRisk: Math.random() * 30,
  }));
}

export function generateNFTCollections(): NFTCollection[] {
  const names = ['HyperCats', 'PurrPunks', 'HYPE Apes', 'Liquid Ladies', 'DeFi Dinos'];
  return names.map((name) => ({
    address: randomAddress(),
    name,
    floorPrice: Math.random() * 5,
    volume24h: Math.random() * 100,
    owners: Math.floor(Math.random() * 5000),
    items: Math.floor(Math.random() * 10000),
    traits: Array.from({ length: 5 }, () => ({
      name: ['Background', 'Fur', 'Eyes', 'Hat', 'Accessory'][Math.floor(Math.random() * 5)],
      values: ['Red', 'Blue', 'Green', 'Gold', 'Diamond'],
      rarity: Math.random() * 10,
    })),
  }));
}

export function generateMarketData(): MarketData[] {
  const markets = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'HYPE', name: 'Hyperliquid' },
    { symbol: 'MELANIA', name: 'Melania USD' },
    { symbol: 'TRUMP', name: 'Trump USD' },
    { symbol: 'XMR', name: 'Monero' },
    { symbol: 'ZEC', name: 'Zcash' },
  ];

  return markets.map((m) => ({
    symbol: m.symbol,
    name: m.name,
    price: m.symbol === 'BTC' ? 60000 + Math.random() * 5000 : Math.random() * 100000,
    change24h: (Math.random() - 0.5) * 20,
    volume24h: Math.random() * 500000000,
    openInterest: Math.random() * 200000000,
    funding: (Math.random() - 0.5) * 0.01,
    marketCap: Math.random() * 10000000000,
    longShortRatio: 0.5 + Math.random() * 1,
  }));
}

export function generateNetworkStats(): NetworkStats {
  return {
    totalTransactions: 1_500_000_000 + Math.floor(Math.random() * 100000000),
    totalBlocks: 1_050_027_935 + Math.floor(Math.random() * 1000),
    totalAddresses: 2_500_000 + Math.floor(Math.random() * 100000),
    totalValidators: 27,
    totalStaked: 436_380_000,
    avgBlockTime: 500,
    gasPrice: 0.01,
    tps: 150 + Math.floor(Math.random() * 50),
  };
}

export function generateLeaderboard(count: number): LeaderboardEntry[] {
  return Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    address: randomAddress(),
    alias: Math.random() > 0.5 ? `Trader_${randomHex(4)}` : '',
    pnl: (Math.random() - 0.3) * 10000000,
    roi: (Math.random() - 0.3) * 500,
    volume: Math.random() * 1000000000,
    winRate: 30 + Math.random() * 50,
    trades: Math.floor(Math.random() * 10000),
    portfolioValue: Math.random() * 50000000,
  }));
}

export function generateWhaleTransactions(count: number): WhaleTransaction[] {
  const types: WhaleTransaction['type'][] = ['buy', 'sell', 'position', 'liquidation', 'bridge', 'deposit', 'withdraw', 'funding'];
  const tokens = ['HYPE', 'BTC', 'ETH', 'SOL', 'USDC'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: randomHex(8),
    type: types[Math.floor(Math.random() * types.length)],
    wallet: randomAddress(),
    token: tokens[Math.floor(Math.random() * tokens.length)],
    amount: Math.random() * 100000,
    value: Math.random() * 10000000,
    timestamp: Date.now() - i * 30000,
    txHash: randomHash(),
  }));
}

export function generateAlerts(): Alert[] {
  return [
    { id: '1', type: 'price', name: 'HYPE below $60', condition: 'HYPE price < 60', value: 60, active: true, channels: ['browser', 'telegram'], lastTriggered: null, createdAt: Date.now() - 86400000 },
    { id: '2', type: 'whale', name: 'Large HYPE buy', condition: 'HYPE buy > 1M', value: 1000000, active: true, channels: ['browser', 'discord'], lastTriggered: Date.now() - 3600000, createdAt: Date.now() - 172800000 },
    { id: '3', type: 'funding', name: 'BTC funding spike', condition: 'BTC funding > 0.05%', value: 0.0005, active: false, channels: ['webhook'], lastTriggered: null, createdAt: Date.now() - 259200000 },
  ];
}

export function generateCandleData(count: number) {
  const now = Date.now();
  let price = 64000;
  
  return Array.from({ length: count }, (_, i) => {
    const change = (Math.random() - 0.48) * 1000;
    price += change;
    return {
      time: Math.floor((now - (count - i) * 3600000) / 1000),
      open: price,
      high: price + Math.random() * 500,
      low: price - Math.random() * 500,
      close: price + (Math.random() - 0.5) * 300,
      volume: Math.floor(Math.random() * 10000000),
    };
  });
}

export function generateFundingHeatmap(): { market: string; funding: number; volume: number }[] {
  const markets = ['BTC', 'ETH', 'SOL', 'HYPE', 'MELANIA', 'TRUMP', 'XMR', 'ZEC', 'DOGE', 'AVAX', 'MATIC', 'ARB', 'OP', 'NEAR', 'SUI', 'SEI', 'TIA', 'INJ', 'FET', 'RENDER'];
  return markets.map((market) => ({
    market,
    funding: (Math.random() - 0.5) * 0.05,
    volume: Math.random() * 500000000,
  }));
}

export function generateTrendingTokens() {
  return [
    { symbol: 'HYPE', price: 64.43, change: 1.25, address: '0x0d01dc56dcaaca66ad901c959b4011ec' },
    { symbol: 'UBTC', price: 60140, change: -2.50, address: '0x8f254b963e8468305d409b33aa137c67' },
    { symbol: 'UETH', price: 1566, change: -5.12, address: '0xe1edd30daaf5caac3fe63569e24748da' },
    { symbol: 'USOL', price: 69.79, change: 0.95, address: '0x49b67c39f5566535de22b29b0e51e685' },
    { symbol: 'UZEC', price: 410, change: -1.60, address: '0x1c994ad3381d31c86c8c2d74ed89a365' },
    { symbol: 'XMR1', price: 308.6, change: -2.40, address: '0xbb2057659bd378d17e2e151bb04bdcaa' },
  ];
}

export function generatePendingTokens(): string[] {
  return ['LEAP', 'PVP', 'X', 'COKE', 'CBD', 'KING', 'POP', 'JEFE', 'ANGY', 'DOG', 'MOON', 'PAIN', 'VDO', 'HQ', 'EUR', 'REGARD', 'YUM', 'REKT', 'IRL', 'L', 'SCAM', 'GIGA', 'FELIX', 'STHYPE', 'AZUR', 'FAN', 'WATAR', 'HYFI', 'ETHC', 'GAME', 'RIFT', 'SWELL', 'ROUTE', 'XBG', 'HETU', 'GG', 'WOOL', 'ISLAND', 'SIPHER', 'DBR', 'SSS', 'UNIT', 'NEURAL', 'PIE', 'DRIVE', 'TGE', 'EDGE', 'GEN', 'MOCA', 'SPR', 'HIPPO', 'HANA', 'MORE', 'LOOT', 'LUMI', 'AIR', 'K', 'PLUME', 'LIM', 'HUSD', 'DHYPE', 'EDA', 'EXP', 'SENTI', 'B', 'OKI', 'BORG', 'LEND', 'CATH', 'ONLYUP', 'COIN', 'STORM', 'PLAY', 'NET'];
}

export function generateSpotStables() {
  return [
    { symbol: 'USDC', value: 2630555472, change: -1.17 },
    { symbol: 'USDH', value: 16913886, change: -0.02 },
    { symbol: 'USDT', value: 20877064, change: -0.88 },
    { symbol: 'USDE', value: 12890057, change: 1.31 },
  ];
}

export function generate24hFees() {
  return {
    total: 2795552,
    change: 21.74,
    spot: 800000,
    perp: 1995552,
  };
}

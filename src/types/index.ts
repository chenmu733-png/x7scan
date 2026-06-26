export interface Block {
  height: number;
  hash: string;
  timestamp: number;
  transactions: number;
  gasUsed: number;
  gasLimit: number;
  proposer: string;
}

export interface Transaction {
  hash: string;
  blockHeight: number;
  timestamp: number;
  from: string;
  to: string;
  amount: number;
  token: string;
  tokenAddress: string;
  method: string;
  price: number;
  usdValue: number;
  status: 'success' | 'failed' | 'pending';
}

export interface Wallet {
  address: string;
  alias: string;
  ensName?: string;
  balance: number;
  perpsValue: number;
  spotValue: number;
  lendingValue: number;
  vaultValue: number;
  stakedValue: number;
  evmValue: number;
  portfolio: PortfolioItem[];
  pnl: number;
  roi: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  tradingStats: TradingStats;
  positions: Position[];
  followers: number;
  following: number;
  firstSeen: number;
  riskScore: number;
  leaderboardRank: number;
  isWatched: boolean;
  isFavorite: boolean;
  tags: string[];
  notes: string;
}

export interface PortfolioItem {
  token: string;
  tokenAddress: string;
  amount: number;
  value: number;
  price: number;
  change24h: number;
  allocation: number;
}

export interface TradingStats {
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  totalPnl: number;
  avgPnl: number;
  bestTrade: number;
  worstTrade: number;
  avgHoldTime: number;
  tradingDays: number;
  currentStreak: number;
  bestStreak: number;
}

export interface Position {
  id: string;
  market: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  leverage: number;
  margin: number;
  pnl: number;
  roe: number;
  fundingPaid: number;
  fundingReceived: number;
  openTime: number;
  duration: number;
  tp: number | null;
  sl: number | null;
  status: 'open' | 'closed';
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  fdv: number;
  liquidity: number;
  tlv: number;
  supply: number;
  circulatingSupply: number;
  holderCount: number;
  buySellRatio: number;
  whaleDistribution: number;
  isFavorite: boolean;
}

export interface TokenHolder {
  address: string;
  alias: string;
  amount: number;
  value: number;
  percentage: number;
}

export interface TokenTransfer {
  hash: string;
  from: string;
  to: string;
  amount: number;
  value: number;
  timestamp: number;
}

export interface Validator {
  address: string;
  name: string;
  description: string;
  stake: number;
  stakePercentage: number;
  blocks: number;
  status: 'purring' | 'not_purring' | 'jailed' | 'active';
  commission: number;
  uptime: number;
  apr: number;
  delegators: number;
  rewards: number;
  slashingHistory: SlashingEvent[];
  isUp: boolean;
  purring?: boolean;
  commissionRate?: number;
  totalBlocks?: number;
  missedBlocks?: number;
  fees?: number;
  votes?: number;
  lastBlockTime?: number;
  joiningDate?: string;
  website?: string;
  logo?: string;
}

export interface SlashingEvent {
  height: number;
  timestamp: number;
  reason: string;
  amount: number;
}

export interface Vault {
  address: string;
  name: string;
  strategy: string;
  tvl: number;
  apr: number;
  pnl: number;
  depositors: number;
  allocation: AllocationItem[];
  historicalPerformance: PerformancePoint[];
  isFavorite: boolean;
}

export interface AllocationItem {
  token: string;
  percentage: number;
  value: number;
}

export interface PerformancePoint {
  timestamp: number;
  value: number;
  pnl: number;
}

export interface LendingAsset {
  token: string;
  symbol: string;
  supplyApy: number;
  borrowApy: number;
  supplied: number;
  borrowed: number;
  collateralFactor: number;
  healthFactor: number;
  liquidationRisk: number;
}

export interface NFTCollection {
  address: string;
  name: string;
  floorPrice: number;
  volume24h: number;
  owners: number;
  items: number;
  traits: NFTTrait[];
}

export interface NFTTrait {
  name: string;
  values: string[];
  rarity: number;
}

export interface NFTItem {
  id: string;
  collection: string;
  name: string;
  owner: string;
  image: string;
  metadata: Record<string, unknown>;
  transferHistory: TransferEvent[];
}

export interface TransferEvent {
  from: string;
  to: string;
  timestamp: number;
  txHash: string;
  price: number;
}

export interface WhaleTransaction {
  id: string;
  type: 'buy' | 'sell' | 'position' | 'liquidation' | 'bridge' | 'deposit' | 'withdraw' | 'funding';
  wallet: string;
  token: string;
  amount: number;
  value: number;
  timestamp: number;
  txHash: string;
}

export interface Alert {
  id: string;
  type: 'price' | 'wallet' | 'whale' | 'funding' | 'liquidation' | 'volume' | 'openInterest';
  name: string;
  condition: string;
  value: number;
  active: boolean;
  channels: ('browser' | 'webhook' | 'telegram' | 'discord')[];
  lastTriggered: number | null;
  createdAt: number;
}

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  openInterest: number;
  funding: number;
  marketCap: number;
  longShortRatio: number;
}

export interface NetworkStats {
  totalTransactions: number;
  totalBlocks: number;
  totalAddresses: number;
  totalValidators: number;
  totalStaked: number;
  avgBlockTime: number;
  gasPrice: number;
  tps: number;
}

export interface DashboardWidget {
  id: string;
  type: 'openInterest' | 'funding' | 'volume' | 'marketCap' | 'tvl' | 'gas' | 'latestTrades' | 'latestLiquidations' | 'recentTransactions' | 'recentBlocks' | 'whaleActivity' | 'newWallet' | 'activeWallet' | 'longShortRatio' | 'fundingHeatmap' | 'marketSentiment';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  enabled: boolean;
}

export interface SearchSuggestion {
  type: (typeof SEARCH_CATEGORIES)[number];
  value: string;
  label: string;
  sublabel?: string;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  alias: string;
  pnl: number;
  roi: number;
  volume: number;
  winRate: number;
  trades: number;
  portfolioValue: number;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface FundingHeatmapData {
  market: string;
  funding: number;
  volume: number;
}

export const SEARCH_CATEGORIES = [
  'wallet',
  'hyperEvm',
  'token',
  'transaction',
  'block',
  'validator',
  'vault',
  'contract',
  'nft',
  'alias',
] as const;

import { API_BASE_URL, HYPERLIQUID_API_URL } from '@/config/constants';
import type { Block, Transaction, Wallet, Token, Validator, Vault, MarketData, NetworkStats, LeaderboardEntry, WhaleTransaction, CandleData } from '@/types';

class ApiClient {
  private baseUrl: string;
  private hyperliquidUrl: string;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private cacheTimeout: number;

  constructor(baseUrl: string, hyperliquidUrl: string) {
    this.baseUrl = baseUrl;
    this.hyperliquidUrl = hyperliquidUrl;
    this.cache = new Map();
    this.cacheTimeout = 30_000;
  }

  private async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const cacheKey = `${url}-${JSON.stringify(options?.body)}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data as T;
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    return data as T;
  }

  private async postHyperliquid<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.hyperliquidUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Hyperliquid API Error: ${response.status}`);
    }

    return response.json();
  }

  // Blocks
  async getBlocks(page = 0, limit = 15): Promise<{ data: Block[]; total: number }> {
    return this.fetch(`${this.baseUrl}/blocks?page=${page}&limit=${limit}`);
  }

  async getBlock(height: number): Promise<Block> {
    return this.fetch(`${this.baseUrl}/block/${height}`);
  }

  // Transactions
  async getTransactions(page = 0, limit = 15): Promise<{ data: Transaction[]; total: number }> {
    return this.fetch(`${this.baseUrl}/transactions?page=${page}&limit=${limit}`);
  }

  async getTransaction(hash: string): Promise<Transaction> {
    return this.fetch(`${this.baseUrl}/tx/${hash}`);
  }

  // Wallet
  async getWallet(address: string): Promise<Wallet> {
    return this.fetch(`${this.baseUrl}/address/${address}`);
  }

  async getWalletTransactions(address: string, page = 0, limit = 15): Promise<{ data: Transaction[]; total: number }> {
    return this.fetch(`${this.baseUrl}/address/${address}/transactions?page=${page}&limit=${limit}`);
  }

  async getWalletPositions(address: string): Promise<Wallet['positions']> {
    return this.fetch(`${this.baseUrl}/address/${address}/positions`);
  }

  // Tokens
  async getTokens(page = 0, limit = 50): Promise<{ data: Token[]; total: number }> {
    return this.fetch(`${this.baseUrl}/tokens?page=${page}&limit=${limit}`);
  }

  async getToken(address: string): Promise<Token> {
    return this.fetch(`${this.baseUrl}/token/${address}`);
  }

  async getTokenHolders(address: string, page = 0): Promise<{ data: import('@/types').TokenHolder[]; total: number }> {
    return this.fetch(`${this.baseUrl}/token/${address}/holders?page=${page}`);
  }

  async getTokenTransfers(address: string, page = 0): Promise<{ data: import('@/types').TokenTransfer[]; total: number }> {
    return this.fetch(`${this.baseUrl}/token/${address}/transfers?page=${page}`);
  }

  // Validators
  async getValidators(): Promise<Validator[]> {
    return this.fetch(`${this.baseUrl}/validators`);
  }

  async getValidator(address: string): Promise<Validator> {
    return this.fetch(`${this.baseUrl}/validator/${address}`);
  }

  // Vaults
  async getVaults(): Promise<Vault[]> {
    return this.fetch(`${this.baseUrl}/vaults`);
  }

  async getVault(address: string): Promise<Vault> {
    return this.fetch(`${this.baseUrl}/vault/${address}`);
  }

  // Market
  async getMarketData(): Promise<MarketData[]> {
    return this.fetch(`${this.baseUrl}/market`);
  }

  async getMarket(market: string): Promise<MarketData> {
    return this.fetch(`${this.baseUrl}/market/${market}`);
  }

  // Network Stats
  async getNetworkStats(): Promise<NetworkStats> {
    return this.fetch(`${this.baseUrl}/stats/network`);
  }

  // Leaderboard
  async getLeaderboard(type: 'pnl' | 'roi' | 'volume' | 'winRate' | 'vault', page = 0): Promise<{ data: LeaderboardEntry[]; total: number }> {
    return this.fetch(`${this.baseUrl}/leaderboard/${type}?page=${page}`);
  }

  // Whale Tracker
  async getWhaleTransactions(page = 0): Promise<{ data: WhaleTransaction[]; total: number }> {
    return this.fetch(`${this.baseUrl}/whale?page=${page}`);
  }

  // Charts
  async getCandleData(market: string, interval: string, from: number, to: number): Promise<CandleData[]> {
    return this.fetch(`${this.baseUrl}/chart/candle?market=${market}&interval=${interval}&from=${from}&to=${to}`);
  }

  // Search
  async search(query: string): Promise<import('@/types').SearchSuggestion[]> {
    return this.fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`);
  }

  // Hyperliquid API
  async getHyperliquidInfo(type: string): Promise<unknown> {
    return this.postHyperliquid('/info', { type });
  }

  async getHyperliquidMeta(): Promise<unknown> {
    return this.postHyperliquid('/info', { type: 'metaAndAssetCtxs' });
  }

  async getHyperliquidAllMids(): Promise<unknown> {
    return this.postHyperliquid('/info', { type: 'allMids' });
  }

  async getHyperliquidFundingHistory(name: string): Promise<unknown> {
    return this.postHyperliquid('/info', { type: 'fundingHistory', name });
  }

  // Stats
  async getTradingFees(): Promise<unknown> {
    return this.fetch(`${this.baseUrl}/stats/fees`);
  }

  async getSpotStables(): Promise<unknown> {
    return this.fetch(`${this.baseUrl}/stats/spot-stables`);
  }

  async getAuctionPrice(): Promise<unknown> {
    return this.fetch(`${this.baseUrl}/stats/auction`);
  }

  // Staking
  async getStakingStats(): Promise<unknown> {
    return this.fetch(`${this.baseUrl}/staking/stats`);
  }

  async getUnstakingQueue(): Promise<unknown> {
    return this.fetch(`${this.baseUrl}/staking/unstaking-queue`);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const apiClient = new ApiClient(API_BASE_URL, HYPERLIQUID_API_URL);

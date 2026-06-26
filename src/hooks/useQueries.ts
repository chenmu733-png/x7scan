import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import type { Block, Transaction, Wallet, Token, Validator, Vault, MarketData, NetworkStats, LeaderboardEntry, WhaleTransaction } from '@/types';

// Query keys
export const queryKeys = {
  blocks: ['blocks'] as const,
  block: (height: number) => ['block', height] as const,
  transactions: ['transactions'] as const,
  transaction: (hash: string) => ['transaction', hash] as const,
  wallet: (address: string) => ['wallet', address] as const,
  walletTransactions: (address: string) => ['wallet', address, 'transactions'] as const,
  walletPositions: (address: string) => ['wallet', address, 'positions'] as const,
  tokens: ['tokens'] as const,
  token: (address: string) => ['token', address] as const,
  tokenHolders: (address: string) => ['token', address, 'holders'] as const,
  tokenTransfers: (address: string) => ['token', address, 'transfers'] as const,
  validators: ['validators'] as const,
  validator: (address: string) => ['validator', address] as const,
  vaults: ['vaults'] as const,
  vault: (address: string) => ['vault', address] as const,
  market: ['market'] as const,
  marketData: (market: string) => ['market', market] as const,
  networkStats: ['networkStats'] as const,
  leaderboard: (type: string) => ['leaderboard', type] as const,
  whale: ['whale'] as const,
  tradingFees: ['stats', 'fees'] as const,
  spotStables: ['stats', 'spotStables'] as const,
  auctionPrice: ['stats', 'auction'] as const,
  stakingStats: ['staking', 'stats'] as const,
};

// Blocks
export function useBlocks(page = 0, limit = 15) {
  return useQuery({
    queryKey: [...queryKeys.blocks, page, limit],
    queryFn: () => apiClient.getBlocks(page, limit),
    refetchInterval: 5000,
  });
}

export function useBlock(height: number) {
  return useQuery({
    queryKey: queryKeys.block(height),
    queryFn: () => apiClient.getBlock(height),
    enabled: !!height,
  });
}

// Transactions
export function useTransactions(page = 0, limit = 15) {
  return useQuery({
    queryKey: [...queryKeys.transactions, page, limit],
    queryFn: () => apiClient.getTransactions(page, limit),
    refetchInterval: 5000,
  });
}

export function useTransaction(hash: string) {
  return useQuery({
    queryKey: queryKeys.transaction(hash),
    queryFn: () => apiClient.getTransaction(hash),
    enabled: !!hash,
  });
}

// Wallet
export function useWallet(address: string) {
  return useQuery({
    queryKey: queryKeys.wallet(address),
    queryFn: () => apiClient.getWallet(address),
    enabled: !!address,
  });
}

export function useWalletTransactions(address: string, page = 0) {
  return useQuery({
    queryKey: [...queryKeys.walletTransactions(address), page],
    queryFn: () => apiClient.getWalletTransactions(address, page),
    enabled: !!address,
  });
}

export function useWalletPositions(address: string) {
  return useQuery({
    queryKey: queryKeys.walletPositions(address),
    queryFn: () => apiClient.getWalletPositions(address),
    enabled: !!address,
  });
}

// Tokens
export function useTokens(page = 0) {
  return useQuery({
    queryKey: [...queryKeys.tokens, page],
    queryFn: () => apiClient.getTokens(page),
  });
}

export function useToken(address: string) {
  return useQuery({
    queryKey: queryKeys.token(address),
    queryFn: () => apiClient.getToken(address),
    enabled: !!address,
  });
}

export function useTokenHolders(address: string, page = 0) {
  return useQuery({
    queryKey: [...queryKeys.tokenHolders(address), page],
    queryFn: () => apiClient.getTokenHolders(address, page),
    enabled: !!address,
  });
}

export function useTokenTransfers(address: string, page = 0) {
  return useQuery({
    queryKey: [...queryKeys.tokenTransfers(address), page],
    queryFn: () => apiClient.getTokenTransfers(address, page),
    enabled: !!address,
  });
}

// Validators
export function useValidators() {
  return useQuery({
    queryKey: queryKeys.validators,
    queryFn: () => apiClient.getValidators(),
    refetchInterval: 30000,
  });
}

export function useValidator(address: string) {
  return useQuery({
    queryKey: queryKeys.validator(address),
    queryFn: () => apiClient.getValidator(address),
    enabled: !!address,
  });
}

// Vaults
export function useVaults() {
  return useQuery({
    queryKey: queryKeys.vaults,
    queryFn: () => apiClient.getVaults(),
  });
}

export function useVault(address: string) {
  return useQuery({
    queryKey: queryKeys.vault(address),
    queryFn: () => apiClient.getVault(address),
    enabled: !!address,
  });
}

// Market
export function useMarketData() {
  return useQuery({
    queryKey: queryKeys.market,
    queryFn: () => apiClient.getMarketData(),
    refetchInterval: 10000,
  });
}

export function useMarket(market: string) {
  return useQuery({
    queryKey: queryKeys.marketData(market),
    queryFn: () => apiClient.getMarket(market),
    enabled: !!market,
    refetchInterval: 10000,
  });
}

// Network Stats
export function useNetworkStats() {
  return useQuery({
    queryKey: queryKeys.networkStats,
    queryFn: () => apiClient.getNetworkStats(),
    refetchInterval: 15000,
  });
}

// Leaderboard
export function useLeaderboard(type: 'pnl' | 'roi' | 'volume' | 'winRate' | 'vault', page = 0) {
  return useQuery({
    queryKey: [...queryKeys.leaderboard(type), page],
    queryFn: () => apiClient.getLeaderboard(type, page),
  });
}

// Whale
export function useWhaleTransactions(page = 0) {
  return useQuery({
    queryKey: [...queryKeys.whale, page],
    queryFn: () => apiClient.getWhaleTransactions(page),
    refetchInterval: 10000,
  });
}

// Stats
export function useTradingFees() {
  return useQuery({
    queryKey: queryKeys.tradingFees,
    queryFn: () => apiClient.getTradingFees(),
  });
}

export function useSpotStables() {
  return useQuery({
    queryKey: queryKeys.spotStables,
    queryFn: () => apiClient.getSpotStables(),
  });
}

export function useAuctionPrice() {
  return useQuery({
    queryKey: queryKeys.auctionPrice,
    queryFn: () => apiClient.getAuctionPrice(),
  });
}

// Search
export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => apiClient.search(query),
    enabled: query.length >= 2,
    staleTime: 5000,
  });
}

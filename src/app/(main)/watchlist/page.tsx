'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye, Star, Trash2, ExternalLink, Copy, TrendingUp,
  TrendingDown, ArrowUpRight, Search, Filter
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Input, Shimmer, EmptyState, CopyButton } from '@/components/ui';
import { useWatchlistStore } from '@/stores';
import { formatCurrency, formatNumber, formatAddress, formatPercent } from '@/lib/utils';

const mockWatchlistWallets = [
  { address: '0x3f5a8b2c9d4e7f1a6b8c0d2e4f5a7b9c1d3e5f7a', alias: 'Whale_0x3f', balance: 52000000, pnl24h: 2.4, addedAt: '2024-12-01' },
  { address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', alias: 'GigaChad', balance: 38000000, pnl24h: -1.2, addedAt: '2024-11-15' },
  { address: '0x8c7b6a5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b', alias: 'SmartMoney_42', balance: 21000000, pnl24h: 5.6, addedAt: '2024-10-20' },
];

const mockWatchlistTokens = [
  { name: 'HYPE', address: '0x0d01dc56dcaaca66ad901c959b4011ec', price: 25.53, change24h: 3.24, marketCap: 8200000000, addedAt: '2024-11-01' },
  { name: 'UBTC', address: '0x8f254b963e8468305d409b33aa137c67', price: 108250, change24h: 1.8, marketCap: 245000000, addedAt: '2024-11-10' },
  { name: 'UETH', address: '0xe1edd30daaf5caac3fe63569e24748da', price: 3845, change24h: -0.5, marketCap: 124000000, addedAt: '2024-12-05' },
  { name: 'USOL', address: '0x49b67c39f5566535de22b29b0e51e685', price: 178, change24h: 8.2, marketCap: 89000000, addedAt: '2024-12-08' },
];

const mockWatchlistTraders = [
  { address: '0x3f5a8b2c9d4e7f1a6b8c0d2e4f5a7b9c1d3e5f7a', alias: 'Whale_0x3f', pnl: 245000, roi: 12.5, winRate: 68, rank: 42, addedAt: '2024-12-01' },
  { address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', alias: 'AlphaTrader', pnl: 890000, roi: 34.2, winRate: 72, rank: 15, addedAt: '2024-11-20' },
];

export default function WatchlistPage() {
  const { watchedWallets, watchedTokens, watchedTraders, removeWallet, removeToken, removeTrader } = useWatchlistStore();
  const [searchQuery, setSearchQuery] = useState('');

  const wallets = mockWatchlistWallets;
  const tokens = mockWatchlistTokens;
  const traders = mockWatchlistTraders;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Eye className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Watchlist</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          {wallets.length + tokens.length + traders.length} items tracked
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Wallets" value={wallets.length.toString()} />
          <StatCard label="Tokens" value={tokens.length.toString()} />
          <StatCard label="Traders" value={traders.length.toString()} />
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={[
        { id: 'wallets', label: 'Wallets', count: wallets.length },
        { id: 'tokens', label: 'Tokens', count: tokens.length },
        { id: 'traders', label: 'Traders', count: traders.length },
      ]} defaultTab="wallets">
        {(tabId) => (
          <div className="mt-4">
            {tabId === 'wallets' && (
              wallets.length === 0 ? (
                <EmptyState
                  icon={Eye}
                  title="No watched wallets"
                  description="Add wallets to your watchlist from the address page"
                  action={<Button variant="primary">Explore Wallets</Button>}
                />
              ) : (
                <div className="space-y-3">
                  {wallets.map((wallet, i) => (
                    <motion.div
                      key={wallet.address}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                            {(wallet.alias || wallet.address).slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <a href={`/address/${wallet.address}`} className="font-semibold text-primary hover:underline">
                              {wallet.alias || formatAddress(wallet.address)}
                            </a>
                            <p className="text-xs text-muted-foreground font-mono">{formatAddress(wallet.address, 10, 8)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(wallet.balance)}</p>
                            <p className={`text-xs ${wallet.pnl24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {wallet.pnl24h >= 0 ? '+' : ''}{wallet.pnl24h}% (24h)
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <a href={`/address/${wallet.address}`}>
                              <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                            </a>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => removeWallet(wallet.address)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )
            )}
            {tabId === 'tokens' && (
              tokens.length === 0 ? (
                <EmptyState
                  icon={Star}
                  title="No watched tokens"
                  description="Add tokens to your watchlist from the token page"
                  action={<Button variant="primary">Explore Tokens</Button>}
                />
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground text-xs">
                          <th className="text-left py-3 px-4">Token</th>
                          <th className="text-right py-3 px-4">Price</th>
                          <th className="text-right py-3 px-4">24h Change</th>
                          <th className="text-right py-3 px-4">Market Cap</th>
                          <th className="text-center py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tokens.map((token, i) => (
                          <tr key={token.address} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                  {token.name.slice(0, 2)}
                                </div>
                                <a href={`/token/${token.name}`} className="font-semibold text-primary hover:underline">{token.name}</a>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-mono">{formatCurrency(token.price)}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">{formatCurrency(token.marketCap)}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <a href={`/token/${token.name}`}>
                                  <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                                </a>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() => removeToken(token.name)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )
            )}
            {tabId === 'traders' && (
              traders.length === 0 ? (
                <EmptyState
                  icon={TrendingUp}
                  title="No watched traders"
                  description="Add traders to your watchlist from the leaderboard"
                  action={<Button variant="primary">View Leaderboard</Button>}
                />
              ) : (
                <div className="space-y-3">
                  {traders.map((trader, i) => (
                    <motion.div
                      key={trader.address}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                            #{trader.rank}
                          </div>
                          <div>
                            <a href={`/address/${trader.address}`} className="font-semibold text-primary hover:underline">
                              {trader.alias || formatAddress(trader.address)}
                            </a>
                            <p className="text-xs text-muted-foreground">Rank #{trader.rank}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className={`font-semibold ${trader.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {trader.pnl >= 0 ? '+' : ''}{formatCurrency(trader.pnl)}
                            </p>
                            <p className="text-xs text-muted-foreground">ROI: {trader.roi}% • WR: {trader.winRate}%</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <a href={`/address/${trader.address}`}>
                              <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                            </a>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => removeTrader(trader.address)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}

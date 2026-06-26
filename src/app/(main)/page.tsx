'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Wallet, Coins, BarChart3, Blocks, ArrowRight, Activity, Shield, Eye, Zap, ChevronRight } from 'lucide-react';
import { Card, StatCard, Badge, Shimmer, CopyButton } from '@/components/ui';
import { generateBlocks, generateTrendingTokens, generatePendingTokens, generateSpotStables, generate24hFees, generateNetworkStats, generateMarketData, generateTransactions } from '@/services/mock-data';
import { formatAddress, formatNumber, formatCurrency, formatPercent, formatTimeAgo } from '@/lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const [blocks] = useState(() => generateBlocks(10));
  const [trendingTokens] = useState(() => generateTrendingTokens());
  const [pendingTokens] = useState(() => generatePendingTokens());
  const [spotStables] = useState(() => generateSpotStables());
  const [fees] = useState(() => generate24hFees());
  const [networkStats] = useState(() => generateNetworkStats());
  const [marketData] = useState(() => generateMarketData());

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/60 shadow-lg shadow-accent/20">
            <span className="text-3xl font-bold text-white">X7</span>
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Welcome to <span className="text-accent">X7Scan</span>.
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mb-8">
          The most comprehensive Hyperliquid blockchain explorer. Track wallets, tokens, trades, and more in real-time.
        </p>

        {/* Global Search */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
          className="flex items-center gap-3 w-full max-w-lg rounded-xl border border-border bg-card/50 backdrop-blur-sm px-5 py-3 text-muted-foreground hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all cursor-pointer"
        >
          <Search className="h-5 w-5" />
          <span>Search...</span>
          <kbd className="ml-auto rounded bg-muted px-2 py-0.5 text-xs">⌘K</kbd>
        </Link>
      </motion.section>

      {/* Market Overview */}
      <motion.section {...fadeIn} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" />
          Market Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="24h Fees" value={formatCurrency(fees.total)} change={fees.change} />
          <StatCard label="Spot Stables" value={formatCurrency(spotStables.reduce((s, t) => s + t.value, 0))} change={-1.14} />
          <StatCard label="Total Transactions" value={formatNumber(networkStats.totalTransactions)} />
          <StatCard label="TPS" value={networkStats.tps} />
        </div>
      </motion.section>

      {/* Spot Stables */}
      <motion.section {...fadeIn} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-foreground mb-3">Spot Stables</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {spotStables.map((stable) => (
            <Card key={stable.symbol} hover className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{stable.symbol}</span>
                <Badge variant={stable.change >= 0 ? 'success' : 'danger'}>
                  {formatPercent(stable.change)}
                </Badge>
              </div>
              <div className="text-lg font-semibold">{formatCurrency(stable.value)}</div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Trending Tokens */}
      <motion.section {...fadeIn} transition={{ delay: 0.4 }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Trending Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {trendingTokens.map((token) => (
            <Link key={token.symbol} href={`/token/${token.address}`}>
              <Card hover className="p-3 transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{token.symbol}</span>
                </div>
                <div className="text-sm">{formatCurrency(token.price)}</div>
                <div className={cn('text-xs', token.change >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {formatPercent(token.change)}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Launching Tokens */}
      <motion.section {...fadeIn} transition={{ delay: 0.45 }}>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Launching one day ({pendingTokens.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {pendingTokens.map((token) => (
            <Link key={token} href={`/pending-token/${token}`}>
              <Badge className="cursor-pointer hover:bg-accent/20 transition-colors text-sm px-3 py-1">
                {token}
              </Badge>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Network Statistics */}
      <motion.section {...fadeIn} transition={{ delay: 0.5 }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          Network Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total Blocks" value={formatNumber(networkStats.totalBlocks)} />
          <StatCard label="Total Addresses" value={formatNumber(networkStats.totalAddresses)} />
          <StatCard label="Total Staked" value={formatCurrency(networkStats.totalStaked)} />
          <StatCard label="Validators" value={`${networkStats.totalValidators}`} />
        </div>
      </motion.section>

      {/* Latest Blocks */}
      <motion.section {...fadeIn} transition={{ delay: 0.6 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Blocks className="h-5 w-5 text-accent" />
            Latest Blocks
          </h2>
          <Link href="/dashboard" className="text-sm text-accent hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Block</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Time</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Hash</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Transactions</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block) => (
                  <tr key={block.height} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/block/${block.height}`} className="text-accent hover:underline">
                        {block.height}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatTimeAgo(block.timestamp)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Link href={`/block/${block.height}`} className="text-accent hover:underline font-mono text-xs">
                          {formatAddress(block.hash, 10)}
                        </Link>
                        <CopyButton text={block.hash} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {block.transactions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.section>

      {/* Featured Validators */}
      <motion.section {...fadeIn} transition={{ delay: 0.7 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Featured Validators
          </h2>
          <Link href="/staking" className="text-sm text-accent hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'Hyper Foundation 1', stake: '52.45M', commission: '3.00%', status: 'Purring' },
            { name: 'Anchorage By Figment', stake: '26.74M', commission: '10.00%', status: 'Purring' },
            { name: 'Hypurrscanning', stake: '23.20M', commission: '1.00%', status: 'Purring' },
          ].map((v) => (
            <Card key={v.name} hover>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{v.name}</span>
                <Badge variant="success">{v.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Stake: </span>
                  <span className="text-foreground">{v.stake}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fees: </span>
                  <span className="text-foreground">{v.commission}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Leaderboard Preview */}
      <motion.section {...fadeIn} transition={{ delay: 0.8 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Top Traders
          </h2>
          <Link href="/leaderboard" className="text-sm text-accent hover:underline flex items-center gap-1">
            View leaderboard <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Rank</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Trader</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">PnL</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">ROI</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, address: '0x3a7d...f82c', alias: 'WhaleHunter', pnl: 12500000, roi: 340, winRate: 72 },
                  { rank: 2, address: '0x8b2e...1a5d', alias: 'HyperTrader', pnl: 8900000, roi: 215, winRate: 68 },
                  { rank: 3, address: '0xf4c1...9b3e', alias: 'AlphaSeeker', pnl: 6700000, roi: 178, winRate: 65 },
                  { rank: 4, address: '0x2d8f...c7a1', alias: '', pnl: 5400000, roi: 152, winRate: 61 },
                  { rank: 5, address: '0x9e5b...4d2f', alias: 'LiquidPro', pnl: 4200000, roi: 134, winRate: 59 },
                ].map((trader) => (
                  <tr key={trader.rank} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="px-4 py-3">
                      <span className={cn(
                        'inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold',
                        trader.rank <= 3 ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                      )}>
                        {trader.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/address/${trader.address}`} className="text-accent hover:underline">
                        {trader.alias || trader.address}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right text-green-400">
                      {formatCurrency(trader.pnl)}
                    </td>
                    <td className="px-4 py-3 text-right text-green-400">
                      {trader.roi.toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                      {trader.winRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.section>

      {/* Market Data */}
      <motion.section {...fadeIn} transition={{ delay: 0.9 }}>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5 text-accent" />
          Markets
        </h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Market</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Price</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">24h Change</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Volume</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Open Interest</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((m) => (
                  <tr key={m.symbol} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/market/${m.symbol}`} className="text-accent hover:underline font-medium">
                        {m.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">{formatCurrency(m.price)}</td>
                    <td className={cn('px-4 py-3 text-right', m.change24h >= 0 ? 'text-green-400' : 'text-red-400')}>
                      {formatPercent(m.change24h)}
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                      {formatCurrency(m.volume24h)}
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell text-muted-foreground">
                      {formatCurrency(m.openInterest)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.section>
    </div>
  );
}

function cn(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(' ');
}

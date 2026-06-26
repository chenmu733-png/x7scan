'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, Star, Eye, Tag, MoreHorizontal, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, Badge, Tabs, StatCard, CopyButton, ProgressBar, EmptyState } from '@/components/ui';
import { generateWallet, generateTransactions } from '@/services/mock-data';
import { formatAddress, formatCurrency, formatPercent, formatNumber, formatTimeAgo } from '@/lib/utils';

export default function WalletPage() {
  const params = useParams();
  const address = params.address as string;
  const [activeTab, setActiveTab] = useState('transactions');
  const wallet = generateWallet(address);
  const transactions = generateTransactions(15);

  const tabs = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'holdings', label: 'Holdings' },
    { id: 'perps', label: 'Perps' },
    { id: 'orders', label: 'Orders' },
    { id: 'vaults', label: 'Vaults' },
    { id: 'staking', label: 'Staking' },
    { id: 'lending', label: 'Lending' },
    { id: 'more', label: 'More' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Address: {formatAddress(address, 10)}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm text-muted-foreground">{address}</span>
            <CopyButton text={address} />
            <a href={`https://arbiscan.io/address/${address}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm flex items-center gap-1">
              Arbitrum <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors">
            <Tag className="h-3.5 w-3.5" /> ADD ALIAS
          </button>
          <button className="p-2 rounded-md border border-border text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
            <Star className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md border border-border text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Overview</h3>
          <div className="text-3xl font-bold text-foreground mb-3">{formatCurrency(wallet.balance)}</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">Perps</div>
              <div className="text-sm font-medium">{formatCurrency(wallet.perpsValue)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Spot ({wallet.portfolio.length})</div>
              <div className="text-sm font-medium">{formatCurrency(wallet.spotValue)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Lending</div>
              <div className="text-sm font-medium">{formatCurrency(wallet.lendingValue)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Vault</div>
              <div className="text-sm font-medium">{formatCurrency(wallet.vaultValue)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Staked</div>
              <div className="text-sm font-medium">{formatCurrency(wallet.stakedValue)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">EVM (8)</div>
              <div className="text-sm font-medium">{formatCurrency(wallet.evmValue)}</div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Infos</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Address</span>
              <span className="font-mono text-xs">{formatAddress(address, 8)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Risk Score</span>
              <span className="text-xs">{wallet.riskScore.toFixed(0)}/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Rank</span>
              <span className="text-xs">#{wallet.leaderboardRank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">First Seen</span>
              <span className="text-xs">{formatTimeAgo(wallet.firstSeen)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Positions */}
      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Positions</h3>
        {wallet.positions.length === 0 ? (
          <EmptyState title="No open positions" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Market</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Side</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Size</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Entry</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Mark</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Liq. Price</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Leverage</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">PnL</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">ROE</th>
                </tr>
              </thead>
              <tbody>
                {wallet.positions.map((pos) => (
                  <tr key={pos.id} className="border-b border-border/50 hover:bg-accent/5">
                    <td className="px-3 py-2">
                      <Link href={`/market/${pos.market}`} className="text-accent hover:underline">{pos.market}</Link>
                    </td>
                    <td className="px-3 py-2">
                      <span className={pos.side === 'long' ? 'text-green-400 flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
                        {pos.side === 'long' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {pos.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">{pos.size.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(pos.entryPrice)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(pos.markPrice)}</td>
                    <td className="px-3 py-2 text-right text-red-400">{formatCurrency(pos.liquidationPrice)}</td>
                    <td className="px-3 py-2 text-right">{pos.leverage}x</td>
                    <td className={pos.pnl >= 0 ? 'px-3 py-2 text-right text-green-400' : 'px-3 py-2 text-right text-red-400'}>
                      {formatCurrency(pos.pnl)}
                    </td>
                    <td className={pos.roe >= 0 ? 'px-3 py-2 text-right text-green-400' : 'px-3 py-2 text-right text-red-400'}>
                      {pos.roe.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="border-b border-border pb-1" />

      {/* Tab Content */}
      {activeTab === 'transactions' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Hash</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Method</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Age</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">From</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">To</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Token</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">$</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.hash} className="border-b border-border/50 hover:bg-accent/5">
                    <td className="px-3 py-2">
                      <Link href={`/tx/${tx.hash}`} className="text-accent hover:underline font-mono text-xs">
                        {formatAddress(tx.hash, 6)}
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant={tx.method.includes('Buy') || tx.method.includes('Open') ? 'success' : tx.method.includes('Sell') || tx.method.includes('Close') ? 'danger' : 'default'}>
                        {tx.method}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground text-xs">{formatTimeAgo(tx.timestamp)}</td>
                    <td className="px-3 py-2">
                      <Link href={`/address/${tx.from}`} className="text-accent hover:underline text-xs">
                        {formatAddress(tx.from)}
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <Link href={`/address/${tx.to}`} className="text-accent hover:underline text-xs">
                        {formatAddress(tx.to)}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-right text-xs">{formatNumber(tx.amount)}</td>
                    <td className="px-3 py-2 text-xs">
                      <Link href={`/token/${tx.tokenAddress}`} className="text-accent hover:underline">{tx.token}</Link>
                    </td>
                    <td className="px-3 py-2 text-right text-xs">{formatCurrency(tx.usdValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'holdings' && (
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Spot Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">Token</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Amount</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Value</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">24h</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {wallet.portfolio.map((p, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-accent/5">
                    <td className="px-3 py-2">
                      <Link href={`/token/${p.tokenAddress}`} className="text-accent hover:underline">{p.token}</Link>
                    </td>
                    <td className="px-3 py-2 text-right">{formatNumber(p.amount)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(p.value)}</td>
                    <td className={p.change24h >= 0 ? 'px-3 py-2 text-right text-green-400' : 'px-3 py-2 text-right text-red-400'}>
                      {formatPercent(p.change24h)}
                    </td>
                    <td className="px-3 py-2 text-right text-muted-foreground">{p.allocation.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'perps' && (
        <EmptyState title="No perpetual positions data" description="Perpetual positions will appear here" />
      )}

      {activeTab === 'orders' && (
        <EmptyState title="No open orders" description="Open orders will appear here" />
      )}

      {activeTab === 'vaults' && (
        <EmptyState title="No vault deposits" description="Vault deposits will appear here" />
      )}

      {activeTab === 'staking' && (
        <EmptyState title="No staking data" description="Staking information will appear here" />
      )}

      {activeTab === 'lending' && (
        <EmptyState title="No lending data" description="Lending positions will appear here" />
      )}

      {activeTab === 'more' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Trading Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Total Trades</span><span className="text-xs">{wallet.tradingStats.totalTrades}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Win Rate</span><span className="text-xs text-green-400">{wallet.winRate.toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Profit Factor</span><span className="text-xs">{wallet.profitFactor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Sharpe Ratio</span><span className="text-xs">{wallet.sharpeRatio.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Max Drawdown</span><span className="text-xs text-red-400">{wallet.maxDrawdown.toFixed(2)}%</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Best Trade</span><span className="text-xs text-green-400">{formatCurrency(wallet.tradingStats.bestTrade)}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Worst Trade</span><span className="text-xs text-red-400">{formatCurrency(wallet.tradingStats.worstTrade)}</span></div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Activity</h3>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{wallet.followers}</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{wallet.following}</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Waves, Bell, Filter, ArrowUpRight, ArrowDownRight,
  Eye, AlertTriangle, TrendingUp, ExternalLink, Copy
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Input, Shimmer, CopyButton } from '@/components/ui';
import { useWhaleTransactions } from '@/hooks/useQueries';
import { formatCurrency, formatNumber, formatAddress, formatTimeAgo } from '@/lib/utils';

const whaleAlerts = Array.from({ length: 25 }, (_, i) => {
  const types = ['large_deposit', 'large_withdraw', 'large_transfer', 'position_open', 'position_close', 'liquidation'];
  const tokens = ['HYPE', 'USDC', 'UBTC', 'UETH', 'USOL', 'USDE'];
  const type = types[Math.floor(Math.random() * types.length)];
  const token = tokens[Math.floor(Math.random() * tokens.length)];
  const amount = Math.random() * 5000000 + 500000;
  return {
    id: i,
    type,
    wallet: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    alias: Math.random() > 0.6 ? ['Whale_0x3f', 'GigaChad', 'DegenMaster', 'AlphaHunter', 'SmartMoney_42'][Math.floor(Math.random() * 5)] : '',
    token,
    amount,
    usdValue: amount * (token === 'USDC' ? 1 : token === 'UBTC' ? 108000 : token === 'UETH' ? 3800 : token === 'HYPE' ? 25 : 200),
    timestamp: Date.now() - i * 300000,
    txHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
  };
});

const watchedWhales = [
  { address: '0x3f5a8b2c9d4e7f1a6b8c0d2e4f5a7b9c1d3e5f7a', alias: 'Whale_0x3f', balance: 52000000, pnl24h: 245000, trades: 156, firstSeen: '2024-01-15' },
  { address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', alias: 'GigaChad', balance: 38000000, pnl24h: -120000, trades: 89, firstSeen: '2023-11-20' },
  { address: '0x8c7b6a5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b', alias: 'SmartMoney_42', balance: 21000000, pnl24h: 890000, trades: 234, firstSeen: '2024-03-08' },
  { address: '0x2d4e6f8a0c2e4f6a8b0d2e4f6a8b0d2e4f6a8b0d', alias: '', balance: 45000000, pnl24h: 567000, trades: 67, firstSeen: '2024-06-12' },
];

const typeConfig: Record<string, { label: string; color: string; icon: string }> = {
  large_deposit: { label: 'Large Deposit', color: 'success', icon: '↓' },
  large_withdraw: { label: 'Large Withdraw', color: 'warning', icon: '↑' },
  large_transfer: { label: 'Large Transfer', color: 'info', icon: '→' },
  position_open: { label: 'Position Open', color: 'success', icon: '+' },
  position_close: { label: 'Position Close', color: 'danger', icon: '×' },
  liquidation: { label: 'Liquidation', color: 'danger', icon: '⚡' },
};

export default function WhaleTrackerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [minAmount, setMinAmount] = useState('500000');

  const filteredAlerts = whaleAlerts.filter(a => {
    if (filterType !== 'all' && a.type !== filterType) return false;
    if (searchQuery && !a.wallet.toLowerCase().includes(searchQuery.toLowerCase()) && !(a.alias || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (minAmount && a.usdValue < parseFloat(minAmount)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Waves className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Whale Tracker</h1>
        </div>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-1" /> Create Alert
        </Button>
      </motion.div>

      {/* Summary Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Whales Tracked" value="1,247" change={5.2} />
          <StatCard label="24h Volume" value={formatCurrency(892000000)} change={12.3} />
          <StatCard label="Active Alerts" value="342" change={8.1} />
          <StatCard label="Liquidations 24h" value={formatCurrency(12500000)} change={-15.2} />
        </div>
      </motion.div>

      {/* Filter Controls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Search by wallet or alias..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Types</option>
              <option value="large_deposit">Large Deposit</option>
              <option value="large_withdraw">Large Withdraw</option>
              <option value="large_transfer">Large Transfer</option>
              <option value="position_open">Position Open</option>
              <option value="position_close">Position Close</option>
              <option value="liquidation">Liquidation</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Min USD:</span>
              <input
                type="number"
                value={minAmount}
                onChange={e => setMinAmount(e.target.value)}
                className="w-28 rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={[
        { id: 'feed', label: 'Live Feed', count: whaleAlerts.length },
        { id: 'watched', label: 'Watched Whales', count: watchedWhales.length },
      ]} defaultTab="feed">
        {(tabId) => (
          <div className="mt-4">
            {tabId === 'feed' && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-xs">
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Wallet</th>
                        <th className="text-left py-3 px-4">Token</th>
                        <th className="text-right py-3 px-4">Amount</th>
                        <th className="text-right py-3 px-4">USD Value</th>
                        <th className="text-right py-3 px-4">Time</th>
                        <th className="text-center py-3 px-4">Tx</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlerts.map((alert, i) => {
                        const config = typeConfig[alert.type];
                        return (
                          <motion.tr
                            key={alert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                          >
                            <td className="py-2.5 px-4">
                              <Badge variant={config.color as any} className="text-xs">
                                {config.icon} {config.label}
                              </Badge>
                            </td>
                            <td className="py-2.5 px-4">
                              <div>
                                <a href={`/address/${alert.wallet}`} className="font-mono text-primary hover:underline text-xs">
                                  {alert.alias || formatAddress(alert.wallet)}
                                </a>
                              </div>
                            </td>
                            <td className="py-2.5 px-4">
                              <span className="font-semibold">{alert.token}</span>
                            </td>
                            <td className="py-2.5 px-4 text-right font-mono">
                              {formatNumber(alert.amount, 2)}
                            </td>
                            <td className="py-2.5 px-4 text-right font-semibold text-primary">
                              {formatCurrency(alert.usdValue)}
                            </td>
                            <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">
                              {formatTimeAgo(alert.timestamp)}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <a href={`/tx/${alert.txHash}`} className="text-primary hover:underline">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
            {tabId === 'watched' && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-xs">
                        <th className="text-left py-3 px-4">Whale</th>
                        <th className="text-right py-3 px-4">Balance</th>
                        <th className="text-right py-3 px-4">24h PnL</th>
                        <th className="text-right py-3 px-4">Trades (24h)</th>
                        <th className="text-right py-3 px-4">First Seen</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchedWhales.map((whale, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                {(whale.alias || whale.address).slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <a href={`/address/${whale.address}`} className="font-semibold text-primary hover:underline">
                                  {whale.alias || formatAddress(whale.address)}
                                </a>
                                <p className="text-xs text-muted-foreground font-mono">{formatAddress(whale.address, 10, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-mono">{formatCurrency(whale.balance)}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={whale.pnl24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                              {whale.pnl24h >= 0 ? '+' : ''}{formatCurrency(whale.pnl24h)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">{whale.trades}</td>
                          <td className="py-3 px-4 text-right text-muted-foreground">{whale.firstSeen}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /></Button>
                              <Button variant="ghost" size="sm"><Copy className="h-3.5 w-3.5" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Fuel, Activity, Waves, Users, ArrowRight } from 'lucide-react';
import { Card, StatCard, Badge, Tabs, CopyButton } from '@/components/ui';
import { generate24hFees, generateSpotStables, generateTrendingTokens, generatePendingTokens, generateBlocks, generateTransactions, generateMarketData, generateFundingHeatmap } from '@/services/mock-data';
import { formatAddress, formatCurrency, formatPercent, formatNumber, formatTimeAgo } from '@/lib/utils';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('all');
  const fees = generate24hFees();
  const stables = generateSpotStables();
  const tokens = generateTrendingTokens();
  const pending = generatePendingTokens();
  const blocks = generateBlocks(5);
  const txs = generateTransactions(10);
  const markets = generateMarketData();
  const heatmap = generateFundingHeatmap();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard label="24h Fees" value={formatCurrency(fees.total)} change={fees.change} />
        <StatCard label="Spot Stables" value={formatCurrency(stables.reduce((s, t) => s + t.value, 0))} change={-1.14} />
        <StatCard label="Perp Volume" value="$1.2B" change={5.3} />
        <StatCard label="Spot Volume" value="$89M" change={-2.1} />
        <StatCard label="Open Interest" value="$2.4B" change={1.8} />
        <StatCard label="Gas" value="0.01" />
      </div>

      {/* Spot Stables */}
      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Spot Stablecoins</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stables.map((s) => (
            <div key={s.symbol} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{s.symbol}</span>
                <Badge variant={s.change >= 0 ? 'success' : 'danger'}>{formatPercent(s.change)}</Badge>
              </div>
              <div className="text-lg font-semibold">{formatCurrency(s.value)}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Funding Heatmap */}
      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Funding Heatmap</h3>
        <div className="flex flex-wrap gap-1.5">
          {heatmap.map((h) => (
            <div
              key={h.market}
              className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: h.funding > 0
                  ? `rgba(34, 197, 94, ${Math.min(Math.abs(h.funding) * 2000, 0.8)})`
                  : `rgba(239, 68, 68, ${Math.min(Math.abs(h.funding) * 2000, 0.8)})`,
              }}
            >
              <span>{h.market}</span>
              <span>{(h.funding * 100).toFixed(4)}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Trending Tokens */}
      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Trending Tokens</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {tokens.map((t) => (
            <Link key={t.symbol} href={`/token/${t.address}`}>
              <div className="rounded-lg border border-border p-2.5 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">
                    {t.symbol.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{t.symbol}</span>
                </div>
                <div className="text-sm">{formatCurrency(t.price)}</div>
                <div className={t.change >= 0 ? 'text-xs text-green-400' : 'text-xs text-red-400'}>
                  {formatPercent(t.change)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Pending Tokens */}
      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Launching one day ({pending.length})</h3>
        <div className="flex flex-wrap gap-1.5">
          {pending.map((p) => (
            <Link key={p} href={`/pending-token/${p}`}>
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs hover:bg-accent/10 cursor-pointer transition-colors">
                {p}
              </span>
            </Link>
          ))}
        </div>
      </Card>

      {/* Two columns: Latest Trades + Liquidations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active TWAPs */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Active TWAPs</h3>
            <Tabs
              tabs={[
                { id: 'all', label: 'ALL' },
                { id: 'spot', label: 'SPOT' },
                { id: 'perps', label: 'PERPS' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div className="text-center py-8 text-muted-foreground text-sm">
            No data available
          </div>
        </Card>

        {/* Transfers */}
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Transfers</h3>
          <div className="text-center py-8 text-muted-foreground text-sm">
            No data available
          </div>
        </Card>
      </div>

      {/* Last Deploys */}
      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2 text-muted-foreground font-medium">Hash</th>
                <th className="text-left px-3 py-2 text-muted-foreground font-medium">Method</th>
                <th className="text-left px-3 py-2 text-muted-foreground font-medium">Age</th>
                <th className="text-left px-3 py-2 text-muted-foreground font-medium">From</th>
                <th className="text-left px-3 py-2 text-muted-foreground font-medium">To</th>
                <th className="text-right px-3 py-2 text-muted-foreground font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {txs.slice(0, 10).map((tx) => (
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
                  <td className="px-3 py-2 text-right text-xs">{formatCurrency(tx.usdValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

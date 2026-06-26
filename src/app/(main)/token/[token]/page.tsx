'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Star, TrendingUp, Users, Coins, BarChart3 } from 'lucide-react';
import { Card, Badge, Tabs, StatCard, EmptyState } from '@/components/ui';
import { generateTokens } from '@/services/mock-data';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';

export default function TokenPage() {
  const params = useParams();
  const tokenAddress = params.token as string;
  const [activeTab, setActiveTab] = useState('overview');
  const tokens = generateTokens(1);
  const token = tokens[0];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'holders', label: 'Holders' },
    { id: 'transfers', label: 'Transfers' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent text-xl font-bold">
          {token.symbol.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{token.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{token.symbol}</span>
            <span>·</span>
            <span className="font-mono">{tokenAddress}</span>
          </div>
        </div>
        <button className="ml-auto p-2 rounded-md border border-border text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
          <Star className="h-4 w-4" />
        </button>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Price" value={formatCurrency(token.price)} change={token.change24h} />
        <StatCard label="Market Cap" value={formatCurrency(token.marketCap)} />
        <StatCard label="Volume 24h" value={formatCurrency(token.volume24h)} />
        <StatCard label="Liquidity" value={formatCurrency(token.liquidity)} />
        <StatCard label="Holders" value={formatNumber(token.holderCount, 0)} />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="border-b border-border pb-1" />

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Price Chart</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              Price chart placeholder - TradingView Lightweight Charts integration
            </div>
          </Card>
          <div className="space-y-4">
            <Card>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Token Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">FDV</span><span className="text-xs">{formatCurrency(token.fdv)}</span></div>
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">Supply</span><span className="text-xs">{formatNumber(token.supply, 0)}</span></div>
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">Circulating</span><span className="text-xs">{formatNumber(token.circulatingSupply, 0)}</span></div>
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">Buy/Sell Ratio</span><span className="text-xs">{token.buySellRatio.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">Whale Distribution</span><span className="text-xs">{token.whaleDistribution.toFixed(1)}%</span></div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'holders' && <EmptyState title="Holder data" description="Top holders will appear here" />}
      {activeTab === 'transfers' && <EmptyState title="Transfer history" description="Token transfers will appear here" />}
      {activeTab === 'analytics' && <EmptyState title="Token analytics" description="Detailed analytics will appear here" />}
    </div>
  );
}

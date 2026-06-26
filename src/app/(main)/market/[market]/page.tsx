'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Star, ExternalLink, TrendingUp, TrendingDown, BarChart3,
  Activity, Users, ArrowUpRight, ArrowDownRight, Copy, Share2,
  Bell, ChevronDown, Filter
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Shimmer, EmptyState } from '@/components/ui';
import { useMarket, useMarketData, useTokenHolders, useTokenTransfers } from '@/hooks/useQueries';
import { formatCurrency, formatNumber, formatPercent, formatAddress, formatTimeAgo } from '@/lib/utils';
import { useWatchlistStore } from '@/stores';

export default function MarketPage() {
  const params = useParams();
  const market = decodeURIComponent((params?.market as string) || 'HYPE');
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [showOrderBook, setShowOrderBook] = useState(false);
  const { addToken, removeToken, isTokenWatched } = useWatchlistStore();
  const watched = isTokenWatched(market);

  const { data: marketInfo, isLoading: loadingMarket } = useMarket(market);
  const { data: marketData, isLoading: loadingData } = useMarketData();
  const { data: holders, isLoading: loadingHolders } = useTokenHolders(market);
  const { data: transfers, isLoading: loadingTransfers } = useTokenTransfers(market);

  const isLoading = loadingMarket || loadingData;

  const periods = ['1h', '4h', '24h', '7d', '30d', '90d', '1y'];

  const mockOrderBook = useMemo(() => {
    const asks = Array.from({ length: 10 }, (_, i) => ({
      price: 25.5 + (i + 1) * 0.1 + Math.random() * 0.05,
      amount: Math.random() * 5000 + 100,
      total: 0,
    }));
    const bids = Array.from({ length: 10 }, (_, i) => ({
      price: 25.5 - (i + 1) * 0.1 - Math.random() * 0.05,
      amount: Math.random() * 5000 + 100,
      total: 0,
    }));
    asks.reduce((acc, item) => { item.total = acc + item.amount; return item.total; }, 0);
    bids.reduce((acc, item) => { item.total = acc + item.amount; return item.total; }, 0);
    return { asks, bids };
  }, []);

  const mockRecentTrades = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      price: 25.4 + Math.random() * 0.4,
      amount: Math.random() * 1000 + 1,
      side: Math.random() > 0.5 ? 'buy' : 'sell' as const,
      time: Date.now() - i * 3000,
    })), []);

  return (
    <div className="space-y-6">
      {/* Market Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-lg">
            {market.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{market}</h1>
              <Badge variant="info">Perp</Badge>
              {market !== 'USDC' && <Badge variant="success">Spot</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">Hyperliquid Market</p>
          </div>
          <button
            onClick={() => watched ? removeToken(market) : addToken(market)}
            className="ml-2 p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <Star className={`h-5 w-5 ${watched ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4 mr-1" /> Alert
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" /> Trade
          </Button>
        </div>
      </motion.div>

      {/* Price Display */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="p-6">
          <div className="flex items-end gap-4 mb-4">
            <span className="text-4xl font-bold">
              {isLoading ? <Shimmer className="h-10 w-32" /> : formatCurrency(25.53)}
            </span>
            <span className="text-lg text-green-400 flex items-center">
              <ArrowUpRight className="h-5 w-5 mr-1" />
              +3.24%
            </span>
            <span className="text-sm text-muted-foreground">24h</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">24h High</p>
              <p className="font-semibold">{formatCurrency(26.12)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h Low</p>
              <p className="font-semibold">{formatCurrency(24.18)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h Volume</p>
              <p className="font-semibold">{formatCurrency(142580000)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Open Interest</p>
              <p className="font-semibold">{formatCurrency(89430000)}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Chart Period Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        {periods.map(p => (
          <Button
            key={p}
            variant={selectedPeriod === p ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedPeriod(p)}
          >
            {p}
          </Button>
        ))}
        <div className="flex-1" />
        <Button variant="ghost" size="sm" onClick={() => setShowOrderBook(!showOrderBook)}>
          <BarChart3 className="h-4 w-4 mr-1" />
          {showOrderBook ? 'Chart' : 'Order Book'}
        </Button>
      </div>

      {/* Chart / Order Book Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card className="overflow-hidden" style={{ height: 480 }}>
          {showOrderBook ? (
            <div className="grid grid-cols-2 h-full">
              {/* Asks */}
              <div className="p-4 border-r border-border">
                <h3 className="text-sm font-semibold mb-2 text-red-400">Asks</h3>
                <div className="space-y-0.5 text-xs font-mono">
                  {[...mockOrderBook.asks].reverse().map((ask, i) => (
                    <div key={i} className="flex justify-between items-center relative">
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-red-500/10"
                        style={{ width: `${Math.min((ask.amount / 5000) * 100, 100)}%` }}
                      />
                      <span className="text-red-400 relative z-10">{ask.price.toFixed(2)}</span>
                      <span className="text-muted-foreground relative z-10">{ask.amount.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bids */}
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-2 text-green-400">Bids</h3>
                <div className="space-y-0.5 text-xs font-mono">
                  {mockOrderBook.bids.map((bid, i) => (
                    <div key={i} className="flex justify-between items-center relative">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-green-500/10"
                        style={{ width: `${Math.min((bid.amount / 5000) * 100, 100)}%` }}
                      />
                      <span className="text-green-400 relative z-10">{bid.price.toFixed(2)}</span>
                      <span className="text-muted-foreground relative z-10">{bid.amount.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center bg-secondary/30">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-primary/40 mb-2" />
                  <p className="text-muted-foreground text-sm">TradingView Chart</p>
                  <p className="text-muted-foreground text-xs mt-1">Candlestick chart for {market}</p>
                </div>
              </div>
              {/* Recent Trades */}
              <div className="h-36 border-t border-border overflow-y-auto p-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-left py-1">Price</th>
                      <th className="text-right py-1">Amount</th>
                      <th className="text-right py-1">Side</th>
                      <th className="text-right py-1">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRecentTrades.map(trade => (
                      <tr key={trade.id} className="hover:bg-secondary/30">
                        <td className={`py-0.5 ${trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.price.toFixed(2)}
                        </td>
                        <td className="text-right py-0.5">{trade.amount.toFixed(2)}</td>
                        <td className="text-right py-0.5">
                          <Badge variant={trade.side === 'buy' ? 'success' : 'danger'} className="text-[10px] px-1">
                            {trade.side.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="text-right py-0.5 text-muted-foreground">
                          {new Date(trade.time).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Market Cap" value={formatCurrency(8200000000)} change={2.4} />
        <StatCard label="Funding Rate" value="0.0123%" change={-0.003} />
        <StatCard label="Mark Price" value={formatCurrency(25.56)} />
        <StatCard label="Index Price" value={formatCurrency(25.48)} />
      </div>

      {/* Tabs Section */}
      <Tabs tabs={[
        { id: 'funding', label: 'Funding History', count: 90 },
        { id: 'liquidations', label: 'Liquidations', count: 142 },
        { id: 'oi', label: 'Open Interest' },
        { id: 'trades', label: 'Recent Trades' },
      ]} defaultTab="funding">
        {(tabId) => (
          <Card className="mt-4 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-3 px-4">Time</th>
                    <th className="text-right py-3 px-4">Rate</th>
                    <th className="text-right py-3 px-4">Period</th>
                    <th className="text-right py-3 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 15 }, (_, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 px-4 text-muted-foreground">{formatTimeAgo(Date.now() - i * 28800000)}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={i % 3 === 0 ? 'text-red-400' : 'text-green-400'}>
                          {(Math.random() * 0.05 - 0.01).toFixed(4)}%
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right">8h</td>
                      <td className="py-2.5 px-4 text-right">{formatCurrency(Math.random() * 500000 + 10000)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </Tabs>
    </div>
  );
}

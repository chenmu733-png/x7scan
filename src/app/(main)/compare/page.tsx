'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Plus, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Input, EmptyState } from '@/components/ui';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';

const comparableItems = [
  { id: '1', name: 'HYPE', type: 'token', price: 25.53, change24h: 3.24, volume: 142580000, marketCap: 8200000000, holders: 45230 },
  { id: '2', name: 'UBTC', type: 'token', price: 108250, change24h: 1.8, volume: 45600000, marketCap: 245000000, holders: 8920 },
  { id: '3', name: 'UETH', type: 'token', price: 3845, change24h: -0.5, volume: 23400000, marketCap: 124000000, holders: 12400 },
  { id: '4', name: 'USOL', type: 'token', price: 178, change24h: 8.2, volume: 12800000, marketCap: 89000000, holders: 5600 },
  { id: '5', name: 'USDC', type: 'token', price: 1.0, change24h: 0.01, volume: 890000000, marketCap: 560000000, holders: 89000 },
];

export default function ComparePage() {
  const [selected, setSelected] = useState<typeof comparableItems>([comparableItems[0], comparableItems[1]]);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = comparableItems.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selected.find(s => s.id === i.id)
  );

  const addComparison = (item: typeof comparableItems[0]) => {
    if (selected.length < 4) setSelected([...selected, item]);
  };

  const removeComparison = (id: string) => {
    setSelected(selected.filter(s => s.id !== id));
  };

  const metrics = ['price', 'change24h', 'volume', 'marketCap', 'holders'] as const;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <GitCompare className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">Compare</h1>
      </motion.div>

      {/* Selected Items */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {selected.map(item => (
              <div key={item.id} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5">
                <span className="font-semibold text-sm">{item.name}</span>
                <button onClick={() => removeComparison(item.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {selected.length < 4 && (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Add token..."
                  className="rounded-lg border border-input bg-secondary px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-40"
                />
                {searchQuery && filtered.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 min-w-[200px]">
                    {filtered.slice(0, 5).map(item => (
                      <button
                        key={item.id}
                        onClick={() => { addComparison(item); setSearchQuery(''); }}
                        className="w-full text-left px-3 py-2 hover:bg-secondary text-sm flex items-center justify-between"
                      >
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-muted-foreground">{formatCurrency(item.price)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Comparison Table */}
      {selected.length >= 2 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium">Metric</th>
                    {selected.map(item => (
                      <th key={item.id} className="text-right py-4 px-6 font-semibold">
                        <a href={`/token/${item.name}`} className="text-primary hover:underline">{item.name}</a>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics.map(metric => {
                    const values = selected.map(s => s[metric]);
                    const maxVal = Math.max(...values.map(v => typeof v === 'number' ? v : 0));
                    return (
                      <tr key={metric} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-6 text-muted-foreground capitalize font-medium">
                          {metric === 'change24h' ? '24h Change' : metric === 'marketCap' ? 'Market Cap' : metric}
                        </td>
                        {selected.map(item => {
                          const val = item[metric];
                          const isMax = val === maxVal && selected.length > 1;
                          return (
                            <td key={item.id} className={`py-3 px-6 text-right font-mono ${isMax ? 'text-primary font-semibold' : ''}`}>
                              {metric === 'price' ? formatCurrency(val as number) :
                               metric === 'change24h' ? (
                                <span className={(val as number) >= 0 ? 'text-green-400' : 'text-red-400'}>
                                  {(val as number) >= 0 ? '+' : ''}{val}%
                                </span>
                              ) :
                               metric === 'marketCap' || metric === 'volume' ? formatCurrency(val as number) :
                               formatNumber(val as number)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      ) : (
        <EmptyState
          icon={GitCompare}
          title="Select items to compare"
          description="Add at least 2 tokens to start comparing"
        />
      )}
    </div>
  );
}

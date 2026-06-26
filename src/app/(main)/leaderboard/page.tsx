'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Search, Filter, ArrowUpDown, Download } from 'lucide-react';
import { Card, Badge, Tabs, Input, Select, EmptyState } from '@/components/ui';
import { generateLeaderboard } from '@/services/mock-data';
import { formatCurrency, formatPercent, formatNumber, formatAddress } from '@/lib/utils';
import { exportData } from '@/lib/export';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('pnl');
  const [search, setSearch] = useState('');
  const entries = generateLeaderboard(50);

  const tabs = [
    { id: 'pnl', label: 'Top PnL' },
    { id: 'roi', label: 'Top ROI' },
    { id: 'volume', label: 'Top Volume' },
    { id: 'winRate', label: 'Top Win Rate' },
    { id: 'vault', label: 'Top Vault' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Trophy className="h-6 w-6 text-accent" /> Leaderboard
      </h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex items-center gap-2 ml-auto">
          <Input placeholder="Search traders..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48" />
          <button onClick={() => exportData(entries, 'csv', { filename: 'x7scan-leaderboard' })} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors" title="Export CSV">
            <Download className="h-4 w-4" />
          </button>
          <Select
            options={[
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' },
              { value: 'all', label: 'All Time' },
            ]}
            value="30d"
            onChange={() => {}}
            className="w-28"
          />
        </div>
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
                <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Volume</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Win Rate</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Trades</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.rank} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${entry.rank <= 3 ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/address/${entry.address}`} className="text-accent hover:underline">
                      {entry.alias || formatAddress(entry.address)}
                    </Link>
                  </td>
                  <td className={`px-4 py-3 text-right ${entry.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(entry.pnl)}
                  </td>
                  <td className={`px-4 py-3 text-right ${entry.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {entry.roi.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                    {formatCurrency(entry.volume)}
                  </td>
                  <td className="px-4 py-3 text-right">{entry.winRate.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell text-muted-foreground">{entry.trades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { Card, Badge, StatCard, Tabs } from '@/components/ui';

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState('fees');
  const tabs = [
    { id: 'fees', label: 'Trading Fees' },
    { id: 'stables', label: 'Spot Stablecoins' },
    { id: 'auction', label: 'Auction Price' },
    { id: 'hip2', label: 'HIP-2 USDC' },
    { id: 'yapping', label: 'Yapping' },
    { id: 'hlp', label: 'HLP Monthly Returns' },
  ];

  const monthlyReturns = [
    { year: 2026, ytd: '6.15%', months: ['6.40%', '0.08%', '0.10%', '-0.52%', '0.11%', '0.00%', '-', '-', '-', '-', '-', '-'] },
    { year: 2025, ytd: '15.73%', months: ['1.70%', '0.99%', '-0.79%', '0.80%', '1.31%', '0.48%', '0.95%', '0.80%', '0.79%', '7.79%', '0.11%', '0.01%'] },
    { year: 2024, ytd: '41.53%', months: ['5.25%', '5.50%', '7.19%', '2.82%', '3.06%', '1.59%', '2.66%', '0.81%', '1.41%', '1.59%', '2.33%', '1.24%'] },
    { year: 2023, ytd: '51.87%', months: ['-', '-', '-', '-', '1.62%', '2.20%', '17.23%', '9.35%', '0.39%', '-0.79%', '0.09%', '14.43%'] },
  ];

  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-accent" /> Stats
      </h1>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="border-b border-border pb-1" />

      {activeTab === 'fees' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Trading Fees</h3>
            <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
              Chart placeholder - Total Fees (green) vs Spot Fees (blue) line chart
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Fee Breakdown</h3>
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Total Fees" value="$2.8M" />
              <StatCard label="Spot Fees" value="$800K" />
              <StatCard label="Perp Fees" value="$2.0M" />
              <StatCard label="Change" value="+21.74%" />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'stables' && (
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Spot Stablecoins</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Multi-line chart: USDC, USDT, USDE, USDH, Total
          </div>
        </Card>
      )}

      {activeTab === 'auction' && (
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Auction Price</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Dual-axis bar chart for auction prices
          </div>
        </Card>
      )}

      {activeTab === 'hip2' && (
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">HIP-2 USDC</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Line chart showing USDC liquidity over time
          </div>
        </Card>
      )}

      {activeTab === 'hlp' && (
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">HLP Monthly Returns (%)</h3>
          <div className="text-xs text-muted-foreground mb-2">Annualized</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 text-muted-foreground font-medium">YEAR</th>
                  <th className="text-right px-3 py-2 text-muted-foreground font-medium">YTD</th>
                  {monthNames.map((m) => (
                    <th key={m} className="text-right px-3 py-2 text-muted-foreground font-medium hidden md:table-cell">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyReturns.map((row) => (
                  <tr key={row.year} className="border-b border-border/50">
                    <td className="px-3 py-2 font-medium">{row.year}</td>
                    <td className="px-3 py-2 text-right text-accent font-medium">{row.ytd}</td>
                    {row.months.map((val, i) => (
                      <td key={i} className={`px-3 py-2 text-right hidden md:table-cell ${val === '-' ? 'text-muted-foreground' : parseFloat(val) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-muted-foreground italic">
            Data may be slightly off due to source granularity
          </div>
        </Card>
      )}

      {activeTab === 'yapping' && (
        <Card>
          <div className="text-center py-12 text-muted-foreground">Yapping stats coming soon</div>
        </Card>
      )}
    </div>
  );
}

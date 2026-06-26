'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark, ArrowDownToLine, ArrowUpFromLine, TrendingUp,
  DollarSign, Percent, Clock, AlertTriangle, Info
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Input, Shimmer } from '@/components/ui';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';

const lendingAssets = [
  { name: 'USDC', symbol: 'USDC', totalSupply: 245000000, totalBorrow: 189000000, supplyAPY: 2.34, borrowAPY: 3.89, utilization: 77.1, collateralFactor: 95, available: 56000000 },
  { name: 'HYPE', symbol: 'HYPE', totalSupply: 12500000, totalBorrow: 4200000, supplyAPY: 1.12, borrowAPY: 5.67, utilization: 33.6, collateralFactor: 70, available: 8300000 },
  { name: 'UBTC', symbol: 'UBTC', totalSupply: 890, totalBorrow: 345, supplyAPY: 0.45, borrowAPY: 2.89, utilization: 38.8, collateralFactor: 75, available: 545 },
  { name: 'UETH', symbol: 'UETH', totalSupply: 12400, totalBorrow: 5600, supplyAPY: 0.78, borrowAPY: 3.45, utilization: 45.2, collateralFactor: 75, available: 6800 },
  { name: 'USOL', symbol: 'USOL', totalSupply: 85000, totalBorrow: 32000, supplyAPY: 1.56, borrowAPY: 6.78, utilization: 37.6, collateralFactor: 65, available: 53000 },
  { name: 'USDE', symbol: 'USDE', totalSupply: 5600000, totalBorrow: 2100000, supplyAPY: 3.45, borrowAPY: 7.12, utilization: 37.5, collateralFactor: 80, available: 3500000 },
  { name: 'USDH', symbol: 'USDH', totalSupply: 3200000, totalBorrow: 1800000, supplyAPY: 2.89, borrowAPY: 4.56, utilization: 56.3, collateralFactor: 85, available: 1400000 },
];

export default function LendingPage() {
  const [activeTab, setActiveTab] = useState('markets');
  const [supplyModal, setSupplyModal] = useState<string | null>(null);
  const [borrowModal, setBorrowModal] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const totalSupply = lendingAssets.reduce((acc, a) => acc + a.totalSupply, 0);
  const totalBorrow = lendingAssets.reduce((acc, a) => acc + a.totalBorrow, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Landmark className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">Lending</h1>
      </motion.div>

      {/* Summary Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Supply" value={formatCurrency(totalSupply)} change={2.3} />
          <StatCard label="Total Borrow" value={formatCurrency(totalBorrow)} change={1.8} />
          <StatCard label="Avg Supply APY" value="1.80%" change={0.12} />
          <StatCard label="Avg Borrow APY" value="4.91%" change={-0.23} />
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <Card className="p-4 flex items-start gap-3 border-l-4 border-l-primary">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Lending Protocol on Hyperliquid</p>
            <p className="text-sm text-muted-foreground">
              Supply assets to earn interest or borrow against your collateral. Interest rates are determined algorithmically based on utilization.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Lending Markets Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold">Lending Markets</h2>
            <div className="flex items-center gap-2">
              <Input placeholder="Search markets..." className="w-48" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4">Asset</th>
                  <th className="text-right py-3 px-4">Total Supply</th>
                  <th className="text-right py-3 px-4">Supply APY</th>
                  <th className="text-right py-3 px-4">Total Borrow</th>
                  <th className="text-right py-3 px-4">Borrow APY</th>
                  <th className="text-right py-3 px-4">Utilization</th>
                  <th className="text-center py-3 px-4">Collateral</th>
                  <th className="text-right py-3 px-4">Available</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lendingAssets.map((asset, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{formatCurrency(asset.totalSupply)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-green-400 font-semibold">{asset.supplyAPY}%</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{formatCurrency(asset.totalBorrow)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-orange-400 font-semibold">{asset.borrowAPY}%</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${asset.utilization > 80 ? 'bg-red-500' : asset.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${asset.utilization}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs">{asset.utilization}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={asset.collateralFactor >= 80 ? 'success' : asset.collateralFactor >= 60 ? 'warning' : 'default'}>
                        {asset.collateralFactor}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{formatCurrency(asset.available)}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setSupplyModal(asset.symbol); setAmount(''); }}
                          className="text-green-400 hover:text-green-300"
                        >
                          <ArrowDownToLine className="h-3.5 w-3.5 mr-0.5" /> Supply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setBorrowModal(asset.symbol); setAmount(''); }}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <ArrowUpFromLine className="h-3.5 w-3.5 mr-0.5" /> Borrow
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Supply Modal */}
      {supplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setSupplyModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 w-full max-w-md shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Supply {supplyModal}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Amount</label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-input bg-secondary px-4 py-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{supplyModal}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Wallet balance: 10,000.00 {supplyModal}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supply APY</span>
                  <span className="text-green-400">{lendingAssets.find(a => a.symbol === supplyModal)?.supplyAPY}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collateral Factor</span>
                  <span>{lendingAssets.find(a => a.symbol === supplyModal)?.collateralFactor}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1">
                  <ArrowDownToLine className="h-4 w-4 mr-1" /> Supply
                </Button>
                <Button variant="ghost" onClick={() => setSupplyModal(null)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Borrow Modal */}
      {borrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setBorrowModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl border border-border p-6 w-full max-w-md shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Borrow {borrowModal}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Amount</label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-input bg-secondary px-4 py-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{borrowModal}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold text-yellow-500">Borrow Risk Warning</p>
                    <p className="text-muted-foreground">Borrowing increases your liquidation risk. If your health factor drops below 1.0, your collateral may be liquidated.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Borrow APY</span>
                  <span className="text-orange-400">{lendingAssets.find(a => a.symbol === borrowModal)?.borrowAPY}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health Factor</span>
                  <span className="text-green-400">2.45</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1">
                  <ArrowUpFromLine className="h-4 w-4 mr-1" /> Borrow
                </Button>
                <Button variant="ghost" onClick={() => setBorrowModal(null)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

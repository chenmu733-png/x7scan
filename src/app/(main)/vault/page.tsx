'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Landmark, TrendingUp, Users, DollarSign, Star } from 'lucide-react';
import { Card, Badge, StatCard, EmptyState } from '@/components/ui';
import { generateVaults } from '@/services/mock-data';
import { formatCurrency, formatPercent } from '@/lib/utils';

export default function VaultPage() {
  const vaults = generateVaults();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Landmark className="h-6 w-6 text-accent" /> Vaults
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Vaults" value={vaults.length} />
        <StatCard label="Total TVL" value={formatCurrency(vaults.reduce((s, v) => s + v.tvl, 0))} />
        <StatCard label="Avg APR" value={`${(vaults.reduce((s, v) => s + v.apr, 0) / vaults.length).toFixed(2)}%`} />
        <StatCard label="Total Depositors" value={vaults.reduce((s, v) => s + v.depositors, 0).toLocaleString()} />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Vault</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Strategy</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">TVL</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">APR</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">PnL</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Depositors</th>
              </tr>
            </thead>
            <tbody>
              {vaults.map((vault) => (
                <tr key={vault.address} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/vault/${vault.address}`} className="text-accent hover:underline font-medium">
                      {vault.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Badge>{vault.strategy}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(vault.tvl)}</td>
                  <td className="px-4 py-3 text-right text-green-400">{vault.apr.toFixed(2)}%</td>
                  <td className={`px-4 py-3 text-right ${vault.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(vault.pnl)}
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell text-muted-foreground">
                    {vault.depositors.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

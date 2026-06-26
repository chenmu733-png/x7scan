'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Coins, Shield, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { Card, Badge, Tabs, Input, CopyButton, ProgressBar } from '@/components/ui';
import { generateValidators } from '@/services/mock-data';
import { formatCurrency, formatPercent, formatAddress } from '@/lib/utils';

export default function StakingPage() {
  const [activeTab, setActiveTab] = useState('validators');
  const [search, setSearch] = useState('');
  const validators = generateValidators();
  const totalStake = validators.reduce((s, v) => s + v.stake, 0);

  const tabs = [
    { id: 'validators', label: 'Validators' },
    { id: 'votes', label: 'Votes' },
    { id: 'stats', label: 'Stats' },
    { id: 'unstaking', label: 'Unstaking Queue' },
    { id: 'txs', label: 'Txs' },
    { id: 'delegate', label: 'Delegate' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Coins className="h-6 w-6 text-accent" /> Staking
      </h1>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="border-b border-border pb-1" />

      {activeTab === 'validators' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Validators: <span className="text-foreground font-medium">{validators.length} / 33</span></span>
              <span>Active Stake: <span className="text-foreground font-medium">{formatCurrency(totalStake)} (100.00%)</span></span>
            </div>
            <Input placeholder="Search validators..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48" />
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Validator</th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Description</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Stake↓</th>
                    <th className="text-center px-4 py-3 text-muted-foreground font-medium">Blocks</th>
                    <th className="text-center px-4 py-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-center px-4 py-3 text-muted-foreground font-medium">Fees</th>
                    <th className="text-center px-4 py-3 text-muted-foreground font-medium">Up</th>
                  </tr>
                </thead>
                <tbody>
                  {validators.map((v) => (
                    <tr key={v.address} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/validator/${v.address}`} className="text-accent hover:underline font-medium">
                          {v.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-xs hidden lg:table-cell">
                        {v.description}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="font-medium">{formatCurrency(v.stake)}</div>
                        <div className="text-xs text-muted-foreground">{v.stakePercentage.toFixed(2)}%</div>
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{v.blocks}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="success" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {v.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">{v.commission.toFixed(2)}%</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          {Array.from({ length: 3 }, (_, i) => (
                            <div key={i} className={`h-3 w-1 rounded-full ${v.isUp ? 'bg-green-500' : 'bg-red-500'}`} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-3">
            <div className="text-xs text-muted-foreground">Total Staked</div>
            <div className="mt-1 text-lg font-semibold">{formatCurrency(totalStake)}</div>
          </Card>
          <Card className="p-3">
            <div className="text-xs text-muted-foreground">Active Validators</div>
            <div className="mt-1 text-lg font-semibold">{validators.filter(v => v.isUp).length}</div>
          </Card>
          <Card className="p-3">
            <div className="text-xs text-muted-foreground">Avg Commission</div>
            <div className="mt-1 text-lg font-semibold">{(validators.reduce((s, v) => s + v.commission, 0) / validators.length).toFixed(2)}%</div>
          </Card>
          <Card className="p-3">
            <div className="text-xs text-muted-foreground">Avg APR</div>
            <div className="mt-1 text-lg font-semibold">{(validators.reduce((s, v) => s + v.apr, 0) / validators.length).toFixed(2)}%</div>
          </Card>
        </div>
      )}

      {activeTab === 'votes' && (
        <Card>
          <div className="text-center py-12 text-muted-foreground">Vote data will appear here</div>
        </Card>
      )}
      {activeTab === 'unstaking' && (
        <Card>
          <div className="text-center py-12 text-muted-foreground">Unstaking queue will appear here</div>
        </Card>
      )}
      {activeTab === 'txs' && (
        <Card>
          <div className="text-center py-12 text-muted-foreground">Staking transactions will appear here</div>
        </Card>
      )}
      {activeTab === 'delegate' && (
        <Card>
          <div className="text-center py-12">
            <div className="text-lg font-medium text-muted-foreground mb-2">Delegate HYPE</div>
            <p className="text-sm text-muted-foreground">Connect your wallet to delegate to validators</p>
          </div>
        </Card>
      )}
    </div>
  );
}

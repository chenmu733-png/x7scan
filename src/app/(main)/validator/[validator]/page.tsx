'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Shield, Copy, ExternalLink, TrendingUp, Users,
  Activity, CheckCircle, XCircle, Clock, Vote,
  Coins, BarChart3, Star
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Shimmer, CopyButton, ProgressBar } from '@/components/ui';
import { useValidator } from '@/hooks/useQueries';
import { formatNumber, formatCurrency, formatPercent, formatAddress, formatTimeAgo } from '@/lib/utils';

export default function ValidatorPage() {
  const params = useParams();
  const validatorId = params?.validator as string;

  const { data: validator, isLoading } = useValidator(validatorId);

  const validatorData = validator || {
    name: decodeURIComponent(validatorId || 'HyperCore'),
    address: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    description: 'Core infrastructure validator on the Hyperliquid network providing high reliability and performance.',
    stake: 12500000,
    stakePercentage: 4.8,
    totalBlocks: 1894521,
    missedBlocks: 1243,
    uptime: 99.93,
    commissionRate: 5.0,
    delegators: 342,
    status: 'active' as const,
    purring: true,
    fees: 1250,
    votes: 89,
    apr: 3.2,
    lastBlockTime: Date.now() - 2000,
    joiningDate: '2023-10-15',
    website: 'https://hypercore.example.com',
    logo: '',
  };

  const [delegateAmount, setDelegateAmount] = useState('');

  const recentBlocks = Array.from({ length: 20 }, (_, i) => ({
    height: 1050027935 - i * 100,
    timestamp: Date.now() - i * 500000,
    txCount: Math.floor(Math.random() * 3000) + 100,
    status: Math.random() > 0.02 ? 'success' : 'missed',
  }));

  const delegatorList = Array.from({ length: 10 }, (_, i) => ({
    address: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    amount: Math.random() * 500000 + 10000,
    share: Math.random() * 5 + 0.1,
    since: `${Math.floor(Math.random() * 365)} days ago`,
  }));

  return (
    <div className="space-y-6">
      {/* Validator Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold text-xl">
            {validatorData.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{validatorData.name}</h1>
              {validatorData.purring && (
                <Badge variant="success" className="text-xs">PURRING</Badge>
              )}
              <Badge variant={validatorData.status === 'active' ? 'success' : 'danger'}>
                {validatorData.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-sm text-muted-foreground">{formatAddress(validatorData.address)}</span>
              <CopyButton text={validatorData.address} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary">
            <Vote className="h-4 w-4 mr-1" /> Delegate
          </Button>
          <Button variant="ghost">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Stake"
            value={formatCurrency(validatorData.stake)}
            suffix={`(${validatorData.stakePercentage}%)`}
          />
          <StatCard label="APR" value={`${validatorData.apr}%`} change={0.2} />
          <StatCard label="Uptime" value={`${validatorData.uptime}%`} change={0.01} />
          <StatCard label="Delegators" value={formatNumber(validatorData.delegators)} />
        </div>
      </motion.div>

      {/* Validator Details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Validator Info</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Description</span>
              <span className="text-right max-w-[60%]">{validatorData.description}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Commission Rate</span>
              <span className="font-semibold">{validatorData.commissionRate}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total Blocks Produced</span>
              <span className="font-mono">{formatNumber(validatorData.totalBlocks ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Missed Blocks</span>
              <span className="font-mono text-red-400">{formatNumber(validatorData.missedBlocks ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Uptime</span>
              <div className="flex items-center gap-3">
                <ProgressBar value={validatorData.uptime} max={100} className="w-32" />
                <span className="font-mono">{validatorData.uptime}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Last Block</span>
              <span className="text-muted-foreground">{formatTimeAgo(validatorData.lastBlockTime ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Joined</span>
              <span>{validatorData.joiningDate}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Website</span>
              <a href={validatorData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {validatorData.website}
              </a>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Delegate Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Delegate to {validatorData.name}</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="number"
                value={delegateAmount}
                onChange={e => setDelegateAmount(e.target.value)}
                placeholder="Enter amount (HYPE)"
                className="w-full rounded-lg border border-input bg-secondary px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Estimated APR: {validatorData.apr}% • Commission: {validatorData.commissionRate}%
              </p>
            </div>
            <Button variant="primary" className="sm:self-start">
              <Coins className="h-4 w-4 mr-1" /> Delegate
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={[
        { id: 'blocks', label: 'Recent Blocks', count: validatorData.totalBlocks },
        { id: 'delegators', label: 'Delegators', count: validatorData.delegators },
        { id: 'votes', label: 'Votes', count: validatorData.votes },
      ]} defaultTab="blocks">
        {(tabId) => (
          <Card className="mt-4 overflow-hidden">
            {tabId === 'blocks' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-xs">
                      <th className="text-left py-3 px-4">Height</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Txs</th>
                      <th className="text-right py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBlocks.map((block, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-2.5 px-4">
                          <a href={`/block/${block.height}`} className="text-primary hover:underline font-mono">
                            {formatNumber(block.height)}
                          </a>
                        </td>
                        <td className="py-2.5 px-4">
                          {block.status === 'success' ? (
                            <Badge variant="success" className="text-xs"><CheckCircle className="h-3 w-3 mr-1" />Produced</Badge>
                          ) : (
                            <Badge variant="danger" className="text-xs"><XCircle className="h-3 w-3 mr-1" />Missed</Badge>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-right">{formatNumber(block.txCount)}</td>
                        <td className="py-2.5 px-4 text-right text-muted-foreground">{formatTimeAgo(block.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tabId === 'delegators' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-xs">
                      <th className="text-left py-3 px-4">Address</th>
                      <th className="text-right py-3 px-4">Amount</th>
                      <th className="text-right py-3 px-4">Share</th>
                      <th className="text-right py-3 px-4">Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    {delegatorList.map((d, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-2.5 px-4">
                          <a href={`/address/${d.address}`} className="font-mono text-primary hover:underline text-xs">
                            {formatAddress(d.address)}
                          </a>
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono">{formatCurrency(d.amount)}</td>
                        <td className="py-2.5 px-4 text-right">{d.share.toFixed(2)}%</td>
                        <td className="py-2.5 px-4 text-right text-muted-foreground">{d.since}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tabId === 'votes' && (
              <div className="p-8 text-center text-muted-foreground">
                <Vote className="h-12 w-12 mx-auto mb-2 opacity-40" />
                <p>Governance votes will appear here.</p>
              </div>
            )}
          </Card>
        )}
      </Tabs>
    </div>
  );
}

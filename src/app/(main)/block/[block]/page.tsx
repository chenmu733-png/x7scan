'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box, Copy, ExternalLink, ChevronLeft, ChevronRight,
  Clock, Hash, User, Fuel, ArrowRight
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Shimmer, CopyButton } from '@/components/ui';
import { useBlock, useTransactions } from '@/hooks/useQueries';
import { formatNumber, formatTimeAgo, formatAddress, formatDuration } from '@/lib/utils';

export default function BlockPage() {
  const params = useParams();
  const blockHeight = params?.block as string;

  const { data: block, isLoading: loadingBlock } = useBlock(parseInt(blockHeight) || 0);
  const { data: transactions, isLoading: loadingTx } = useTransactions();

  const isLoading = loadingBlock || loadingTx;

  const blockData = block || {
    height: parseInt(blockHeight) || 1050027935,
    hash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    timestamp: Date.now() - 500,
    transactions: 1847,
    gasUsed: 12458000,
    gasLimit: 30000000,
    proposer: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
  };

  const txList = Array.isArray(transactions) ? transactions : (transactions as any)?.data || [];

  return (
    <div className="space-y-6">
      {/* Block Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Box className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Block #{blockHeight}</h1>
        </div>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Block Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Block Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" /> Block Hash
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm break-all">{blockData.hash}</span>
                <CopyButton text={blockData.hash} />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Box className="h-4 w-4" /> Block Height
              </span>
              <span className="font-mono font-semibold">{formatNumber(blockData.height)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Timestamp
              </span>
              <div className="text-right">
                <span>{new Date(blockData.timestamp).toLocaleString()}</span>
                <span className="text-muted-foreground ml-2">({formatTimeAgo(blockData.timestamp)})</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <ArrowRight className="h-4 w-4" /> Transactions
              </span>
              <span className="font-semibold">{formatNumber(blockData.transactions)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Fuel className="h-4 w-4" /> Gas Used
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono">{formatNumber(blockData.gasUsed)}</span>
                <span className="text-muted-foreground">
                  ({((blockData.gasUsed / blockData.gasLimit) * 100).toFixed(1)}%)
                </span>
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(blockData.gasUsed / blockData.gasLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Fuel className="h-4 w-4" /> Gas Limit
              </span>
              <span className="font-mono">{formatNumber(blockData.gasLimit)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> Proposer
              </span>
              <div className="flex items-center gap-2">
                <a href={`/address/${blockData.proposer}`} className="font-mono text-primary hover:underline">
                  {formatAddress(blockData.proposer)}
                </a>
                <CopyButton text={blockData.proposer} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Transactions Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">
              Transactions in this Block
              <span className="text-muted-foreground font-normal ml-2">({blockData.transactions})</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-3 px-4">Tx Hash</th>
                  <th className="text-left py-3 px-4">Method</th>
                  <th className="text-left py-3 px-4">From</th>
                  <th className="text-center py-3 px-4"></th>
                  <th className="text-left py-3 px-4">To</th>
                  <th className="text-right py-3 px-4">Amount</th>
                  <th className="text-right py-3 px-4">Token</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 10 }, (_, i) => (
                    <tr key={i}>
                      <td colSpan={9} className="py-3 px-4"><Shimmer className="h-4 w-full" /></td>
                    </tr>
                  ))
                ) : (
                  txList.slice(0, 25).map((tx: any, i: number) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 px-4">
                        <a href={`/tx/${tx.hash}`} className="font-mono text-primary hover:underline text-xs">
                          {formatAddress(tx.hash, 8, 6)}
                        </a>
                      </td>
                      <td className="py-2.5 px-4">
                        <Badge variant={tx.method.includes('Buy') || tx.method.includes('Open') ? 'success' : tx.method.includes('Sell') || tx.method.includes('Close') ? 'danger' : 'default'}>
                          {tx.method}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4">
                        <a href={`/address/${tx.from}`} className="font-mono text-xs text-primary hover:underline">
                          {formatAddress(tx.from)}
                        </a>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-2.5 px-4">
                        <a href={`/address/${tx.to}`} className="font-mono text-xs text-primary hover:underline">
                          {formatAddress(tx.to)}
                        </a>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono">
                        {formatNumber(tx.amount, 2)}
                      </td>
                      <td className="py-2.5 px-4 text-right">{tx.token}</td>
                      <td className="py-2.5 px-4 text-center">
                        <Badge variant={tx.status === 'success' ? 'success' : 'danger'}>
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">
                        {formatTimeAgo(tx.timestamp)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

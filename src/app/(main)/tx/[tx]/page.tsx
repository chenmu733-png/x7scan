'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight, Copy, ExternalLink, CheckCircle, XCircle,
  Clock, Hash, Box, ArrowLeftRight, FileText
} from 'lucide-react';
import { Card, Badge, Button, Shimmer, CopyButton, ExternalLink as ExtLink } from '@/components/ui';
import { useTransaction } from '@/hooks/useQueries';
import { formatNumber, formatTimeAgo, formatAddress, formatCurrency, formatDuration } from '@/lib/utils';

export default function TransactionPage() {
  const params = useParams();
  const txHash = params?.tx as string;

  const { data: transaction, isLoading } = useTransaction(txHash);

  const txData = transaction || {
    hash: txHash || '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    blockHeight: 1050027935,
    timestamp: Date.now() - 30000,
    from: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    to: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    amount: 5234.52,
    token: 'HYPE',
    tokenAddress: '0x0d01dc56dcaaca66ad901c959b4011ec',
    method: 'Buy',
    price: 25.53,
    usdValue: 133537.34,
    status: 'success',
  };

  const methodColors: Record<string, string> = {
    'Buy': 'success',
    'Sell': 'danger',
    'Open Long': 'success',
    'Open Short': 'danger',
    'Close Long': 'info',
    'Close Short': 'info',
    'Transfer': 'default',
    'Deposit': 'info',
    'Withdraw': 'warning',
  };

  return (
    <div className="space-y-6">
      {/* Transaction Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Transaction Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={txData.hash} label="Copy Hash" />
        </div>
      </motion.div>

      {/* Status Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className={`p-4 border-l-4 ${txData.status === 'success' ? 'border-l-green-500' : 'border-l-red-500'}`}>
          <div className="flex items-center gap-3">
            {txData.status === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
            <div>
              <h2 className="text-lg font-semibold capitalize">{txData.status}</h2>
              <p className="text-sm text-muted-foreground">
                {txData.status === 'success' ? 'This transaction was confirmed successfully.' : 'This transaction failed.'}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Transaction Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Info</h2>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 border-b border-border/50 gap-1">
              <span className="text-muted-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" /> Transaction Hash
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm break-all">{txData.hash}</span>
                <CopyButton text={txData.hash} />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Box className="h-4 w-4" /> Block
              </span>
              <a href={`/block/${txData.blockHeight}`} className="text-primary hover:underline font-mono">
                {formatNumber(txData.blockHeight)}
              </a>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Timestamp
              </span>
              <div>
                <span>{new Date(txData.timestamp).toLocaleString()}</span>
                <span className="text-muted-foreground ml-2">({formatTimeAgo(txData.timestamp)})</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" /> Method
              </span>
              <Badge variant={(methodColors[txData.method] as any) || 'default'}>
                {txData.method}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 border-b border-border/50 gap-1">
              <span className="text-muted-foreground flex items-center gap-2">From</span>
              <div className="flex items-center gap-2">
                <a href={`/address/${txData.from}`} className="font-mono text-primary hover:underline text-sm">
                  {txData.from}
                </a>
                <CopyButton text={txData.from} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 border-b border-border/50 gap-1">
              <span className="text-muted-foreground flex items-center gap-2">To</span>
              <div className="flex items-center gap-2">
                <a href={`/address/${txData.to}`} className="font-mono text-primary hover:underline text-sm">
                  {txData.to}
                </a>
                <CopyButton text={txData.to} />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">
                {formatNumber(txData.amount, 4)} {txData.token}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">USD Value</span>
              <span className="font-semibold text-primary">
                {formatCurrency(txData.usdValue)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Price</span>
              <span className="font-mono">
                {formatCurrency(txData.price)} per {txData.token}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 gap-1">
              <span className="text-muted-foreground">Token Contract</span>
              <div className="flex items-center gap-2">
                <a href={`/token/${txData.token}`} className="font-mono text-primary hover:underline text-sm">
                  {txData.tokenAddress}
                </a>
                <CopyButton text={txData.tokenAddress} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Internal Transactions (placeholder) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Internal Transactions</h2>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <p>No internal transactions for this transaction.</p>
          </div>
        </Card>
      </motion.div>

      {/* Event Logs (placeholder) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Event Logs</h2>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <p>No event logs available for this transaction.</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

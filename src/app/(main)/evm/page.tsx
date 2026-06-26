'use client';

import React from 'react';
import { Code2 } from 'lucide-react';
import { Card, Badge, Tabs, EmptyState } from '@/components/ui';
import { formatAddress, formatTimeAgo, formatCurrency } from '@/lib/utils';

export default function EVMPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Code2 className="h-6 w-6 text-accent" /> HyperEVM Explorer
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent EVM Blocks</h3>
          <div className="text-center py-8 text-muted-foreground text-sm">
            EVM block data will appear here
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent EVM Transactions</h3>
          <div className="text-center py-8 text-muted-foreground text-sm">
            EVM transaction data will appear here
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">EVM Contracts</h3>
        <div className="text-center py-8 text-muted-foreground text-sm">
          Deployed contracts will appear here
        </div>
      </Card>
    </div>
  );
}

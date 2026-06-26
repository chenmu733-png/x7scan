'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart, Star, Trash2, ExternalLink, Copy, Grid3X3, List
} from 'lucide-react';
import { Card, Badge, Button, Tabs, EmptyState } from '@/components/ui';
import { formatCurrency, formatAddress, formatTimeAgo } from '@/lib/utils';
import { useWatchlistStore } from '@/stores';

const favoriteItems = [
  { type: 'wallet', name: 'Whale_0x3f', address: '0x3f5a8b2c9d4e7f1a6b8c0d2e4f5a7b9c1d3e5f7a', addedAt: Date.now() - 86400000 * 5 },
  { type: 'token', name: 'HYPE', address: '0x0d01dc56dcaaca66ad901c959b4011ec', addedAt: Date.now() - 86400000 * 12 },
  { type: 'token', name: 'UBTC', address: '0x8f254b963e8468305d409b33aa137c67', addedAt: Date.now() - 86400000 * 8 },
  { type: 'validator', name: 'HyperCore', address: '0xabc123def456789abc123def456789abc123def4', addedAt: Date.now() - 86400000 * 3 },
  { type: 'vault', name: 'HLP Vault', address: '0xvault123456789abcdef123456789abcdef1234', addedAt: Date.now() - 86400000 * 15 },
];

const typeLinks: Record<string, string> = {
  wallet: '/address/',
  token: '/token/',
  validator: '/validator/',
  vault: '/vault/',
};

export default function FavoritesPage() {
  const { removeWallet, removeToken, removeTrader } = useWatchlistStore();

  const grouped = {
    wallets: favoriteItems.filter(i => i.type === 'wallet'),
    tokens: favoriteItems.filter(i => i.type === 'token'),
    validators: favoriteItems.filter(i => i.type === 'validator'),
    vaults: favoriteItems.filter(i => i.type === 'vault'),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Heart className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">Favorites</h1>
        <Badge variant="default">{favoriteItems.length} items</Badge>
      </motion.div>

      {/* All Favorites */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        {favoriteItems.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Star items across the explorer to add them to your favorites"
            action={<Button variant="primary">Explore</Button>}
          />
        ) : (
          <div className="space-y-3">
            {favoriteItems.map((item, i) => (
              <motion.div
                key={`${item.type}-${item.address}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-bold text-primary capitalize">
                      {item.type.slice(0, 3)}
                    </div>
                    <div>
                      <a
                        href={`${typeLinks[item.type]}${item.name}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {item.name}
                      </a>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="default" className="text-[10px] capitalize">{item.type}</Badge>
                        <span className="font-mono">{formatAddress(item.address)}</span>
                        <span>•</span>
                        <span>Added {formatTimeAgo(item.addedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`${typeLinks[item.type]}${item.name}`}>
                      <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                    </a>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

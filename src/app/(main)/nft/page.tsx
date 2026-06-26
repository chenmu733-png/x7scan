'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Image, Search, Filter, Grid3X3, List, ExternalLink,
  RefreshCw, Heart, ArrowUpRight, Palette, Tag
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Input, Shimmer, EmptyState } from '@/components/ui';
import { formatCurrency, formatNumber, formatAddress } from '@/lib/utils';

const nftCollections = [
  { name: 'HyperFrens', items: 10000, floor: 0.42, volume: 1250, owners: 4820, change24h: 5.2, banner: '', description: 'The original Hyperliquid PFP collection' },
  { name: 'Liquid Lions', items: 5000, floor: 0.18, volume: 890, owners: 3100, change24h: -2.1, banner: '', description: 'Fearless lions of the Hyperliquid ecosystem' },
  { name: 'DeFi Degen', items: 7777, floor: 0.08, volume: 456, owners: 5200, change24h: 12.5, banner: '', description: 'True degen spirit captured in art' },
  { name: 'HyperPunks', items: 10000, floor: 0.03, volume: 234, owners: 8900, change24h: -0.5, banner: '', description: 'Classic punk-style NFTs on Hyperliquid' },
  { name: 'Whale Watchers', items: 3333, floor: 1.2, volume: 4200, owners: 1890, change24h: 8.7, banner: '', description: 'Exclusive whale-themed collectibles' },
  { name: 'Liquid Nodes', items: 2048, floor: 0.55, volume: 1100, owners: 1560, change24h: 3.1, banner: '', description: 'Node operator tribute collection' },
];

const recentMints = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  collection: nftCollections[i % nftCollections.length].name,
  tokenId: Math.floor(Math.random() * 10000),
  minter: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
  price: Math.random() * 2,
  time: Date.now() - i * 60000,
}));

const recentTransfers = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  collection: nftCollections[i % nftCollections.length].name,
  tokenId: Math.floor(Math.random() * 10000),
  from: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
  to: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
  price: Math.random() * 5,
  time: Date.now() - i * 120000,
}));

export default function NFTPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const totalVolume = nftCollections.reduce((acc, c) => acc + c.volume, 0);
  const totalItems = nftCollections.reduce((acc, c) => acc + c.items, 0);

  const filteredCollections = nftCollections.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Palette className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">NFT Explorer</h1>
      </motion.div>

      {/* Summary Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Collections" value={formatNumber(nftCollections.length)} change={3} />
          <StatCard label="Total Items" value={formatNumber(totalItems)} change={1.2} />
          <StatCard label="Total Volume" value={`${formatCurrency(totalVolume)} HYPE`} change={8.5} />
          <StatCard label="Unique Owners" value="25,370" change={2.1} />
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search collections..."
              className="w-full rounded-lg border border-input bg-secondary pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </Button>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={[
        { id: 'collections', label: 'Collections' },
        { id: 'mints', label: 'Recent Mints' },
        { id: 'transfers', label: 'Transfers' },
      ]} defaultTab="collections">
        {(tabId) => (
          <div className="mt-4">
            {tabId === 'collections' && (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCollections.map((collection, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group">
                        {/* Banner Placeholder */}
                        <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary to-accent/10 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image className="h-12 w-12 text-primary/30" />
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{collection.name}</h3>
                            <Badge variant={collection.change24h >= 0 ? 'success' : 'danger'}>
                              {collection.change24h >= 0 ? '+' : ''}{collection.change24h}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{collection.description}</p>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">Floor</p>
                              <p className="font-semibold">{collection.floor} HYPE</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Volume</p>
                              <p className="font-semibold">{collection.volume} HYPE</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Owners</p>
                              <p className="font-semibold">{formatNumber(collection.owners)}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground text-xs">
                          <th className="text-left py-3 px-4">Collection</th>
                          <th className="text-right py-3 px-4">Items</th>
                          <th className="text-right py-3 px-4">Floor</th>
                          <th className="text-right py-3 px-4">Volume</th>
                          <th className="text-right py-3 px-4">Owners</th>
                          <th className="text-right py-3 px-4">24h Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCollections.map((c, i) => (
                          <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                  {c.name.slice(0, 2)}
                                </div>
                                <div>
                                  <p className="font-semibold">{c.name}</p>
                                  <p className="text-xs text-muted-foreground">{c.items.toLocaleString()} items</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">{formatNumber(c.items)}</td>
                            <td className="py-3 px-4 text-right">{c.floor} HYPE</td>
                            <td className="py-3 px-4 text-right">{c.volume} HYPE</td>
                            <td className="py-3 px-4 text-right">{formatNumber(c.owners)}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={c.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {c.change24h >= 0 ? '+' : ''}{c.change24h}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )
            )}
            {tabId === 'mints' && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-xs">
                        <th className="text-left py-3 px-4">Collection</th>
                        <th className="text-right py-3 px-4">Token ID</th>
                        <th className="text-left py-3 px-4">Minter</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMints.map((mint, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-2.5 px-4 font-semibold">{mint.collection}</td>
                          <td className="py-2.5 px-4 text-right font-mono">#{mint.tokenId}</td>
                          <td className="py-2.5 px-4">
                            <a href={`/address/${mint.minter}`} className="font-mono text-primary hover:underline text-xs">
                              {formatAddress(mint.minter)}
                            </a>
                          </td>
                          <td className="py-2.5 px-4 text-right">{mint.price.toFixed(3)} HYPE</td>
                          <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">
                            {new Date(mint.time).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
            {tabId === 'transfers' && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-xs">
                        <th className="text-left py-3 px-4">Collection</th>
                        <th className="text-right py-3 px-4">Token ID</th>
                        <th className="text-left py-3 px-4">From</th>
                        <th className="text-left py-3 px-4">To</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransfers.map((tx, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-2.5 px-4 font-semibold">{tx.collection}</td>
                          <td className="py-2.5 px-4 text-right font-mono">#{tx.tokenId}</td>
                          <td className="py-2.5 px-4">
                            <a href={`/address/${tx.from}`} className="font-mono text-primary hover:underline text-xs">
                              {formatAddress(tx.from)}
                            </a>
                          </td>
                          <td className="py-2.5 px-4">
                            <a href={`/address/${tx.to}`} className="font-mono text-primary hover:underline text-xs">
                              {formatAddress(tx.to)}
                            </a>
                          </td>
                          <td className="py-2.5 px-4 text-right">{tx.price.toFixed(3)} HYPE</td>
                          <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">
                            {new Date(tx.time).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}

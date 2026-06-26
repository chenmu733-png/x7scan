'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, LayoutDashboard, Coins, BarChart3, Code2, Info,
  Trophy, Wallet, Search, Eye, Bell, Heart, GitCompare,
  TrendingUp, Layers, Shield, Landmark, Image, Waves,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores';

const sidebarItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Staking', href: '/staking', icon: Coins },
  { label: 'Stats', href: '/stats', icon: BarChart3 },
  { label: 'EVM', href: '/evm', icon: Code2 },
  { divider: true },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'Whale Tracker', href: '/whale', icon: Waves },
  { label: 'Vaults', href: '/vault', icon: Landmark },
  { label: 'Lending', href: '/lending', icon: Shield },
  { label: 'NFT', href: '/nft', icon: Image },
  { divider: true },
  { label: 'Alerts', href: '/alerts', icon: Bell },
  { label: 'Watchlist', href: '/watchlist', icon: Eye },
  { label: 'Favorites', href: '/favorites', icon: Heart },
  { label: 'Compare', href: '/compare', icon: GitCompare },
  { divider: true },
  { label: 'About', href: '/about', icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-border bg-card/50 backdrop-blur-sm transition-all duration-300',
        isOpen ? 'w-52' : 'w-14'
      )}
    >
      <div className="flex-1 py-2 px-1.5 overflow-y-auto scrollbar-hide">
        {sidebarItems.map((item, i) => {
          if ('divider' in item && item.divider) {
            return <div key={i} className="my-2 border-t border-border" />;
          }

          const Icon = item.icon!;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href!));

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors mb-0.5',
                isActive
                  ? 'bg-accent/20 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
              )}
              title={!isOpen ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* Toggle */}
      <div className="border-t border-border p-1.5">
        <button
          onClick={toggle}
          className="flex items-center justify-center w-full rounded-md py-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}

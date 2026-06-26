'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
  Home, LayoutDashboard, Coins, BarChart3, Code2, Info,
  Trophy, Eye, Bell, Heart, Search, Settings, Palette
} from 'lucide-react';
import { useCommandPaletteStore, useThemeStore } from '@/stores';

const commands = [
  { id: 'home', label: 'Go to Home', icon: Home, action: '/' },
  { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, action: '/dashboard' },
  { id: 'staking', label: 'Go to Staking', icon: Coins, action: '/staking' },
  { id: 'stats', label: 'Go to Stats', icon: BarChart3, action: '/stats' },
  { id: 'evm', label: 'Go to EVM', icon: Code2, action: '/evm' },
  { id: 'leaderboard', label: 'Go to Leaderboard', icon: Trophy, action: '/leaderboard' },
  { id: 'alerts', label: 'Go to Alerts', icon: Bell, action: '/alerts' },
  { id: 'watchlist', label: 'Go to Watchlist', icon: Eye, action: '/watchlist' },
  { id: 'favorites', label: 'Go to Favorites', icon: Heart, action: '/favorites' },
  { id: 'about', label: 'Go to About', icon: Info, action: '/about' },
  { id: 'toggle-theme', label: 'Toggle Theme', icon: Palette, action: 'toggle-theme' },
  { id: 'settings', label: 'Open Settings', icon: Settings, action: 'settings' },
];

export function CommandPalette() {
  const router = useRouter();
  const { isOpen, setOpen } = useCommandPaletteStore();
  const { toggleTheme } = useThemeStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
      >
        <Command className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
          <Command.Input
            placeholder="Type a command or search..."
            className="w-full border-0 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Command.List className="max-h-72 overflow-y-auto py-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            {commands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <Command.Item
                  key={cmd.id}
                  onSelect={() => {
                    if (cmd.action === 'toggle-theme') {
                      toggleTheme();
                    } else if (cmd.action === 'settings') {
                      // Open settings
                    } else {
                      router.push(cmd.action);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-foreground cursor-pointer data-[selected=true]:bg-accent/20 data-[selected=true]:text-accent"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {cmd.label}
                </Command.Item>
              );
            })}
          </Command.List>
        </Command>
      </motion.div>
    </>
  );
}

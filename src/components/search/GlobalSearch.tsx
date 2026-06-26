'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Wallet, Coins, Hash, Box, Shield, Landmark, FileCode, Image, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchStore } from '@/stores';
import { useSearch } from '@/hooks/useQueries';
import { useKeyboardShortcut, useClickOutside, useDebounce } from '@/hooks';

const categoryIcons: Record<string, React.ReactNode> = {
  wallet: <Wallet className="h-4 w-4" />,
  hyperEvm: <FileCode className="h-4 w-4" />,
  token: <Coins className="h-4 w-4" />,
  transaction: <Hash className="h-4 w-4" />,
  block: <Box className="h-4 w-4" />,
  validator: <Shield className="h-4 w-4" />,
  vault: <Landmark className="h-4 w-4" />,
  contract: <FileCode className="h-4 w-4" />,
  nft: <Image className="h-4 w-4" />,
  alias: <Tag className="h-4 w-4" />,
};

export function GlobalSearch() {
  const router = useRouter();
  const searchStore = useSearchStore();
  const [inputValue, setInputValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(inputValue, 300);
  const { data: suggestions } = useSearch(debouncedQuery);

  useKeyboardShortcut('k', () => searchStore.setOpen(true), { meta: true });
  useClickOutside(containerRef, () => searchStore.setOpen(false));

  useEffect(() => {
    if (searchStore.isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setInputValue('');
      setSelectedIndex(-1);
    }
  }, [searchStore.isOpen]);

  const allItems = [
    ...(suggestions?.map((s) => ({ ...s, category: s.type, type: 'suggestion' as const })) || []),
  ];

  const handleSelect = useCallback(
    (item: { type: string; value: string }) => {
      searchStore.addRecentSearch(item.value);
      searchStore.setOpen(false);
      // Route based on type
      if (item.type === 'wallet' || item.type === 'alias') {
        router.push(`/address/${item.value}`);
      } else if (item.type === 'token') {
        router.push(`/token/${item.value}`);
      } else if (item.type === 'transaction') {
        router.push(`/tx/${item.value}`);
      } else if (item.type === 'block') {
        router.push(`/block/${item.value}`);
      } else if (item.type === 'validator') {
        router.push(`/validator/${item.value}`);
      } else if (item.type === 'vault') {
        router.push(`/vault/${item.value}`);
      } else {
        router.push(`/address/${item.value}`);
      }
    },
    [router, searchStore]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleSelect(allItems[selectedIndex] as { type: string; value: string });
    } else if (e.key === 'Escape') {
      searchStore.setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {searchStore.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => searchStore.setOpen(false)}
          />

          {/* Search Modal */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2"
          >
            <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center border-b border-border px-4">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search wallet, token, transaction, block..."
                  className="flex-1 border-0 bg-transparent py-4 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={() => searchStore.setOpen(false)}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-accent/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {inputValue.length === 0 && (
                  <>
                    {/* Recent Searches */}
                    {searchStore.recentSearches.length > 0 && (
                      <div className="px-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">Recent</span>
                          <button
                            onClick={() => searchStore.clearRecentSearches()}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Clear
                          </button>
                        </div>
                        {searchStore.recentSearches.map((search) => (
                          <button
                            key={search}
                            onClick={() => {
                              setInputValue(search);
                              handleSelect({ type: 'wallet', value: search });
                            }}
                            className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent/10 transition-colors"
                          >
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="truncate">{search}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div className="px-4 py-2">
                      <span className="text-xs font-medium text-muted-foreground">Popular</span>
                      {searchStore.popularSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => {
                            setInputValue(search);
                            handleSelect({ type: 'wallet', value: search });
                          }}
                          className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent/10 transition-colors"
                        >
                          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate">{search}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Suggestions */}
                {allItems.length > 0 && (
                  <div className="px-2">
                    {allItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(item as { type: string; value: string })}
                        className={cn(
                          'flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm transition-colors',
                          i === selectedIndex ? 'bg-accent/20 text-accent' : 'text-foreground hover:bg-accent/10'
                        )}
                      >
                        <span className="text-muted-foreground">
                          {categoryIcons[item.type || 'wallet'] || <Search className="h-4 w-4" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item.label || item.value}</div>
                          {item.sublabel && (
                            <div className="text-xs text-muted-foreground truncate">{item.sublabel}</div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}

                {inputValue.length >= 2 && allItems.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No results found for &quot;{inputValue}&quot;
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-muted px-1 py-0.5">↑↓</kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-muted px-1 py-0.5">↵</kbd> Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-muted px-1 py-0.5">esc</kbd> Close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

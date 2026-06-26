'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { CommandPalette } from '@/components/search/CommandPalette';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6">
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <GlobalSearch />
      <CommandPalette />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { APP_NAME } from '@/config/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/tos" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/legal" className="hover:text-foreground transition-colors">Legal Notice</Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Report Feedback</span>
            <span>·</span>
            <span>© 2024 {APP_NAME}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

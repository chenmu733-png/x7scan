'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Info, ExternalLink, MessageCircle,
  Mail, Book, Shield, Zap, Globe, Heart, Code2
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

const features = [
  { icon: Zap, title: 'Real-Time Data', description: 'Live blockchain data with sub-second updates via WebSocket connections. Track blocks, transactions, and market movements as they happen.' },
  { icon: Shield, title: 'Comprehensive Analytics', description: 'Deep analytics for traders, wallets, and tokens. PnL tracking, ROI calculations, position analysis, and performance metrics.' },
  { icon: Globe, title: 'Multi-Chain Support', description: 'Full support for Hyperliquid L1 and EVM-compatible features. Seamless navigation between native and EVM explorers.' },
  { icon: Book, title: 'DeFi Explorer', description: 'Explore staking, lending, vaults, and more. Track validator performance, delegation rewards, and protocol metrics.' },
  { icon: Heart, title: 'Whale Tracking', description: 'Monitor large transactions and whale activity in real-time. Set custom alerts for specific wallets, tokens, and price thresholds.' },
  { icon: Code2, title: 'Developer API', description: 'RESTful API endpoints for programmatic access to blockchain data. Comprehensive documentation and rate-limited access.' },
];

const teamMembers = [
  { name: 'X7Scan Team', role: 'Core Development', avatar: '' },
];

const resources = [
  { name: 'API Documentation', url: '#', icon: Book, description: 'Complete API reference and integration guides' },
  { name: 'GitHub Repository', url: '#', icon: Code2, description: 'Open source code and contribution guidelines' },
  { name: 'Twitter / X', url: '#', icon: MessageCircle, description: 'Follow for updates and announcements' },
  { name: 'Telegram', url: '#', icon: MessageCircle, description: 'Join the community discussion' },
  { name: 'Email Support', url: 'mailto:support@x7scan.io', icon: Mail, description: 'Get help with technical issues' },
];

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
            X7
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3">X7Scan</h1>
        <p className="text-xl text-muted-foreground mb-2">The Hyperliquid Blockchain Explorer</p>
        <p className="text-muted-foreground">
          Real-time data, analytics, and insights for the Hyperliquid ecosystem.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <Badge variant="info">v1.0.0</Badge>
          <Badge variant="success">Open Source</Badge>
          <Badge variant="default">Hyperliquid Native</Badge>
        </div>
      </motion.div>

      {/* Mission */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            X7Scan is built to provide the most comprehensive, fastest, and most user-friendly blockchain explorer for the Hyperliquid network. We believe that transparency and accessibility of blockchain data is fundamental to the growth and health of the ecosystem. Our platform delivers real-time insights into every aspect of the Hyperliquid blockchain — from blocks and transactions to trading analytics, validator performance, DeFi protocols, and whale activity. Whether you are a trader, developer, researcher, or casual observer, X7Scan provides the tools you need to understand and navigate the Hyperliquid ecosystem.
          </p>
        </Card>
      </motion.div>

      {/* Features */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Card className="p-6 h-full hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
              'TanStack Query', 'Zustand', 'React Hook Form', 'Zod', 'Recharts',
              'TradingView Lightweight Charts', 'TanStack Table', 'WebSocket',
              'PWA', 'ESLint', 'Prettier', 'Vercel', 'Node.js'
            ].map(tech => (
              <Badge key={tech} variant="default" className="text-sm px-3 py-1">{tech}</Badge>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Resources / Links */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        <div className="space-y-3">
          {resources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <Card className="p-4 flex items-center gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <resource.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold group-hover:text-primary transition-colors">{resource.name}</p>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
          <h2 className="text-lg font-semibold text-yellow-500 mb-2">Disclaimer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            X7Scan is an independent blockchain explorer and is not affiliated with, endorsed by, or connected to Hyperliquid Labs or the official Hyperliquid team. All data is sourced from public blockchain information and is provided "as is" without warranty. Trading and investment decisions should not be based solely on information from this platform. Always do your own research (DYOR).
          </p>
        </Card>
      </motion.div>

      {/* Footer */}
      <div className="text-center py-6 text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} X7Scan. Built with ❤️ for the Hyperliquid community.</p>
      </div>
    </div>
  );
}

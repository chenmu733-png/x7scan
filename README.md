# X7Scan

A modern, comprehensive blockchain explorer for the Hyperliquid network — inspired by HypurrScan.io, built entirely from scratch with original code and design.

## Tech Stack

- **Framework:** Next.js 15/16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with `@theme` directive
- **Animations:** Framer Motion
- **State:** Zustand (with localStorage persistence) + TanStack React Query
- **Charts:** TradingView Lightweight Charts v5 + Recharts v3
- **Tables:** TanStack React Table v8
- **Forms:** React Hook Form + Zod v4
- **Search:** cmdk (Command Palette)
- **Notifications:** Sonner + custom NotificationCenter
- **PWA:** Service Worker ready with manifest

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Real-time network dashboard |
| `/address/[address]` | Wallet/address detail |
| `/token/[token]` | Token detail page |
| `/market/[market]` | Perp market detail with charts |
| `/leaderboard` | Trader leaderboard (PnL, ROI, Volume) |
| `/block/[block]` | Block detail with transactions |
| `/tx/[tx]` | Transaction detail with event logs |
| `/validator/[validator]` | Validator detail with delegation |
| `/lending` | Lending markets |
| `/nft` | NFT explorer |
| `/whale` | Whale tracker with live feed |
| `/alerts` | Alert management (React Hook Form + Zod) |
| `/watchlist` | Watchlist (wallets, tokens, traders) |
| `/favorites` | Favorites collection |
| `/compare` | Side-by-side token comparison |
| `/staking` | Staking overview |
| `/stats` | Network statistics |
| `/evm` | EVM bridge explorer |
| `/vault` | Vault overview |
| `/about` | About page |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- Responsive dark/light theme with glass UI effects
- Sticky navbar with global search
- Collapsible sidebar navigation
- Animated cards and page transitions
- Skeleton loading states
- Command palette (Cmd+K)
- Real-time WebSocket data (with auto-reconnect)
- CSV/JSON export from data tables
- Notification center with unread count
- PWA manifest for mobile install
- Security headers (CSP, X-Frame-Options, etc.)

## License

MIT

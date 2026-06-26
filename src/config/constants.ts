export const APP_NAME = 'X7Scan';
export const APP_DESCRIPTION = 'Hyperliquid Blockchain Explorer';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://x7scan.io';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.hypurrscan.io';
export const HYPERLIQUID_API_URL = 'https://api.hyperliquid.xyz';
export const HYPERLIQUID_WS_URL = 'wss://api.hyperliquid.xyz/ws';

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Staking', href: '/staking' },
  { label: 'Stats', href: '/stats' },
  { label: 'EVM', href: '/evm' },
  { label: 'About', href: '/about' },
] as const;

export const SOCIAL_LINKS = {
  twitter: 'https://x.com/HypurrScan',
  telegram: 'https://t.me/hypurrscan',
  hyperliquid: 'https://app.hyperliquid.xyz',
} as const;

export const TOKEN_ADDRESSES = {
  USDC: '0x6d1e7cde53ba9467b783cb7c530ce054',
  USDH: '0x54e00a5988577cb0b0c9ab0cb6ef7f4b',
  USDT: '0x25faedc3f054130dbb4e4203aca63567',
  USDE: '0x2e6d84f2d7ca82e6581e03523e4389f7',
  HYPE: '0x0d01dc56dcaaca66ad901c959b4011ec',
  UBTC: '0x8f254b963e8468305d409b33aa137c67',
  UETH: '0xe1edd30daaf5caac3fe63569e24748da',
  USOL: '0x49b67c39f5566535de22b29b0e51e685',
} as const;

export const POLLING_INTERVALS = {
  fast: 5_000,
  medium: 15_000,
  slow: 60_000,
} as const;

export const PAGINATION = {
  defaultPageSize: 15,
  pageSizeOptions: [10, 15, 25, 50, 100],
} as const;

export const THEME = {
  dark: 'dark',
  light: 'light',
} as const;

export const SEARCH_CATEGORIES = [
  'wallet',
  'hyperEvm',
  'token',
  'transaction',
  'block',
  'validator',
  'vault',
  'contract',
  'nft',
  'alias',
] as const;

export const CHART_PERIODS = [
  { label: '1H', value: '1h' },
  { label: '4H', value: '4h' },
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
  { label: 'ALL', value: 'all' },
] as const;

export const KEYBOARD_SHORTCUTS = {
  search: { key: 'k', meta: true },
  commandPalette: { key: 'j', meta: true },
  darkMode: { key: 'd', meta: true, shift: true },
  home: { key: '1', meta: true },
  dashboard: { key: '2', meta: true },
  staking: { key: '3', meta: true },
} as const;

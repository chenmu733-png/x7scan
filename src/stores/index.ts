import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { THEME } from '@/config/constants';

interface ThemeState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: THEME.dark,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'x7scan-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));

interface SearchState {
  isOpen: boolean;
  query: string;
  recentSearches: string[];
  popularSearches: string[];
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      isOpen: false,
      query: '',
      recentSearches: [],
      popularSearches: ['HYPE', 'USDC', '0xf3F496C9486BE5924a93D67e98298733Bb47057c'],
      setOpen: (open) => set({ isOpen: open }),
      setQuery: (query) => set({ query }),
      addRecentSearch: (search) =>
        set((state) => ({
          recentSearches: [search, ...state.recentSearches.filter((s) => s !== search)].slice(0, 10),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'x7scan-search',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);

interface WatchlistState {
  watchedWallets: string[];
  watchedTokens: string[];
  watchedTraders: string[];
  favoriteWallets: string[];
  favoriteTokens: string[];
  favoriteTraders: string[];
  toggleWatchWallet: (address: string) => void;
  toggleWatchToken: (address: string) => void;
  toggleWatchTrader: (address: string) => void;
  toggleFavoriteWallet: (address: string) => void;
  toggleFavoriteToken: (address: string) => void;
  toggleFavoriteTrader: (address: string) => void;
  removeWallet: (address: string) => void;
  removeToken: (address: string) => void;
  removeTrader: (address: string) => void;
  addWallet: (address: string) => void;
  addToken: (address: string) => void;
  addTrader: (address: string) => void;
  isWalletWatched: (address: string) => boolean;
  isTokenWatched: (address: string) => boolean;
  isTraderWatched: (address: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchedWallets: [],
      watchedTokens: [],
      watchedTraders: [],
      favoriteWallets: [],
      favoriteTokens: [],
      favoriteTraders: [],
      toggleWatchWallet: (address) =>
        set((state) => ({
          watchedWallets: state.watchedWallets.includes(address)
            ? state.watchedWallets.filter((a) => a !== address)
            : [...state.watchedWallets, address],
        })),
      toggleWatchToken: (address) =>
        set((state) => ({
          watchedTokens: state.watchedTokens.includes(address)
            ? state.watchedTokens.filter((a) => a !== address)
            : [...state.watchedTokens, address],
        })),
      toggleWatchTrader: (address) =>
        set((state) => ({
          watchedTraders: state.watchedTraders.includes(address)
            ? state.watchedTraders.filter((a) => a !== address)
            : [...state.watchedTraders, address],
        })),
      toggleFavoriteWallet: (address) =>
        set((state) => ({
          favoriteWallets: state.favoriteWallets.includes(address)
            ? state.favoriteWallets.filter((a) => a !== address)
            : [...state.favoriteWallets, address],
        })),
      toggleFavoriteToken: (address) =>
        set((state) => ({
          favoriteTokens: state.favoriteTokens.includes(address)
            ? state.favoriteTokens.filter((a) => a !== address)
            : [...state.favoriteTokens, address],
        })),
      toggleFavoriteTrader: (address) =>
        set((state) => ({
          favoriteTraders: state.favoriteTraders.includes(address)
            ? state.favoriteTraders.filter((a) => a !== address)
            : [...state.favoriteTraders, address],
        })),
      removeWallet: (address) =>
        set((state) => ({
          watchedWallets: state.watchedWallets.filter((a) => a !== address),
          favoriteWallets: state.favoriteWallets.filter((a) => a !== address),
        })),
      removeToken: (address) =>
        set((state) => ({
          watchedTokens: state.watchedTokens.filter((a) => a !== address),
          favoriteTokens: state.favoriteTokens.filter((a) => a !== address),
        })),
      removeTrader: (address) =>
        set((state) => ({
          watchedTraders: state.watchedTraders.filter((a) => a !== address),
          favoriteTraders: state.favoriteTraders.filter((a) => a !== address),
        })),
      addWallet: (address) =>
        set((state) => ({
          watchedWallets: state.watchedWallets.includes(address)
            ? state.watchedWallets
            : [...state.watchedWallets, address],
        })),
      addToken: (address) =>
        set((state) => ({
          watchedTokens: state.watchedTokens.includes(address)
            ? state.watchedTokens
            : [...state.watchedTokens, address],
        })),
      addTrader: (address) =>
        set((state) => ({
          watchedTraders: state.watchedTraders.includes(address)
            ? state.watchedTraders
            : [...state.watchedTraders, address],
        })),
      isWalletWatched: (address) => get().watchedWallets.includes(address),
      isTokenWatched: (address) => get().watchedTokens.includes(address),
      isTraderWatched: (address) => get().watchedTraders.includes(address),
    }),
    {
      name: 'x7scan-watchlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
          read: false,
        },
        ...state.notifications,
      ].slice(0, 50),
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearAll: () => set({ notifications: [] }),
}));

interface DashboardState {
  widgets: import('@/types').DashboardWidget[];
  updateWidgetPosition: (id: string, position: { x: number; y: number }) => void;
  toggleWidget: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: [
        { id: '1', type: 'openInterest', title: 'Open Interest', size: 'medium', position: { x: 0, y: 0 }, enabled: true },
        { id: '2', type: 'funding', title: 'Funding', size: 'medium', position: { x: 1, y: 0 }, enabled: true },
        { id: '3', type: 'volume', title: 'Volume', size: 'medium', position: { x: 2, y: 0 }, enabled: true },
        { id: '4', type: 'marketCap', title: 'Market Cap', size: 'medium', position: { x: 0, y: 1 }, enabled: true },
        { id: '5', type: 'tvl', title: 'TVL', size: 'medium', position: { x: 1, y: 1 }, enabled: true },
        { id: '6', type: 'gas', title: 'Gas', size: 'small', position: { x: 2, y: 1 }, enabled: true },
        { id: '7', type: 'latestTrades', title: 'Latest Trades', size: 'large', position: { x: 0, y: 2 }, enabled: true },
        { id: '8', type: 'latestLiquidations', title: 'Latest Liquidations', size: 'large', position: { x: 0, y: 3 }, enabled: true },
        { id: '9', type: 'whaleActivity', title: 'Whale Activity', size: 'medium', position: { x: 0, y: 4 }, enabled: true },
        { id: '10', type: 'longShortRatio', title: 'Long/Short Ratio', size: 'medium', position: { x: 1, y: 4 }, enabled: true },
        { id: '11', type: 'fundingHeatmap', title: 'Funding Heatmap', size: 'large', position: { x: 0, y: 5 }, enabled: true },
        { id: '12', type: 'marketSentiment', title: 'Market Sentiment', size: 'medium', position: { x: 2, y: 4 }, enabled: true },
      ],
      updateWidgetPosition: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((w) => (w.id === id ? { ...w, position } : w)),
        })),
      toggleWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w)),
        })),
    }),
    {
      name: 'x7scan-dashboard',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface CommandPaletteState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useCommandPaletteStore = create<CommandPaletteState>()((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));

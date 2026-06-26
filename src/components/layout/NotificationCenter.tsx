'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, CheckCheck, Trash2, AlertTriangle, TrendingUp, Info, Volume2 } from 'lucide-react';
import { useNotificationStore } from '@/stores';
import { formatTimeAgo } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  price: TrendingUp,
  alert: AlertTriangle,
  info: Info,
  trade: Volume2,
  default: Bell,
};

const colorMap: Record<string, string> = {
  price: 'text-green-400 bg-green-500/20',
  alert: 'text-red-400 bg-red-500/20',
  info: 'text-blue-400 bg-blue-500/20',
  trade: 'text-purple-400 bg-purple-500/20',
  default: 'text-primary bg-primary/20',
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification, markAsRead, clearAll } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => iconMap[type] || iconMap.default;
  const getColor = (type: string) => colorMap[type] || colorMap.default;

  const markAllRead = () => {
    notifications.forEach((n) => {
      if (!n.read) markAsRead(n.id);
    });
  };

  return (
    <>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white px-1"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[480px] z-50 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="p-1 rounded hover:bg-secondary/50 transition-colors"
                      title="Mark all as read"
                    >
                      <CheckCheck className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="p-1 rounded hover:bg-secondary/50 transition-colors"
                      title="Clear all"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded hover:bg-secondary/50 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="overflow-y-auto max-h-[400px]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Bell className="h-10 w-10 mb-2 opacity-30" />
                    <p className="text-sm">No notifications yet</p>
                    <p className="text-xs mt-1">Alerts and updates will appear here</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {notifications.slice(0, 20).map((notification) => {
                      const Icon = getIcon(notification.type);
                      const colorClass = getColor(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className={`flex items-start gap-3 px-4 py-3 border-b border-border/30 hover:bg-secondary/20 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-primary/5' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-1 rounded hover:bg-secondary/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3 text-muted-foreground" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 20 && (
                <div className="px-4 py-2 border-t border-border text-center">
                  <a
                    href="/alerts"
                    className="text-xs text-primary hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    View all notifications
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

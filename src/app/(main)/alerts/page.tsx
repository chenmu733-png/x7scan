'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Bell, Plus, Trash2, Edit, Check, X, AlertTriangle,
  DollarSign, TrendingUp, Activity, Volume2, Settings,
  Download
} from 'lucide-react';
import { Card, Badge, Button, StatCard, Tabs, Input, Select, Shimmer, EmptyState } from '@/components/ui';
import { useNotificationStore } from '@/stores';
import { formatCurrency, formatNumber, formatTimeAgo } from '@/lib/utils';
import { createAlertSchema, CreateAlertFormData } from '@/lib/schemas';
import { exportData } from '@/lib/export';

const alertTypes = [
  { value: 'price_above', label: 'Price Above' },
  { value: 'price_below', label: 'Price Below' },
  { value: 'volume_spike', label: 'Volume Spike' },
  { value: 'large_deposit', label: 'Large Deposit' },
  { value: 'large_withdraw', label: 'Large Withdraw' },
  { value: 'liquidation', label: 'Liquidation' },
  { value: 'funding_rate', label: 'Funding Rate Change' },
  { value: 'whale_activity', label: 'Whale Activity' },
  { value: 'validator_change', label: 'Validator Change' },
];

const mockAlerts = [
  { id: '1', name: 'HYPE Price Alert', type: 'price_above', target: '$30.00', token: 'HYPE', active: true, triggered: 3, lastTriggered: Date.now() - 3600000, createdAt: '2024-12-01' },
  { id: '2', name: 'USDC Large Deposit', type: 'large_deposit', target: '>$1,000,000', token: 'USDC', active: true, triggered: 7, lastTriggered: Date.now() - 7200000, createdAt: '2024-11-15' },
  { id: '3', name: 'UBTC Liquidation Watch', type: 'liquidation', target: 'Any', token: 'UBTC', active: false, triggered: 0, lastTriggered: 0, createdAt: '2024-12-10' },
  { id: '4', name: 'HYPE Volume Spike', type: 'volume_spike', target: '>2x avg', token: 'HYPE', active: true, triggered: 12, lastTriggered: Date.now() - 1800000, createdAt: '2024-10-20' },
  { id: '5', name: 'Whale Tracker - 0x3f', type: 'whale_activity', target: 'Any trade', token: 'All', active: true, triggered: 45, lastTriggered: Date.now() - 600000, createdAt: '2024-09-05' },
];

const alertHistory = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  alertName: mockAlerts[i % mockAlerts.length].name,
  message: `${mockAlerts[i % mockAlerts.length].token} ${mockAlerts[i % mockAlerts.length].type.replace('_', ' ')} triggered`,
  timestamp: Date.now() - i * 1800000,
  dismissed: i > 5,
}));

export default function AlertsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { notifications } = useNotificationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CreateAlertFormData>({
    resolver: zodResolver(createAlertSchema),
    defaultValues: {
      name: '',
      type: 'price_above',
      token: 'HYPE',
      target: '',
      condition: '',
      notifyVia: 'in_app',
      cooldown: 15,
    },
  });

  const onSubmit = async (data: CreateAlertFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowCreateForm(false);
    reset();
  };

  const handleExport = (format: 'csv' | 'json') => {
    exportData(mockAlerts, format, { filename: 'x7scan-alerts' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Bell className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Alerts</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleExport('csv')}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleExport('json')}>
            <Download className="h-4 w-4 mr-1" /> JSON
          </Button>
          <Button variant="primary" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-1" /> Create Alert
          </Button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active Alerts" value={mockAlerts.filter(a => a.active).length.toString()} />
          <StatCard label="Total Triggers" value={mockAlerts.reduce((acc, a) => acc + a.triggered, 0).toString()} />
          <StatCard label="Today's Triggers" value="8" change={-3.2} />
          <StatCard label="Unread" value={notifications.filter(n => !n.read).length.toString()} />
        </div>
      </motion.div>

      {/* Create Alert Form with React Hook Form + Zod */}
      {showCreateForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 border-primary/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create New Alert</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Alert Name</label>
                  <input
                    {...register('name')}
                    placeholder="e.g., HYPE Price Alert"
                    className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Alert Type</label>
                  <select
                    {...register('type')}
                    className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {alertTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-xs text-red-400 mt-1">{errors.type.message}</p>}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Token / Market</label>
                  <input
                    {...register('token')}
                    placeholder="e.g., HYPE"
                    className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.token && <p className="text-xs text-red-400 mt-1">{errors.token.message}</p>}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Target / Condition</label>
                  <input
                    {...register('target')}
                    placeholder="e.g., $30.00 or >1,000,000"
                    className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.target && <p className="text-xs text-red-400 mt-1">{errors.target.message}</p>}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Notify Via</label>
                  <select
                    {...register('notifyVia')}
                    className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="in_app">In-App Only</option>
                    <option value="email">Email</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Cooldown (minutes)</label>
                  <input
                    type="number"
                    {...register('cooldown', { valueAsNumber: true })}
                    min={1}
                    max={1440}
                    className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.cooldown && <p className="text-xs text-red-400 mt-1">{errors.cooldown.message}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  <Check className="h-4 w-4 mr-1" /> {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
                <Button variant="ghost" type="button" onClick={() => { setShowCreateForm(false); reset(); }}>Cancel</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Tabs */}
      <Tabs tabs={[
        { id: 'active', label: 'Active Alerts', count: mockAlerts.filter(a => a.active).length },
        { id: 'all', label: 'All Alerts', count: mockAlerts.length },
        { id: 'history', label: 'History', count: alertHistory.length },
      ]} defaultTab="active">
        {(tabId) => (
          <div className="mt-4 space-y-3">
            {tabId === 'active' && mockAlerts.filter(a => a.active).map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      alert.type.includes('price') ? 'bg-green-500/20 text-green-400' :
                      alert.type.includes('liquidation') ? 'bg-red-500/20 text-red-400' :
                      alert.type.includes('whale') ? 'bg-blue-500/20 text-blue-400' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {alert.type.includes('price') ? <TrendingUp className="h-5 w-5" /> :
                       alert.type.includes('liquidation') ? <AlertTriangle className="h-5 w-5" /> :
                       alert.type.includes('whale') ? <Volume2 className="h-5 w-5" /> :
                       <Bell className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-semibold">{alert.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="default" className="text-[10px]">{alert.type.replace('_', ' ')}</Badge>
                        <span>{alert.token}</span>
                        <span>•</span>
                        <span>Target: {alert.target}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm">Triggered {alert.triggered}x</p>
                      <p className="text-xs text-muted-foreground">
                        Last: {alert.lastTriggered ? formatTimeAgo(alert.lastTriggered) : 'Never'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            {tabId === 'all' && mockAlerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`p-4 flex items-center justify-between hover:border-primary/30 transition-colors ${!alert.active ? 'opacity-60' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{alert.name}</p>
                        <Badge variant={alert.active ? 'success' : 'default'}>{alert.active ? 'Active' : 'Paused'}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.token} • {alert.type.replace('_', ' ')} • Target: {alert.target}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{alert.triggered} triggers</span>
                    <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </Card>
              </motion.div>
            ))}
            {tabId === 'history' && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-xs">
                        <th className="text-left py-3 px-4">Alert</th>
                        <th className="text-left py-3 px-4">Message</th>
                        <th className="text-right py-3 px-4">Time</th>
                        <th className="text-center py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alertHistory.map((h, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="py-2.5 px-4 font-semibold">{h.alertName}</td>
                          <td className="py-2.5 px-4 text-muted-foreground">{h.message}</td>
                          <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">{formatTimeAgo(h.timestamp)}</td>
                          <td className="py-2.5 px-4 text-center">
                            <Badge variant={h.dismissed ? 'default' : 'info'}>
                              {h.dismissed ? 'Read' : 'Unread'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}

import { z } from 'zod';

export const createAlertSchema = z.object({
  name: z.string().min(1, 'Alert name is required').max(50, 'Name must be under 50 characters'),
  type: z.enum([
    'price_above',
    'price_below',
    'volume_spike',
    'large_deposit',
    'large_withdraw',
    'liquidation',
    'funding_rate',
    'whale_activity',
    'validator_change',
  ]),
  token: z.string().min(1, 'Token/market is required').max(20, 'Token name too long'),
  target: z.string().min(1, 'Target value is required'),
  condition: z.string().optional(),
  notifyVia: z.enum(['in_app', 'email', 'both']),
  cooldown: z.number().min(1).max(1440),
});

export type CreateAlertFormData = z.infer<typeof createAlertSchema>;

export const delegateFormSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a positive number')
    .refine((val) => Number(val) <= 1000000000, 'Amount too large'),
  validator: z.string().min(1, 'Validator address is required'),
});

export type DelegateFormData = z.infer<typeof delegateFormSchema>;

export const searchFormSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters').max(200, 'Query too long'),
});

export type SearchFormData = z.infer<typeof searchFormSchema>;

export const supplyBorrowFormSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a positive number'),
  asset: z.string().min(1, 'Asset is required'),
  action: z.enum(['supply', 'borrow', 'withdraw', 'repay']),
});

export type SupplyBorrowFormData = z.infer<typeof supplyBorrowFormSchema>;

'use client';

import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ComposedChart
} from 'recharts';
import { Card } from '@/components/ui';

interface AreaChartComponentProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
  title?: string;
  showGrid?: boolean;
  gradient?: boolean;
}

export function AreaChartComponent({
  data, dataKey, xKey = 'name', color = '#33d6a0', height = 300,
  title, showGrid = true, gradient = true
}: AreaChartComponentProps) {
  return (
    <Card className="p-4">
      {title && <h3 className="text-sm font-semibold mb-3">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 72, 68, 0.3)" />}
          <XAxis dataKey={xKey} stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(165, 50%, 8%)',
              border: '1px solid hsl(165, 30%, 18%)',
              borderRadius: '8px',
              fontSize: 12,
            }}
          />
          {gradient && (
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
          )}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={gradient ? `url(#gradient-${dataKey})` : color}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

interface BarChartComponentProps {
  data: Array<Record<string, any>>;
  bars: Array<{ dataKey: string; color: string; name?: string }>;
  xKey?: string;
  height?: number;
  title?: string;
  stacked?: boolean;
}

export function BarChartComponent({
  data, bars, xKey = 'name', height = 300, title, stacked = false
}: BarChartComponentProps) {
  return (
    <Card className="p-4">
      {title && <h3 className="text-sm font-semibold mb-3">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 72, 68, 0.3)" />
          <XAxis dataKey={xKey} stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(165, 50%, 8%)',
              border: '1px solid hsl(165, 30%, 18%)',
              borderRadius: '8px',
              fontSize: 12,
            }}
          />
          <Legend />
          {bars.map((bar, i) => (
            <Bar key={i} dataKey={bar.dataKey} fill={bar.color} name={bar.name || bar.dataKey} stackId={stacked ? 'stack' : undefined} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

interface LineChartComponentProps {
  data: Array<Record<string, any>>;
  lines: Array<{ dataKey: string; color: string; name?: string }>;
  xKey?: string;
  height?: number;
  title?: string;
}

export function LineChartComponent({
  data, lines, xKey = 'name', height = 300, title
}: LineChartComponentProps) {
  return (
    <Card className="p-4">
      {title && <h3 className="text-sm font-semibold mb-3">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(42, 72, 68, 0.3)" />
          <XAxis dataKey={xKey} stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(165, 50%, 8%)',
              border: '1px solid hsl(165, 30%, 18%)',
              borderRadius: '8px',
              fontSize: 12,
            }}
          />
          <Legend />
          {lines.map((line, i) => (
            <Line key={i} type="monotone" dataKey={line.dataKey} stroke={line.color} name={line.name || line.dataKey} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

interface FundingHeatmapProps {
  data: Array<{ token: string; rates: number[] }>;
  labels: string[];
  height?: number;
}

export function FundingHeatmapChart({ data, labels, height = 300 }: FundingHeatmapProps) {
  const cellWidth = 60;
  const cellHeight = 32;
  const padding = 40;

  return (
    <Card className="p-4 overflow-x-auto">
      <svg width={labels.length * cellWidth + padding + 100} height={data.length * cellHeight + padding + 20}>
        <g transform={`translate(${padding + 80}, ${padding / 2})`}>
          {labels.map((label, i) => (
            <text key={i} x={i * cellWidth + cellWidth / 2} y={0} textAnchor="middle" fill="#888" fontSize={10}>
              {label}
            </text>
          ))}
          {data.map((row, rowIdx) => (
            <g key={rowIdx} transform={`translate(0, ${(rowIdx + 1) * cellHeight})`}>
              <text x={-8} y={cellHeight / 2 + 4} textAnchor="end" fill="#ccc" fontSize={11}>
                {row.token}
              </text>
              {row.rates.map((rate, colIdx) => {
                const intensity = Math.min(Math.abs(rate) / 0.1, 1);
                const color = rate >= 0
                  ? `rgba(34, 197, 94, ${intensity * 0.8})`
                  : `rgba(239, 68, 68, ${intensity * 0.8})`;
                return (
                  <g key={colIdx} transform={`translate(${colIdx * cellWidth}, 0)`}>
                    <rect width={cellWidth - 2} height={cellHeight - 2} rx={3} fill={color} />
                    <text x={cellWidth / 2 - 1} y={cellHeight / 2 + 4} textAnchor="middle" fill="#fff" fontSize={9}>
                      {(rate * 100).toFixed(3)}%
                    </text>
                  </g>
                );
              })}
            </g>
          ))}
        </g>
      </svg>
    </Card>
  );
}

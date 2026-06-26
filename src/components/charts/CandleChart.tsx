'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Shimmer } from '@/components/ui';

interface CandleChartProps {
  data: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
  symbol?: string;
  height?: number;
  showVolume?: boolean;
}

export function CandleChart({ data, symbol = 'HYPE', height = 400, showVolume = true }: CandleChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    let chart: any = null;

    const initChart = async () => {
      try {
        const { createChart, CandlestickSeries, HistogramSeries } = await import('lightweight-charts');

        chart = createChart(containerRef.current!, {
          layout: {
            background: { color: 'transparent' },
            textColor: '#888',
            fontSize: 11,
          },
          grid: {
            vertLines: { color: 'rgba(42, 72, 68, 0.3)' },
            horzLines: { color: 'rgba(42, 72, 68, 0.3)' },
          },
          crosshair: {
            mode: 0,
          },
          rightPriceScale: {
            borderColor: 'rgba(42, 72, 68, 0.5)',
          },
          timeScale: {
            borderColor: 'rgba(42, 72, 68, 0.5)',
            timeVisible: true,
          },
          width: containerRef.current!.clientWidth,
          height,
        });

        const candleSeries = chart.addSeries(CandlestickSeries, {
          upColor: '#22c55e',
          downColor: '#ef4444',
          borderUpColor: '#22c55e',
          borderDownColor: '#ef4444',
          wickUpColor: '#22c55e',
          wickDownColor: '#ef4444',
        });

        const chartData = data.map(d => ({
          time: d.time as any,
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
        }));

        candleSeries.setData(chartData);

        if (showVolume) {
          const volumeSeries = chart.addSeries(HistogramSeries, {
            color: '#33d6a0',
            priceFormat: { type: 'volume' },
            priceScaleId: '',
          });

          volumeSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.8, bottom: 0 },
          });

          const volumeData = data.map(d => ({
            time: d.time as any,
            value: d.volume,
            color: d.close >= d.open ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
          }));

          volumeSeries.setData(volumeData);
        }

        chart.timeScale().fitContent();
        setChartLoaded(true);

        const handleResize = () => {
          if (containerRef.current && chart) {
            chart.applyOptions({ width: containerRef.current.clientWidth });
          }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      } catch (error) {
        console.error('Failed to load chart:', error);
      }
    };

    const cleanup = initChart();

    return () => {
      if (chart) {
        chart.remove();
        chart = null;
      }
    };
  }, [data, height, showVolume]);

  const timeframes = ['1H', '4H', '1D', '1W', '1M'];

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{symbol}</span>
          <span className="text-muted-foreground text-xs">USD</span>
        </div>
        <div className="flex items-center gap-1">
          {timeframes.map(tf => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'primary' : 'ghost'}
              size="sm"
              className="text-xs px-2 py-0.5"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      <div ref={containerRef} style={{ height }} className="relative">
        {!chartLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50">
            <Shimmer className="h-full w-full rounded-none" />
          </div>
        )}
      </div>
    </Card>
  );
}


import { MarketPosition, TradeHistory, PortfolioStats } from './types';

export const MOCK_POSITIONS: MarketPosition[] = [
  {
    id: '1',
    marketName: 'Will ETH hit $5,000 by June 2025?',
    outcome: 'Yes',
    stake: 500,
    entryPrice: 0.45,
    currentPrice: 0.62,
    currentValue: 688.89,
    pnl: 188.89,
    pnlPercentage: 37.78,
    category: 'Crypto',
    expiryDate: '2025-06-30'
  },
  {
    id: '2',
    marketName: 'Will the Fed cut rates in Q1 2025?',
    outcome: 'No',
    stake: 1200,
    entryPrice: 0.30,
    currentPrice: 0.25,
    currentValue: 1000,
    pnl: -200,
    pnlPercentage: -16.67,
    category: 'Macro',
    expiryDate: '2025-03-31'
  },
  {
    id: '3',
    marketName: 'Super Bowl LIX: Chiefs to Win?',
    outcome: 'Yes',
    stake: 250,
    entryPrice: 0.55,
    currentPrice: 0.75,
    currentValue: 340.91,
    pnl: 90.91,
    pnlPercentage: 36.36,
    category: 'Sports',
    expiryDate: '2025-02-09'
  },
  {
    id: '4',
    marketName: 'GPT-5 Released before July 2025?',
    outcome: 'Yes',
    stake: 800,
    entryPrice: 0.20,
    currentPrice: 0.15,
    currentValue: 600,
    pnl: -200,
    pnlPercentage: -25.00,
    category: 'AI',
    expiryDate: '2025-07-01'
  }
];

export const MOCK_HISTORY: TradeHistory[] = [
  { id: 'h1', timestamp: '2024-12-01T10:00:00Z', marketName: 'BTC > $100k', type: 'Buy', outcome: 'Yes', amount: 100, price: 0.4 },
  { id: 'h2', timestamp: '2024-12-02T14:30:00Z', marketName: 'US Election Results', type: 'Sell', outcome: 'No', amount: 500, price: 0.9 },
  { id: 'h3', timestamp: '2024-12-05T09:15:00Z', marketName: 'Nvidia Earnings Q4', type: 'Buy', outcome: 'Yes', amount: 200, price: 0.6 },
];

export const MOCK_STATS: PortfolioStats = {
  totalValue: 2629.80,
  netPnl: 120.20,
  pnl24h: 45.30,
  winRate: 64.5,
  activePositions: 4,
  totalVolume: 12500,
};

export const PNL_CHART_DATA = [
  { date: '2024-11-20', pnl: 0 },
  { date: '2024-11-21', pnl: 45 },
  { date: '2024-11-22', pnl: -20 },
  { date: '2024-11-23', pnl: 15 },
  { date: '2024-11-24', pnl: 80 },
  { date: '2024-11-25', pnl: 65 },
  { date: '2024-11-26', pnl: 120 },
  { date: '2024-11-27', pnl: 150 },
  { date: '2024-11-28', pnl: 110 },
  { date: '2024-11-29', pnl: 145 },
  { date: '2024-11-30', pnl: 210 },
  { date: '2024-12-01', pnl: 180 },
];


export interface MarketPosition {
  id: string;
  marketName: string;
  outcome: 'Yes' | 'No';
  stake: number;
  entryPrice: number;
  currentPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercentage: number;
  category: string;
  expiryDate: string;
}

export interface TradeHistory {
  id: string;
  timestamp: string;
  marketName: string;
  type: 'Buy' | 'Sell';
  outcome: 'Yes' | 'No';
  amount: number;
  price: number;
}

export interface PnlHistoryPoint {
  date: string;
  pnl: number;
}

export interface PortfolioStats {
  totalValue: number;
  netPnl: number;
  pnl24h: number;
  winRate: number;
  activePositions: number;
  totalVolume: number;
}

export interface AIInsight {
  title: string;
  description: string;
  type: 'risk' | 'opportunity' | 'summary';
  riskScore: number;
}
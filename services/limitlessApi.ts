
import { MarketPosition, PortfolioStats, PnlHistoryPoint, TradeHistory } from "../types";
import { MOCK_STATS, MOCK_POSITIONS, PNL_CHART_DATA } from "../constants";

const LIMITLESS_API_BASE = "https://api.limitless.ai/mcp";

export interface WalletDataResponse {
  stats: PortfolioStats;
  positions: MarketPosition[];
  history: PnlHistoryPoint[];
  trades: TradeHistory[];
  source: 'live' | 'mock';
}

const generateMockHistory = (seed: number): PnlHistoryPoint[] => {
  const points: PnlHistoryPoint[] = [];
  const baseDate = new Date();
  let runningPnl = 0;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const change = (Math.sin(seed + i) * 80) + (Math.cos(seed * i) * 30);
    runningPnl += change;
    points.push({ date: dateStr, pnl: Math.round(runningPnl) });
  }
  return points;
};

const generateMockTrades = (seed: number, address: string): TradeHistory[] => {
  const trades: TradeHistory[] = [];
  const markets = [
    "Will ETH hit $5,000?", "Super Bowl Winners", "Fed Rate Cut Q1", 
    "GPT-5 Release Date", "Base TVL > $2B", "US Election 2024",
    "Solana Flipping ETH", "Interest Rates at 4%", "Mars Landing 2030",
    "AI Regulation Bill Pass", "World Cup 2026 Winner", "Apple Vision Pro 2 Sales"
  ];
  
  // Generate 25 trades to simulate "all markets"
  for (let i = 0; i < 25; i++) {
    const tradeSeed = seed + i;
    const date = new Date();
    date.setHours(date.getHours() - (i * 7)); // Spread over several days
    
    trades.push({
      id: `0x${Math.random().toString(16).slice(2, 10)}...${tradeSeed}`,
      timestamp: date.toISOString(),
      marketName: markets[tradeSeed % markets.length],
      type: tradeSeed % 2 === 0 ? 'Buy' : 'Sell',
      outcome: tradeSeed % 3 === 0 ? 'No' : 'Yes',
      amount: Math.round((tradeSeed % 1000) + 100),
      price: parseFloat((0.05 + (tradeSeed % 90) / 100).toFixed(2))
    });
  }
  return trades;
};

export const fetchWalletData = async (address: string): Promise<WalletDataResponse> => {
  const seed = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  try {
    const response = await fetch(LIMITLESS_API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: "get_user_portfolio",
        params: { address }
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    if (data && data.result) {
      const result = data.result;
      const stats: PortfolioStats = {
        totalValue: result.totalValue ?? result.total_value ?? result.balance ?? 0,
        netPnl: result.netPnl ?? result.net_pnl ?? result.profit ?? 0,
        pnl24h: result.pnl24h ?? result.pnl_24h ?? 0,
        winRate: result.winRate ?? result.win_rate ?? 0,
        activePositions: result.positions?.length ?? 0,
        totalVolume: result.totalVolume ?? result.total_volume ?? 0,
      };

      const positions: MarketPosition[] = (result.positions || []).map((p: any) => ({
        id: p.id || Math.random().toString(),
        marketName: p.marketName || p.market_title || "Unknown Market",
        outcome: p.outcome || "Yes",
        stake: p.stake || 0,
        entryPrice: p.entryPrice || p.avg_price || 0,
        currentPrice: p.currentPrice || p.current_price || 0,
        currentValue: p.currentValue || p.current_value || 0,
        pnl: p.pnl || 0,
        pnlPercentage: p.pnlPercentage || p.pnl_percent || 0,
        category: p.category || "General",
        expiryDate: p.expiryDate || p.expiry || "N/A"
      }));

      const history = result.history || generateMockHistory(seed);
      const trades = result.trades || generateMockTrades(seed, address);

      return { stats, positions, history, trades, source: 'live' };
    }
    throw new Error("Invalid format");
  } catch (error) {
    const variance = 0.5 + (seed % 150) / 100;
    return { 
      stats: {
        ...MOCK_STATS,
        totalValue: Math.round(MOCK_STATS.totalValue * variance),
        netPnl: Math.round(MOCK_STATS.netPnl * variance),
        winRate: Math.round(MOCK_STATS.winRate * (0.85 + (seed % 25) / 100))
      }, 
      positions: MOCK_POSITIONS.map(p => ({
        ...p,
        stake: Math.round(p.stake * variance),
        currentValue: Math.round(p.currentValue * variance),
        pnl: Math.round(p.pnl * variance)
      })),
      history: generateMockHistory(seed),
      trades: generateMockTrades(seed, address),
      source: 'mock' 
    };
  }
};

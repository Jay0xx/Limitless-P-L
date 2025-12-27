import React from 'react';
import { PortfolioStats } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target } from 'lucide-react';

interface Props {
  stats: PortfolioStats;
}

const StatsGrid: React.FC<Props> = ({ stats }) => {
  const cards = [
    {
      label: 'Net Value',
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-[#020617]" />,
      subtext: 'Asset Balance',
      accent: 'bg-[#d9f99d]',
    },
    {
      label: 'Total P&L',
      value: `$${stats.netPnl.toLocaleString()}`,
      icon: stats.netPnl >= 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-rose-400" />,
      subtext: 'Lifetime Yield',
      color: stats.netPnl >= 0 ? 'text-emerald-400' : 'text-rose-400',
      accent: 'bg-[#020617]',
    },
    {
      label: '24h Swing',
      value: `${stats.pnl24h >= 0 ? '+' : ''}$${stats.pnl24h}`,
      icon: <Activity className="w-5 h-5 text-orange-400" />,
      subtext: 'Daily Movement',
      accent: 'bg-[#020617]',
    },
    {
      label: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: <Target className="w-5 h-5 text-purple-400" />,
      subtext: 'Prediction Accuracy',
      accent: 'bg-[#020617]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="glass-panel p-6 rounded-3xl transition-all hover:scale-[1.02] hover:bg-[#0f172a] hover:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-xl ${card.accent}`}>{card.icon}</div>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{card.label}</span>
          </div>
          <div className={`text-2xl font-black tracking-tight ${card.color || 'text-white'}`}>
            {card.value}
          </div>
          <div className="text-[10px] text-slate-600 font-bold uppercase mt-1.5">{card.subtext}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
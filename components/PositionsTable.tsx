import React from 'react';
import { MarketPosition } from '../types';

interface Props {
  positions: MarketPosition[];
}

const PositionsTable: React.FC<Props> = ({ positions }) => {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
        <h3 className="text-lg font-black tracking-tight uppercase text-white">Active Contracts</h3>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{positions.length} Active</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#020617]/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="px-6 py-4 font-medium">Prediction Market</th>
              <th className="px-6 py-4 font-medium">Outcome</th>
              <th className="px-6 py-4 font-medium text-right">Stake</th>
              <th className="px-6 py-4 font-medium text-right">Value</th>
              <th className="px-6 py-4 font-medium text-right">Returns</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {positions.map((pos) => (
              <tr key={pos.id} className="hover:bg-[#d9f99d]/5 transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-[#d9f99d] transition-colors">{pos.marketName}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{pos.category}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${pos.outcome === 'Yes' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/5 text-rose-400 border-rose-500/20'}`}>
                    {pos.outcome}
                  </span>
                </td>
                <td className="px-6 py-5 text-right text-sm text-slate-400 font-mono">${pos.stake.toFixed(2)}</td>
                <td className="px-6 py-5 text-right text-sm text-white font-black font-mono">${pos.currentValue.toFixed(2)}</td>
                <td className={`px-6 py-5 text-right text-sm font-black font-mono ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                  <span className="ml-1 opacity-50 text-[10px]">({pos.pnlPercentage.toFixed(1)}%)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsTable;
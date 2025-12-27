import React from 'react';
import { TradeHistory } from '../types';
import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from 'lucide-react';

interface Props {
  trades: TradeHistory[];
}

const TradeHistoryTable: React.FC<Props> = ({ trades }) => {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
      <div className="p-6 border-b border-slate-800 bg-[#0b1222] flex items-center justify-between">
        <h3 className="text-lg font-black tracking-tight uppercase flex items-center gap-2 text-white">
          <Clock className="w-5 h-5 text-cyan-400" />
          Trade Ledger
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{trades.length} Transactions</span>
          <div className="h-4 w-px bg-slate-800"></div>
          <button className="text-[10px] font-black text-cyan-400 hover:text-cyan-300 uppercase tracking-widest transition-colors">Export CSV</button>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#020617] text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="px-6 py-4 font-medium">Time / Tx</th>
              <th className="px-6 py-4 font-medium">Market</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Outcome</th>
              <th className="px-6 py-4 font-medium text-right">Stake</th>
              <th className="px-6 py-4 font-medium text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {trades.length > 0 ? (
              trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-[#d9f99d]/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-slate-300 font-mono font-medium">
                        {new Date(trade.timestamp).toLocaleDateString()} {new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <a 
                        href={`https://basescan.org/tx/${trade.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-500 font-mono flex items-center gap-1 hover:text-[#d9f99d] transition-colors"
                      >
                        {trade.id.slice(0, 10)}... <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-100 group-hover:text-[#d9f99d] transition-colors line-clamp-1">
                        {trade.marketName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Blockchain Contract</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-1 rounded-md ${trade.type === 'Buy' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                        {trade.type === 'Buy' ? (
                          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-rose-400" />
                        )}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-wider ${trade.type === 'Buy' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trade.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${trade.outcome === 'Yes' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/5 text-rose-400 border-rose-500/20'}`}>
                      {trade.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-100 font-black font-mono">${trade.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-white font-mono font-black">{(trade.price * 100).toFixed(0)}¢</span>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Fulfillment</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <p className="italic text-slate-500 text-sm">Ledger inactive...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistoryTable;
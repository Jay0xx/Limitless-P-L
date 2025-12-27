import React from 'react';
import { Flame, ExternalLink, Globe } from 'lucide-react';

interface Market {
  name: string;
  description: string;
  sentiment: string;
  link?: string;
}

interface Props {
  markets: Market[];
  loading: boolean;
}

const TrendingMarkets: React.FC<Props> = ({ markets, loading }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 glow-cyan">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-orange-500/10 rounded-xl">
          <Flame className="w-5 h-5 text-orange-400" />
        </div>
        <h3 className="text-lg font-black tracking-tight uppercase text-white">Pulse</h3>
        <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
          <Globe className="w-3 h-3" />
          Live
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-[#020617] animate-pulse rounded-2xl border border-slate-800" />
          ))
        ) : markets.length > 0 ? (
          markets.map((market, i) => (
            <div 
              key={i} 
              onClick={() => market.link && window.open(market.link, '_blank')}
              className={`group p-4 bg-[#020617]/50 border border-slate-800/50 rounded-2xl hover:border-[#d9f99d]/30 hover:shadow-md transition-all ${market.link ? 'cursor-pointer' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-[#d9f99d] transition-colors line-clamp-1">{market.name}</h4>
                {market.link && <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-[#d9f99d]" />}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2 italic">{market.description}</p>
              <div className="flex items-center gap-2">
                 <span className="text-[9px] font-black text-white bg-cyan-600 px-2 py-0.5 rounded-full uppercase tracking-widest">Sentiment: {market.sentiment}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-slate-600 text-[10px] font-black uppercase tracking-widest italic opacity-50">Pulse inactive...</div>
        )}
      </div>
    </div>
  );
};

export default TrendingMarkets;
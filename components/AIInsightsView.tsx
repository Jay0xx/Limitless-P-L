import React from 'react';
import { AIInsight } from '../types';
import { ShieldAlert, Lightbulb, BarChart3, Sparkles } from 'lucide-react';

interface Props {
  insights: AIInsight[];
  loading: boolean;
  onRefresh: () => void;
}

const AIInsightsView: React.FC<Props> = ({ insights, loading, onRefresh }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 flex flex-col gap-6 glow-lime">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#d9f99d]/10 rounded-xl border border-[#d9f99d]/20">
            <Sparkles className="w-5 h-5 text-[#d9f99d]" />
          </div>
          <h3 className="text-lg font-black tracking-tight uppercase text-white">Alpha IQ</h3>
        </div>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-[#d9f99d] text-[#020617] hover:brightness-110 disabled:opacity-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
        >
          {loading ? 'Thinking...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-28 bg-[#020617] animate-pulse rounded-2xl border border-slate-800" />
          ))
        ) : insights.length > 0 ? (
          insights.map((insight, i) => (
            <div key={i} className="p-5 bg-[#0f172a]/30 border border-slate-800 rounded-2xl flex gap-4 hover:border-[#d9f99d]/30 transition-all group">
              <div className="mt-1">
                {insight.type === 'risk' && <ShieldAlert className="w-6 h-6 text-rose-500" />}
                {insight.type === 'opportunity' && <Lightbulb className="w-6 h-6 text-[#d9f99d]" />}
                {insight.type === 'summary' && <BarChart3 className="w-6 h-6 text-blue-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-black text-slate-100 text-[13px] uppercase tracking-tight">{insight.title}</h4>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{insight.riskScore}% Confidence</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 font-medium">{insight.description}</p>
                <div className="mt-3 h-1.5 w-full bg-[#020617] rounded-full overflow-hidden">
                   <div 
                    className="h-full bg-[#d9f99d] shadow-[0_0_8px_rgba(217,249,157,0.3)] transition-all duration-1000" 
                    style={{ width: `${insight.riskScore}%` }}
                   />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest opacity-50">
            Scanning ledger...
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsView;
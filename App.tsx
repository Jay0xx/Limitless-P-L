import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  Search,
  Menu,
  RefreshCw,
  Copy,
  Zap
} from 'lucide-react';
import { MOCK_STATS, MOCK_POSITIONS, PNL_CHART_DATA, MOCK_HISTORY } from './constants';
import { MarketPosition, PortfolioStats, PnlHistoryPoint, TradeHistory } from './types';
import { fetchWalletData } from './services/limitlessApi';
import StatsGrid from './components/StatsGrid';
import PnLChart from './components/PnLChart';
import PositionsTable from './components/PositionsTable';
import TradeHistoryTable from './components/TradeHistoryTable';

const LimitlessLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4V20" />
    <path d="M4 12H20" />
    <path d="M8 8L16 16" />
    <path d="M15 9L9 15" />
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAddress, setCurrentAddress] = useState('0x71C...4E32');
  const [fullAddress, setFullAddress] = useState('0x71C1234567890abcdef1234567890abcdef1234E32');
  const [isSearching, setIsSearching] = useState(false);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');

  const [stats, setStats] = useState<PortfolioStats>(MOCK_STATS);
  const [positions, setPositions] = useState<MarketPosition[]>(MOCK_POSITIONS);
  const [pnlHistory, setPnlHistory] = useState<PnlHistoryPoint[]>(PNL_CHART_DATA);
  const [trades, setTrades] = useState<TradeHistory[]>(MOCK_HISTORY);

  const refreshData = async (addressToFetch: string = fullAddress) => {
    setLoading(true);
    try {
      const liveData = await fetchWalletData(addressToFetch);
      setStats(liveData.stats);
      setPositions(liveData.positions);
      setPnlHistory(liveData.history);
      setTrades(liveData.trades);
      setDataSource(liveData.source);
    } catch (e) {
      console.error("Error refreshing dashboard data:", e);
    }
    setLoading(false);
  };

  const handleAddressLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query.startsWith('0x') && !query.includes('.eth')) return;

    setIsSearching(true);
    const displayAddr = query.length > 12 ? query.slice(0, 6) + '...' + query.slice(-4) : query;
    setCurrentAddress(displayAddr);
    setFullAddress(query);
    await refreshData(query);
    setIsSearching(false);
    setSearchQuery('');
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="h-screen flex bg-[#020617] text-slate-100">
      {/* Sidebar - Solid Midnight */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/50 p-6 bg-[#020617] z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#d9f99d] rounded-xl flex items-center justify-center shadow-lg shadow-[#d9f99d]/10">
            <LimitlessLogo className="w-6 h-6 text-[#020617]" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">Limitless</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'history', icon: History, label: 'Trade History' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#0b1222] border border-slate-800 text-[#d9f99d] font-bold shadow-[0_0_15px_rgba(217,249,157,0.05)]' : 'text-slate-500 hover:text-slate-300 hover:bg-[#0b1222]/50'}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800/50 mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-300 transition-all font-medium">
            <Settings className="w-4 h-4" />
            Preferences
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-[#020617]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 md:px-8 border-b border-slate-800/50 bg-[#020617]/90 backdrop-blur-xl">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-4 lg:hidden">
              <Menu className="w-6 h-6 text-slate-400" />
              <LimitlessLogo className="w-8 h-8 text-[#d9f99d]" />
            </div>

            <div className="hidden lg:flex items-center gap-8 w-full">
              <div className="flex items-center gap-3 min-w-fit text-[#d9f99d]">
                <LimitlessLogo className="w-8 h-8 drop-shadow-[0_0_8px_rgba(217,249,157,0.1)]" />
                <span className="text-lg font-black tracking-tighter text-white uppercase">limitless</span>
              </div>
              
              <form onSubmit={handleAddressLookup} className="flex-1 max-w-xl">
                <div className="flex items-center bg-[#0b1222] border border-slate-800 rounded-xl px-5 py-2 transition-all group focus-within:ring-2 focus-within:ring-[#d9f99d]/10 focus-within:border-[#d9f99d]/20">
                  <Search className={`w-4 h-4 mr-3 transition-colors ${isSearching ? 'text-[#d9f99d] animate-pulse' : 'text-slate-500'}`} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search address or ENS..." 
                    className="bg-transparent border-none outline-none text-sm w-full text-slate-100 placeholder:text-slate-600 font-semibold"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={() => refreshData()}
              className={`p-2.5 text-slate-500 hover:text-[#d9f99d] transition-all ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-800"></div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md bg-[#d9f99d]/10 text-[#d9f99d] text-[10px] font-black uppercase tracking-widest border border-[#d9f99d]/30">Active Pulse</span>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${dataSource === 'live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {dataSource === 'live' ? 'Live Chain' : 'Mock Snapshot'}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black tracking-tight flex flex-wrap items-center gap-3">
                Portfolio <span className="text-slate-600 font-light">for</span> 
                <span className="bg-[#0b1222] px-4 py-1.5 rounded-2xl border border-slate-800 text-xl md:text-3xl font-mono text-[#d9f99d] flex items-center gap-3 group">
                  {currentAddress}
                  <button onClick={() => navigator.clipboard.writeText(fullAddress)} className="p-1 hover:text-white transition-colors"><Copy className="w-4 h-4 opacity-40 hover:opacity-100" /></button>
                </span>
              </h1>
            </div>
          </div>

          <StatsGrid stats={stats} />

          {activeTab === 'dashboard' ? (
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-8">
                <div className="glass-panel p-6 md:p-8 rounded-3xl glow-lime">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-black tracking-tight uppercase text-white">Alpha Curve</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Portfolio growth trajectory</p>
                    </div>
                    <div className="flex bg-[#020617] border border-slate-800 rounded-xl p-1">
                      {['1D', '1W', '1M', 'ALL'].map(t => (
                        <button key={t} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${t === '1M' ? 'bg-[#d9f99d] text-[#020617]' : 'text-slate-500 hover:text-slate-300'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <PnLChart data={pnlHistory} theme="dark" />
                </div>

                <PositionsTable positions={positions} />
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <TradeHistoryTable trades={trades} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
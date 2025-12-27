
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { PnlHistoryPoint } from '../types';

interface Props {
  data: PnlHistoryPoint[];
  theme: 'dark' | 'light';
}

const PnLChart: React.FC<Props> = ({ data, theme }) => {
  const isDark = theme === 'dark';
  const brandColor = "#d9f99d"; // Signature Lime
  const gridColor = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)";
  const labelColor = isDark ? "#64748b" : "#94a3b8";

  return (
    <div className="h-[320px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brandColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={brandColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0 0" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke={labelColor} 
            fontSize={9} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(str) => {
              const parts = str.split('-');
              return parts.length > 2 ? `${parts[1]}/${parts[2]}` : str;
            }}
          />
          <YAxis 
            stroke={labelColor} 
            fontSize={9} 
            tickLine={false} 
            axisLine={false}
            orientation="right"
            tickFormatter={(val) => `$${Math.abs(val) > 999 ? (val/1000).toFixed(1) + 'k' : val}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#020617' : '#ffffff', 
              border: `1px solid ${isDark ? 'rgba(217,249,157,0.1)' : '#e2e8f0'}`, 
              borderRadius: '16px', 
              padding: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' 
            }}
            itemStyle={{ color: brandColor, fontWeight: '800', fontSize: '14px' }}
            labelStyle={{ color: labelColor, fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}
            cursor={{ stroke: brandColor, strokeWidth: 1.5, strokeDasharray: '5 5' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
          />
          <Area 
            type="monotone" 
            dataKey="pnl" 
            stroke={brandColor} 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorPnl)" 
            animationDuration={2000}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PnLChart;

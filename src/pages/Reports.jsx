import { useSelector, useDispatch } from 'react-redux';
import { setDateRange, setActiveTab } from '../features/reports/reportsSlice';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Download, FileText, TrendingUp, Users, Building2, CreditCard } from 'lucide-react';
import { propertyTypeData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-border rounded-lg shadow-card p-3 text-xs">
        <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="flex items-center gap-1.5 mb-0.5" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-sm inline-block flex-shrink-0" style={{ background: p.color }} />
            {p.name}: <span className="font-medium text-slate-700">₹{(p.value / 1000).toFixed(0)}K</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const dateRanges = ['3months', '6months', '1year'];
const tabs = [
  { key: 'revenue', label: 'Revenue', icon: CreditCard },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'properties', label: 'Properties', icon: Building2 },
];

export default function Reports() {
  const dispatch = useDispatch();
  const { revenueReport, dateRange, activeTab } = useSelector(s => s.reports);
  const { userGrowthData } = useSelector(s => s.dashboard);

  const summaryCards = [
    { label: 'Total Revenue (6M)', value: '₹43.5L', change: '+18.2%', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'New Users (6M)', value: '6,342', change: '+22.1%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Properties Listed', value: '18,290', change: '+12.4%', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'New Subscriptions', value: '840', change: '+9.8%', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50' },
  ]
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Enterprise Analytics</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium flex items-center gap-2">
            Platform Performance Metrics <span className="w-1 h-1 rounded-full bg-slate-300" /> Real-time Data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-50 p-1 rounded-md gap-1 border border-slate-100">
            {dateRanges.map(r => (
              <button
                key={r}
                onClick={() => dispatch(setDateRange(r))}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${dateRange === r ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {{ '3months': '3M', '6months': '6M', '1year': '1Y' }[r]}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <FileText size={14} className="text-primary" /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm group hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-md ${card.bg} flex items-center justify-center ${card.color} transition-transform`}>
                  <Icon size={20} />
                </div>
                <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {card.change}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tab selector */}
      <div className="flex gap-1.5 p-1 bg-slate-100/50 rounded-lg w-fit border border-slate-200/50">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => dispatch(setActiveTab(tab.key))}
              className={`flex items-center gap-2 px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === tab.key
                ? 'bg-white shadow-sm text-primary border border-slate-100'
                : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CreditCard size={16} className="text-primary" /> Revenue Trajectory
              </h3>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                <TrendingUp size={12} /> +18% Momentum
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueReport || []} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                  <Bar dataKey="basic" name="Basic" fill="#94A3B8" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="standard" name="Standard" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="premium" name="Premium" fill="#2E353A" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-8">Split Distribution</h3>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Basic', value: 620000, color: '#94A3B8' },
                      { name: 'Standard', value: 963000, color: '#F59E0B' },
                      { name: 'Premium', value: 1175000, color: '#2E353A' },
                    ]}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={85}
                    paddingAngle={6} dataKey="value"
                  >
                    {[{ color: '#94A3B8' }, { color: '#F59E0B' }, { color: '#2E353A' }].map((e, i) => (
                      <Cell key={i} fill={e.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`₹${(v / 100000).toFixed(2)}L`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-6">
              {[{ name: 'Basic', color: '#94A3B8' }, { name: 'Standard', color: '#F59E0B' }, { name: 'Premium', color: '#2E353A' }].map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.name} Segment</span>
                  </div>
                  <div className="h-px flex-1 mx-4 bg-slate-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users size={16} className="text-blue-500" /> User Acquisition Trend
            </h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={userGrowthData || []} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E353A" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2E353A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} dx={-10} />
                <Tooltip cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="users" name="Total Users" stroke="#2E353A" strokeWidth={2.5} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="newUsers" name="New Users" stroke="#F59E0B" strokeWidth={2.5} fill="url(#colorNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-8">Asset Class Allocation</h3>
            <div className="aspect-square w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={propertyTypeData || []} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={6} dataKey="value">
                    {propertyTypeData.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col justify-center">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-8">Distribution Matrix</h3>
            <div className="space-y-5">
              {propertyTypeData.map(d => {
                const total = propertyTypeData.reduce((a, x) => a + x.value, 0);
                const pct = Math.round((d.value / total) * 100);
                return (
                  <div key={d.name} className="group">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">{d.value.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-slate-400">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div className="h-full rounded-full transition-all duration-1000 group-hover:opacity-80" style={{ width: `${pct}%`, background: d.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

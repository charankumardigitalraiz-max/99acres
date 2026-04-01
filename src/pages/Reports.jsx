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
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Reports & Analytics</h2>
          <p className="section-subtitle">Platform performance overview</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date Range */}
          <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
            {dateRanges.map(r => (
              <button
                key={r}
                onClick={() => dispatch(setDateRange(r))}
                className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all ${dateRange === r ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
              >
                {{ '3months': '3M', '6months': '6M', '1year': '1Y' }[r]}
              </button>
            ))}
          </div>
          <button className="btn-secondary">
            <FileText size={13} /> Export PDF
          </button>
          <button className="btn-primary">
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 mb-1">{card.label}</p>
                  <p className="text-lg font-semibold text-slate-800">{card.value}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">{card.change} vs prev period</p>
                </div>
                <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} className={card.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab selector */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => dispatch(setActiveTab(tab.key))}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'}`}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="card xl:col-span-2">
            <div className="card-header">
              <div>
                <p className="section-title">Revenue by Plan</p>
                <p className="section-subtitle">Monthly breakdown across subscription tiers</p>
              </div>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueReport} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                  <Bar dataKey="basic" name="Basic" fill="#94A3B8" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="standard" name="Standard" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="premium" name="Premium" fill="#2E353A" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <p className="section-title">Revenue Split</p>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Basic', value: 620000, color: '#94A3B8' },
                      { name: 'Standard', value: 963000, color: '#F59E0B' },
                      { name: 'Premium', value: 1175000, color: '#2E353A' },
                    ]}
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={72}
                    paddingAngle={3} dataKey="value"
                  >
                    {[{ color: '#94A3B8' }, { color: '#F59E0B' }, { color: '#2E353A' }].map((e, i) => (
                      <Cell key={i} fill={e.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`₹${(v / 100000).toFixed(2)}L`, '']} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="card">
          <div className="card-header">
            <p className="section-title">User Growth Trend</p>
            <p className="section-subtitle">Total users vs new registrations</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={userGrowthData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E353A" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#2E353A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Area type="monotone" dataKey="users" name="Total Users" stroke="#2E353A" strokeWidth={2} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="newUsers" name="New Users" stroke="#F59E0B" strokeWidth={2} fill="url(#colorNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="card">
            <div className="card-header">
              <p className="section-title">Listings by Type</p>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={propertyTypeData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                    {propertyTypeData.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <p className="section-title">Property Type Breakdown</p>
            </div>
            <div className="p-4 space-y-3">
              {propertyTypeData.map(d => {
                const total = propertyTypeData.reduce((a, x) => a + x.value, 0);
                const pct = Math.round((d.value / total) * 100);
                return (
                  <div key={d.name}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-xs text-slate-700 font-medium">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-800">{d.value.toLocaleString()}</span>
                        <span className="text-2xs text-slate-400">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: d.color }} />
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

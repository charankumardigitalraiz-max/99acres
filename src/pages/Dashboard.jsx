import { useSelector } from 'react-redux';
import StatCard from '../components/ui/StatCard';
import RevenueChart from '../components/charts/RevenueChart';
import UserGrowthChart from '../components/charts/UserGrowthChart';
import SubscriptionPieChart from '../components/charts/SubscriptionPieChart';
import Avatar from '../components/ui/Avatar';
import { TrendingUp, Users, Building2, Star, Clock, ArrowUpRight, IndianRupee, MapPin } from 'lucide-react';
import { subscriptionPieData } from '../data/mockData';

const activityIcons = {
  new_user: { icon: Users, bg: 'bg-blue-50', text: 'text-blue-500' },
  subscription: { icon: Star, bg: 'bg-amber-50', text: 'text-amber-500' },
  property: { icon: Building2, bg: 'bg-emerald-50', text: 'text-emerald-500' },
};

export default function Dashboard() {
  const { kpis, revenueData, userGrowthData, recentActivity, topCities } = useSelector(s => s.dashboard);

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Dashboard Overview</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Live analytics and marketplace synthesis telemetry</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SYSTEM: OPERATIONAL
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(kpi => <StatCard key={kpi.id} {...kpi} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col hover:border-primary/20 transition-all">
          <div className="px-6 py-4 bg-white border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue Synthesis</h3>
              <p className="text-lg font-bold text-slate-900 mt-0.5 leading-none">Market Performance</p>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
              <TrendingUp size={12} /> +3.7% Momentum
            </div>
          </div>
          <div className="p-6 flex-1">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        {/* Subscription Breakdown */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-primary/20 transition-all">
          <div className="px-6 py-4 bg-white border-b border-slate-50">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tier Distribution</h3>
            <p className="text-lg font-bold text-slate-900 mt-0.5 leading-none">Subscription Plans</p>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center">
            <SubscriptionPieChart data={subscriptionPieData} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-primary/20 transition-all">
          <div className="px-6 py-4 bg-white border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Event Stream</h3>
              <p className="text-sm font-bold text-slate-900 mt-1.5 leading-none">Recent Activity</p>
            </div>
            <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">Full Log</button>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[380px] custom-scrollbar">
            {recentActivity.map(item => {
              const config = activityIcons[item.type] || activityIcons.new_user;
              const Icon = config.icon;
              return (
                <div key={item.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-all group">
                  <div className={`w-8 h-8 rounded-md ${config.bg} ${config.text} border border-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-slate-700 leading-snug mb-1 group-hover:text-slate-900 transition-colors">{item.message}</p>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <Clock size={10} className="text-slate-400" />
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden lg:col-span-2 hover:border-primary/20 transition-all">
          <div className="px-6 py-4 bg-white border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Geospatial Data</h3>
              <p className="text-sm font-bold text-slate-900 mt-1.5 leading-none">Market Concentration</p>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider hover:text-primary-600 transition-colors">
              DETAILED REPORT <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30 border-b border-slate-50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Momentum</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Penetration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topCities.map((city, i) => {
                  const maxListings = Math.max(...topCities.map(c => c.listings));
                  const pct = Math.round((city.listings / maxListings) * 100);
                  return (
                    <tr key={city.city} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-slate-200 tabular-nums">0{i + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center p-1 group-hover:scale-110 transition-all">
                            <Building2 size={14} className="text-slate-300" />
                          </div>
                          <span className="text-[13px] font-bold text-slate-700 group-hover:text-primary transition-colors">{city.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-600 tabular-nums">{city.listings.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">{city.revenue}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{city.growth}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[80px]">
                            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 tabular-nums">{(pct * 0.4).toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
}

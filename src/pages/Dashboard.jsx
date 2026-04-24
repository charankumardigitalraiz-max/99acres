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
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-normal mb-1.5">
            <span>Admin</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-primary/80">Overview</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-normal">Live Updates</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-normal">Update: 12:45</span>
          </div>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => <StatCard key={kpi.id} {...kpi} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-normal  flex items-center gap-3">
                <IndianRupee size={16} className="text-primary" /> Revenue Summary
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-normal border border-emerald-100 shadow-sm">
              <TrendingUp size={12} /> +3.7% Growth
            </div>
          </div>
          <div className="p-6 flex-1">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        {/* Subscription Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 bg-white border-b border-slate-200">
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-normal flex items-center gap-3">
              <Star size={16} className="text-amber-500" /> Subscription Plans
            </h3>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center">
            <SubscriptionPieChart data={subscriptionPieData} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      {/* User Growth */}
      {/* <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="px-6 py-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-normal flex items-center gap-3">
              <Users size={16} className="text-blue-500" /> User Growth
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-normal">Total Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-0.5 bg-primary rounded-full" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-normal">New Users</span>
              </div>
            </div>
          </div>
          <div className="p-6 flex-1">
            <UserGrowthChart data={userGrowthData} />
          </div>
        </div> */}
      {/* Bottom Row - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-normal flex items-center gap-3">
              <Clock size={16} className="text-slate-500" /> Recent Activity
            </h3>
            <button className="text-[9px] font-bold text-primary uppercase tracking-normal hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50 overflow-y-auto max-h-[350px]">
            {recentActivity.map(item => {
              const config = activityIcons[item.type] || activityIcons.new_user;
              const Icon = config.icon;
              return (
                <div key={item.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-all group">
                  <div className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={12} className={config.text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-slate-700 leading-tight mb-1">{item.message}</p>
                    <div className="flex items-center gap-1.5">
                      <Clock size={10} className="text-slate-300" />
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-normal tabular-nums">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-normal flex items-center gap-3">
              <MapPin size={16} className="text-rose-500" /> Top Cities
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-bold uppercase tracking-normal text-slate-500 hover:shadow-md transition-all active:scale-95">
              <ArrowUpRight size={12} className="text-primary" /> View Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-normal">#</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-normal">City</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-normal">Active Listings</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-normal">Revenue</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-normal">Trend</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-normal">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topCities.map((city, i) => {
                  const maxListings = Math.max(...topCities.map(c => c.listings));
                  const pct = Math.round((city.listings / maxListings) * 100);
                  return (
                    <tr key={city.city} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-slate-300 italic tabular-nums">#0{i + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-100 flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                            <Building2 size={14} className="text-slate-400" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">{city.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600 tabular-nums">{city.listings.toLocaleString()}</td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-900 tabular-nums">{city.revenue}</td>
                      <td className="px-6 py-4">
                        <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-normal bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shadow-sm">{city.growth}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[80px] shadow-inner">
                            <div className="h-full bg-primary rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${pct}%` }} />
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

import { useSelector } from 'react-redux';
import StatCard from '../components/ui/StatCard';
import RevenueChart from '../components/charts/RevenueChart';
import UserGrowthChart from '../components/charts/UserGrowthChart';
import SubscriptionPieChart from '../components/charts/SubscriptionPieChart';
import Avatar from '../components/ui/Avatar';
import { TrendingUp, Users, Building2, Star, Clock, ArrowUpRight } from 'lucide-react';
import { subscriptionPieData } from '../data/mockData';

const activityIcons = {
  new_user: { icon: Users, bg: 'bg-blue-50', text: 'text-blue-500' },
  subscription: { icon: Star, bg: 'bg-amber-50', text: 'text-amber-500' },
  property: { icon: Building2, bg: 'bg-emerald-50', text: 'text-emerald-500' },
};

export default function Dashboard() {
  const { kpis, revenueData, userGrowthData, recentActivity, topCities } = useSelector(s => s.dashboard);

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(kpi => <StatCard key={kpi.id} {...kpi} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="card xl:col-span-2">
          <div className="card-header">
            <div>
              <p className="section-title">Revenue Overview</p>
              <p className="section-subtitle">Monthly revenue trend</p>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <TrendingUp size={12} />
              <span className="text-xs font-medium">+3.7%</span>
            </div>
          </div>
          <div className="card-body">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        {/* Subscription Breakdown */}
        <div className="card">
          <div className="card-header">
            <div>
              <p className="section-title">Subscriptions</p>
              <p className="section-subtitle">Plan distribution</p>
            </div>
          </div>
          <div className="card-body">
            <SubscriptionPieChart data={subscriptionPieData} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* User Growth */}
        <div className="card xl:col-span-2">
          <div className="card-header">
            <div>
              <p className="section-title">User Growth</p>
              <p className="section-subtitle">Total vs new registrations</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-0.5 bg-dark-500 rounded" />
                <span className="text-slate-500">Total</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-0.5 bg-primary border-dashed rounded" style={{ borderTop: '2px dashed #F59E0B', background: 'none' }} />
                <span className="text-slate-500">New</span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <UserGrowthChart data={userGrowthData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Recent Activity</p>
            <button className="text-xs text-primary hover:underline font-medium">View all</button>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map(item => {
              const config = activityIcons[item.type] || activityIcons.new_user;
              const Icon = config.icon;
              return (
                <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50/60 transition-colors">
                  <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={13} className={config.text} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-snug">{item.message}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={9} className="text-slate-400" />
                      <span className="text-2xs text-slate-400">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Cities */}
      <div className="card">
        <div className="card-header">
          <p className="section-title">Top Performing Cities</p>
          <button className="btn-ghost text-xs">
            <ArrowUpRight size={13} />
            View Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>City</th>
                <th>Active Listings</th>
                <th>Revenue</th>
                <th>Growth</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map((city, i) => {
                const maxListings = Math.max(...topCities.map(c => c.listings));
                const pct = Math.round((city.listings / maxListings) * 100);
                return (
                  <tr key={city.city}>
                    <td className="text-slate-400 font-medium">{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building2 size={11} className="text-primary" />
                        </div>
                        <span className="font-medium text-slate-800">{city.city}</span>
                      </div>
                    </td>
                    <td>{city.listings.toLocaleString()}</td>
                    <td className="font-medium text-slate-800">{city.revenue}</td>
                    <td>
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{city.growth}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-20">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-2xs text-slate-400">{pct}%</span>
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
  );
}

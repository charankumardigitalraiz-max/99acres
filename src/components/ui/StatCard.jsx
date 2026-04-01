import { TrendingUp, TrendingDown, Users, Star, Building2, IndianRupee, BarChart3 } from 'lucide-react';

const iconMap = {
  users: Users,
  star: Star,
  building: Building2,
  rupee: IndianRupee,
  chart: BarChart3,
};

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-500', border: 'border-amber-100' },
  green: { bg: 'bg-emerald-50', icon: 'text-emerald-500', border: 'border-emerald-100' },
  purple: { bg: 'bg-violet-50', icon: 'text-violet-500', border: 'border-violet-100' },
};

export default function StatCard({ label, value, change, trend, icon, color = 'blue' }) {
  const Icon = iconMap[icon] || BarChart3;
  const colors = colorMap[color];
  const isUp = trend === 'up';

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 mb-1.5">{label}</p>
          <p className="text-xl font-semibold text-slate-800">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0`}>
          <Icon size={16} className={colors.icon} />
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1 mt-2.5">
          {isUp
            ? <TrendingUp size={12} className="text-emerald-500" />
            : <TrendingDown size={12} className="text-red-400" />}
          <span className={`text-2xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>{change}</span>
          <span className="text-2xs text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  );
}

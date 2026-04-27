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
  const colors = colorMap[color] || colorMap.blue;
  const isUp = trend === 'up';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:border-primary/30 transition-all duration-300 cursor-default group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <div className={`w-8 h-8 rounded-md ${colors.bg} ${colors.icon} border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none">{value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            {change && (
              <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${isUp ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {change}
              </span>
            )}
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">vs last cycle</span>
          </div>
        </div>
      </div>
    </div>
  );
}

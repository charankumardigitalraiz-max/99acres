import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPlanFilter, setStatusFilter, setSearch,
  selectFilteredSubscribers, setTypeFilter
} from '../features/subscriptions/subscriptionsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import SubscriptionPieChart from '../components/charts/SubscriptionPieChart';
import { Search, Download, RefreshCw, AlertCircle, Users, ShieldCheck, CheckCircle, Shield, ChevronDown } from 'lucide-react';
import Select from '../components/ui/Select';
import { subscriptionPieData } from '../data/mockData';

const plans = ['All', 'Basic', 'Standard', 'Premium'];
const types = ['All', 'Agent', 'Seller'];
const statuses = ['All', 'Active', 'Expired'];

export default function Subscribers() {
  const dispatch = useDispatch();
  const { planFilter, statusFilter, typeFilter, searchQuery } = useSelector(s => s.subscriptions);
  const filtered = useSelector(selectFilteredSubscribers);

  // Expiring soon (within 30 days simulation)
  const expiringSoon = filtered.filter(s => s.status === 'Active' && !s.autoRenew);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Active Subscribers</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Monitor customer subscription lifecycles and revenue</p>
        </div>
        <div className="flex items-center gap-2">
          {expiringSoon.length > 0 && (
            <div className="px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-md flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{expiringSoon.length} Critical Renewals</span>
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={14} className="text-primary" /> Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Agents', value: filtered.filter(s => s.type === 'agent').length, icon: Users, color: 'primary' },
          { label: 'Sellers', value: filtered.filter(s => s.type === 'seller').length, icon: ShieldCheck, color: 'blue' },
          { label: 'Active Plans', value: filtered.filter(s => s.status === 'Active').length, icon: CheckCircle, color: 'emerald' },
          { label: 'Auto Renewing', value: filtered.filter(s => s.autoRenew).length, icon: RefreshCw, color: 'violet' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400`}>
                {s.icon ? <s.icon size={18} /> : <Users size={18} />}
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LHS: Table Container */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Search Customers</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-md outline-none focus:border-primary transition-all"
                  placeholder="Name or email..."
                  value={searchQuery}
                  onChange={e => dispatch(setSearch(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200">
              {plans.map(p => (
                <button
                  key={p}
                  onClick={() => dispatch(setPlanFilter(p))}
                  className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${planFilter === p ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="w-32">
              <Select
                label="Status"
                value={statusFilter}
                onChange={e => dispatch(setStatusFilter(e.target.value))}
                options={statuses}
                placeholder={null}
              />
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Shield size={16} className="text-primary" /> Subscription List
              </h3>
              <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Real-time
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr className="bg-slate-50/30 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subscribed</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Renewal</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(sub => (
                    <tr key={sub.id} className="group hover:bg-slate-50/30 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                            {sub.name.substring(0, 1)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors leading-none">{sub.name}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 tabular-nums">#SUB-{sub.id.toString().padStart(4, '0')}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-200" />
                              <span className="text-[10px] font-medium text-slate-400">{sub.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${sub.plan === 'Premium' ? 'bg-purple-50 text-purple-600 border-purple-100' : sub.plan === 'Standard' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {sub.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-700 tabular-nums">{sub.startDate}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-1">Exp: {sub.expiry}</p>
                      </td>
                      <td className="px-6 py-4 tabular-nums">
                        <div className="font-bold text-slate-900 text-sm">{sub.amount}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${sub.autoRenew ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          {sub.autoRenew ? 'Auto' : 'Manual'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-md bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-400 transition-all shadow-sm">
                          <RefreshCw size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RHS: Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Tier Allocation</h3>
            <div className="aspect-square w-full">
              <SubscriptionPieChart data={subscriptionPieData} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-500" /> Expiring Soon
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">{expiringSoon.length}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {expiringSoon.length === 0 && (
                <p className="text-xs text-slate-400 p-8 text-center font-medium">No expiring subscriptions</p>
              )}
              {expiringSoon.map(s => (
                <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{s.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1">{s.plan} · {s.expiry}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-900 text-white rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-sm">Alert</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


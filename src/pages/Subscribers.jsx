import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPlanFilter, setStatusFilter, setSearch,
  selectFilteredSubscribers, setTypeFilter
} from '../features/subscriptions/subscriptionsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import SubscriptionPieChart from '../components/charts/SubscriptionPieChart';
import { Search, Download, RefreshCw, AlertCircle } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Subscribers</h2>
          <p className="section-subtitle">{filtered.length} total subscribers matching filters</p>
        </div>
        <div className="flex items-center gap-2">
          {expiringSoon.length > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-medium">
              <AlertCircle size={13} />
              {expiringSoon.length} renewals due
            </div>
          )}
          <button className="btn-secondary">
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Agent Subs', value: filtered.filter(s => s.type === 'agent').length, color: 'text-slate-800' },
          { label: 'Seller Subs', value: filtered.filter(s => s.type === 'seller').length, color: 'text-slate-800' },
          { label: 'Active', value: filtered.filter(s => s.status === 'Active').length, color: 'text-emerald-600' },
          { label: 'Auto-Renew On', value: filtered.filter(s => s.autoRenew).length, color: 'text-primary' },
        ].map(stat => (
          <div key={stat.label} className="stat-card text-center hover-lift">
            <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Filters + Table */}
        <div className="xl:col-span-2 space-y-4">
          {/* Filter Bar */}
          <div className="card card-body flex flex-wrap gap-4 items-center glass-card shadow-premium">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="form-input pl-10"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={e => dispatch(setSearch(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Type</span>
              <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => dispatch(setTypeFilter(t))}
                    className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${typeFilter === t ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Tier</span>
              <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
                {plans.map(p => (
                  <button
                    key={p}
                    onClick={() => dispatch(setPlanFilter(p))}
                    className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${planFilter === p ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Status</span>
              <select
                className="form-input w-auto text-xs font-bold bg-slate-100 border-none"
                value={statusFilter}
                onChange={e => dispatch(setStatusFilter(e.target.value))}
              >
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subscriber</th>
                    <th>Plan</th>
                    <th>Start Date</th>
                    <th>Expiry</th>
                    <th>Amount</th>
                    <th>Auto-Renew</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(sub => (
                    <tr key={sub.id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <Avatar initials={sub.name.split(' ').map(n => n[0]).join('')} size="sm" />
                          <div>
                            <p className="font-medium text-slate-800 text-xs">{sub.name}</p>
                            <p className="text-2xs text-slate-400">{sub.email}</p>
                          </div>
                        </div>
                      </td>
                      <td><Badge>{sub.plan}</Badge></td>
                      <td className="text-slate-500 text-xs">{sub.startDate}</td>
                      <td className="text-slate-500 text-xs">{sub.expiry}</td>
                      <td className="font-medium text-slate-800">{sub.amount}</td>
                      <td>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sub.autoRenew ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {sub.autoRenew ? 'On' : 'Off'}
                        </span>
                      </td>
                      <td><Badge>{sub.status}</Badge></td>
                      <td>
                        <button className="btn-ghost py-1 px-2 text-xs gap-1">
                          <RefreshCw size={11} /> Renew
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-slate-400 text-sm">No subscribers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Plan Chart */}
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <p className="section-title">Plan Distribution</p>
            </div>
            <div className="card-body">
              <SubscriptionPieChart data={subscriptionPieData} />
            </div>
          </div>

          {/* Renewal Reminders */}
          <div className="card">
            <div className="card-header">
              <p className="section-title">Renewal Reminders</p>
              <span className="badge badge-amber">{expiringSoon.length} due</span>
            </div>
            <div className="divide-y divide-border">
              {expiringSoon.length === 0 && (
                <p className="text-xs text-slate-400 p-4">All subscribers have auto-renew enabled.</p>
              )}
              {expiringSoon.map(s => (
                <div key={s.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-800">{s.name}</p>
                    <p className="text-2xs text-slate-400">{s.plan} · Expires {s.expiry}</p>
                  </div>
                  <button className="text-2xs btn-primary py-1 px-2.5">Remind</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

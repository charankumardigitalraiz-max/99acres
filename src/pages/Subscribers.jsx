import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPlanFilter, setStatusFilter, setSearch,
  selectFilteredSubscribers
} from '../features/subscriptions/subscriptionsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import SubscriptionPieChart from '../components/charts/SubscriptionPieChart';
import { Search, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { subscriptionPieData } from '../data/mockData';

const plans = ['All', 'Basic', 'Standard', 'Premium'];
const statuses = ['All', 'Active', 'Expired'];

export default function Subscribers() {
  const dispatch = useDispatch();
  const { planFilter, statusFilter, searchQuery } = useSelector(s => s.subscriptions);
  const filtered = useSelector(selectFilteredSubscribers);

  // Expiring soon (within 30 days simulation)
  const expiringSoon = filtered.filter(s => s.status === 'Active' && !s.autoRenew);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Subscribers</h2>
          <p className="section-subtitle">{filtered.length} total subscribers</p>
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
          { label: 'Total Subscribers', value: filtered.length, color: 'text-slate-800' },
          { label: 'Active', value: filtered.filter(s => s.status === 'Active').length, color: 'text-emerald-600' },
          { label: 'Expired', value: filtered.filter(s => s.status === 'Expired').length, color: 'text-red-500' },
          { label: 'Auto-Renew On', value: filtered.filter(s => s.autoRenew).length, color: 'text-primary' },
        ].map(stat => (
          <div key={stat.label} className="stat-card text-center">
            <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Filters + Table */}
        <div className="xl:col-span-2 space-y-4">
          {/* Filter Bar */}
          <div className="card card-body flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-44">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="form-input pl-8"
                placeholder="Search subscriber..."
                value={searchQuery}
                onChange={e => dispatch(setSearch(e.target.value))}
              />
            </div>
            <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
              {plans.map(p => (
                <button
                  key={p}
                  onClick={() => dispatch(setPlanFilter(p))}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${planFilter === p ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <select
              className="form-input w-auto text-xs"
              value={statusFilter}
              onChange={e => dispatch(setStatusFilter(e.target.value))}
            >
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
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

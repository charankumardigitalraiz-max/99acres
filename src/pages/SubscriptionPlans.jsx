import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillingCycle, setShowPlanModal, setEditingPlan, togglePlanStatus } from '../features/subscriptions/subscriptionsSlice';
import { Check, X, Plus, Edit2, Users, Star } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import Switch from '../components/ui/Switch';

const planColors = {
  Basic: { badge: 'slate', ring: 'ring-slate-200', activeBg: 'bg-slate-700', light: 'bg-slate-50' },
  Standard: { badge: 'amber', ring: 'ring-primary/30', activeBg: 'bg-primary', light: 'bg-amber-50' },
  Premium: { badge: 'blue', ring: 'ring-dark-500/30', activeBg: 'bg-dark-500', light: 'bg-slate-800' },
};

export default function SubscriptionPlans() {
  const dispatch = useDispatch();
  const { agentPlans, sellerPlans, billingCycle } = useSelector(s => s.subscriptions);
  const [activeTab, setActiveTab] = useState('agent');
  const [planModal, setPlanModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const plans = sellerPlans;

  const openEdit = (plan) => { setEditPlan(plan); setPlanModal(true); };
  const openAdd = () => { setEditPlan(null); setPlanModal(true); };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex  xl:flex-row xl:items-center justify-between gap-8 mb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            <span className="text-primary/80">Subscriptions</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span>Plan Settings</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Subscription Plans</h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
            {/* <button
              onClick={() => setActiveTab('agent')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'agent' ? 'bg-white shadow-sm text-primary shadow-slate-200/50' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Agent Plans
            </button> */}
            {/* <button
              onClick={() => setActiveTab('seller')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'seller' ? 'bg-white shadow-sm text-primary shadow-slate-200/50' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Seller Plans
            </button> */}
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95">
            <Plus size={16} />
            Add Plan
          </button>
        </div>
      </div>

      {/* Plan Filters & Toggle */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary/60">
            {activeTab === 'agent' ? <Users size={16} /> : <Star size={16} />}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Plan</p>
            <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">Seller Plans</p>
          </div>
        </div>
        <div className="flex items-center bg-slate-50 p-1 rounded-xl gap-1 border border-slate-100 shadow-inner">
          {['monthly', 'annual'].map(c => (
            <button
              key={c}
              onClick={() => dispatch(setBillingCycle(c))}
              className={`px-6 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${billingCycle === c ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {c}
              {c === 'annual' && <span className="ml-2 text-emerald-500">(-17% Savings)</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => {
          const pc = planColors[plan.name.includes('Premium') ? 'Premium' : plan.name.includes('Standard') ? 'Standard' : 'Basic'];
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isPopular = plan.popular;
          const totalSubscribers = plans.reduce((a, p) => a + p.subscribers, 0);
          const marketShare = Math.round((plan.subscribers / totalSubscribers) * 100);

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-[2.5rem] relative flex flex-col transition-all duration-500 border overflow-hidden group p-8 ${isPopular
                ? 'border-primary/40 shadow-2xl shadow-primary/5 ring-1 ring-primary/20 pt-16'
                : 'border-slate-100 shadow-sm hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/40'
                } ${plan.status === 'inactive' ? 'opacity-60 grayscale-[0.6]' : ''}`}
            >
              {/* Control Cluster - Top Right */}
              <div className="absolute top-6 right-8 flex items-center gap-3 z-20">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm group-hover:border-primary/20 transition-all">
                  <Switch
                    checked={plan.status === 'active'}
                    onChange={() => dispatch(togglePlanStatus({ type: 'seller', id: plan.id }))}
                  />
                  <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${plan.status === 'inactive' ? 'text-slate-400' : 'text-primary'}`}>
                    {plan.status === 'inactive' ? 'Inactive' : 'Active'}
                  </span>
                </div>
                <button
                  onClick={() => openEdit(plan)}
                  className="w-10 h-10 rounded-xl  flex items-center justify-center border border-primary/20  transition-all active:scale-95 group-hover:rotate-6"
                >
                  <Edit2 size={14} className="text-primary" />
                </button>
              </div>

              {isPopular && (
                <div className="absolute top-0 left-0">
                  <div className="bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-8 py-2.5 rounded-br-2xl shadow-xl animate-in slide-in-from-left-4 duration-500">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{plan.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Tier Administration Level</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-primary/40 tracking-tighter">₹</span>
                  <span className="text-5xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">
                    {price.toLocaleString()}
                  </span>
                  <div className="flex flex-col ml-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">/ {billingCycle}</span>
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Verified Rate</span>
                  </div>
                </div>

                {billingCycle === 'annual' && (
                  <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 bg-emerald-50/50 text-emerald-600 rounded-xl border border-emerald-100/50 shadow-sm backdrop-blur-sm">
                    <Check size={10} strokeWidth={4} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Efficiency Savings: ₹{(plan.monthlyPrice * 12 - plan.annualPrice).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4 mb-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  Service Portfolio
                  <div className="h-px flex-1 bg-slate-100" />
                </p>

                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 group/item">
                    <div className="w-5 h-5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform shadow-sm">
                      <Check size={10} className="text-emerald-600" strokeWidth={4} />
                    </div>
                    <span className="text-xs font-bold text-slate-600 leading-tight group-hover/item:text-slate-900 transition-colors">{f}</span>
                  </div>
                ))}

                {plan.notIncluded?.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 opacity-40 grayscale group/item hover:opacity-100 hover:grayscale-0 transition-all">
                    <div className="w-5 h-5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:rotate-12 transition-transform">
                      <X size={10} className="text-slate-400" strokeWidth={4} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 line-through leading-tight group-hover/item:text-slate-800 group-hover/item:no-underline transition-all">{f}</span>
                  </div>
                ))}
              </div>

              {/* <div className="mt-auto">
                <div className="bg-slate-50/80 rounded-[2rem] p-6 border border-slate-100/50 flex flex-col gap-5 group/meter relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ height: `${marketShare}%` }} />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover/meter:scale-110 transition-all group-hover/meter:shadow-primary/10 group-hover/meter:border-primary/20">
                        <Users size={16} className="text-slate-300 group-hover/meter:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-900 tabular-nums tracking-tighter">{plan.subscribers.toLocaleString()}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Market Volume</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[11px] font-black text-primary tabular-nums drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]">
                        {marketShare}%
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Share</span>
                    </div>
                  </div>

                  <div className="h-2 bg-slate-200/50 rounded-full overflow-hidden shadow-inner relative">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]"
                      style={{ width: `${marketShare}%` }}
                    />
                    
                    <div
                      className="absolute top-0 right-0 h-full aspect-square bg-white/40 blur-[2px] animate-pulse rounded-full"
                      style={{ left: `calc(${marketShare}% - 8px)` }}
                    />
                  </div>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Revenue Summary</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Plan Type: {activeTab}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">
            Real-time Stream
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/20 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Plan Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Subscribers</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Monthly Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Annual Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Total Revenue</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {plans.map(plan => (
                <tr key={plan.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
                      <span className="text-sm font-bold text-slate-800">{plan.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600 tabular-nums">{plan.subscribers.toLocaleString()}</td>
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-400 tabular-nums">₹{plan.monthlyPrice.toLocaleString()}</td>
                  <td className="px-8 py-5 text-[11px] font-bold text-slate-400 tabular-nums">₹{plan.annualPrice.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">₹{(plan.subscribers * plan.monthlyPrice).toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border shadow-sm transition-all group-hover:shadow-md ${plan.status === 'inactive'
                      ? 'text-rose-600 bg-rose-50 border-rose-100'
                      : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                      }`}>
                      {plan.status === 'inactive' ? 'Inactive' : 'Active Plan'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-900 border-t-2 border-slate-800">
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Revenue</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-white tabular-nums">{plans.reduce((a, p) => a + p.subscribers, 0).toLocaleString()}</span>
                </td>
                <td colSpan={2} />
                <td className="px-8 py-6">
                  <div className="flex items-baseline gap-2 text-white">
                    <span className="text-xs font-bold text-primary">₹</span>
                    <span className="text-xl font-bold tracking-tighter tabular-nums">{plans.reduce((a, p) => a + (p.subscribers * p.monthlyPrice), 0).toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Monthly Total</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Plan Modal */}
      <Modal
        isOpen={planModal}
        onClose={() => setPlanModal(false)}
        title={editPlan ? `Edit Subscription Plan` : `Add Subscription Plan `}
        size="md"
      >
        <div className="space-y-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Plan Name</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-300" defaultValue={editPlan?.name || ''} placeholder="e.g. Pro Business" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Subscription For</label>
              <select
                value="value"
                name='subscriptiontype'
                // onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer shadow-sm"
              >
                {/* {roles.map((role) => ( */}

                <option value="agent">Agent</option>
                <option value="seller">Seller</option>
                {/* ))} */}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monthly Price (₹)</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-300" type="number" defaultValue={editPlan?.monthlyPrice || ''} placeholder="2499" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Annual Price (₹)</label>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-300" type="number" defaultValue={editPlan?.annualPrice || ''} placeholder="24999" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Features (one per line)</label>
            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium h-32 resize-none placeholder:text-slate-300"
              defaultValue={editPlan?.features?.join('\n') || ''}
              placeholder="Enter features..."
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
            <button onClick={() => setPlanModal(false)} className="px-6 py-3 border border-slate-200 bg-white rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
            <button className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95">
              {editPlan ? 'Update Plan' : 'Add Plan'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


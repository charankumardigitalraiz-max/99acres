import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillingCycle, setShowPlanModal, setEditingPlan } from '../features/subscriptions/subscriptionsSlice';
import { Check, X, Plus, Edit2, Users, Star } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

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

  const plans = activeTab === 'agent' ? agentPlans : sellerPlans;

  const openEdit = (plan) => { setEditPlan(plan); setPlanModal(true); };
  const openAdd = () => { setEditPlan(null); setPlanModal(true); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="page-header flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0 font-bold">
        <div className="w-full lg:w-auto">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Subscription Vault</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium italic">Configure premium pricing tiers and ecosystem features.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="flex bg-slate-100/80 backdrop-blur-md rounded-2xl p-1.5 gap-1.5 w-full sm:w-auto border border-slate-200">
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex-1 sm:flex-none ${activeTab === 'agent' ? 'bg-white shadow-xl shadow-slate-200 text-primary border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Agent Tier
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex-1 sm:flex-none ${activeTab === 'seller' ? 'bg-white shadow-xl shadow-slate-200 text-primary border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Seller Tier
            </button>
          </div>
          <button onClick={openAdd} className="btn-primary w-full sm:w-auto py-3.5 px-6  active:scale-95 text-[10px] uppercase font-black tracking-widest">
            <Plus size={16} /> Add Plan
          </button>
        </div>
      </div>

      {/* Plan Filters & Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-xl shadow-slate-100/50 border border-white/50">
        <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-50/80 p-2 rounded-2xl border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Viewing:</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            {activeTab === 'agent' ? <Users size={14} /> : <Star size={14} />}
            <span className="text-[10px] font-black uppercase tracking-wider">{activeTab} Tier Plans</span>
          </div>
        </div>
        <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl gap-1.5 w-full sm:w-auto border border-slate-200">
          {['monthly', 'annual'].map(c => (
            <button
              key={c}
              onClick={() => dispatch(setBillingCycle(c))}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex-1 sm:flex-none ${billingCycle === c ? 'bg-white shadow-xl shadow-slate-200 text-slate-900 border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {c}
              {c === 'annual' && <span className="ml-2 text-emerald-500">(-17%)</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => {
          const pc = planColors[plan.name.includes('Premium') ? 'Premium' : plan.name.includes('Standard') ? 'Standard' : 'Basic'];
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`card relative flex flex-col hover-lift h-full transition-all duration-300 border-2 ${isPopular ? 'border-primary shadow-lg ring-4 ring-primary/5' : 'border-border'
                }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6 pb-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Perfect for growing {activeTab}s</p>
                  </div>
                  <button
                    onClick={() => openEdit(plan)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors border border-transparent hover:border-slate-200"
                  >
                    <Edit2 size={15} />
                  </button>
                </div>

                <div className="my-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-slate-500">₹</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{price.toLocaleString()}</span>
                    <span className="text-sm font-medium text-slate-400">/ {billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-600" />
                      Save ₹{(plan.monthlyPrice * 12 - plan.annualPrice).toLocaleString()} per year
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 pt-2 flex-1 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">What's included</div>
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{f}</span>
                  </div>
                ))}
                {plan.notIncluded?.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={12} className="text-slate-400" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-400 line-through font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 group hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <Users size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{plan.subscribers.toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-black text-primary">
                      {Math.round((plan.subscribers / plans.reduce((a, p) => a + p.subscribers, 0)) * 100)}% share
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700 ease-out shadow-inner"
                      style={{ width: `${Math.round((plan.subscribers / plans.reduce((a, p) => a + p.subscribers, 0)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Table */}
      <div className="card glass-card overflow-hidden">
        <div className="card-header border-b border-border bg-white/50">
          <p className="section-title text-lg">Revenue Summary: {activeTab === 'agent' ? 'Agents' : 'Sellers'}</p>
          <div className="badge badge-blue">Real-time Data</div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="pl-6 py-4">Plan Name</th>
                <th>Users</th>
                <th>Monthly (₹)</th>
                <th>Annual (₹)</th>
                <th>Monthly Revenue</th>
                <th className="pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plans.map(plan => (
                <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 rounded-full bg-primary/20" />
                      <span className="font-bold text-slate-900">{plan.name}</span>
                    </div>
                  </td>
                  <td className="font-bold text-slate-700">{plan.subscribers.toLocaleString()}</td>
                  <td className="text-slate-600">₹{plan.monthlyPrice.toLocaleString()}</td>
                  <td className="text-slate-600">₹{plan.annualPrice.toLocaleString()}</td>
                  <td className="font-black text-slate-900">
                    ₹{(plan.subscribers * plan.monthlyPrice).toLocaleString()}
                  </td>
                  <td className="pr-6 text-right"><Badge>Active Tier</Badge></td>
                </tr>
              ))}
              <tr className="bg-primary/5 font-bold border-t-2 border-primary/10">
                <td className="pl-6 py-5 text-slate-900 uppercase tracking-wider text-xs">Total {activeTab} Revenue</td>
                <td className="text-slate-900">{plans.reduce((a, p) => a + p.subscribers, 0).toLocaleString()}</td>
                <td colSpan={2} />
                <td className="text-xl font-black text-primary">
                  ₹{plans.reduce((a, p) => a + (p.subscribers * p.monthlyPrice), 0).toLocaleString()}
                </td>
                <td className="pr-6 text-right">
                  <span className="text-2xs text-slate-400 italic font-medium">Billed Monthly</span>
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
        title={editPlan ? `Edit ${editPlan.name} Plan` : `Add New ${activeTab === 'agent' ? 'Agent' : 'Seller'} Plan`}
      >
        <div className="space-y-5 p-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="form-label">Plan Name</label>
              <input className="form-input" defaultValue={editPlan?.name || ''} placeholder="e.g. Pro Business" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="form-label">Billing Type</label>
              <select className="form-input capitalize">
                <option>{activeTab} Plan</option>
              </select>
            </div>
            <div>
              <label className="form-label">Monthly Price (₹)</label>
              <input className="form-input" type="number" defaultValue={editPlan?.monthlyPrice || ''} placeholder="2499" />
            </div>
            <div>
              <label className="form-label">Annual Price (₹)</label>
              <input className="form-input" type="number" defaultValue={editPlan?.annualPrice || ''} placeholder="24999" />
            </div>
          </div>
          <div>
            <label className="form-label">Features (one per line)</label>
            <textarea
              className="form-input h-32 resize-none"
              defaultValue={editPlan?.features?.join('\n') || ''}
              placeholder="Features list..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button onClick={() => setPlanModal(false)} className="btn-secondary px-6">Cancel</button>
            <button className="btn-primary px-8">
              {editPlan ? 'Update Plan' : 'Generate Tier'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

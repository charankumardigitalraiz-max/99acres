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

const PlanCard = ({ plan, billingCycle, dispatch, openEdit, isTopUp }) => {
  const pc = planColors[plan.name.includes('Premium') ? 'Premium' : plan.name.includes('Standard') ? 'Standard' : 'Basic'] || planColors.Basic;
  const price = (isTopUp || billingCycle === 'monthly') ? plan.monthlyPrice : plan.annualPrice;
  const isPopular = plan.popular;

  return (
    <div
      className={`bg-white rounded-lg relative flex flex-col transition-all border overflow-hidden group p-6 ${isPopular
        ? 'border-primary/40 shadow-sm pt-12'
        : 'border-slate-200 shadow-sm hover:border-primary/20'
        } ${plan.status === 'inactive' ? 'opacity-60 grayscale-[0.6]' : ''}`}
    >
      {/* Control Cluster - Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100 rounded-md shadow-sm">
          <Switch
            checked={plan.status === 'active'}
            onChange={() => dispatch(togglePlanStatus({ type: plan.id.startsWith('a') ? 'agent' : 'seller', id: plan.id }))}
          />
          <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${plan.status === 'inactive' ? 'text-slate-400' : 'text-primary'}`}>
            {plan.status === 'inactive' ? 'Off' : 'On'}
          </span>
        </div>
        <button
          onClick={() => openEdit(plan)}
          className="w-8 h-8 rounded-md flex items-center justify-center border border-slate-200 bg-white hover:border-primary/40 transition-all active:scale-95 shadow-sm"
        >
          <Edit2 size={12} className="text-slate-400 group-hover:text-primary" />
        </button>
      </div>

      {isPopular && (
        <div className="absolute top-0 left-0">
          <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-br-lg shadow-sm">
            Popular
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{plan.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{isTopUp ? 'Add-on' : 'Service Tier'}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-slate-400">₹</span>
          <span className="text-4xl font-bold text-slate-900 tracking-tighter tabular-nums leading-none">
            {price.toLocaleString()}
          </span>
          <div className="flex flex-col ml-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">/ {isTopUp ? 'one-time' : billingCycle}</span>
          </div>
        </div>

        {!isTopUp && billingCycle === 'annual' && (
          <div className="inline-flex items-center gap-1.5 mt-4 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">
            <Check size={10} strokeWidth={4} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Save ₹{(plan.monthlyPrice * 12 - plan.annualPrice).toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3 mb-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          Benefits
          <div className="h-px flex-1 bg-slate-100" />
        </p>

        {plan.features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={10} className="text-emerald-600" strokeWidth={4} />
            </div>
            <span className="text-xs font-medium text-slate-600 leading-tight">{f}</span>
          </div>
        ))}

        {plan.notIncluded?.map((f, i) => (
          <div key={i} className="flex items-start gap-3 opacity-50 grayscale">
            <div className="w-4 h-4 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X size={10} className="text-slate-400" strokeWidth={4} />
            </div>
            <span className="text-xs font-medium text-slate-400 line-through leading-tight">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SubscriptionPlans() {
  const dispatch = useDispatch();
  const { agentPlans, sellerPlans, billingCycle } = useSelector(s => s.subscriptions);
  const [activeTab, setActiveTab] = useState('agent');
  const [planModal, setPlanModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [planType, setPlanType] = useState('');

  const plans = activeTab === 'agent' ? agentPlans : sellerPlans;
  const regularPlans = plans.filter(p => p.type !== 'topup');
  const topUpPlans = plans.filter(p => p.type === 'topup');

  const openEdit = (plan) => { setEditPlan(plan); setPlanType(plan.type || 'regular'); setPlanModal(true); };
  const openAdd = () => { setEditPlan(null); setPlanType(''); setPlanModal(true); };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Subscription Plans</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Manage service levels, pricing, and revenue streams</p>
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200">
            {['agent', 'seller'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}s
              </button>
            ))}
          </div> */}
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95">
            <Plus size={16} />Add Plan
          </button>
        </div>
      </div>

      {/* Plan Filters & Toggle */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-slate-50 flex items-center justify-center text-primary/60 border border-slate-100">
            {activeTab === 'agent' ? <Users size={18} /> : <Star size={18} />}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Category</p>
            <p className="text-sm font-bold text-slate-900">{activeTab === 'agent' ? 'Real Estate Sellers' : 'Individual Sellers'}</p>
          </div>
        </div>
        <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200">
          {['monthly', 'annual'].map(c => (
            <button
              key={c}
              onClick={() => dispatch(setBillingCycle(c))}
              className={`px-5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${billingCycle === c ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {c}
              {c === 'annual' && <span className="ml-1.5 text-emerald-500 font-bold">-17%</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Regular Plans Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Subscription Tiers</h3>
          <div className="h-px w-full bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPlans.map(plan => (
            <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} dispatch={dispatch} openEdit={openEdit} />
          ))}
        </div>
      </div>

      {/* Top Up Plans Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Add-on Packages</h3>
          <div className="h-px w-full bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topUpPlans.map(plan => (
            <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} dispatch={dispatch} openEdit={openEdit} isTopUp />
          ))}
          <button
            onClick={openAdd}
            className="group relative bg-slate-50/50 rounded-lg border border-dashed border-slate-200 hover:border-primary/40 hover:bg-white transition-all flex flex-col items-center justify-center p-6 min-h-[250px]"
          >
            <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-primary transition-all shadow-sm">
              <Plus size={24} />
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-primary transition-colors">Create Custom Plan</p>
          </button>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Revenue Breakdown</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Live Metrics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-primary border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-bold text-white uppercase tracking-wider">Plan Name</th>
                <th className="px-6 py-3 text-[10px] font-bold text-white uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-[10px] font-bold text-white uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-[10px] font-bold text-white uppercase tracking-wider">Price Point</th>
                <th className="px-6 py-3 text-[10px] font-bold text-white uppercase tracking-wider">Total Yield</th>
                <th className="px-6 py-3 text-[10px] font-bold text-white uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {plans.map(plan => (
                <tr key={plan.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{plan.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${plan.type === 'topup' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {plan.type || 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 tabular-nums">{plan.subscribers.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 tabular-nums">
                    ₹{(plan.type === 'topup' ? plan.monthlyPrice : (billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice)).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">₹{(plan.subscribers * (plan.type === 'topup' ? plan.monthlyPrice : plan.monthlyPrice)).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${plan.status === 'inactive' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                      {plan.status}
                    </span>
                  </td>
                </tr>
              ))}
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
        <div className="space-y-5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="col-span-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Plan Type</label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none bg-white transition-all"
              >
                <option value="">Select Plan Category</option>
                <option value="regular">Regular Subscription</option>
                <option value="topup">One-time Top Up</option>
              </select>
            </div>

            {planType && (
              <>
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Plan Name</label>
                  <input className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" defaultValue={editPlan?.name || ''} placeholder="e.g. Pro Business" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Subscription For</label>
                  <select
                    defaultValue={editPlan?.role || activeTab}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none bg-white transition-all"
                  >
                    <option value="agent">Agent</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                {planType === 'topup' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Price (₹)</label>
                    <input className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" type="number" defaultValue={editPlan?.monthlyPrice || ''} placeholder="2499" />
                  </div>
                )}
                {planType !== 'topup' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Monthly Price (₹)</label>
                    <input className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" type="number" defaultValue={editPlan?.monthlyPrice || ''} placeholder="2499" />
                  </div>
                )}
                {planType !== 'topup' && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Annual Price (₹)</label>
                    <input className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" type="number" defaultValue={editPlan?.annualPrice || ''} placeholder="24999" />
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Properties Limit</label>
                  <input className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all" type="number" defaultValue={editPlan?.propertiesLimit || ''} placeholder="e.g. 50" />
                </div>
              </>
            )}
          </div>
          {planType && (
            <>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Features (one per line)</label>
                <textarea
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all h-32 resize-none"
                  defaultValue={editPlan?.features?.join('\n') || ''}
                  placeholder="Enter plan features..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button onClick={() => setPlanModal(false)} className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                <button className="px-6 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90">
                  {editPlan ? 'Update Plan' : 'Add Plan'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>

  );
}


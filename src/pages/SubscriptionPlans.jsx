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
  const { plans, billingCycle, subscribers } = useSelector(s => s.subscriptions);
  const [planModal, setPlanModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const openEdit = (plan) => { setEditPlan(plan); setPlanModal(true); };
  const openAdd = () => { setEditPlan(null); setPlanModal(true); };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="section-title text-base">Subscription Plans</h2>
          <p className="section-subtitle">Manage pricing tiers and features</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Billing Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 gap-0.5">
            {['monthly', 'annual'].map(c => (
              <button
                key={c}
                onClick={() => dispatch(setBillingCycle(c))}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${billingCycle === c ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {c === 'monthly' ? 'Monthly' : 'Annual'}
                {c === 'annual' && <span className="ml-1 text-emerald-600 text-2xs font-semibold">-17%</span>}
              </button>
            ))}
          </div>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={14} /> Add Plan
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => {
          const pc = planColors[plan.name] || planColors.Basic;
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`card relative flex flex-col ring-2 ${pc.ring} ${isPopular ? 'shadow-card-hover' : ''}`}
            >
              {isPopular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-2xs font-semibold px-3 py-0.5 rounded-full">
                  Most Popular
                </div>
              )}
              {/* Plan Header */}
              <div className="card-header">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{plan.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Users size={11} className="text-slate-400" />
                    <span className="text-2xs text-slate-500">{plan.subscribers.toLocaleString()} subscribers</span>
                  </div>
                </div>
                <button
                  onClick={() => openEdit(plan)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <Edit2 size={13} />
                </button>
              </div>

              <div className="p-4 flex-1 space-y-4">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500">₹</span>
                    <span className="text-2xl font-semibold text-slate-800">{price.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">/ {billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-2xs text-emerald-600 font-medium mt-0.5">
                      ₹{Math.round(price / 12).toLocaleString()} / month billed annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={9} className="text-emerald-600" strokeWidth={2.5} />
                      </div>
                      <span className="text-xs text-slate-600">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded?.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 opacity-40">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X size={9} className="text-slate-400" strokeWidth={2.5} />
                      </div>
                      <span className="text-xs text-slate-500 line-through">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscriber bar */}
              <div className="px-4 pb-4">
                <div className="bg-slate-50 rounded-lg p-3 border border-border">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-2xs text-slate-500">Subscriber share</span>
                    <span className="text-2xs font-semibold text-slate-700">
                      {Math.round((plan.subscribers / plans.reduce((a, p) => a + p.subscribers, 0)) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.round((plan.subscribers / plans.reduce((a, p) => a + p.subscribers, 0)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscribers Summary Table */}
      <div className="card">
        <div className="card-header">
          <p className="section-title">Subscriber Summary by Plan</p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Subscribers</th>
                <th>Monthly Price</th>
                <th>Annual Price</th>
                <th>Est. Monthly Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-6 rounded-full bg-primary opacity-60" />
                      <span className="font-medium text-slate-800">{plan.name}</span>
                    </div>
                  </td>
                  <td className="font-medium">{plan.subscribers.toLocaleString()}</td>
                  <td>₹{plan.monthlyPrice.toLocaleString()}</td>
                  <td>₹{plan.annualPrice.toLocaleString()}</td>
                  <td className="font-semibold text-slate-800">
                    ₹{(plan.subscribers * plan.monthlyPrice).toLocaleString()}
                  </td>
                  <td><Badge>Active</Badge></td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-medium">
                <td className="font-semibold text-slate-800">Total</td>
                <td className="font-semibold">{plans.reduce((a, p) => a + p.subscribers, 0).toLocaleString()}</td>
                <td colSpan={2} />
                <td className="font-semibold text-primary">
                  ₹{plans.reduce((a, p) => a + (p.subscribers * p.monthlyPrice), 0).toLocaleString()}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Plan Modal */}
      <Modal
        isOpen={planModal}
        onClose={() => setPlanModal(false)}
        title={editPlan ? `Edit ${editPlan.name} Plan` : 'Add New Plan'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Plan Name</label>
              <input className="form-input" defaultValue={editPlan?.name || ''} placeholder="e.g. Business" />
            </div>
            <div>
              <label className="form-label">Monthly Price (₹)</label>
              <input className="form-input" type="number" defaultValue={editPlan?.monthlyPrice || ''} placeholder="2499" />
            </div>
            <div>
              <label className="form-label">Annual Price (₹)</label>
              <input className="form-input" type="number" defaultValue={editPlan?.annualPrice || ''} placeholder="24999" />
            </div>
            <div>
              <label className="form-label">Max Listings</label>
              <input className="form-input" placeholder="50" />
            </div>
          </div>
          <div>
            <label className="form-label">Features (one per line)</label>
            <textarea
              className="form-input h-28 resize-none"
              defaultValue={editPlan?.features?.join('\n') || ''}
              placeholder="50 Property Listings&#10;Advanced Analytics&#10;Priority Support"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => setPlanModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">{editPlan ? 'Save Changes' : 'Create Plan'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

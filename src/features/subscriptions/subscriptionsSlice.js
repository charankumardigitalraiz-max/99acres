import { createSlice } from '@reduxjs/toolkit';
import { plans, subscribersData, subscriptionPieData } from '../../data/mockData';

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    plans,
    subscribers: subscribersData,
    pieData: subscriptionPieData,
    billingCycle: 'annual',
    planFilter: 'All',
    statusFilter: 'All',
    searchQuery: '',
    editingPlan: null,
    showPlanModal: false,
  },
  reducers: {
    setBillingCycle: (state, action) => { state.billingCycle = action.payload; },
    setPlanFilter: (state, action) => { state.planFilter = action.payload; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; },
    setSearch: (state, action) => { state.searchQuery = action.payload; },
    setEditingPlan: (state, action) => { state.editingPlan = action.payload; },
    setShowPlanModal: (state, action) => { state.showPlanModal = action.payload; },
  },
});

export const { setBillingCycle, setPlanFilter, setStatusFilter, setSearch, setEditingPlan, setShowPlanModal } = subscriptionsSlice.actions;

export const selectFilteredSubscribers = (state) => {
  const { subscribers, planFilter, statusFilter, searchQuery } = state.subscriptions;
  return subscribers.filter(s => {
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan = planFilter === 'All' || s.plan === planFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });
};

export default subscriptionsSlice.reducer;

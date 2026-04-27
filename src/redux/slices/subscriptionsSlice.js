import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subscribersData, subscriptionPieData } from '../../data/mockData';
import { API_URL } from '../../service/api';

const PLANS_URL = `${API_URL}/subscription-plans`;
const FEATURES_URL = `${PLANS_URL}/features`;

// ── Feature Thunks ──
export const fetchFeatures = createAsyncThunk('subscriptions/fetchFeatures', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(FEATURES_URL);
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});



export const addFeature = createAsyncThunk('subscriptions/addFeature', async (name, { rejectWithValue }) => {
  try {
    const res = await fetch(FEATURES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});




export const updateFeature = createAsyncThunk('subscriptions/updateFeature', async ({ id, name }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${FEATURES_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});




export const deleteFeature = createAsyncThunk('subscriptions/deleteFeature', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${FEATURES_URL}/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return id;
  } catch (e) { return rejectWithValue(e.message); }
});




// ── Plan Thunks ──
export const fetchPlans = createAsyncThunk('subscriptions/fetchPlans', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(PLANS_URL);
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});




export const addPlan = createAsyncThunk('subscriptions/addPlan', async (planData, { rejectWithValue }) => {
  try {
    const res = await fetch(PLANS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});



export const updatePlanStatus = createAsyncThunk('subscriptions/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${PLANS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});




export const updatePlan = createAsyncThunk('subscriptions/updatePlan', async ({ id, planData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${PLANS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch (e) { return rejectWithValue(e.message); }
});




export const deletePlan = createAsyncThunk('subscriptions/deletePlan', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${PLANS_URL}/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    return id;
  } catch (e) { return rejectWithValue(e.message); }
});




const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    plans: [],
    features: [],
    loading: false,
    error: null,
    subscribers: subscribersData,
    pieData: subscriptionPieData,
    billingCycle: 'annual',
    planFilter: 'All',
    statusFilter: 'All',
    typeFilter: 'All',
    searchQuery: '',
    editingPlan: null,
    showPlanModal: false,
  },
  reducers: {
    setBillingCycle: (state, action) => { state.billingCycle = action.payload; },
    setPlanFilter: (state, action) => { state.planFilter = action.payload; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; },
    setTypeFilter: (state, action) => { state.typeFilter = action.payload; },
    setSearch: (state, action) => { state.searchQuery = action.payload; },
    setEditingPlan: (state, action) => { state.editingPlan = action.payload; },
    setShowPlanModal: (state, action) => { state.showPlanModal = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      // Features
      .addCase(fetchFeatures.fulfilled, (state, action) => { state.features = action.payload; state.loading = false; })
      .addCase(addFeature.fulfilled, (state, action) => { state.features.unshift(action.payload); })
      .addCase(updateFeature.fulfilled, (state, action) => {
        const index = state.features.findIndex(f => f._id === action.payload._id);
        if (index !== -1) state.features[index] = action.payload;
      })
      .addCase(deleteFeature.fulfilled, (state, action) => {
        state.features = state.features.filter(f => f._id !== action.payload);
      })
      // Plans
      .addCase(fetchPlans.fulfilled, (state, action) => { state.plans = action.payload; state.loading = false; })
      .addCase(addPlan.fulfilled, (state, action) => { state.plans.unshift(action.payload); })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.plans[index] = action.payload;
      })
      .addCase(updatePlanStatus.fulfilled, (state, action) => {
        const index = state.plans.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.plans[index] = action.payload;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(p => p._id !== action.payload);
      })
      .addMatcher(action => action.type.endsWith('/pending'), (state) => { state.loading = true; })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setBillingCycle,
  setPlanFilter,
  setStatusFilter,
  setTypeFilter,
  setSearch,
  setEditingPlan,
  setShowPlanModal
} = subscriptionsSlice.actions;

export const selectFilteredSubscribers = (state) => {
  const { subscribers, planFilter, statusFilter, typeFilter, searchQuery } = state.subscriptions;
  return subscribers.filter(s => {
    const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPlan = planFilter === 'All' || s.plan.includes(planFilter);
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchType = typeFilter === 'All' || (s.type && s.type.toLowerCase() === typeFilter.toLowerCase());
    return matchSearch && matchPlan && matchStatus && matchType;
  });
};

export default subscriptionsSlice.reducer;

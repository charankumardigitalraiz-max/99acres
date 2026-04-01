import { createSlice } from '@reduxjs/toolkit';
import { kpiData, revenueData, userGrowthData, recentActivity, topCities } from '../../data/mockData';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    kpis: kpiData,
    revenueData,
    userGrowthData,
    recentActivity,
    topCities,
  },
  reducers: {},
});

export default dashboardSlice.reducer;

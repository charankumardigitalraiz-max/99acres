import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import usersReducer from '../features/users/usersSlice';
import subscriptionsReducer from '../features/subscriptions/subscriptionsSlice';
import productsReducer from '../features/products/productsSlice';
import reportsReducer from '../features/reports/reportsSlice';
import uiReducer from '../features/ui/uiSlice';
import categoryReducer from '../features/categories/categorySlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    users: usersReducer,
    subscriptions: subscriptionsReducer,
    products: productsReducer,
    reports: reportsReducer,
    ui: uiReducer,
    categories: categoryReducer,
  },
});

export default store;

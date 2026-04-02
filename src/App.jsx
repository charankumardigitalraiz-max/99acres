import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Users from './pages/Users';
import UserDetails from './pages/CustomerDetails';
import Subscribers from './pages/Subscribers';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Reports from './pages/Reports';
import AdminProfile from './pages/AdminProfile';
import Categories from './pages/Categories';
import Support from './pages/Support';
import TicketDetails from './pages/TicketDetails';
import Reviews from './pages/Reviews';
import StaffRoles from './pages/StaffRoles';
import StaffMembers from './pages/StaffMembers';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="subscriptions" element={<SubscriptionPlans />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:role" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="support" element={<Support />} />
            <Route path="support/:id" element={<TicketDetails />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="staff/roles" element={<StaffRoles />} />
            <Route path="staff/members" element={<StaffMembers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

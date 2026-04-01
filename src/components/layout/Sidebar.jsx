import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/ui/uiSlice';
import {
  LayoutDashboard, CreditCard, Users, Star,
  Building2, BarChart3, MessageCircle, MessageSquareText, UserCircle, ChevronLeft,
  ChevronRight, Home, ShieldCheck, UserCog, Users2
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },

  { path: '/subscriptions', label: 'Subscription Plans', icon: CreditCard },

  { path: '/users', label: 'Users', icon: Users },

  { path: '/subscribers', label: 'Subscribers', icon: Star },

  { path: '/categories', label: 'Categories', icon: Users },

  { path: '/products', label: 'Properties', icon: Building2 },

  { path: '/reports', label: 'Reports', icon: BarChart3 },

  // ✅ New Sections
  { path: '/support', label: 'Support', icon: MessageCircle },

  { path: '/reviews', label: 'Reviews', icon: MessageSquareText },

  {
    label: 'Staff',
    icon: Users2,
    children: [
      { path: '/staff/roles', label: 'Roles', icon: ShieldCheck },
      { path: '/staff/members', label: 'Members', icon: UserCog },
    ]
  }
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector(s => s.ui.sidebarCollapsed);

  return (
    <aside
      className={`gradient-sidebar flex flex-col fixed top-0 left-0 h-full z-30 shadow-sidebar transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-4 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Home size={15} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-semibold text-sm leading-tight">99Acres</p>
            <p className="text-slate-400 text-2xs leading-tight">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-2xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">Main Menu</p>
        )}
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? label : ''}
          >
            <Icon size={16} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-150 text-xs"
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}

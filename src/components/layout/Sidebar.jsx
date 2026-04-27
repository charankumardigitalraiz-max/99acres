import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/ui/uiSlice';
import {
  LayoutDashboard, CreditCard, Users, Star,
  Building2, BarChart3, MessageCircle, MessageSquareText, UserCircle, ChevronLeft,
  ChevronRight, Home, ShieldCheck, UserCog, Users2, Headset, Store, ShoppingCart, Image as ImageIcon, LayoutList
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },

  { path: '/subscriptions', label: 'Subscription Plans', icon: CreditCard },
  {
    path: '/customers', label: 'Customers', icon: Users,
    children: [
      // { path: '/customers/agent', label: 'Agent', icon: Headset },     // support / intermediary
      { path: '/customers/seller', label: 'Seller', icon: Store },     // selling entity
      { path: '/customers/buyer', label: 'Buyer', icon: ShoppingCart } // purchasing
    ]
  },
  { path: '/sections', label: 'Sections', icon: LayoutList },

  { path: '/subscribers', label: 'Subscribers', icon: Star },

  { path: '/categories', label: 'Categories', icon: Users },

  { path: '/products', label: 'Properties', icon: Building2 },

  { path: '/reports', label: 'Reports', icon: BarChart3 },

  // ✅ New Sections
  { path: '/support', label: 'Support', icon: MessageCircle },

  { path: '/reviews', label: 'Testimonials', icon: MessageSquareText },
  { path: '/banners', label: 'Banners', icon: ImageIcon },
  { path: '/transactions', label: 'Transactions', icon: CreditCard },

  {
    label: 'Staff',
    icon: Users2,
    children: [
      { path: '/staff/roles', label: 'Roles', icon: ShieldCheck },
      { path: '/staff/members', label: 'Members', icon: UserCog },
    ]
  }
];
const SidebarItem = ({ item, collapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const Icon = item.icon;
  const hasChildren = !!item.children;
  const isChildrenActive = hasChildren && item.children.some(child => location.pathname.startsWith(child.path));

  useEffect(() => {
    if (isChildrenActive && !collapsed) {
      setIsOpen(true);
    }
  }, [isChildrenActive, collapsed]);

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        end={item.path === '/'}
        className={({ isActive }) =>
          `flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold transition-colors ${isActive
            ? 'bg-primary text-white shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`
        }
        title={collapsed ? item.label : ''}
      >
        <Icon size={18} className="flex-shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    );
  }

  // Header (parent item with children)
  return (
    <div className="flex flex-col gap-1 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold transition-all ${isChildrenActive
          ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
        title={collapsed ? item.label : ''}
      >
        <Icon size={18} className="flex-shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronRight
              size={14}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
            />
          </>
        )}
      </button>

      {!collapsed && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-1 pl-4 pr-1">
            {item.children.map(child => {
              const ChildIcon = child.icon;
              return (
                <NavLink
                  key={child.path}
                  to={child.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-bold tracking-wider transition-all ${isActive
                      ? 'text-primary bg-primary/10 border-l-2 border-primary pl-4'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <ChildIcon size={15} className="flex-shrink-0" />
                  <span>{child.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector(s => s.ui.sidebarCollapsed);

  return (
    <aside
      className={`bg-white flex flex-col fixed top-0 left-0 h-full z-30 border-r border-slate-200 transition-all duration-500 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Logo */}
      <div className={`flex h-20 items-center justify-between border-b border-slate-100 px-6 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md flex items-center justify-center">
              {/* <Building2 className="h-5 w-5 text-primary" /> */}
              <img src="/sherla-properties-text.png" alt="" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none tracking-tight uppercase">Sherla <span className="text-primary">Properties</span></p>
              <p className="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Core Administration</p>
            </div>
          </div>
        ) : (
          <div className="h-10 w-10 rounded-md bg-slate-900 flex items-center justify-center mx-auto shadow-lg shadow-slate-200 border border-slate-800">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-2xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">Main Menu</p>
        )}
        {navItems.map((item, index) => (
          <SidebarItem key={item.path || index} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 text-xs"
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}

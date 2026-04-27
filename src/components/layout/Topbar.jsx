import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, Calendar, Clock, LogOut, Menu, Moon, Sun, ChevronDown, Search } from 'lucide-react';
import { clearNotifications } from '../../features/ui/uiSlice';
import { adminProfile } from '../../data/mockData';

export default function Topbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const notifications = useSelector(s => s.ui.notifications);
  const collapsed = useSelector(s => s.ui.sidebarCollapsed);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dark, setDark] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileModalOpen(false);
      }
    };
    if (isProfileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileModalOpen]);

  return (
    <header className={`fixed top-0 right-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-100 bg-white px-8 transition-all duration-500 ease-in-out ${collapsed ? 'left-20' : 'left-64'}`}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-medium">{formatDate(currentTime)}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium">{formatTime(currentTime)}</span>
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDark(!dark)}
          className="rounded-md p-2 hover:bg-slate-100 transition-colors text-slate-500"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button className="relative rounded-md p-2 hover:bg-slate-100 transition-colors text-slate-500">
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          )}
        </button>
        
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer hover:bg-slate-50 rounded-md px-2 py-1 transition-colors relative" ref={profileRef} onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
            {adminProfile.avatar}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-900 leading-none">{adminProfile.name}</p>
            <p className="text-xs text-slate-500">{adminProfile.role}</p>
          </div>

          {isProfileModalOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
              <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Profile Settings</Link>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

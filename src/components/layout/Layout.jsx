import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const collapsed = useSelector(s => s.ui.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Topbar />
      <main
        className={`transition-all duration-500 ease-in-out pt-20 min-h-screen ${collapsed ? 'ml-20' : 'ml-64'}`}
      >
        <div className="p-5 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

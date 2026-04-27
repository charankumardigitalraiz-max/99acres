import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearch, setRoleFilter, setStatusFilter, setPage,
  setSelectedUser, updateUserStatus, selectFilteredUsers
} from '../features/users/usersSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, UserX, UserCheck, MapPin, Phone, Mail, Activity, Calendar, Building2, TrendingUp, Users as UsersIcon, XCircle, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const roles = ['All', 'Buyer', 'Seller', 'Agent'];
const statuses = ['All', 'Active', 'Inactive', 'Suspended'];

export default function Users() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const users = useSelector((state) => state.users.list)
  const { role } = useParams();
  const { searchQuery, roleFilter, statusFilter, currentPage, pageSize, selectedUser } = useSelector(s => s.users);
  const filtered = useSelector(selectFilteredUsers);
  const [viewUser, setViewUser] = useState(null);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handleView = (user) => setViewUser(user);
  const navigate = useNavigate();




  useEffect(() => {
    if (role) {
      // Capitalize first letter to match data (e.g., 'agent' -> 'Agent')
      const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
      dispatch(setRoleFilter(formattedRole));
    } else {
      dispatch(setRoleFilter('All'));
    }
  }, [role, dispatch]);

  const isSellerOrAgent = roleFilter === 'Seller' || roleFilter === 'Agent';

  const usertypeBadge = (role) => {
    if (role === 'Agent') return 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm';
    if (role === 'Seller') return 'bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm';
    if (role === 'Buyer') return 'bg-purple-50 text-purple-600 border border-purple-200 shadow-sm';
    return 'bg-slate-50 text-slate-600 border border-slate-200 shadow-sm';
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">{role ? role.toUpperCase() : 'ALL'} PERSONNEL</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Manage and monitor platform user base and activity streams</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Download size={14} className="text-primary" /> Export Data
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: users.length, icon: UsersIcon, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Active Status', value: users.filter(u => u.status === 'Active').length, icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Growth Vector', value: '+12%', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Suspended', value: users.filter(u => u.status === 'Suspended').length, icon: UserX, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm group hover:border-primary/30 transition-all cursor-default">
            <div className={`w-10 h-10 rounded-md ${s.bg} ${s.color} border border-slate-100 flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <s.icon size={18} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900 leading-none tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Interface */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[280px]">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-md outline-none focus:border-primary transition-all bg-slate-50/30 font-medium"
            placeholder="Search by name, email or location..."
            value={searchQuery}
            onChange={e => dispatch(setSearch(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-3">
          {isSellerOrAgent && (
            <div className="w-44">
              <Select
                value={roleFilter}
                onChange={e => dispatch(setRoleFilter(e.target.value))}
                options={isSellerOrAgent ? ['Seller', 'Agent'] : ['All', 'Agent', 'Seller', 'Buyer']}
                placeholder="Filter Role"
              />
            </div>
          )}

          <div className="w-44">
            <Select
              value={statusFilter}
              onChange={e => dispatch(setStatusFilter(e.target.value))}
              options={statuses}
              placeholder="Filter Status"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interface</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider" style={{ display: roleFilter === "Buyer" ? 'none' : 'table-cell' }}>Assets</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registry Date</th>
                <th className="px-6 py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map(user => (
                <tr key={user.id} className="group hover:bg-slate-50/30 transition-all">
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-300 tabular-nums">#{user.id.toString().padStart(4, '0')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <Avatar initials={user.avatar} size="sm" className="w-full h-full" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-slate-700 leading-none group-hover:text-primary transition-colors">{user.name}</p>
                        <p className="text-[11px] text-slate-400 mt-1.5 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center">
                        <Phone size={12} className="text-slate-300" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider tabular-nums">{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{user.city}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${usertypeBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ display: roleFilter === "Buyer" ? 'none' : 'table-cell' }}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-600">
                      <Building2 size={14} className="text-slate-300" />
                      <span className="text-[13px] tabular-nums">{user.properties}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider tabular-nums">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : user.status === 'Suspended' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      <div className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Suspended' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/customers/details/${user.id}`)}
                        className="p-2 rounded-xl btn-action-view shadow-sm"
                        title="View Protocol"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => dispatch(updateUserStatus({ id: user.id, status: user.status === 'Suspended' ? 'Active' : 'Suspended' }))}
                        className={`w-8 h-8 rounded-md transition-all flex items-center justify-center border ${user.status === 'Suspended' ? 'bg-emerald-50 text-emerald-400 border-emerald-100 hover:bg-emerald-500 hover:text-white' : 'bg-rose-50 text-rose-400 border-rose-100 hover:bg-rose-500 hover:text-white'}`}
                        title={user.status === 'Suspended' ? 'Authorize' : 'Restrict'}
                      >
                        {user.status === 'Suspended' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/30 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Showing {Math.min((currentPage - 1) * pageSize + 1, filtered.length)}–{Math.min(currentPage * pageSize, filtered.length)} <span className="text-slate-300 mx-1">/</span> {filtered.length} Records
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => dispatch(setPage(currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => dispatch(setPage(p))}
                className={`w-8 h-8 rounded-md text-[10px] font-bold uppercase transition-all border ${p === currentPage ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => dispatch(setPage(currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-md flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      <Modal isOpen={!!viewUser} onClose={() => setViewUser(null)} title="Personnel Dossier" size="md">
        {viewUser && (
          <div className="space-y-6">
            {/* 1. Header Section */}
            <div className="flex items-start gap-5 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <Avatar initials={viewUser.avatar} size="xl" className="w-full h-full" />
              </div>
              <div className="flex-1 mt-1">
                <p className="text-lg font-bold text-slate-900 leading-tight">{viewUser.name}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-slate-400">
                  <Mail size={12} className="text-primary/60" />
                  <p className="text-[11px] font-medium uppercase tracking-wider">{viewUser.email}</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border shadow-sm ${viewUser.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    {viewUser.status}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100">
                    {viewUser.role}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-white border border-slate-100 flex items-center justify-center text-slate-300 shadow-sm">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Registry Date</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{viewUser.joined}</p>
                </div>
              </div>
              <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-white border border-slate-100 flex items-center justify-center text-slate-300 shadow-sm">
                  <Building2 size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Asset Count</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{viewUser.properties} Units</p>
                </div>
              </div>
            </div>

            {/* 3. Contact Matrix */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Signal Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50/30 rounded-md border border-slate-100">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Primary Link</p>
                  <p className="text-xs font-bold text-slate-700 tabular-nums">{viewUser.phone}</p>
                </div>
                {viewUser.altPhone && (
                  <div className="p-3 bg-slate-50/30 rounded-md border border-slate-100">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Secondary Link</p>
                    <p className="text-xs font-bold text-slate-700 tabular-nums">{viewUser.altPhone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Geospatial Data */}
            {viewUser.address && (
              <div>
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Geospatial Location
                </h4>
                <div className="bg-slate-50/50 rounded-lg p-4 border border-slate-100">
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 text-primary/60">
                      <MapPin size={16} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex gap-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        <span>{viewUser.address.city}</span>
                        <span className="text-slate-200">/</span>
                        <span>{viewUser.address.location}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{viewUser.address.fullAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button onClick={() => setViewUser(null)} className="px-5 py-2.5 border border-slate-200 bg-white rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:bg-slate-50 transition-all">Dismiss</button>
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-md active:scale-95">Initiate Signal</button>
            </div>
          </div>
        )}
      </Modal>
    </div >
  );
}

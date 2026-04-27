import { useNavigate } from 'react-router-dom';
import { supportTickets } from '../data/mockData';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import { Search, Filter, MessageCircle, Clock, CheckCircle2, AlertCircle, Eye, Activity, Timer } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../components/ui/Select';
import { selectFilteredTickets, setStatusFilter, setCategoryFilter, setPriorityFilter } from '../features/support/supportSlice';

export default function Support() {
  const navigate = useNavigate();
  const tickets = useSelector(selectFilteredTickets);
  const dispatch = useDispatch();
  const { statusFilter, priorityFilter } = useSelector((state) => state.tickets);
  const stats = [
    { id: 1, label: 'Open Tickets', value: '12', change: '+2', trend: 'up', Icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 2, label: 'In Progress', value: '5', change: '-1', trend: 'down', Icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, label: 'Resolved Today', value: '18', change: '+4', trend: 'up', Icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 4, label: 'Avg Response Time', value: '2.4h', change: '-15%', trend: 'down', Icon: Timer, color: 'text-violet-500', bg: 'bg-violet-50' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'badge-red';
      case 'Medium': return 'badge-amber';
      case 'Low': return 'badge-blue';
      default: return 'badge-slate';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': return <AlertCircle size={14} className="text-blue-500" />;
      case 'In Progress': return <Clock size={14} className="text-amber-500" />;
      case 'Closed': return <CheckCircle2 size={14} className="text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Support Overview</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Manage customer inquiries and technical assistance requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95">
          <MessageCircle size={16} />New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center`}>
                <stat.Icon size={18} className={stat.color} />
              </div>
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-sm ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-500 bg-rose-50 border-rose-100'}`}>
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-slate-50/30 border-b border-slate-100 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search support tickets..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-md outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="w-40">
            <Select
              value={priorityFilter}
              onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
              options={['All', 'High', 'Medium', 'Low']}
              placeholder="Priority"
            />
          </div>
          <div className="w-40">
            <Select
              value={statusFilter}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              options={['All', 'Open', 'In Progress', 'Closed']}
              placeholder="Status"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="group hover:bg-slate-50/30 transition-all">
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400 tracking-tight">#ST-{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[180px] text-sm font-bold text-slate-900 truncate tracking-tight group-hover:text-primary transition-colors" title={ticket.subject}>
                      {ticket.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600">{ticket.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ticket.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${ticket.priority === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : ticket.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${ticket.status === 'Open' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-400 tabular-nums">{ticket.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/support/${ticket.id}`)}
                      className="p-2 rounded-xl btn-action-view shadow-sm"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Showing {tickets.length} of 24 tickets</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-400 cursor-not-allowed shadow-sm" disabled>Previous</button>
            <button className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}


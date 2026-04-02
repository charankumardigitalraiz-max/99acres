import { useNavigate } from 'react-router-dom';
import { supportTickets } from '../data/mockData';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import { Search, Filter, MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredTickets, setStatusFilter, setCategoryFilter, setPriorityFilter } from '../features/support/supportSlice';

export default function Support() {
  const navigate = useNavigate();
  const tickets = useSelector(selectFilteredTickets);
  const dispatch = useDispatch();
  const stats = [
    { id: 1, label: 'Open Tickets', value: '12', change: '+2', trend: 'up', icon: 'chart', color: 'blue' },
    { id: 2, label: 'In Progress', value: '5', change: '-1', trend: 'down', icon: 'chart', color: 'amber' },
    { id: 3, label: 'Resolved Today', value: '18', change: '+4', trend: 'up', icon: 'chart', color: 'green' },
    { id: 4, label: 'Avg ResponsTime', value: '2.4h', change: '-15%', trend: 'down', icon: 'chart', color: 'purple' },
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
    <div className="space-y-6">
      <div className="page-header flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Support Management</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor and respond to user inquiries and technical issues.</p>
        </div>
        <button className="btn-primary w-full sm:w-auto">
          <MessageCircle size={16} />
          Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.id} className="hover-lift">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="card glass-card">
        <div className="card-header border-b-0 pb-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
            <div className="relative flex-1 max-w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search tickets..."
                className="form-input pl-10 w-full"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="btn-secondary py-2 flex-1 sm:flex-none justify-center">
                <Filter size={14} />
                Filters
              </button>
              <select onChange={(e) => dispatch(setPriorityFilter(e.target.value))} className="form-input py-2 w-full sm:w-auto cursor-pointer">
                <option value="All">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select onChange={(e) => dispatch(setStatusFilter(e.target.value))} className="form-input py-2 w-full sm:w-auto cursor-pointer">
                <option value="All">Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <select onChange={(e) => dispatch(setCategoryFilter(e.target.value))} className="form-input py-2 w-full sm:w-auto cursor-pointer">
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>User</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="font-medium text-slate-900">{ticket.id}</td>
                  <td>
                    <div className="max-w-[200px] truncate" title={ticket.subject}>
                      {ticket.subject}
                    </div>
                  </td>
                  <td>{ticket.user}</td>
                  <td>
                    <span className="text-xs text-slate-500">{ticket.category}</span>
                  </td>
                  <td>
                    <span className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <span className="text-sm">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="text-slate-500">{ticket.date}</td>
                  <td className="text-right">
                    <button 
                      onClick={() => navigate(`/support/${ticket.id}`)}
                      className="btn-ghost text-primary py-1 px-3"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body border-t border-border flex items-center justify-between py-3">
          <p className="text-xs text-slate-500">Showing 5 of 24 tickets</p>
          <div className="flex gap-2">
            <button className="btn-secondary py-1 px-3 text-xs disabled:opacity-50" disabled>Previous</button>
            <button className="btn-secondary py-1 px-3 text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

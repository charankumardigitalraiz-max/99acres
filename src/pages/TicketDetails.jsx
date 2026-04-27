import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supportTickets } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import {
  ArrowLeft, Mail, Phone, Clock, AlertCircle,
  CheckCircle2, MessageSquare, Send, User,
  Shield, Calendar, MoreVertical, Edit2
} from 'lucide-react';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');

  const ticket = supportTickets.find(t => t.id === id);

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border mt-10">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Ticket not found</h2>
        <p className="text-slate-500 mt-1">The support ticket you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/support')} className="mt-6 btn-secondary">
          <ArrowLeft size={14} /> Back to Support
        </button>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Low': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
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

  // return (
  return (
    <div className="bg-[#F8FAFC] pb-20 -m-4 lg:-m-6 px-4 lg:px-6">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/support')}
            className="flex items-center h-9 w-9 border border-slate-200 rounded-md justify-center hover:bg-slate-50 transition-all text-slate-500 shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 leading-none">#ST-{ticket.id}</h2>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">{ticket.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
            <Edit2 size={14} /> Edit
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:opacity-90">
            <CheckCircle2 size={14} /> Resolve
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Content Area (LHS) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Ticket Description */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield size={16} className="text-primary" /> Ticket Description
              </h3>
              <div className="text-slate-600 text-sm leading-relaxed font-medium bg-slate-50/50 p-5 rounded-lg border border-slate-100">
                {ticket.description}
              </div>
            </div>

            {/* Conversation/Timeline */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" /> Activity Log
              </h3>

              <div className="space-y-6">
                {ticket.messages.map((msg, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                        {msg.sender.substring(0, 1)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`p-4 rounded-lg border transition-all ${msg.role === 'admin'
                        ? 'bg-slate-50 text-slate-800 border-slate-200'
                        : 'bg-white text-slate-700 border-slate-100'
                        }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">
                            {msg.sender} {msg.role === 'admin' && <span className="text-primary">• Staff</span>}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed font-medium">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your response to the user..."
                    className="w-full min-h-[120px] p-4 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium outline-none pr-12"
                  />
                  <button
                    className="absolute bottom-3 right-3 p-2 bg-primary text-white rounded-md shadow-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                    disabled={!reply.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area (RHS) */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Details */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} className="text-primary" /> Requestor
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400">
                    {ticket.user.substring(0, 1)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-none mb-1.5">{ticket.user}</h4>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Premium Member
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-2 truncate">
                      <Mail size={12} className="text-primary" /> {ticket.email}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <Phone size={12} className="text-amber-500" /> {ticket.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Metadata */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Clock size={16} className="text-primary" /> Ticket Metadata
              </h3>

              <div className="space-y-5">
                {[
                  { label: 'Date Submitted', value: ticket.date, icon: Calendar },
                  { label: 'Current Status', value: ticket.status, icon: () => getStatusIcon(ticket.status) },
                  { label: 'Category', value: ticket.category, icon: Shield },
                  { label: 'Avg Response', value: '2 hours', icon: Clock },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                      {typeof item.icon === 'function' ? item.icon() : <item.icon size={16} />}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

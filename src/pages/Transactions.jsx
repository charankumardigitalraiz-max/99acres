import { useState } from 'react';
import { Search, Filter, Download, CreditCard, ArrowUpRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { transactionsData } from '../data/mockData';
import Badge from '../components/ui/Badge';

const statusColors = {
    Completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Failed: 'bg-rose-50 text-rose-600 border-rose-100',
};

const statusIcons = {
    Completed: <CheckCircle2 size={12} />,
    Pending: <Clock size={12} />,
    Failed: <XCircle size={12} />,
};

export default function Transactions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredTransactions = transactionsData.filter(txn => {
        const matchesSearch = txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || txn.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        <span className="text-primary/80">Financial Ledger</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span>Revenue Stream Control</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Transaction History</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                        <Download size={14} className="text-primary" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Revenue', value: '₹2,24,492', sub: '+12.5% from last month', icon: <ArrowUpRight size={16} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Pending Volume', value: '₹49,999', sub: '2 transactions awaiting', icon: <Clock size={16} />, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Success Rate', value: '98.2%', sub: 'Based on 450+ txns', icon: <CreditCard size={16} />, color: 'text-blue-500', bg: 'bg-blue-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/40">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-sm`}>
                                {stat.icon}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time</div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 mb-1 tabular-nums tracking-tight">{stat.value}</p>
                        <p className="text-[10px] font-bold text-slate-500">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by ID or User Name..."
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        className="flex-1 md:flex-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                    {/* <button className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-primary transition-all active:scale-95 shadow-md">
                        <Filter size={18} />
                    </button> */}
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/40 overflow-hidden">
                <table className="data-table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Service Type</th>
                            <th>Payment Info</th>
                            <th>Amount</th>
                            <th className="text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((txn) => (
                            <tr key={txn.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="w-24">
                                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">#{txn.id.split('-')[1]}</span>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800">{txn.user}</span>
                                        <span className="text-[10px] font-medium text-slate-400">{txn.email}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-xs font-bold text-slate-600">{txn.type}</span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                            <CreditCard size={12} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{txn.method}</span>
                                            <span className="text-[9px] font-medium text-slate-400">{txn.date}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-sm font-bold text-slate-900 tabular-nums">{txn.amount}</span>
                                </td>
                                <td className="text-right">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[8px] font-bold uppercase tracking-widest shadow-sm ${statusColors[txn.status]}`}>
                                        {statusIcons[txn.status]}
                                        {txn.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredTransactions.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <AlertCircle size={24} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching activities discovered</p>
                    </div>
                )}
            </div>
        </div>
    );
}

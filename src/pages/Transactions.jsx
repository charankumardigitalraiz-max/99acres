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
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900 leading-none">Transaction History</h2>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium">Monitor platform revenue and payments</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <Download size={14} className="text-primary" /> Export Data
                </button>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Revenue', value: '₹2,24,492', icon: ArrowUpRight, color: 'text-emerald-500' },
                    { label: 'Pending Volume', value: '₹49,999', icon: Clock, color: 'text-amber-500' },
                    { label: 'Success Rate', value: '98.2%', icon: CreditCard, color: 'text-blue-500' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center">
                                <s.icon size={18} className={s.color} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{s.label}</p>
                                <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{s.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-md outline-none focus:border-primary transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <select
                        className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-md outline-none bg-white transition-all cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr className="bg-slate-50/30 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-16">ID</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Service Type</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment Info</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredTransactions.map((txn) => (
                                <tr key={txn.id} className="group hover:bg-slate-50/30 transition-all">
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold text-slate-400 tabular-nums">#TXN-{txn.id.split('-')[1]}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-slate-900 leading-none text-sm group-hover:text-primary transition-colors">{txn.user}</p>
                                            <p className="text-[10px] text-slate-500 mt-1 font-medium">{txn.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{txn.type}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                <CreditCard size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{txn.method}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">{txn.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900 tabular-nums">{txn.amount}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : txn.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${txn.status === 'Completed' ? 'bg-emerald-500' : txn.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTransactions.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 border border-slate-100">
                            <AlertCircle size={20} className="text-slate-300" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No matching transactions discovered</p>
                    </div>
                )}
            </div>
        </div>
    );
};
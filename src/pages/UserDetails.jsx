import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import { selectPropertiesByUserId, selectWishlistedProperties } from '../features/products/productsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import {
    Building2, MapPin, Eye, CheckCircle, XCircle,
    ArrowLeft, Mail, Phone, Calendar, Activity,
    User, Download, ChevronRight, Star,
    Shield, Clock, TrendingUp, MessageSquare,
    Zap, Ban, Maximize2, Edit2, Heart
} from 'lucide-react';

const typeColors = {
    Villas: 'bg-emerald-50 text-emerald-600',
    home: 'bg-blue-50 text-blue-600',
    Plots: 'bg-amber-50 text-amber-600',
    Flats: 'bg-violet-50 text-violet-600',
    Commercial: 'bg-rose-50 text-rose-600',
    'Independent House': 'bg-indigo-50 text-indigo-600',
    Appartments: 'bg-sky-50 text-sky-600',
    Lands: 'bg-orange-50 text-orange-600',
    other: 'bg-slate-50 text-slate-600',
};

const statusColor = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Inactive: 'bg-slate-100 text-slate-600 border-slate-200',
    Suspended: 'bg-rose-50 text-rose-600 border-rose-100',
};

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = useSelector((state) => selectUserById(state, id));
    const properties = useSelector((state) => selectPropertiesByUserId(state, id)) || [];
    const wishlistItems = useSelector((state) => selectWishlistedProperties(state, user?.wishlist));
    const isSeller = user?.role === 'Seller' || user?.role === 'Agent';
    const isBuyer = user?.role === 'Buyer';

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 mt-10">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <User size={32} className="text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">User not found</h2>
                <p className="text-slate-500 mt-1 text-sm">The user you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate(-1)} className="mt-6 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-sm font-bold text-slate-600 flex items-center gap-2">
                    <ArrowLeft size={14} /> Back to Users
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center h-9 w-9 border border-slate-200 rounded-md justify-center hover:bg-slate-50 transition-all text-slate-500 shadow-sm"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-slate-900 leading-none">User Profile</h2>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor[user.status] || statusColor.Inactive}`}>
                                {user.status}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5">ID: #USR-{user.id} • Joined on {user.joined}</p>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
                        <Download size={14} /> Export
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-red-100 text-red-600 hover:bg-red-50 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
                        <Ban size={14} /> Suspend
                    </button>
                </div>
            </div>

            {/* Profile Identity Card */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative shrink-0">
                        <div className="h-24 w-24 rounded-lg bg-primary text-white flex items-center justify-center text-4xl font-semibold shadow-md overflow-hidden font-mono">
                            {user.name.substring(0, 1)}
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {user.status === 'Active' ? <CheckCircle size={14} className="text-white" /> : <XCircle size={14} className="text-white" />}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 leading-none">{user.name}</h3>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${user.role === 'Agent' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    user.role === 'Seller' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        'bg-purple-50 text-purple-700 border-purple-100'
                                }`}>
                                {user.role}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-sm font-semibold text-slate-800">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                                <p className="text-sm font-semibold text-slate-800">{user.phone || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                                <p className="text-sm font-semibold text-slate-800">{user.city || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subscription</p>
                                <p className="text-sm font-bold text-primary">{user.subscription || 'Free'}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <MapPin size={14} /> Registered Address
                            </p>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">{user.address?.fullAddress || 'Address not provided'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT: Properties + Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Properties */}
                    {isSeller && (
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <Building2 size={16} className="text-primary" /> Property Listings
                                </h3>
                                <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">{properties.length} Listings</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Property</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {properties.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-10 text-center text-xs font-medium text-slate-400">No properties listed</td>
                                            </tr>
                                        ) : properties.map(prop => (
                                            <tr key={prop.id} className="hover:bg-slate-50 transition-all group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-md overflow-hidden border border-slate-200 shrink-0">
                                                            <img src={prop.coverPhoto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150'} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors mb-0.5">{prop.title}</p>
                                                            <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1"><MapPin size={10} />{prop.city}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${typeColors[prop.propertyType] || 'bg-slate-50 text-slate-500'}`}>{prop.propertyType}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-slate-900 tabular-nums">{prop.price}</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => navigate(`/properties/${prop.id}`)} className="p-2 rounded-md bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-500 transition-all">
                                                        <Eye size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Wishlist - Only for Buyers */}
                    {isBuyer && (
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <Heart size={16} className="text-rose-500 fill-rose-500" /> My Wishlist
                                </h3>
                                <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">{wishlistItems.length} Items</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Property</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {wishlistItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-10 text-center text-xs font-medium text-slate-400">Wishlist is empty</td>
                                            </tr>
                                        ) : wishlistItems.map(prop => (
                                            <tr key={prop.id} className="hover:bg-slate-50 transition-all group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-md overflow-hidden border border-slate-200 shrink-0">
                                                            <img src={prop.coverPhoto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150'} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors mb-0.5">{prop.title}</p>
                                                            <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1"><MapPin size={10} />{prop.city}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${typeColors[prop.propertyType] || 'bg-slate-50 text-slate-500'}`}>{prop.propertyType}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-slate-900 tabular-nums">{prop.price}</p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => navigate(`/properties/${prop.id}`)} className="p-2 rounded-md bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-500 transition-all">
                                                        <Eye size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Transactions */}
                    {user.transactions?.length > 0 && isSeller && (
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-500" /> Payment History
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {user.transactions.map((txn, i) => (
                                    <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-all">
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 mb-0.5 capitalize">{txn.type}</p>
                                            <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                <Clock size={12} /> {txn.date}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900 tabular-nums">{txn.amount}</p>
                                            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${txn.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{txn.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: Messages + Reports */}
                <div className="space-y-6">
                    {/* Messages */}
                    {user.chats?.length > 0 && (
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <MessageSquare size={16} className="text-primary" /> Messages
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {user.chats.map((chat, i) => (
                                    <div key={i} className="flex items-start gap-3 px-6 py-4 hover:bg-slate-50 transition-all cursor-pointer group">
                                        <div className="relative shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                                                {chat.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {chat.unread && <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="text-xs font-bold text-slate-800 truncate">{chat.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium shrink-0">{chat.time}</p>
                                            </div>
                                            <p className="text-[11px] text-slate-500 truncate">{chat.msg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {user.activity?.length > 0 && (
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <Activity size={16} className="text-blue-500" /> Recent Activity
                                </h3>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {user.activity.map((act, i) => (
                                    <div key={i} className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition-all">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-[11px] font-semibold text-slate-700">{act.action}</p>
                                        </div>
                                        <p className="text-[10px] font-medium text-slate-400 shrink-0">{act.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reports/Flags */}
                    {user.reports?.length > 0 && isSeller && (
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <Shield size={16} className="text-rose-500" /> Security Reports
                                </h3>
                                <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold border border-rose-100">{user.reports.length} flags</span>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {user.reports.map(report => (
                                    <div key={report.id} className="flex items-start justify-between px-6 py-4 hover:bg-rose-50/30 transition-all">
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 mb-0.5">{report.reason}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{report.date}</p>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mt-0.5 ${report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import { selectPropertiesByUserId, selectPropertyById, updatePropertyStatus } from '../features/products/productsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import {
    Building2, MapPin, Eye, CheckCircle, XCircle,
    ArrowLeft, Mail, Phone, Calendar, Activity,
    User, Map as MapIcon, Building, Download,
    ExternalLink, ChevronRight, Briefcase, Star,
    Shield, Clock, PieChart, TrendingUp, MessageSquare,
    UserPlus, Slash, MoreVertical, Edit2, Ban
} from 'lucide-react';

const typeColors = {
    villas: 'bg-emerald-50 text-emerald-600',
    home: 'bg-blue-50 text-blue-600',
    plots: 'bg-amber-50 text-amber-600',
    flats: 'bg-violet-50 text-violet-600',
    commercial: 'bg-rose-50 text-rose-600',
    'independent house': 'bg-indigo-50 text-indigo-600',
    Appartments: 'bg-sky-50 text-sky-600',
    Lands: 'bg-orange-50 text-orange-600',
    other: 'bg-slate-50 text-slate-600',
};

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInformation = useSelector((state) => selectUserById(state, id));
    const propertyInformation = useSelector((state) => selectPropertiesByUserId(state, id)) || [];

    const stats = [
        { label: 'Total Assets', value: propertyInformation.length, icon: Building2, color: 'blue' },
        { label: 'Active Status', value: userInformation?.status || 'Active', icon: Activity, color: 'emerald' },
        { label: 'Subscription', value: userInformation?.subscription || 'Free', icon: Star, color: 'amber' },
        { label: 'Member Since', value: userInformation?.joined ? userInformation.joined.split('-')[0] : '2024', icon: Clock, color: 'purple' },
        { label: 'Reports', value: userInformation?.reports?.length || '0', icon: Shield, color: 'rose' },
    ];

    const usertypeBadge = (user) => {
        if (!user) return 'bg-slate-50 text-slate-600 border-slate-200';
        if (user.role === 'Agent') return 'bg-blue-50 text-blue-600 border-blue-200';
        if (user.role === 'Seller') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
        if (user.role === 'Buyer') return 'bg-purple-50 text-purple-600 border-purple-200';
        return 'bg-slate-50 text-slate-600 border-slate-200';
    };

    if (!userInformation) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border mt-10">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <User size={32} className="text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">User not found</h2>
                <p className="text-slate-500 mt-1">The user you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate('/users')} className="mt-6 btn-secondary">
                    <ArrowLeft size={14} /> Back to Users
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 -m-4 lg:-m-6 px-4 lg:px-6">
            {/* ─── STAGE 1: IMMERSIVE TOP BANNER ────────────────────────────────────── */}
            <div className="relative min-h-[300px] lg:h-[280px] bg-slate-900 overflow-hidden -mx-4 lg:-mx-6 mb-[-120px] lg:mb-[-140px] z-0">
                {/* Background Pattern / Grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-36 lg:pb-60 pt-20 lg:pt-0">
                    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-0">
                        <div>
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => navigate('/users')}
                                    className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white transition-all active:scale-95 group shrink-0"
                                >
                                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-black text-white tracking-tight leading-none mb-2">Back to Users</h1>
                                    {/* <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        Managing Security Clearance Layer 4 <ChevronRight size={12} />
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                            <button className="flex-1 lg:flex-none justify-center px-4 lg:px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 lg:gap-3">
                                <Download size={14} className="text-primary" /> Export
                            </button>
                            {/* <button className="flex-1 lg:flex-none justify-center px-4 lg:px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all flex items-center gap-2 lg:gap-3 active:scale-95">
                                <Edit2 size={14} /> Update
                            </button> */}

                            <button className="flex-1 lg:flex-none justify-center px-4 lg:px-6 py-3 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-rose-500/40 hover:bg-rose-600 transition-all flex items-center gap-2 lg:gap-3 active:scale-95">
                                <Ban size={14} /> Block
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── STAGE 2: MAIN CONTENT GRID ────────────────────────────────────────── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LHS: SIDEBAR HUB (33%) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Floating Primary Identity Card */}
                        <div className="bg-white rounded-[2.5rem]  p-8 border border-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <Avatar initials={userInformation.avatar} size="2xl" className="ring-[12px] ring-slate-50 shadow-2xl border-none" />
                                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-xl flex items-center justify-center text-white">
                                        <CheckCircle size={14} />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{userInformation.name}</h2>
                                <Badge variant={userInformation.status === 'Active' ? 'green' : 'red'} className="text-[10px] font-black uppercase tracking-widest px-4 py-1 shadow-sm">
                                    {userInformation.status}
                                </Badge>

                                <div className="grid grid-cols-1 w-full gap-3 mt-8">
                                    <div className={`flex items-center justify-center gap-2 py-3 rounded-2xl border shadow-sm ${usertypeBadge(userInformation)}`}>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{userInformation.role} Account</span>
                                    </div>
                                    {userInformation.subscription && (
                                        <div className={`flex items-center justify-center gap-2 py-3 rounded-2xl border shadow-sm ${userInformation.subscription === 'Premium' ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20' :
                                            userInformation.subscription === 'Standard' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                'bg-slate-50 text-slate-400 border-slate-200'
                                            }`}>
                                            <Star size={12} fill={userInformation.subscription !== 'Free' ? 'currentColor' : 'none'} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{userInformation.subscription} Tier</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Validation Console */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-8 border border-slate-100/50">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <Mail size={14} className="text-primary" /> Verification channels
                            </h3>
                            <div className="space-y-6">
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">Email Matrix <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" /></p>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <p className="text-sm font-bold text-slate-800 truncate leading-none">{userInformation.email}</p>
                                    </div>
                                </div>
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">Cellular Stream <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" /></p>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <p className="text-sm font-bold text-slate-800 tabular-nums leading-none">{userInformation.phone}</p>
                                    </div>
                                </div>
                                <div className="group cursor-pointer">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">Secure Signal <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" /></p>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <p className="text-sm font-bold text-slate-800 tabular-nums leading-none">{userInformation.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Physical Metadata */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-8 border border-slate-100/50">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <MapPin size={14} className="text-primary" /> Physical Metadata
                            </h3>
                            <div className="flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
                                {userInformation.address?.city} <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {userInformation.address?.location}
                            </div>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                                "{userInformation.address?.fullAddress}"
                            </p>
                        </div>

                        {/* Recent Transactions Vault */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
                            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <PieChart size={16} className="text-primary" /> Financial History
                                </h3>
                                <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
                                    Full Ledger
                                </button>
                            </div>
                            <div className="p-8 space-y-4">
                                {(userInformation.transactions || []).map((txn, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl transition-all group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                <TrendingUp size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 leading-none mb-2">{txn.type}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{txn.id}</span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{txn.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900 tabular-nums leading-none mb-2">{txn.amount}</p>
                                            <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-${txn.color}-50 text-${txn.color}-600 inline-block`}>
                                                {txn.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RHS: FUNCTIONAL FEED (66%) */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* KPI Metrics Dashboard */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {stats.map((s, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100  transition-all cursor-pointer group">
                                    <div className={`w-10 h-10 rounded-2xl bg-${s.color}-50 flex items-center justify-center text-${s.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                                        <s.icon size={16} />
                                    </div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 truncate">{s.label}</p>
                                    <p className="text-lg font-black text-slate-900 tabular-nums truncate leading-none">{s.value}</p>
                                </div>
                            ))}
                        </div>



                        {/* Secure Messaging Interface */}


                        {/* Optimized Investment Portfolio */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <Building2 size={16} className="text-primary" /> Active Investment Clusters
                                </h3>
                                <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95">
                                    Bulk Export <ChevronRight size={10} />
                                </button>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Deployment</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Architecture</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Market Valuation</th>
                                                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Operations</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {propertyInformation.map(prop => (
                                                <tr key={prop.id} className="group hover:bg-slate-50/80 transition-all">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                                                                <img src={prop.coverPhoto || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150&auto=format&fit=crop`} className="w-full h-full object-cover rounded-xl" alt="Prop" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-800 text-base group-hover:text-primary transition-colors mb-1">{prop.title}</p>
                                                                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                                                    <MapPin size={10} /> {prop.city} <div className="w-1 h-1 rounded-full bg-slate-300" /> {prop.propertyLength}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border shadow-sm ${typeColors[prop.propertyType] || 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                            {prop.propertyType}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 tabular-nums">
                                                        <div className="font-black text-slate-900 text-base">{prop.price}</div>
                                                        <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                                            <Activity size={10} /> Verified Data
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => navigate(`/products/${prop.id}`)}
                                                                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:shadow-xl transition-all"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            {/* <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                                                                <MoreVertical size={18} />
                                                            </button> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* User Reports Log Section */}
                        {userInformation.reports?.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                        <Shield size={16} className="text-rose-500" /> Administrative Report log
                                    </h3>
                                    <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-rose-100">
                                        {userInformation.reports.length} Active Flags
                                    </span>
                                </div>

                                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
                                    <div className="p-8 space-y-4">
                                        {userInformation.reports.map((report) => (
                                            <div key={report.id} className="flex items-center justify-between p-5 bg-rose-50/30 border border-rose-100/50 rounded-2xl hover:bg-rose-50 transition-all group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                                        <XCircle size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1.5">
                                                            <p className="text-sm font-black text-slate-800 leading-none">{report.reason}</p>
                                                            <span className="text-[8px] text-rose-600 font-black uppercase tracking-widest bg-rose-100 px-2 py-0.5 rounded-full">{report.status}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reported by {report.reporter}</span>
                                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{report.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="px-4 py-2 bg-white border border-rose-200 rounded-xl text-[9px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95">
                                                    Investigate
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
                            <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <MessageSquare size={16} className="text-primary" /> Secure Communications
                                </h3>
                                <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
                                    Messaging Box
                                </button>
                            </div>
                            <div className="p-8 space-y-4">
                                {(userInformation.chats || []).map((chat, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl transition-all group cursor-pointer">
                                        <div className="flex items-center gap-5">
                                            <div className="relative">
                                                <Avatar initials={chat.name.split(' ').map(n => n[0]).join('')} size="md" className="ring-4 ring-white shadow-lg" />
                                                {chat.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full ring-2 ring-white" />}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-3 mb-1.5">
                                                    <p className="text-sm font-black text-slate-800 leading-none">{chat.name}</p>
                                                    <span className="text-[8px] text-primary font-black uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">{chat.role}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 font-bold truncate max-w-[200px] md:max-w-md">{chat.msg}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter whitespace-nowrap mb-1.5">{chat.time}</p>
                                            {chat.unread && <div className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase rounded-full">New</div>}
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

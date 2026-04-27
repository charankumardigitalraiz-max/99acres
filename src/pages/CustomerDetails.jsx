import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import { selectPropertiesByUserId } from '../features/products/productsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import {
    Building2, MapPin, Eye,
    ArrowLeft, Mail, Activity,
    User, Download, Star,
    Shield, Clock, TrendingUp,
    Ban, Phone, Home, CreditCard, AlertCircle,
    Globe, Calendar
} from 'lucide-react';

const typeColors = {
    villas: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    home: 'bg-blue-100 text-blue-700 border-blue-200',
    plots: 'bg-amber-100 text-amber-700 border-amber-200',
    flats: 'bg-violet-100 text-violet-700 border-violet-200',
    commercial: 'bg-rose-100 text-rose-700 border-rose-200',
    'independent house': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    Appartments: 'bg-sky-100 text-sky-700 border-sky-200',
    Lands: 'bg-orange-100 text-orange-700 border-orange-200',
    other: 'bg-slate-100 text-slate-600 border-slate-200',
};

const roleConfig = {
    Agent: { bg: 'bg-blue-600', light: 'bg-blue-50 text-blue-700 border-blue-200', color: 'text-blue-600' },
    Seller: { bg: 'bg-emerald-600', light: 'bg-emerald-50 text-emerald-700 border-emerald-200', color: 'text-emerald-600' },
    Buyer: { bg: 'bg-violet-600', light: 'bg-violet-50 text-violet-700 border-violet-200', color: 'text-violet-600' },
};

export default function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const userInformation = useSelector((state) => selectUserById(state, id));
    const propertyInformation = useSelector((state) => selectPropertiesByUserId(state, id)) || [];

    const role = userInformation?.role || 'Buyer';
    const cfg = roleConfig[role] || roleConfig.Buyer;

    if (!userInformation) {
        return (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 mt-10 shadow-card">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100">
                    <User size={32} className="text-slate-300" />
                </div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Customer not found</h2>
                <p className="text-slate-400 text-sm mt-2 max-w-xs text-center leading-relaxed">This record might have been moved or permanently deleted from the database.</p>
                <button onClick={() => navigate('/customers')} className="mt-8 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                    <ArrowLeft size={16} /> Return to Directory
                </button>
            </div>
        );
    }

    const stats = [
        { label: 'Listings', value: propertyInformation.length, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Rating', value: '4.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Reports', value: userInformation?.reports?.length || 0, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
        { label: 'Joined', value: userInformation?.joined ? userInformation.joined.split('-')[0] : '2024', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-6 pb-20">
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
                            <h2 className="text-xl font-semibold text-slate-900 leading-none">Customer Profile</h2>
                            <Badge variant={userInformation.status === 'Active' ? 'green' : 'slate'} className="rounded-md">
                                {userInformation.status}
                            </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5">ID: #CST-{userInformation.id} • Registered since {userInformation.joined}</p>
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
                    <div className="shrink-0 relative">
                        <div className="h-24 w-24 rounded-lg bg-primary text-white flex items-center justify-center text-4xl font-semibold shadow-md overflow-hidden font-mono">
                            {userInformation.name.substring(0, 1)}
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${userInformation.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                            <Activity size={12} className="text-white" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 leading-none">{userInformation.name}</h3>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${cfg.light}`}>
                                {role} Account
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((s, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</span>
                                    <div className="flex items-center gap-2">
                                        <s.icon size={14} className={s.color} />
                                        <span className="text-base font-bold text-slate-800 leading-none">{s.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Mail size={14} /> Contact Email
                                </p>
                                <p className="text-sm font-semibold text-slate-800">{userInformation.email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Phone size={14} /> Phone Number
                                </p>
                                <p className="text-sm font-semibold text-slate-800">{userInformation.phone || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── LEFT COLUMN ── */}
                <div className="space-y-6">
                    {/* Address Information */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <MapPin size={16} className="text-emerald-500" /> Registry Address
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">City / Region</p>
                                    <p className="text-sm font-semibold text-slate-800">{userInformation.address?.city || 'No City'} • {userInformation.address?.location || 'Central Region'}</p>
                                </div>
                                <div className="pt-4 border-t border-slate-50">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Address</p>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                        {userInformation.address?.fullAddress || 'Full registry address not available.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Timeline Mini */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <Activity size={16} className="text-blue-500" /> Recent Actions
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[
                                    { action: 'Last Login', date: '2 hours ago', icon: Clock },
                                    { action: 'Profile Update', date: '3 days ago', icon: Shield },
                                ].map((act, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
                                                <act.icon size={14} />
                                            </div>
                                            <p className="text-xs font-semibold text-slate-800">{act.action}</p>
                                        </div>
                                        <p className="text-[10px] font-medium text-slate-400">{act.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Property Portfolio */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <Building2 size={16} className="text-primary" /> Property Portfolio
                            </h3>
                            <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">{propertyInformation.length} Listings</span>
                        </div>

                        {propertyInformation.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-sm font-medium text-slate-400 italic">No properties mapped to this profile</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {propertyInformation.map((prop) => (
                                    <div key={prop.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-md overflow-hidden border border-slate-200 shrink-0">
                                                <img src={prop.coverPhoto || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors mb-1">{prop.title}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1"><MapPin size={10} />{prop.city}</span>
                                                    <Badge variant={prop.propertyType === 'Villas' ? 'green' : 'slate'} className="rounded-md scale-90 origin-left">
                                                        {prop.propertyType}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-slate-900 tabular-nums">{prop.price}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Listing Price</p>
                                            </div>
                                            <button onClick={() => navigate(`/properties/${prop.id}`)} className="p-2.5 rounded-md bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-500 transition-all">
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <CreditCard size={16} className="text-emerald-500" /> Financial Transactions
                            </h3>
                        </div>
                        <div className="p-6">
                            {(userInformation.transactions || []).length === 0 ? (
                                <p className="text-sm font-medium text-slate-400 text-center py-4 italic">No financial records found</p>
                            ) : (
                                <div className="space-y-4">
                                    {(userInformation.transactions || []).map((txn, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                    <TrendingUp size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 mb-0.5">{txn.type}</p>
                                                    <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                                                        <Clock size={12} /> {txn.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-slate-900 tabular-nums">{txn.amount}</p>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${txn.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                    {txn.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

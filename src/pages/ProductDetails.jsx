import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPropertyById, updatePropertyStatus } from '../features/products/productsSlice';
import { 
    Building2, ArrowLeft, Clock, Shield, ChevronDown, Star, ThumbsUp, 
    MessageSquare, Filter, SortAsc, LayoutGrid, Edit3, MapPin, 
    Maximize2, Info, XCircle, RotateCcw, CheckCircle, AlertOctagon
} from 'lucide-react';
import { reviewsData } from '../data/mockData';

import Modal from '../components/ui/Modal';
import PropertyForm from '../components/ui/PropertyForm';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector((state) => selectPropertyById(state, id));
    const [isEditing, setIsEditing] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [statusConfirm, setStatusConfirm] = useState(null); // { type: 'Verified' | 'Rejected', reason: '' }

    // Filter reviews for this property
    const reviews = useMemo(() => {
        return reviewsData.filter(r => r.propertyId === Number(id));
    }, [id]);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-slate-100 mt-10 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-md flex items-center justify-center mb-6 text-slate-300 border border-slate-100">
                    <Building2 size={40} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Registry Node Not Found</h2>
                <p className="text-slate-500 mt-2 text-sm max-w-xs text-center leading-relaxed">The requested property asset has been decommissioned or moved to a different sector.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-200"
                >
                    <ArrowLeft size={14} className="inline mr-2" /> Return to Terminal
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-md bg-white border border-slate-200 hover:border-primary/30 hover:bg-slate-50 text-slate-500 hover:text-primary transition-all shadow-sm group"
                    >
                        <ArrowLeft size={18} className="group-active:scale-90 transition-transform" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                            <span className="hover:text-primary transition-colors cursor-pointer">ADMINISTRATION</span>
                            <span className="text-slate-200">/</span>
                            <span className="hover:text-primary transition-colors cursor-pointer">ASSET REGISTRY</span>
                            <span className="text-slate-200">/</span>
                            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/10">PRP-{product.id.toString().padStart(4, '0')}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            {product.title}
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm ${product.status?.toLowerCase() === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                (product.status?.toLowerCase() === 'processing' || product.status?.toLowerCase() === 'pending' || product.status?.toLowerCase() === 'new') ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                    product.status?.toLowerCase() === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                        'bg-slate-50 text-slate-700 border-slate-200'
                                }`}>
                                {product.status}
                            </span>
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-5 py-2.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 active:scale-95 ${isEditing
                                ? 'bg-slate-100 text-slate-600 border border-slate-200 shadow-slate-200/50'
                                : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-slate-100'
                            }`}
                    >
                        <Edit3 size={14} /> {isEditing ? 'VIEW REGISTRY' : 'MODIFY RECORD'}
                    </button>

                    <div className="relative group">
                        <button
                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2 group active:scale-95"
                        >
                            Update Protocol <ChevronDown size={14} className={`transition-transform duration-300 ${showStatusDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showStatusDropdown && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowStatusDropdown(false)}></div>
                                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-1.5 space-y-1">
                                        {[
                                            { label: 'Verify Asset', val: 'Verified', color: 'text-emerald-600 hover:bg-emerald-50', icon: <CheckCircle size={14} /> },
                                            { label: 'Reject Asset', val: 'Rejected', color: 'text-rose-600 hover:bg-rose-50', icon: <XCircle size={14} /> },
                                            { label: 'Set Processing', val: 'Processing', color: 'text-amber-600 hover:bg-amber-50', icon: <Clock size={14} /> },
                                            { label: 'Reset Protocol', val: 'New', color: 'text-blue-600 hover:bg-blue-50', icon: <RotateCcw size={14} /> }
                                        ].map(opt => (
                                            <button
                                                key={opt.val}
                                                onClick={() => {
                                                    if (opt.val === 'Verified' || opt.val === 'Rejected') {
                                                        setStatusConfirm({ type: opt.val, reason: '' });
                                                    } else {
                                                        dispatch(updatePropertyStatus({ id: product.id, status: opt.val }));
                                                    }
                                                    setShowStatusDropdown(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${opt.color}`}>
                                                {opt.icon} {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-8 animate-in fade-in duration-700">
                {/* Hero Media Section */}
                {!isEditing && (
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <div className="relative aspect-[21/9] bg-slate-950 group">
                            <img
                                src={product.coverPhoto || product.images?.[0]}
                                alt={product.title}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1">Asset Valuation</p>
                                    <h3 className="text-3xl font-black text-white tracking-tight">{product.price}</h3>
                                </div>
                                <button
                                    onClick={() => setLightboxMedia(product.coverPhoto || product.images?.[0])}
                                    className="p-3 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-slate-900 transition-all border border-white/10 shadow-xl"
                                >
                                    <Maximize2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Media Strip */}
                        <div className="p-4 flex gap-4 overflow-x-auto border-t border-slate-100 bg-slate-50/30 no-scrollbar">
                            {(product.images || [product.coverPhoto]).map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setLightboxMedia(img)}
                                    className="relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border border-slate-200 ring-2 ring-transparent hover:ring-primary/40 transition-all group shadow-sm"
                                >
                                    <img src={img} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <PropertyForm 
                    initialData={product} 
                    isEditing={isEditing} 
                    onCancel={() => setIsEditing(false)}
                    onSubmit={(data) => {
                        console.log('Saving Data:', data);
                        setIsEditing(false);
                    }}
                />

                {/* Reviews Section - Positioned below the main form */}
                {!isEditing && (
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-700 delay-200">
                        <div className="p-8">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-8">
                                <MessageSquare size={14} className="text-primary" /> Personnel Feedback ({reviews.length})
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.length === 0 ? (
                                    <p className="text-xs text-slate-400 italic font-medium col-span-2">No system feedback available for this entry.</p>
                                ) : (
                                    reviews.map((review) => (
                                        <div key={review.id} className="p-5 bg-slate-50/50 rounded-lg border border-slate-100 flex gap-4 hover:border-slate-200 transition-all group">
                                            <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex justify-between items-start mb-1.5">
                                                    <p className="text-sm font-bold text-slate-900 leading-none">{review.user}</p>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={10} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{review.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Protocol Update Modal */}
            <Modal isOpen={!!statusConfirm} onClose={() => setStatusConfirm(null)}
                title={statusConfirm?.type === 'Verified' ? 'Protocol Verification' : 'Protocol Decommissioning'} size="md">
                <div className="space-y-8">
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-20 h-20 rounded-md border shadow-lg flex items-center justify-center mb-6 ${statusConfirm?.type === 'Verified' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'}`}>
                            {statusConfirm?.type === 'Verified' ? <CheckCircle size={40} /> : <AlertOctagon size={40} />}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                            {statusConfirm?.type === 'Verified' ? 'Verify Asset Entry?' : 'Authorization Denied'}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 max-w-[340px] leading-relaxed">
                            {statusConfirm?.type === 'Verified' ?
                                'This asset will be synchronized across the global registry and published to the public network.' :
                                'Please specify the rejection protocol reason. This dossier will be returned to the uploader for rectification.'}
                        </p>
                    </div>

                    {statusConfirm?.type === 'Rejected' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">REJECTION PROTOCOL REASON</label>
                            <div className="relative">
                                <MessageSquare size={16} className="absolute left-4 top-4 text-slate-400" />
                                <textarea
                                    value={statusConfirm.reason}
                                    onChange={(e) => setStatusConfirm({ ...statusConfirm, reason: e.target.value })}
                                    placeholder="Enter detailed rectification requirements..."
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all h-36 resize-none"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                        <button
                            onClick={() => setStatusConfirm(null)}
                            className="flex-1 px-6 py-3 rounded-md border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all active:scale-95">
                            Abort
                        </button>
                        <button
                            onClick={() => {
                                dispatch(updatePropertyStatus({
                                    id: product.id,
                                    status: statusConfirm.type,
                                    rejectionReason: statusConfirm.reason
                                }));
                                setStatusConfirm(null);
                            }}
                            disabled={statusConfirm?.type === 'Rejected' && !statusConfirm.reason?.trim()}
                            className={`flex-1 px-6 py-3 rounded-md text-[10px] font-bold uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${statusConfirm?.type === 'Verified' ? 'bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700' : 'bg-rose-600 shadow-rose-600/20 hover:bg-rose-700'}`}>
                            {statusConfirm?.type === 'Verified' ? 'Confirm Verification' : 'Execute Rejection'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

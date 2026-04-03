import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPropertyById, updatePropertyStatus } from '../features/products/productsSlice';
import { Building2, ArrowLeft, Clock, Shield, Trash2, ChevronDown } from 'lucide-react';

import Modal from '../components/ui/Modal';
import PropertyForm from '../components/ui/PropertyForm';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector((state) => selectPropertyById(state, id));
    const [statusToUpdate, setStatusToUpdate] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleStatusChange = (newStatus) => {
        if (newStatus === 'verified' || newStatus === 'rejected') {
            setStatusToUpdate(newStatus);
            setIsConfirmModalOpen(true);
        } else {
            dispatch(updatePropertyStatus({ id: product.id, status: newStatus }));
        }
    };

    const confirmStatusUpdate = () => {
        dispatch(updatePropertyStatus({ id: product.id, status: statusToUpdate }));
        setIsConfirmModalOpen(false);
        setStatusToUpdate(null);
    };

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border mt-10">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Building2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Property not found</h2>
                <p className="text-slate-500 mt-1">This listing might have been removed or doesn't exist.</p>
                <button
                    onClick={() => navigate('/properties')}
                    className="mt-6 px-4 py-2 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                    <ArrowLeft size={14} className="inline mr-2" /> Back to Listings
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header / Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 hover:bg-slate-50 text-slate-500 hover:text-primary transition-all shadow-sm"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                            <span className="hover:text-primary transition-colors cursor-pointer">Admin</span>
                            <span className="text-slate-200">/</span>
                            <span className="hover:text-primary transition-colors cursor-pointer">Listings</span>
                            <span className="text-slate-200">/</span>
                            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md">#PRP-{product.id}</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{product.title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select
                            value={product.status?.toLowerCase() || 'draft'}
                            onChange={(e) => handleStatusChange(e.target.value.toLowerCase())}
                            className={`appearance-none pr-10 pl-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border cursor-pointer outline-none transition-all shadow-sm ${product.status?.toLowerCase() === 'new' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                product.status?.toLowerCase() === 'processing' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    product.status?.toLowerCase() === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                        product.status?.toLowerCase() === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                        >
                            <option value="new">New</option>
                            <option value="processing">Processing</option>
                            <option value="draft">Draft</option>
                            <option value="rejected">Rejected</option>
                            <option value="verified">Verified</option>
                        </select>
                        <ChevronDown size={14} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${product.status?.toLowerCase() === 'new' ? 'text-blue-400' :
                            product.status?.toLowerCase() === 'processing' ? 'text-amber-400' :
                                product.status?.toLowerCase() === 'rejected' ? 'text-rose-400' :
                                    product.status?.toLowerCase() === 'verified' ? 'text-emerald-500' :
                                        'text-slate-400'
                            }`} />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="animate-in fade-in duration-500">
                <PropertyForm initialData={product} />
            </div>

            {/* Bottom Admin Actions Bar */}
            {/* <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-50 flex items-center px-6 lg:ml-60 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                            <Clock size={14} className="text-slate-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last scanned: 2 mins ago</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 shadow-sm">
                            <Shield size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Protocol Secured</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm">
                            Return to Listings
                        </button>
                    </div>
                </div>
            </div> */}

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="Confirm Status Update"
            >
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Are you sure you want to update the status of this property to <span className={`font-black uppercase tracking-widest ${statusToUpdate === 'verified' ? 'text-emerald-600' : 'text-rose-600'}`}>{statusToUpdate}</span>?
                        </p>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                        <button
                            onClick={() => setIsConfirmModalOpen(false)}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmStatusUpdate}
                            className={`px-6 py-2.5 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95 ${statusToUpdate === 'verified' ? 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600' : 'bg-rose-500 shadow-rose-500/20 hover:bg-rose-600'}`}
                        >
                            Confirm Update
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

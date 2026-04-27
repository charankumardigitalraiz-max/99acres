import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    ArrowLeft, MapPin, Building, Info, Layout,
    CheckCircle, Play, Image as ImageIcon, Users,
    Shield, Smartphone, MessageSquare, Activity, Check,
    AlertOctagon, XCircle, Edit3, Trash2
} from 'lucide-react';
import { updatePropertyStatus, selectPropertyById } from '../features/products/productsSlice';
import Modal from '../components/ui/Modal';
import PropertyForm from '../components/ui/PropertyForm2';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector((state) => selectPropertyById(state, id));
    const [isEditing, setIsEditing] = useState(false);
    const [activeMedia, setActiveMedia] = useState(null);
    const [lightboxMedia, setLightboxMedia] = useState(null);
    const [statusConfirm, setStatusConfirm] = useState(null);

    const getYouTubeID = (url) => {
        if (!url) return null;
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const displayMedia = activeMedia || { type: 'image', url: product?.coverPhoto || product?.images?.[0] };

    const onBack = () => navigate(-1);

    if (!product) return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-slate-50 rounded-xl border border-slate-200">
            <Building size={48} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Asset Not Found</h3>
            <p className="text-sm text-slate-500 font-medium mt-2 mb-6">The requested property does not exist or has been removed.</p>
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-all">
                <ArrowLeft size={14} /> Return to Directory
            </button>
        </div>
    );

    const statusColors = {
        Verified: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        Rejected: 'bg-rose-50 text-rose-600 border-rose-100',
        Pending: 'bg-amber-50 text-amber-600 border-amber-100'
    };

    return (
        <div className="space-y-6">
            {/* Navigation Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="flex items-center h-9 w-9 border border-slate-200 rounded-md justify-center hover:bg-slate-50 transition-all text-slate-500 shadow-sm"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-slate-900 leading-none">{product.title}</h2>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors[product.status] || statusColors.Pending}`}>
                                {product.status}
                            </span>
                        </div>
                    </div>
                </div>

                {!isEditing && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Edit3 size={14} /> Edit Listing
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
                        <button
                            onClick={() => setStatusConfirm({ type: 'Verified', reason: '' })}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                        >
                            <CheckCircle size={14} /> Approve
                        </button>
                        <button
                            onClick={() => setStatusConfirm({ type: 'Rejected', reason: '' })}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
                        >
                            <XCircle size={14} /> Reject
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                <Edit3 size={14} className="text-primary" /> Asset Refinement Mode
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-all">
                                Cancel & Exit
                            </button>
                        </div>
                        <PropertyForm initialData={product} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
                    {/* Left Column: Media & Dossier (8/12) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Media Gallery */}
                        <div className="flex flex-col gap-3">
                            <div className="relative rounded-2xl overflow-hidden h-[380px] border border-slate-200 shadow-sm bg-slate-950 flex items-center justify-center group">
                                {displayMedia.type === 'video' ? (
                                    getYouTubeID(displayMedia.url) ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeID(displayMedia.url)}?autoplay=1`}
                                            className="w-full h-full border-none"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video src={displayMedia.url} controls autoPlay className="w-full h-full object-contain" />
                                    )
                                ) : (
                                    <>
                                        <img src={displayMedia.url} alt={product.title} className="w-full h-full object-cover transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[9px] font-bold rounded-full uppercase tracking-wider border border-white/20">
                                                {product.propertyType}
                                            </span>
                                            <span className="px-3 py-1 bg-primary text-white text-[9px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                                                {product.purpose}
                                            </span>
                                        </div>

                                        {/* Video Play Button Overlay (if video exists but image is active) */}
                                        {product.video && (
                                            <div
                                                onClick={() => setActiveMedia({ type: 'video', url: product.video })}
                                                className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10"
                                            >
                                                <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 flex items-center justify-center text-white shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                                    <Play size={24} fill="white" className="ml-1" />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Fullscreen Inspection Button */}
                                <div
                                    onClick={() => setLightboxMedia(displayMedia)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition-all z-10 opacity-0 group-hover:opacity-100"
                                    title="Fullscreen Inspection"
                                >
                                    <Layout size={14} />
                                </div>
                            </div>

                            {/* Thumbnail Row */}
                            <div className="grid grid-cols-6 gap-3 h-20">
                                {product.video && (
                                    <div
                                        onClick={() => setActiveMedia({ type: 'video', url: product.video })}
                                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all shadow-sm bg-slate-900 ${displayMedia.type === 'video' ? 'border-primary scale-[1.02]' : 'border-transparent hover:border-primary/50'}`}
                                    >
                                        <img src={getYouTubeID(product.video) ? `https://img.youtube.com/vi/${getYouTubeID(product.video)}/mqdefault.jpg` : (product.coverPhoto || product.images?.[0])} className="w-full h-full object-cover opacity-60" alt="Video thumbnail" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play size={16} fill="white" />
                                        </div>
                                    </div>
                                )}
                                {(product.images || []).slice(0, product.video ? 5 : 6).map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveMedia({ type: 'image', url: img })}
                                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all shadow-sm ${displayMedia.url === img && displayMedia.type === 'image' ? 'border-primary scale-[1.02]' : 'border-transparent hover:border-primary/50'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-500" alt={`Property thumbnail ${idx + 1}`} />
                                    </div>
                                ))}
                                {Array.from({ length: Math.max(0, (product.video ? 5 : 6) - (product.images?.length || 0)) }).map((_, i) => (
                                    <div key={`empty-${i}`} className="rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-center text-slate-200">
                                        <ImageIcon size={16} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Property Dossier */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6">
                                {/* Description Section */}
                                <div className="mb-8">
                                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Info size={14} className="text-primary" /> Property Dossier
                                    </h4>
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm leading-relaxed font-medium italic">
                                        &quot;This stunning {product.propertyType} is listed for {product.purpose}. Located in the heart of {product.location?.city}, it offers a perfect blend of luxury and convenience. The property features modern architecture with {product.furnishingStatus?.toLowerCase()} interiors and high-end finishes throughout.&quot;
                                    </div>
                                </div>

                                {/* Technical Grid */}
                                <div className="pt-8 border-t border-slate-100">
                                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                                        <Layout size={14} className="text-primary" /> Technical Specifications
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {[
                                            { label: 'Area / Length', value: product.propertyLength },
                                            { label: 'Project Name', value: product.location?.projectName },
                                            { label: 'Expected Price', value: product.price },
                                            { label: 'Price Per SqFt', value: `₹${product.pricing?.pricePerSqft?.toLocaleString() || 'N/A'}` },
                                            { label: 'Maintenance', value: product.pricing?.maintenanceCharges > 0 ? `₹${product.pricing.maintenanceCharges.toLocaleString()}` : 'Included' },
                                            { label: 'Furnishing', value: product.furnishingStatus },
                                            { label: 'Facing Direction', value: product.direction },
                                            { label: 'Availability', value: product.availabilityStatus },
                                            { label: 'Listed On', value: product.date },
                                            { label: 'Legal Status', value: 'Verified Registry' },
                                        ].map((attr, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-2.5 border-b border-slate-50 group hover:border-primary/20 transition-all">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{attr.label}</span>
                                                <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-all capitalize">{attr.value || 'N/A'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <CheckCircle size={14} className="text-primary" /> Premium Amenities
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(product.amenities || []).map(a => (
                                            <span key={a} className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200 capitalize">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Advantages */}
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <MapPin size={14} className="text-emerald-500" /> Location Advantages
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(product.locationAdvantages || []).map(adv => (
                                            <span key={adv} className="px-3 py-1.5 rounded-lg text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 capitalize">
                                                {adv}
                                            </span>
                                        ))}
                                        {!(product.locationAdvantages?.length > 0) && (
                                            <p className="text-xs font-bold text-slate-400 italic">No advantages specified</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar (4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Asset Identity Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-5">
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">
                                    <Building size={14} className="text-primary" />
                                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Asset Identity</h3>
                                </div>
                                <div className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-md text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Live Registry</div>
                            </div>

                            <div className="mb-6 pb-6 border-b border-slate-50">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Asset Valuation</p>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">{product.price}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">₹{product.pricing?.pricePerSqft?.toLocaleString() || 'N/A'} per SqFt</p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Listed By</p>
                                        <p className="text-xs font-bold text-slate-900 capitalize">{product.uploadertype || 'Owner'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Type</p>
                                        <p className="text-xs font-bold text-slate-900 capitalize">{product.propertyType}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-50 space-y-3">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Locality</p>
                                        <p className="text-xs font-bold text-slate-900">{product.location?.locality}, {product.location?.city}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Full Address</p>
                                        <div className="flex gap-2">
                                            <MapPin size={12} className="text-slate-300 shrink-0 mt-0.5" />
                                            <p className="text-[10px] font-medium text-slate-600 leading-relaxed">{product.location?.fullAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proprietor Partner Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex justify-between items-center text-slate-900">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider">Asset Proprietor</h4>
                                <Shield size={14} className="text-emerald-500" />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                                        {product.uploader?.photo ? <img src={product.uploader.photo} className="w-full h-full object-cover" /> : (product.uploadertype || 'U').substring(0, 1)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h5 className="text-sm font-bold text-slate-900 leading-none capitalize">{product.uploadertype || 'Partner'}</h5>
                                            <CheckCircle size={12} className="text-emerald-500" />
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">Verified Identity</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="h-7 w-7 bg-white rounded-md flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                            <Smartphone size={12} />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Contact Access</p>
                                            <p className="text-xs font-bold text-slate-700 truncate">{product.lawyerDetails?.mobile || 'Confidential'}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-5 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <MessageSquare size={12} /> Partner Chat
                                </button>
                            </div>
                        </div>

                        {/* Legal & Verification Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100 flex justify-between items-center text-slate-900">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider">Legal Verification</h4>
                                <CheckCircle size={14} className="text-blue-500" />
                            </div>
                            <div className="p-5">
                                <div className="mb-5">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Legal Reference (Attorney)</p>
                                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex items-center gap-3">
                                        <div className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                            <Shield size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{product.lawyerDetails?.name || 'Not Provided'}</p>
                                            <p className="text-[10px] font-bold text-slate-500">{product.lawyerDetails?.mobile || 'Confidential'}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Certificates & Deeds</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'saleDeed', label: 'Sale Deed' },
                                        { id: 'encumbranceCert', label: 'EC Cert' },
                                        { id: 'propertyTaxReceipt', label: 'Tax Receipt' },
                                        { id: 'legalOpinion', label: 'Legal Opinion' }
                                    ].map(doc => {
                                        const proofImg = product.ownershipProofs?.[doc.id];
                                        return (
                                            <div key={doc.id} className="relative group">
                                                {proofImg ? (
                                                    <div
                                                        onClick={() => setLightboxMedia({ type: 'image', url: proofImg })}
                                                        className="h-16 rounded-lg overflow-hidden border border-slate-200 cursor-pointer shadow-sm group-hover:border-primary transition-all">
                                                        <img src={proofImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                    </div>
                                                ) : (
                                                    <div className="h-16 rounded-lg bg-slate-50 border border-slate-200 border-dashed flex items-center justify-center text-slate-300">
                                                        <XCircle size={14} />
                                                    </div>
                                                )}
                                                <p className="text-[9px] font-bold uppercase tracking-wider mt-1.5 text-center text-slate-600 truncate">{doc.label}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Intelligence Log Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-100">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900">
                                    <Activity size={14} /> Intelligence Log
                                </h4>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex gap-3 relative">
                                    <div className="absolute left-2.5 top-5 bottom-0 w-px bg-slate-100" />
                                    <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex flex-shrink-0 items-center justify-center z-10 border-2 border-white shadow-sm">
                                        <Check size={8} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-800 leading-none">Status: {product.status}</p>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Last updated today</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex flex-shrink-0 items-center justify-center z-10 border-2 border-white shadow-sm">
                                        <ImageIcon size={8} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-800 leading-none">{product.images?.length || 0} Assets verified</p>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Digital Archive Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox Modal */}
            <Modal isOpen={!!lightboxMedia} onClose={() => setLightboxMedia(null)} title={lightboxMedia?.type === 'video' ? 'Property Video Tour' : 'Asset Inspection'} size="xl">
                <div className="relative group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center min-h-[400px]">
                    {lightboxMedia?.type === 'video' ? (
                        <video
                            src={lightboxMedia.url}
                            controls
                            autoPlay
                            className="w-full h-auto max-h-[85vh] object-contain shadow-2xl mx-auto"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={lightboxMedia?.url}
                            className="w-full h-auto max-h-[85vh] object-contain mx-auto transition-transform duration-700"
                            alt="Full Screen Preview"
                        />
                    )}
                    <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider shadow-2xl opacity-0 group-hover:opacity-100 transition-all">
                        {lightboxMedia?.type === 'video' ? 'HDR Video Stream Analysis' : 'High-Resolution Asset Analysis'}
                    </div>
                </div>
            </Modal>

            {/* Status Update Confirmation Modal */}
            <Modal isOpen={!!statusConfirm} onClose={() => setStatusConfirm(null)}
                title={statusConfirm?.type === 'Verified' ? 'Confirm Verification' : 'Listing Rejection'} size="md">
                <div className="p-2">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${statusConfirm?.type === 'Verified' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                            {statusConfirm?.type === 'Verified' ? <CheckCircle size={32} /> : <AlertOctagon size={32} />}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 tracking-tight mb-2">
                            {statusConfirm?.type === 'Verified' ? 'Verify Property Listing?' : 'Reason for Rejection'}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 max-w-[280px]">
                            {statusConfirm?.type === 'Verified' ?
                                'This listing will be marked as verified and published to all users. Are you sure you want to proceed?' :
                                'Please provide a clear reason to the uploader why this property listing is being rejected.'}
                        </p>
                    </div>

                    {statusConfirm?.type === 'Rejected' && (
                        <div className="space-y-4 mb-6">
                            <div className="relative">
                                <MessageSquare size={14} className="absolute left-4 top-4 text-slate-400" />
                                <textarea
                                    value={statusConfirm.reason}
                                    onChange={(e) => setStatusConfirm({ ...statusConfirm, reason: e.target.value })}
                                    placeholder="e.g. Incomplete documentation, low quality images..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all h-28 resize-none"
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setStatusConfirm(null)}
                            className="px-6 py-3.5 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-900 hover:bg-slate-50 transition-all">
                            Cancel
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
                            className={`px-6 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${statusConfirm?.type === 'Verified' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'}`}>
                            {statusConfirm?.type === 'Verified' ? 'Yes, Verify Listing' : 'Confirm Rejection'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PropertyDetails;
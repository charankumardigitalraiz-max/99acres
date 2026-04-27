import React, { useState, useRef } from 'react';
import {
    User, Building, MapPin, IndianRupee, Image as ImageIcon,
    ShieldCheck, Check, Layout, Calendar, Image, Play, XCircle, CheckCircle, Briefcase, Plus, UploadCloud, Trash2, Maximize2, Globe, Heart, Zap, Phone, Mail, Landmark, Scale, Clock
} from 'lucide-react';
import Modal from './Modal';

export default function PropertyForm({ initialData, isEditing = false, onCancel, onSubmit }) {
    const [openStep, setOpenStep] = useState(1);
    const [formData, setFormData] = useState(initialData || {
        location: {},
        pricing: {},
        smartAlbum: {},
        ownershipProofs: {},
        lawyerDetails: {},
        bankerDetails: [],
        amenities: [],
        locationAdvantages: []
    });
    const [lightboxMedia, setLightboxMedia] = useState(null); // { type: 'image' | 'video', url: string }
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [tempVideoLink, setTempVideoLink] = useState('');

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSaveVideoLink = () => {
        setFormData({ ...formData, video: tempVideoLink });
        setIsVideoModalOpen(false);
    };

    const steps = [
        { id: 1, title: 'Asset Details', icon: <Building size={18} /> },
        { id: 2, title: 'Specs & Features', icon: <Zap size={18} /> },
        { id: 3, title: 'Visual Media', icon: <ImageIcon size={18} /> },
        { id: 4, title: 'Legal & Verification', icon: <ShieldCheck size={18} /> }
    ];

    const Field = ({ label, value, name, type = 'text', options = [], placeholder }) => {
        return (
            <div className="group/field">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 transition-colors group-hover/field:text-primary">{label}</p>
                {isEditing ? (
                    type === 'select' ? (
                        <select
                            name={name}
                            value={value || ''}
                            onChange={handleFieldChange}
                            className="w-full px-4 py-3 text-[13px] border border-slate-100 rounded-xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none font-bold text-slate-700 bg-slate-50/50 transition-all capitalize"
                        >
                            <option value="">Select Option</option>
                            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : type === 'textarea' ? (
                        <textarea
                            name={name}
                            value={value || ''}
                            onChange={handleFieldChange}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 text-[13px] border border-slate-100 rounded-xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none font-bold text-slate-700 bg-slate-50/50 transition-all min-h-[100px] resize-none"
                        />
                    ) : (
                        <input
                            type={type}
                            name={name}
                            value={value || ''}
                            onChange={handleFieldChange}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 text-[13px] border border-slate-100 rounded-xl focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none font-bold text-slate-700 bg-slate-50/50 transition-all"
                        />
                    )
                ) : (
                    <div className="p-4 bg-slate-50/40 border border-slate-100/50 rounded-xl hover:border-primary/20 hover:bg-white transition-all cursor-default shadow-sm shadow-slate-100/30 group-hover/field:shadow-lg group-hover/field:shadow-primary/5 group-hover/field:-translate-y-1">
                        <p className={`text-[13px] font-black tracking-tight capitalize leading-tight ${value ? 'text-slate-900' : 'text-slate-300 italic font-medium'}`}>
                            {value || 'DATA NOT RECORDED'}
                        </p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-500">
            {/* Premium Horizontal Stepper */}
            <div className="px-10 pt-10 pb-8 bg-white border-b border-slate-50 relative overflow-hidden">
                <div className="flex items-center justify-between relative">
                    {/* Background Progress Line */}
                    <div className="absolute top-6 left-0 right-0 h-[2px] bg-slate-100 hidden md:block rounded-full mx-8"></div>
                    <div
                        className="absolute top-6 left-0 h-[2px] bg-primary transition-all duration-1000 ease-in-out hidden md:block rounded-full mx-8 shadow-[0_0_10px_rgba(var(--color-primary),0.3)]"
                        style={{ width: `calc(${((openStep - 1) / (steps.length - 1)) * 100}% - 4rem)` }}
                    ></div>

                    {steps.map((step, index) => (
                        <button
                            key={step.id}
                            onClick={() => setOpenStep(step.id)}
                            className={`flex flex-col items-center gap-4 relative z-10 transition-all duration-500 group ${openStep === step.id ? 'scale-105' : 'scale-100 opacity-60 hover:opacity-100'}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-sm shrink-0 border-2 ${openStep === step.id ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-110' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 group-hover:text-slate-600'}`}>
                                {step.icon}
                            </div>
                            <div className="text-center hidden md:block">
                                <p className={`text-[9px] font-black uppercase tracking-[0.25em] mb-1.5 ${openStep === step.id ? 'text-primary' : 'text-slate-400'}`}>PHASE {step.id}</p>
                                <p className={`text-xs font-black tracking-tight whitespace-nowrap ${openStep === step.id ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white">
                {/* PHASE 1: ASSET & GEOSPATIAL */}
                {openStep === 1 && (
                    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                                    <Building size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">CORE SPECIFICATIONS</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Foundational asset registry data</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <Field label="UPLOADER TYPE" name="uploadertype" value={formData.uploadertype} type="select" options={['Owner', 'Agent', 'Builder']} />
                                <Field label="REGISTRY TITLE" name="title" value={formData.title} placeholder="Asset identifier" />
                                <Field label="ASSET CATEGORY" name="propertyType" value={formData.propertyType} type="select" options={['Flat', 'Villa', 'Independent House', 'Plot', 'Commercial']} />
                                <Field label="TOTAL DIMENSIONS" name="propertyLength" value={formData.propertyLength} placeholder="e.g. 2400 Sq.Ft" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-inner">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">GEOSPATIAL COORDINATES</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Physical asset positioning system</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <Field label="CITY / PROVINCE" name="location.city" value={formData.location?.city} />
                                <Field label="LOCALITY / ZONE" name="location.locality" value={formData.location?.locality} />
                                <Field label="PROJECT NODE" name="location.projectName" value={formData.location?.projectName} />
                                <Field label="IDENTIFIER / LANDMARK" name="location.landmark" value={formData.location?.landmark} />
                                <div className="md:col-span-2 lg:col-span-4 pt-4">
                                    <Field label="FULL REGISTRY ADDRESS" name="location.fullAddress" value={formData.location?.fullAddress} type="textarea" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PHASE 2: PRICING & FEATURES */}
                {openStep === 2 && (
                    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-inner">
                                    <IndianRupee size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">FINANCIAL PARAMETERS</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Market valuation and pricing matrix</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <Field label="MARKET PRICE" name="price" value={formData.price} />
                                <Field label="PRICE PER SQ.FT" name="pricing.pricePerSqft" value={formData.pricing?.pricePerSqft} />
                                <Field label="AVAILABILITY STATUS" name="availabilityStatus" value={formData.availabilityStatus} type="select" options={['Ready to Move', 'Under Construction']} />
                                <Field label="MAINTENANCE" name="pricing.maintenance" value={formData.pricing?.maintenance} />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shadow-inner">
                                    <Layout size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">TECHNICAL DOSSIER</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Internal architecture and specifications</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <Field label="BEDROOM COUNT" name="bedrooms" value={formData.bedrooms} />
                                <Field label="BATHROOMS" name="bathrooms" value={formData.bathrooms} />
                                <Field label="FURNISHING" name="furnishingStatus" value={formData.furnishingStatus} type="select" options={['Furnished', 'Semi-Furnished', 'Unfurnished']} />
                                <Field label="PARKING BAYS" name="parking" value={formData.parking} />
                            </div>
                        </div>

                        {/* Amenities Section */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100 shadow-inner">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">ASSET AMENITIES</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">On-site features and lifestyle supplements</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {['Security', 'Pool', 'Gym', 'Garden', 'Power Backup', 'Club House', 'Intercom', 'Water Plant'].map(amenity => (
                                    <div
                                        key={amenity}
                                        onClick={() => {
                                            if (!isEditing) return;
                                            const amenities = formData.amenities || [];
                                            const newAmenities = amenities.includes(amenity)
                                                ? amenities.filter(a => a !== amenity)
                                                : [...amenities, amenity];
                                            setFormData({ ...formData, amenities: newAmenities });
                                        }}
                                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${(formData.amenities || []).includes(amenity)
                                            ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                            : 'bg-slate-50 border-slate-100 text-slate-400 grayscale hover:grayscale-0'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${(formData.amenities || []).includes(amenity) ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-tight">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* PHASE 3: VISUAL REPOSITORY */}
                {openStep === 3 && (
                    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100">
                                        <ImageIcon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">VISUAL REPOSITORY</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">High-fidelity asset imagery</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsVideoModalOpen(true)}
                                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                    >
                                        <Play size={12} /> Configure Video
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {(formData.images || []).map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-slate-100">
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Asset" />
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all"></div>
                                        <button
                                            onClick={() => setLightboxMedia({ type: 'image', url: img })}
                                            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-md rounded-lg text-slate-900 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                                        >
                                            <Maximize2 size={12} />
                                        </button>
                                        {isEditing && (
                                            <button className="absolute bottom-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {isEditing && (
                                    <button className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group">
                                        <Plus size={24} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Add Asset</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* PHASE 4: LEGAL & VERIFICATION */}
                {openStep === 4 && (
                    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                        {/* Documents Section */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-inner">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">VERIFICATION PROTOCOL</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Official compliance and legal proofs</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { label: 'Ownership Certificate', key: 'ownershipProofs.certificate', date: '24 Oct 2024' },
                                    { label: 'Tax Registry Log', key: 'ownershipProofs.taxReceipt', date: '12 Nov 2024' }
                                ].map(doc => (
                                    <div key={doc.key} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-emerald-600 transition-colors">{doc.label}</p>
                                            <CheckCircle size={16} className="text-emerald-500" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                                <ImageIcon size={20} className="text-slate-300" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black text-slate-900">registry_doc_{doc.key.split('.').pop()}.pdf</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: Verified ({doc.date})</p>
                                            </div>
                                            {isEditing && <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal Representatives */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                                        <Scale size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">LEGAL COUNSEL</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dossier certification attorney</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <Field label="ATTORNEY NAME" name="lawyerDetails.name" value={formData.lawyerDetails?.name} placeholder="Counsel identifier" />
                                    <Field label="BAR ASSOCIATION ID" name="lawyerDetails.id" value={formData.lawyerDetails?.id} placeholder="License registry ID" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="SECURE PHONE" name="lawyerDetails.phone" value={formData.lawyerDetails?.phone} />
                                        <Field label="SECURE EMAIL" name="lawyerDetails.email" value={formData.lawyerDetails?.email} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                                        <Landmark size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">BANKING PROTOCOL</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Financial clearing institution</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <Field label="INSTITUTION NAME" name="bankerDetails.name" value={formData.bankerDetails?.[0]?.name} placeholder="Entity identifier" />
                                    <Field label="BRANCH CODE" name="bankerDetails.branch" value={formData.bankerDetails?.[0]?.branch} placeholder="IFSC / Branch ID" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="PROTOCOL OFFICER" name="bankerDetails.officer" value={formData.bankerDetails?.[0]?.officer} />
                                        <Field label="CONTACT NODE" name="bankerDetails.phone" value={formData.bankerDetails?.[0]?.phone} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stepper Footer */}
            <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <button
                    disabled={openStep === 1}
                    onClick={() => setOpenStep(Math.max(1, openStep - 1))}
                    className="px-6 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-white hover:text-slate-900 transition-all disabled:opacity-30 active:scale-95 flex items-center gap-2"
                >
                    <ChevronLeft size={14} /> Previous Phase
                </button>
                <div className="flex items-center gap-4">
                    {isEditing && (
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-50 transition-all active:scale-95"
                        >
                            Abort Modification
                        </button>
                    )}
                    {openStep < 4 ? (
                        <button
                            onClick={() => setOpenStep(openStep + 1)}
                            className="px-10 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Next Phase
                        </button>
                    ) : (
                        isEditing && (
                            <button
                                onClick={onSubmit}
                                className="px-10 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all animate-pulse active:scale-95"
                            >
                                Commit Modifications
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Video Link Modal */}
            <Modal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                title="Configure Video Stream Link"
                size="md"
            >
                <div className="p-8 space-y-6">
                    <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Technical Note</p>
                        <p className="text-[11px] text-primary/70 leading-relaxed font-bold">Please provide a valid YouTube or direct video CDN link. The system will automatically generate thumbnails and visual overlays.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol URL</p>
                        <input
                            type="text"
                            value={tempVideoLink}
                            onChange={(e) => setTempVideoLink(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-black text-slate-900 outline-none focus:border-primary transition-all shadow-inner"
                            placeholder="https://youtube.com/watch?v=..."
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-6">
                        <button onClick={() => setIsVideoModalOpen(false)} className="px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Cancel</button>
                        <button onClick={handleSaveVideoLink} className="px-10 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20">Apply Link</button>
                    </div>
                </div>
            </Modal>

            {/* Lightbox Modal */}
            <Modal isOpen={!!lightboxMedia} onClose={() => setLightboxMedia(null)} title="Asset Analysis" size="xl">
                <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center min-h-[500px]">
                    <img src={lightboxMedia?.url} className="w-full h-auto max-h-[85vh] object-contain mx-auto" alt="Asset Analysis" />
                </div>
            </Modal>
        </div>
    );
}

// Helper icon component
const ChevronLeft = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);

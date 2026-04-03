import React, { useState } from 'react';
import {
    User, Building, MapPin, IndianRupee, Image as ImageIcon,
    ShieldCheck, Check, Layout, Calendar, Image, Play, XCircle, CheckCircle, Briefcase
} from 'lucide-react';
import Modal from './Modal';

export default function PropertyForm({ initialData }) {
    const [openStep, setOpenStep] = useState(1);
    const [lightboxMedia, setLightboxMedia] = useState(null); // { type: 'image' | 'video', url: string }
    const formData = initialData || {};

    const steps = [
        { id: 1, title: 'Basic Details', icon: <User size={16} /> },
        { id: 2, title: 'Location', icon: <MapPin size={16} /> },
        { id: 3, title: 'Pricing & Specs', icon: <IndianRupee size={16} /> },
        { id: 4, title: 'Media Assets', icon: <ImageIcon size={16} /> },
        { id: 5, title: 'Verification', icon: <ShieldCheck size={16} /> }
    ];

    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col">
            {/* <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Building size={18} className="text-primary" />
                    Property Listing Details
                </h2>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Read Only Form</span>
                </div>
            </div> */}

            {/* Premium Horizontal Stepper / Tabs */}
            <div className="flex items-center justify-between px-6 py-6 bg-white border-b border-slate-100 overflow-x-auto scrollbar-hide relative">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <button
                            onClick={() => setOpenStep(step.id)}
                            className={`flex items-center gap-3 relative z-10 transition-all ${openStep === step.id ? 'text-primary scale-105' : 'text-slate-400 hover:text-slate-600 hover:scale-105'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0 border ${openStep === step.id ? 'bg-primary text-white border-primary shadow-primary/30' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-white'}`}>
                                {step.icon}
                            </div>
                            <div className="text-left hidden md:block">
                                <p className={`text-[9px] font-black uppercase tracking-widest ${openStep === step.id ? 'text-primary/70' : 'text-slate-400'}`}>Step {step.id}</p>
                                <p className={`text-xs font-black tracking-tight whitespace-nowrap ${openStep === step.id ? 'text-primary' : 'text-slate-600'}`}>{step.title}</p>
                            </div>
                        </button>
                        {index < steps.length - 1 && (
                            <div className="flex-1 min-w-[2rem] mx-4 h-0.5 rounded-full bg-slate-100 relative">
                                <div className={`absolute left-0 top-0 bottom-0 rounded-full transition-all duration-500 ${openStep > step.id ? 'bg-primary w-full' : 'w-0'}`}></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="bg-white">
                {/* STEP 1: BASE DETAILS */}
                {openStep === 1 && (
                    <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">You Are</p>
                                <p className="text-sm font-bold text-slate-800 capitalize">{formData.uploadertype || 'Not Provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Property Title</p>
                                <p className="text-sm font-bold text-slate-800">{formData.title || 'Not Provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Kind of Property</p>
                                <p className="text-sm font-bold text-slate-800 capitalize">{formData.propertyType || 'Not Provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Property Length / Area</p>
                                <p className="text-sm font-bold text-slate-800">{formData.propertyLength || 'Not Provided'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: LOCATION DETAILS */}
                {openStep === 2 && (
                    <div className="p-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <MapPin size={14} className="text-blue-500" />
                            </div>
                            <span className="text-xs font-bold text-slate-600">Auto-detected location configuration is available for this property.</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">City</p>
                                <p className="text-sm font-bold text-slate-800 capitalize">{formData.location?.city || 'Not Provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Locality, Area</p>
                                <p className="text-sm font-bold text-slate-800 capitalize">{formData.location?.locality || 'Not Provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Project / Building Name</p>
                                <p className="text-sm font-bold text-slate-800">{formData.location?.projectName || 'Not Provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Landmark</p>
                                <p className="text-sm font-bold text-slate-800">{formData.location?.landmark || 'Not Provided'}</p>
                            </div>
                            <div className="md:col-span-2 pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Full Address</p>
                                <p className="text-sm font-bold text-slate-800 leading-relaxed max-w-3xl">{formData.location?.fullAddress || 'Not Provided'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: PRICING & ADVANTAGES */}
                {openStep === 3 && (
                    <div className="p-10 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <IndianRupee size={12} className="text-emerald-500" /> Financial Structure
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Expected Price</p>
                                    <p className="text-xl font-black text-slate-800 tracking-tight">{formData.pricing?.expectedPrice || 'Not Provided'}</p>
                                </div>
                                <div className="md:border-l border-slate-100 md:pl-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Price per SqFt</p>
                                    <p className="text-base font-black text-emerald-600">{formData.pricing?.pricePerSqft || 'Not Provided'}</p>
                                </div>
                                <div className="md:border-l border-slate-100 md:pl-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Maintenance</p>
                                    <p className="text-sm font-bold text-slate-800">{formData.pricing?.maintenanceCharges || 'Included'}</p>
                                </div>
                                <div className="md:border-l border-slate-100 md:pl-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Flexibility</p>
                                    <p className={`text-sm font-black ${formData.pricing?.negotiable === 'true' || formData.pricing?.negotiable === true ? 'text-primary' : 'text-slate-600'}`}>
                                        {formData.pricing?.negotiable === 'true' || formData.pricing?.negotiable === true ? 'Negotiable' : 'Fixed Price'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-2">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <Layout size={12} className="text-blue-500" /> Specifications & Availability
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Furnishing</p>
                                    <p className="text-sm font-bold text-slate-800 capitalize">{formData.furnishingStatus || 'Not Provided'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Direction</p>
                                    <p className="text-sm font-bold text-slate-800 capitalize">{formData.direction || 'Not Provided'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Availability</p>
                                    <p className="text-sm font-bold text-slate-800 capitalize">{formData.availabilityStatus || 'Not Provided'}</p>
                                </div>
                                {formData.availabilityStatus === 'under construction' && (
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Available From</p>
                                        <p className="text-sm font-bold text-slate-800">{formData.availableFrom || 'Not Provided'}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                    <CheckCircle size={12} className="text-primary" /> Amenities
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(formData.amenities || []).map(amenity => (
                                        <span
                                            key={amenity}
                                            className="px-3 py-1 rounded-md text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                    {!(formData.amenities?.length > 0) && (
                                        <span className="text-xs font-bold text-slate-400 italic">No amenities specified</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                    <MapPin size={12} className="text-emerald-500" /> Location Advantages
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {(formData.locationAdvantages || []).map(adv => (
                                        <span
                                            key={adv}
                                            className="px-3 py-1 rounded-md text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200"
                                        >
                                            {adv}
                                        </span>
                                    ))}
                                    {!(formData.locationAdvantages?.length > 0) && (
                                        <span className="text-xs font-bold text-slate-400 italic">No advantages specified</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: IMAGES AND VIDEOS */}
                {openStep === 4 && (
                    <div className="p-10 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Cover Photo</p>
                                {formData.coverPhoto || (formData.images && formData.images[0]) ? (
                                    <div
                                        className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
                                        onClick={() => setLightboxMedia({ type: 'image', url: formData.coverPhoto || formData.images[0] })}
                                    >
                                        <img src={formData.coverPhoto || formData.images[0]} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <p className="text-sm font-bold text-slate-400 italic">No cover photo uploaded</p>
                                )}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Property Video</p>
                                <div
                                    className={`w-full h-48 border border-slate-200 rounded-xl flex flex-col items-center justify-center bg-slate-50 transition-all ${formData.video ? 'cursor-pointer hover:border-primary/50 group' : ''}`}
                                    onClick={() => formData.video && setLightboxMedia({ type: 'video', url: formData.video })}
                                >
                                    <div className={`w-12 h-12 rounded-full shadow-sm flex items-center justify-center mb-3 transition-colors ${formData.video ? 'bg-primary text-white group-hover:scale-110' : 'bg-white text-slate-300'}`}>
                                        <Play size={20} className={formData.video ? 'text-white' : 'text-slate-300'} />
                                    </div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${formData.video ? 'text-primary' : 'text-slate-400'}`}>
                                        {formData.video ? 'Play Video' : 'No video uploaded'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <ImageIcon size={12} className="text-primary" /> Smart Album Assets
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {Object.keys(formData.smartAlbum || {}).map(room => (
                                    <div key={room}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{room}</p>
                                            <span className="text-[9px] font-bold text-slate-400">({formData.smartAlbum[room]?.length || 0})</span>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
                                            {formData.smartAlbum[room]?.map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={img}
                                                    onClick={() => setLightboxMedia({ type: 'image', url: img })}
                                                    className="h-16 w-16 object-cover rounded-lg border border-slate-200 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                                    alt=""
                                                />
                                            ))}
                                            {!(formData.smartAlbum[room]?.length > 0) && (
                                                <p className="text-[10px] text-slate-400 italic">No assets</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 5: VERIFICATION */}
                {openStep === 5 && (
                    <div className="p-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Identity Verification</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <CheckCircle size={18} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{formData.ownerVerification?.type || 'Aadhaar'}</p>
                                        <p className="text-[10px] font-bold text-emerald-600 mt-1">Proof Document Uploaded</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Owner Photograph</p>
                                {formData.uploader?.photo ? (
                                    <div
                                        className="w-24 h-24 overflow-hidden border-2 border-slate-200 cursor-pointer hover:border-primary/50 transition-colors"
                                        onClick={() => setLightboxMedia({ type: 'image', url: formData.uploader.photo })}
                                    >
                                        <img src={formData.uploader.photo} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Owner" />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                                        <User size={32} className="text-slate-300" />
                                    </div>
                                )}
                            </div>

                            {/* Legal Details */}
                            <div className="pt-4 border-t lg:border-t-0 lg:pt-0">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <Briefcase size={12} className="text-blue-500" /> Legal / Lawyer Details
                                </h4>
                                {formData.lawyerDetails ? (
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Lawyer Name</p>
                                            <p className="text-sm font-bold text-slate-800">{formData.lawyerDetails.name || 'Not Provided'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mobile</p>
                                                <p className="text-sm font-bold text-slate-800">{formData.lawyerDetails.mobile || 'Not Provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                                                <p className="text-sm font-bold text-slate-800">{formData.lawyerDetails.email || 'Not Provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 border-dashed flex items-center justify-center">
                                        <p className="text-xs font-bold text-slate-400 italic">No lawyer details provided</p>
                                    </div>
                                )}
                            </div>

                            {/* Banker Details */}
                            <div className="pt-4 border-t lg:border-t-0 lg:pt-0">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <Building size={12} className="text-amber-500" /> Banker Details
                                </h4>
                                {formData.bankerDetails?.length > 0 ? (
                                    <div className="space-y-4">
                                        {formData.bankerDetails.map((banker, idx) => (
                                            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{banker.name}</p>
                                                </div>
                                                <div className="text-right text-slate-600">
                                                    <p className="text-xs font-bold tracking-widest uppercase">{banker.number}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 border-dashed flex items-center justify-center">
                                        <p className="text-xs font-bold text-slate-400 italic">No banker details provided</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <ShieldCheck size={12} className="text-slate-500" /> Property Ownership Proofs
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { id: 'saleDeed', label: 'Sale Deed / Title Deed', req: true },
                                    { id: 'encumbranceCert', label: 'Encumbrance Certificate', req: true },
                                    { id: 'propertyTaxReceipt', label: 'Property Tax Receipt', req: true },
                                    { id: 'legalOpinion', label: 'Legal Opinion Document', req: false },
                                    { id: 'lawyerCert', label: 'Lawyer Certificate', req: false }
                                ].map(doc => {
                                    const proofImg = formData.ownershipProofs?.[doc.id];
                                    return (
                                        <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-all flex flex-col gap-3">
                                            {proofImg ? (
                                                <div
                                                    className="w-full h-32 rounded-lg overflow-hidden border border-slate-200 cursor-pointer group relative"
                                                    onClick={() => setLightboxMedia({ type: 'image', url: proofImg })}
                                                >
                                                    <img src={proofImg} alt={doc.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-bold px-3 py-1.5 bg-black/50 rounded-full flex items-center gap-2"><ImageIcon size={12} /> View Image</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-32 rounded-lg bg-slate-50 border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400">
                                                    <XCircle size={20} className="mb-2 text-slate-300" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">Not Uploaded</span>
                                                </div>
                                            )}
                                            <div className="px-1">
                                                <p className="text-xs font-bold text-slate-800">{doc.label}</p>
                                                <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${doc.req ? 'text-rose-400' : 'text-slate-400'}`}>
                                                    {doc.req ? 'Required Verification' : 'Optional Support'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>


                        </div>
                    </div>
                )}
            </div>

            {/* Media Lightbox */}
            <Modal
                isOpen={!!lightboxMedia}
                onClose={() => setLightboxMedia(null)}
                title={lightboxMedia?.type === 'video' ? 'Property Video Tour' : 'Asset Inspection'}
                size="xl"
            >
                {lightboxMedia && (
                    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative w-full flex items-center justify-center min-h-[300px]">
                        {lightboxMedia.type === 'video' ? (
                            <video
                                src={lightboxMedia.url}
                                controls
                                autoPlay
                                className="max-w-full max-h-[70vh] object-contain"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={lightboxMedia.url}
                                alt="High Resolution Inspection"
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

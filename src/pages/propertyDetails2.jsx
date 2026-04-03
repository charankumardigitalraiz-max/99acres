import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPropertyById, updatePropertyStatus } from '../features/products/productsSlice';
import { selectReviewsByPropertyId } from '../features/reviews/reviewSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import {
    Building2, MapPin, CheckCircle, XCircle,
    Download, ExternalLink, Shield, Edit3,
    Info, Maximize2, Play, Users,
    Compass, Home, Layout, Waves,
    Wind, Trash2, Check, Clock,
    Smartphone, Sofa, Tv, Utensils,
    Coffee, Bike, Trees, Eye, Star, MessageSquare, ArrowLeft, Calendar, Activity
} from 'lucide-react';

const amenityIcons = {
    'water supply': <Waves size={14} />,
    'washrooms': <Layout size={14} />,
    'bedrooms': <Home size={14} />,
    'kitchen': <Utensils size={14} />,
    'livving room': <Sofa size={14} />,
    'balcony': <Wind size={14} />,
    'parking': <Bike size={14} />,
    'garden': <Trees size={14} />,
    'terrace': <Layout size={14} />,
    'tv': <Tv size={14} />,
    'sofa': <Sofa size={14} />
};

import PropertyForm from '../components/ui/PropertyForm';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector((state) => selectPropertyById(state, id));
    const propertyReviews = useSelector((state) => selectReviewsByPropertyId(state, Number(id))) || [];
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedAlbum, setSelectedAlbum] = useState('Livving Room');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
                    className="mt-6 btn-secondary"
                >
                    <ArrowLeft size={14} /> Back to Listings
                </button>
            </div>
        );
    }

    const albumCategories = product.smartAlbum ? Object.keys(product.smartAlbum) : [];
    if (albumCategories.length > 0 && !selectedAlbum) {
        setSelectedAlbum(albumCategories[0]);
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
                    <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        product.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-red-50 text-red-600 border-red-100'
                        }`}>
                        {product.status}
                    </div>
                    {isEditing ? (
                        <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
                            Cancel Editing
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                            <Edit3 size={14} /> Edit Property
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            {isEditing ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <PropertyForm
                        initialData={null} // Passing null to initialize empty form
                        onCancel={() => setIsEditing(false)}
                        onSubmit={data => {
                            console.log('Saved data:', data);
                            setIsEditing(false); // mock save
                        }}
                    />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
                        <div className="lg:col-span-8 space-y-6">
                            {/* Main Cover & Quick Stats */}
                            <div className="relative rounded-[2rem] overflow-hidden aspect-[16/9] lg:aspect-[21/9] shadow-2xl border border-slate-200 group">
                                <img
                                    src={product.coverPhoto || product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Price</p>
                                            <p className="text-3xl font-black tracking-tight">{product.price}</p>
                                        </div>
                                        <div className="w-px h-10 bg-white/20"></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Built Area</p>
                                            <p className="text-xl font-bold">{product.propertyLength}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        {product.video && (
                                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all shadow-lg">
                                                <Play size={14} fill="currentColor" /> Watch Video
                                            </button>
                                        )}
                                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900/80 transition-all shadow-lg">
                                            <Maximize2 size={14} /> Full View
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Smart Album Tabs */}
                            <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20">
                                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                    <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                        <Layout size={16} className="text-primary" /> Smart Album Breakdown
                                    </h3>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                                        {albumCategories.length} Categories
                                    </span>
                                </div>
                                <div className="p-3 flex gap-2 overflow-x-auto scrollbar-hide border-b border-slate-100 bg-slate-50/30">
                                    {albumCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedAlbum(cat)}
                                            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap rounded-xl transition-all ${selectedAlbum === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-6">
                                    {selectedAlbum && product.smartAlbum[selectedAlbum] ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {product.smartAlbum[selectedAlbum].map((img, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => setLightboxImage(img)}
                                                    className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-zoom-in"
                                                >
                                                    <img src={img} alt={`${selectedAlbum} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 text-white">
                                                            <Maximize2 size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                            <p className="text-xs font-bold text-slate-400">No images found for this category.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Uploader & Proofs */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Uploader Card */}
                            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/20">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                                        <Shield size={12} className="text-emerald-500" />
                                    </div>
                                    Uploader Verification
                                </h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <Avatar initials={product.uploader.avatar} src={product.uploader.photo} size="lg" className="ring-4 ring-slate-50" />
                                    <div>
                                        <h4 className="text-lg font-black text-slate-900 tracking-tight">{product.uploader.name}</h4>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className="text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                                                {product.uploader.role}
                                            </span>
                                            {product.ownerVerification?.status === 'Verified' && (
                                                <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                    <CheckCircle size={10} /> {product.uploader.verification}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-5 border-t border-slate-100">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Proof</span>
                                        <span className="text-xs font-black text-slate-700">{product.ownerVerification?.type} Card</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verification Date</span>
                                        <span className="text-xs font-black text-slate-700">March 15, 2024</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ownership Proofs Card */}
                            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/20">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                                        <Info size={12} className="text-blue-500" />
                                    </div>
                                    Ownership Proofs
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { id: 'saleDeed', label: 'Sale Deed / Title Deed', req: true },
                                        { id: 'encumbranceCert', label: 'Encumbrance Certificate', req: true },
                                        { id: 'propertyTaxReceipt', label: 'Property Tax Receipt', req: true },
                                        { id: 'legalOpinion', label: 'Legal Opinion Document', req: false },
                                        { id: 'lawyerCert', label: 'Lawyer Certificate', req: false }
                                    ].map(doc => {
                                        const exists = product.ownershipProofs?.[doc.id];
                                        return (
                                            <div key={doc.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${exists ? 'bg-white border-slate-200 shadow-sm hover:border-primary/40' : 'bg-slate-50 border-dashed border-slate-200 opacity-60'}`}>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-700">{doc.label}</span>
                                                    <span className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${doc.req ? 'text-rose-400' : 'text-slate-400'}`}>
                                                        {doc.req ? 'Required Protocol' : 'Optional Support'}
                                                    </span>
                                                </div>
                                                {exists ? (
                                                    <button className="w-8 h-8 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-sm">
                                                        <Download size={14} />
                                                    </button>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                        <XCircle size={14} className="text-slate-300" />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Tabs & Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                                <div className="p-4 bg-slate-50 border-b border-slate-100">
                                    <div className="flex bg-slate-100/80 p-1.5 rounded-2xl w-full sm:w-fit overflow-x-auto scrollbar-hide">
                                        {['Overview', 'Location & Area', 'Amenities & Specs'].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${activeTab === tab ? 'bg-white shadow-xl shadow-slate-200 text-primary' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8">
                                    {activeTab === 'Overview' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">About this Property</h4>
                                                <p className="text-sm text-slate-600 leading-loose font-medium">
                                                    This stunning {product.propertyType} is listed for {product.purpose}. Located in the heart of {product.location.city}, it offers a perfect blend of luxury and convenience. The property features modern architecture with {product.furnishingStatus.toLowerCase()} interiors and high-end finishes throughout.
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                {[
                                                    { label: 'Type', value: product.propertyType, icon: <Layout className="text-blue-500" size={16} /> },
                                                    { label: 'Purpose', value: product.purpose, icon: <ArrowLeft className="text-emerald-500" size={16} /> },
                                                    { label: 'Direction', value: product.direction, icon: <Compass className="text-amber-500" size={16} /> },
                                                    { label: 'Listed Date', value: product.date, icon: <Calendar className="text-purple-500" size={16} /> },
                                                ].map(item => (
                                                    <div key={item.label} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                                            <p className="text-xs font-black text-slate-800 capitalize truncate">{item.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'Location & Area' && (
                                        <div className="space-y-8 border-none">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                                        <MapPin size={14} /> Geographical Footprint
                                                    </h4>
                                                    <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 space-y-5">
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Project / Building</p>
                                                            <p className="text-sm font-black text-slate-800 tracking-tight">{product.location.projectName}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Full Address</p>
                                                            <p className="text-xs font-bold text-slate-600 leading-relaxed">{product.location.fullAddress}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Prominent Landmark</p>
                                                            <p className="text-xs font-bold text-slate-600 italic">"{product.location.landmark}"</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                                        <Activity size={14} /> Location Advantages
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.locationAdvantages.map(adv => (
                                                            <div key={adv} className="px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-slate-700">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
                                                                {adv}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'Amenities & Specs' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
                                                    <Shield size={14} /> Integrated Modern Amenities
                                                </h4>
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                    {product.amenities.map(amenity => (
                                                        <div key={amenity} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all group">
                                                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100 shrink-0 group-hover:scale-110 transition-transform">
                                                                {amenityIcons[amenity.toLowerCase()] || <Info size={14} />}
                                                            </div>
                                                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-700 truncate">{amenity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                                                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col items-center text-center shadow-sm">
                                                    <Layout size={20} className="text-blue-500 mb-2" />
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">Furnishing</p>
                                                    <p className="text-sm font-black text-slate-800">{product.furnishingStatus}</p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 flex flex-col items-center text-center shadow-sm">
                                                    <Clock size={20} className="text-amber-500 mb-2" />
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-1">Availability</p>
                                                    <p className="text-sm font-black text-slate-800 capitalize">{product.availabilityStatus}</p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-center text-center shadow-sm">
                                                    <Calendar size={20} className="text-emerald-500 mb-2" />
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">Available From</p>
                                                    <p className="text-sm font-black text-slate-800">{product.availableFrom}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Independent Property Reviews Block */}
                            <div className="mt-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                        <MessageSquare size={14} /> Global Feedback ({propertyReviews.length})
                                    </h4>
                                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 shadow-sm">
                                        <Star size={14} className="text-amber-500 fill-amber-500" />
                                        <span className="text-xs font-black text-amber-600">
                                            {propertyReviews.length > 0 ? (propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length).toFixed(1) : 'No Ratings'}
                                        </span>
                                    </div>
                                </div>

                                {propertyReviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {propertyReviews.map(review => (
                                            <div key={review.id} className="p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm shadow-slate-200/20 group hover:border-primary/20 transition-all">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-500 uppercase border border-slate-100">
                                                            {review.user.substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-sm font-black text-slate-800">{review.user}</h5>
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <div className="flex items-center gap-1 mb-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={12} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-100 fill-slate-100'} />
                                                            ))}
                                                        </div>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${review.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : review.status === 'Flagged' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                                            {review.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-xs font-semibold text-slate-600 leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-slate-50 rounded-[1.5rem] border border-slate-100 border-dashed">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                                            <MessageSquare size={20} className="text-slate-300" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-600">No Reviews Found</span>
                                            This property hasn't received any reviews yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Pricing & Financials */}
                        <div className="lg:col-span-4 gap-6 flex flex-col">
                            <div className="bg-white rounded-[2rem] border border-primary/20 shadow-2xl shadow-slate-200/30 bg-gradient-to-br from-white to-slate-50 p-8">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-6 flex items-center gap-2">
                                    Financial Structure
                                </h3>
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/20 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[3rem] -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500"></div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Expected Pricing</p>
                                        <p className="text-4xl font-black text-slate-900 tracking-tighter">{product.price}</p>
                                        <div className="mt-5 flex items-center gap-2">
                                            {product.pricing.negotiable ? (
                                                <div className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-emerald-100 shadow-sm">
                                                    <Check size={12} /> Negotiable Listing
                                                </div>
                                            ) : (
                                                <div className="text-[9px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-rose-100 shadow-sm">
                                                    <XCircle size={12} /> Fixed Rate Model
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                                            <div>
                                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Price / SqFt</p>
                                                <p className="text-base font-black text-slate-800">₹{product.pricing.pricePerSqft.toLocaleString()}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                                <Maximize2 size={18} />
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                                            <div>
                                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Monthly Maintenance</p>
                                                <p className="text-base font-black text-slate-800">
                                                    {product.pricing.maintenanceCharges > 0 ? `₹${product.pricing.maintenanceCharges.toLocaleString()}` : 'Included'}
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                                <Smartphone size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <div className="bg-slate-950 text-white p-7 rounded-[1.5rem] shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                            <div className="relative z-10">
                                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-80 mb-5 flex items-center gap-2">
                                                    <Activity size={12} className="text-primary" /> Admin Insights
                                                </h5>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5 shadow-inner">
                                                            <Users size={16} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-white">12 Active Inquiries</p>
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">High Interest</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5 shadow-inner">
                                                            <Eye size={16} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-white">1.2k Weekly Views</p>
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">+14% From Last Week</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Admin Actions Bar */}
                    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-50 flex items-center px-6 lg:ml-60 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
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
                                <button className="px-5 py-2 rounded-xl border border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm">
                                    Cancel Review
                                </button>
                                {product.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                dispatch(updatePropertyStatus({ id: product.id, status: 'Rejected' }));
                                                navigate('/properties');
                                            }}
                                            className="px-5 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-black text-[10px] uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95 shadow-sm"
                                        >
                                            Reject Listing
                                        </button>
                                        <button
                                            onClick={() => {
                                                dispatch(updatePropertyStatus({ id: product.id, status: 'Active' }));
                                                navigate('/properties');
                                            }}
                                            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                                        >
                                            Publish Property
                                        </button>
                                    </>
                                )}
                                {product.status === 'Active' && (
                                    <button
                                        onClick={() => {
                                            dispatch(updatePropertyStatus({ id: product.id, status: 'Rejected' }));
                                            navigate('/properties');
                                        }}
                                        className="px-5 py-2 rounded-xl bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 active:scale-95 flex items-center gap-2"
                                    >
                                        <Trash2 size={14} /> Take Down Listing
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* Asset Intelligence Lightbox */}
            <Modal
                isOpen={!!lightboxImage}
                onClose={() => setLightboxImage(null)}
                title={`Smart Album Inspection — ${selectedAlbum}`}
                size="xl"
            >
                <div className="relative group bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
                    <img
                        src={lightboxImage}
                        className="w-full h-auto max-h-[80vh] object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                        alt="Full Screen Preview"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        High-Resolution Asset Analysis
                    </div>
                </div>
            </Modal>
        </div>
    );
}

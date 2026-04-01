import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPropertyById, updatePropertyStatus } from '../features/products/productsSlice';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import { 
    Building2, MapPin, CheckCircle, XCircle, 
    ArrowLeft, Calendar, Activity, 
    Download, ExternalLink, Shield, 
    Info, Maximize2, Play, Users, 
    Compass, Home, Layout, Waves, 
    Wind, Trash2, Check, Clock, 
    Smartphone, Sofa, Tv, Utensils, 
    Coffee, Bike, Trees, Eye
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

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const product = useSelector((state) => selectPropertyById(state, id));
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedAlbum, setSelectedAlbum] = useState('Livving Room');
    const [lightboxImage, setLightboxImage] = useState(null);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-border mt-10">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Building2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Property not found</h2>
                <p className="text-slate-500 mt-1">This listing might have been removed or doesn't exist.</p>
                <button 
                    onClick={() => navigate('/products')}
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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-white border border-border hover:bg-slate-50 text-slate-500 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            <span>Admin</span>
                            <span className="text-slate-200">/</span>
                            <span>Listings</span>
                            <span className="text-slate-200">/</span>
                            <span className="text-primary">#PRP-{product.id}</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{product.title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={product.status === 'Active' ? 'green' : product.status === 'Pending' ? 'amber' : 'red'}>
                        {product.status}
                    </Badge>
                    <button className="btn-secondary">
                        <Download size={14} /> Download PDF
                    </button>
                </div>
            </div>

            {/* Hero Section: Media Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    {/* Main Cover & Quick Stats */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] shadow-lg border border-border">
                        <img 
                            src={product.coverPhoto || product.images[0]} 
                            alt={product.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-0.5">Price</p>
                                    <p className="text-2xl font-black">{product.price}</p>
                                </div>
                                <div className="w-px h-8 bg-white/20"></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-0.5">Built Area</p>
                                    <p className="text-base font-bold">{product.propertyLength}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {product.video && (
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold hover:bg-white/30 transition-all">
                                        <Play size={14} fill="currentColor" /> Watch Video
                                    </button>
                                )}
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-xs font-bold hover:bg-slate-900/80 transition-all">
                                    <Maximize2 size={14} /> Full View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Smart Album Tabs */}
                    <div className="card overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-slate-50/50 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <Layout size={16} className="text-primary" /> Smart Album Breakdown
                            </h3>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded border border-border">
                                {albumCategories.length} Categories
                            </span>
                        </div>
                        <div className="p-2 flex gap-1 overflow-x-auto scrollbar-hide border-b border-border">
                            {albumCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedAlbum(cat)}
                                    className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg transition-all ${selectedAlbum === cat ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
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
                                            className="group relative aspect-square rounded-xl overflow-hidden border border-border shadow-sm cursor-zoom-in"
                                        >
                                            <img src={img} alt={`${selectedAlbum} ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Maximize2 size={24} className="text-white drop-shadow-md" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-slate-400 font-medium">
                                    No images found for this category.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Uploader & Proofs */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Uploader Card */}
                    <div className="card p-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <Shield size={14} className="text-emerald-500" /> Uploader Verification
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar initials={product.uploader.avatar} src={product.uploader.photo} size="lg" className="ring-4 ring-slate-50" />
                            <div>
                                <h4 className="text-base font-bold text-slate-800">{product.uploader.name}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">
                                        {product.uploader.role}
                                    </span>
                                    {product.ownerVerification?.status === 'Verified' && (
                                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                            <CheckCircle size={12} /> {product.uploader.verification}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4 pt-4 border-t border-border">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-slate-400">Identity Proof</span>
                                <span className="text-slate-700 font-bold">{product.ownerVerification?.type} Card</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-slate-400">Verification Date</span>
                                <span className="text-slate-700 font-bold">March 15, 2024</span>
                            </div>
                        </div>
                    </div>

                    {/* Ownership Proofs Card */}
                    <div className="card p-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <Info size={14} className="text-blue-500" /> Ownership Proofs
                        </h3>
                        <div className="space-y-2">
                            {[
                                { id: 'saleDeed', label: 'Sale Deed / Title Deed', req: true },
                                { id: 'encumbranceCert', label: 'Encumbrance Certificate', req: true },
                                { id: 'propertyTaxReceipt', label: 'Property Tax Receipt', req: true },
                                { id: 'legalOpinion', label: 'Legal Opinion Document', req: false },
                                { id: 'lawyerCert', label: 'Lawyer Certificate', req: false }
                            ].map(doc => {
                                const exists = product.ownershipProofs?.[doc.id];
                                return (
                                    <div key={doc.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${exists ? 'bg-white border-border hover:border-primary/40' : 'bg-slate-50 border-dashed border-slate-200 opacity-60'}`}>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-700">{doc.label}</span>
                                            <span className={`text-[9px] font-bold uppercase ${doc.req ? 'text-rose-400' : 'text-slate-400'}`}>
                                                {doc.req ? 'Required Protocol' : 'Optional Support'}
                                            </span>
                                        </div>
                                        {exists ? (
                                            <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors shadow-2xs">
                                                <Download size={14} />
                                            </button>
                                        ) : (
                                            <XCircle size={14} className="text-slate-300" />
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
                    <div className="card">
                        <div className="flex border-b border-border px-6">
                            {['Overview', 'Location & Area', 'Amenities & Specs'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-6 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {tab}
                                    {activeTab === tab && <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-primary rounded-t-full shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>}
                                </button>
                            ))}
                        </div>
                        <div className="p-8">
                            {activeTab === 'Overview' && (
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">About this Property</h4>
                                        <p className="text-slate-600 leading-relaxed font-medium">
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
                                            <div key={item.label} className="flex gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-border/50">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                                                    <p className="text-xs font-bold text-slate-800 capitalize">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Location & Area' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                                <MapPin size={14} /> Geographical Footprint
                                            </h4>
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-border/60 space-y-4">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-primary mb-1">Project / Building</p>
                                                    <p className="text-sm font-bold text-slate-800">{product.location.projectName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-primary mb-1">Full Address</p>
                                                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">{product.location.fullAddress}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-primary mb-1">Prominent Landmark</p>
                                                    <p className="text-xs font-semibold text-slate-600 italic">"{product.location.landmark}"</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                                <Activity size={14} /> Location Advantages
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {product.locationAdvantages.map(adv => (
                                                    <div key={adv} className="px-4 py-2 bg-white border border-border shadow-sm rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700 capitalize">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
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
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                            <Shield size={14} /> Integrated Modern Amenities
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {product.amenities.map(amenity => (
                                                <div key={amenity} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-border/60 hover:bg-white hover:border-primary/40 transition-all group">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-border/40 group-hover:scale-110 transition-transform">
                                                        {amenityIcons[amenity.toLowerCase()] || <Info size={16} />}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700 capitalize">{amenity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
                                        <div className="p-4 rounded-2xl bg-blue-50/30 border border-blue-100 flex flex-col items-center text-center">
                                            <Layout size={20} className="text-blue-500 mb-2" />
                                            <p className="text-[10px] font-black uppercase text-blue-400 mb-1">Furnishing</p>
                                            <p className="text-sm font-bold text-slate-800">{product.furnishingStatus}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-amber-50/30 border border-amber-100 flex flex-col items-center text-center">
                                            <Clock size={20} className="text-amber-500 mb-2" />
                                            <p className="text-[10px] font-black uppercase text-amber-400 mb-1">Availability</p>
                                            <p className="text-sm font-bold text-slate-800 capitalize">{product.availabilityStatus}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 flex flex-col items-center text-center">
                                            <Calendar size={20} className="text-emerald-500 mb-2" />
                                            <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">Available From</p>
                                            <p className="text-sm font-bold text-slate-800">{product.availableFrom}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Pricing & Financials */}
                <div className="lg:col-span-4 gap-6 flex flex-col">
                    <div className="card shadow-md border-primary/20 bg-gradient-to-br from-white to-slate-50/50 p-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Financial Structure</h3>
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expected Pricing</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">{product.price}</p>
                                <div className="mt-4 flex items-center gap-2">
                                    {product.pricing.negotiable ? (
                                        <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-100">
                                            <Check size={10} /> Negotiable Listing
                                        </div>
                                    ) : (
                                        <div className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1 border border-rose-100">
                                            <XCircle size={10} /> Fixed Rate Model
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-white p-4 rounded-xl border border-border/60 flex items-center justify-between">
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Price / SqFt</p>
                                        <p className="text-sm font-black text-slate-800">₹{product.pricing.pricePerSqft.toLocaleString()}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-border/60 flex items-center justify-between">
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Monthly Maintenance</p>
                                        <p className="text-sm font-black text-slate-800">
                                            {product.pricing.maintenanceCharges > 0 ? `₹${product.pricing.maintenanceCharges.toLocaleString()}` : 'Included'}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Smartphone size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Admin Insights</h5>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                    <Users size={14} className="text-primary" />
                                                </div>
                                                <p className="text-xs font-bold">12 Active Inquiries</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                    <Eye size={14} className="text-primary" />
                                                </div>
                                                <p className="text-xs font-bold">1.2k Weekly Views</p>
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
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-border z-50 flex items-center px-6 lg:ml-60 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-border">
                            <Clock size={14} className="text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-600">Last scanned: 2 mins ago</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                            <Shield size={14} className="text-emerald-500" />
                            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Protocol Secured</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <button className="px-8 py-3 rounded-xl border border-border font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                            Cancel Review
                        </button>
                        {product.status === 'Pending' && (
                            <>
                                <button 
                                    onClick={() => {
                                        dispatch(updatePropertyStatus({ id: product.id, status: 'Rejected' }));
                                        navigate('/products');
                                    }}
                                    className="px-8 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95"
                                >
                                    Reject Listing
                                </button>
                                <button 
                                    onClick={() => {
                                        dispatch(updatePropertyStatus({ id: product.id, status: 'Active' }));
                                        navigate('/products');
                                    }}
                                    className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                >
                                    Publish Property
                                </button>
                            </>
                        )}
                        {product.status === 'Active' && (
                            <button 
                                onClick={() => {
                                    dispatch(updatePropertyStatus({ id: product.id, status: 'Rejected' }));
                                    navigate('/products');
                                }}
                                className="px-8 py-3 rounded-xl bg-rose-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg active:scale-95"
                            >
                                <Trash2 size={14} className="inline mr-2" /> Take Down Listing
                            </button>
                        )}
                    </div>
                </div>
            </div>
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

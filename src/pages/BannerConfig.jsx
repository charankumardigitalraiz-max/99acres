import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, X, Image as ImageIcon, ExternalLink, Layout, Info, User, Home, Monitor, Smartphone, Globe } from 'lucide-react';
import { bannersData, usersData, propertiesData } from '../data/mockData';
import SearchableSelect from '../components/ui/SearchableSelect';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';

export default function BannerConfig() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [imageUploadMethod, setImageUploadMethod] = useState('url');

    useEffect(() => {
        if (id) {
            const banner = bannersData.find(b => b.id.toString() === id);
            if (banner) {
                setSelectedBanner(banner);
            }
        } else {
            setSelectedBanner({
                name: '',
                screen: 'Home Screen',
                status: 'Active',
                platform: 'Both',
                position: 'top',
                description: '',
                image: '',
                sellerId: '',
                propertyId: '',
                adLink: ''
            });
        }
    }, [id]);

    if (!selectedBanner) return <div className="p-20 text-center text-slate-400">Initializing Configuration Studio...</div>;

    return (
        <div className="space-y-6 pb-20 max-w-5xl mx-auto">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/banners')}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            <span>Banner Studio</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <span className="text-primary/80">{id ? 'Edit Mode' : 'Creation Mode'}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {id ? `Asset Configuration: ${selectedBanner.name}` : 'Deploy New Visual Asset'}
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/banners')}
                        className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                        Discard Changes
                    </button>
                    <button 
                        disabled={!selectedBanner?.propertyId}
                        className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 ${selectedBanner?.propertyId ? 'bg-slate-900 text-white hover:bg-primary' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                        <Save size={16} className="inline-block mr-2 -mt-0.5" />
                        {id ? 'Synchronize Asset' : 'Launch Campaign'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Configuration Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Primary Attribution Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Info size={14} className="text-primary" /> Core Information
                            </h3>
                            {id && <Badge variant="blue">ID: {id}</Badge>}
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="form-label">Internal Reference Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={selectedBanner?.name || ''}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. Q4 Premium Property Highlight"
                                    />
                                </div>
                                <Select
                                    label="Current Deployment Status"
                                    value={selectedBanner?.status || 'Active'}
                                    onChange={e => setSelectedBanner(prev => ({ ...prev, status: e.target.value }))}
                                    options={['Active', 'Inactive']}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-inner">
                                <SearchableSelect
                                    label="Step 1: Assign Seller / Agent"
                                    value={selectedBanner?.sellerId || ''}
                                    onChange={e => setSelectedBanner(prev => ({ ...prev, sellerId: e.target.value, propertyId: '' }))}
                                    options={usersData
                                        .filter(u => u.role === 'Seller' || u.role === 'Agent')
                                        .map(u => ({ value: u.id, label: `${u.name} (${u.role})` }))
                                    }
                                    placeholder="Search agents..."
                                />
                                
                                {selectedBanner?.sellerId && (
                                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                        <SearchableSelect
                                            label="Step 2: Link Target Property"
                                            value={selectedBanner?.propertyId || ''}
                                            onChange={e => setSelectedBanner(prev => ({ ...prev, propertyId: e.target.value }))}
                                            options={propertiesData.map(p => ({ value: p.id.toString(), label: p.title }))}
                                            placeholder="Search inventory..."
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Placement & Logic Card */}
                    {selectedBanner?.propertyId && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
                            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Layout size={14} className="text-rose-500" /> Placement Logic
                                </h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <Select
                                        label="Visibility Surface"
                                        value={selectedBanner?.screen || 'Home Screen'}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, screen: e.target.value }))}
                                        options={['Home Screen', 'Property Listings', 'User Dashboard', 'Premium Signup', 'Search Results']}
                                    />
                                    <Select
                                        label="Device Optimization"
                                        value={selectedBanner?.platform || 'Both'}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, platform: e.target.value }))}
                                        options={[
                                            { value: 'Web', label: 'Web Browsers' },
                                            { value: 'Mobile', label: 'Mobile Apps' },
                                            { value: 'Both', label: 'All Platforms' }
                                        ]}
                                    />
                                    <Select
                                        label="Vertical Indexing"
                                        value={selectedBanner?.position || 'top'}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, position: e.target.value }))}
                                        options={[
                                            { value: 'top', label: 'Hero Section' },
                                            { value: 'middle', label: 'Interstitial' },
                                            { value: 'bottom', label: 'Footer Region' }
                                        ]}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="form-label">Direct CTA Redirect (URL)</label>
                                        <div className="relative group">
                                            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                                            <input
                                                type="text"
                                                className="form-input pl-12"
                                                value={selectedBanner?.adLink || ''}
                                                onChange={e => setSelectedBanner(prev => ({ ...prev, adLink: e.target.value }))}
                                                placeholder="https://sherla.com/property/123"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label">Strategic Campaign Notes</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={selectedBanner?.description || ''}
                                            onChange={e => setSelectedBanner(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Internal campaign objective..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Creative Assets Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon size={14} className="text-indigo-500" /> Visual Creative
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex bg-slate-100/80 rounded-xl p-1 gap-1">
                                <button type="button" onClick={() => setImageUploadMethod('url')} className={`flex-1 px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all ${imageUploadMethod === 'url' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}>Remote URL</button>
                                <button type="button" onClick={() => setImageUploadMethod('file')} className={`flex-1 px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all ${imageUploadMethod === 'file' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}>Local Upload</button>
                            </div>

                            <div className="space-y-4">
                                {imageUploadMethod === 'url' ? (
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                                        <input
                                            type="text"
                                            className="form-input pl-12"
                                            value={selectedBanner?.image || ''}
                                            onChange={e => setSelectedBanner(prev => ({ ...prev, image: e.target.value }))}
                                            placeholder="Enter high-res image URL..."
                                        />
                                    </div>
                                ) : (
                                    <label className="w-full flex flex-col items-center justify-center px-4 py-10 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary/30 transition-all group/upload">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 group-hover/upload:bg-primary/5 transition-colors shadow-sm">
                                            <ImageIcon size={24} className="text-slate-300 group-hover/upload:text-primary transition-colors" />
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Image Asset</p>
                                        <input type="file" className="hidden" accept="image/*" onChange={e => {
                                            if (e.target.files[0]) {
                                                setSelectedBanner(prev => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
                                            }
                                        }} />
                                    </label>
                                )}

                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Live Asset Preview</span>
                                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner flex items-center justify-center group/preview">
                                        {selectedBanner?.image ? (
                                            <>
                                                <img src={selectedBanner.image} alt="Creative Preview" className="w-full h-full object-cover animate-fade-in" />
                                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button onClick={() => setSelectedBanner(prev => ({ ...prev, image: '' }))} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 opacity-20">
                                                <ImageIcon size={40} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Studio Preview</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[9px] text-slate-400 leading-relaxed italic ml-1">
                                        * Recommended resolution: 1920x822px for optimal clarity across all viewports.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Trash2 = ({ size, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

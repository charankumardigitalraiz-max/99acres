import React, { useState } from 'react';
import { Plus, Search, Filter, Pencil, Trash2, X, Image as ImageIcon, ExternalLink, Globe, Smartphone, Monitor, ChevronDown, Eye, Edit2, Calendar, Layout, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { bannersData, usersData, propertiesData } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import SearchableSelect from '../components/ui/SearchableSelect';

export default function Banners() {
    const [banners, setBanners] = useState(bannersData);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [imageUploadMethod, setImageUploadMethod] = useState('url');

    const filteredBanners = banners.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.screen.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleToggleStatus = (id) => {
        setBanners(prev => prev.map(b =>
            b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b
        ));
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        <span className="text-primary/80">Management</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span>Banners</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Banner Management</h2>
                </div>
                <button
                    onClick={() => {
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
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-md active:scale-95"
                >
                    <Plus size={16} />
                    Add New Banner
                </button>
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or target screen..."
                        className="search-input pl-11 pr-4 py-2.5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        className="flex-1 md:flex-none search-input py-2.5 px-4 cursor-pointer text-[10px] font-bold uppercase tracking-widest"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active Only</option>
                        <option value="Inactive">Inactive/Draft</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBanners.map((banner) => (
                    <div key={banner.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/20 transition-all group overflow-hidden flex flex-col">
                        {/* Preview Area */}
                        <div className="relative aspect-[21/9] bg-slate-100 overflow-hidden">
                            <img
                                src={banner.image}
                                alt={banner.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 z-10">
                                <Badge variant={banner.status === 'Active' ? 'green' : 'slate'} className="shadow-lg backdrop-blur-md bg-white/90">
                                    {banner.status}
                                </Badge>
                            </div>
                            <div className="absolute top-4 left-4 flex gap-2">
                                {(banner.platform === 'Web' || banner.platform === 'Both') && (
                                    <div className="p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/20 text-slate-600 transition-all hover:text-primary group/icon" title="Web Platform">
                                        <Monitor size={12} className="group-hover/icon:scale-110 transition-transform" />
                                    </div>
                                )}
                                {(banner.platform === 'Mobile' || banner.platform === 'Both') && (
                                    <div className="p-2 bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-white/20 text-slate-600 transition-all hover:text-primary group/icon" title="Mobile Platform">
                                        <Smartphone size={12} className="group-hover/icon:scale-110 transition-transform" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Banner Metadata */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-[8px] font-bold text-primary uppercase tracking-widest mb-1">
                                    <Layout size={10} /> {banner.screen}
                                </div>
                                <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{banner.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 tabular-nums">ID: {banner.id}</p>
                            </div>

                            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 flex-1 line-clamp-2">
                                {banner.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Calendar size={12} className="text-slate-300" /> {banner.date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => handleToggleStatus(banner.id)}
                                        className={`btn-action ${banner.status === 'Active' ? 'btn-action-reject' : 'btn-action-approve'}`}
                                        title={banner.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    >
                                        {banner.status === 'Active' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                                    </button>
                                    <button
                                        className="btn-action btn-action-edit"
                                        onClick={() => {
                                            setSelectedBanner(banner);
                                            setIsModalOpen(true);
                                        }}
                                        title="Edit"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        className="btn-action btn-action-reject"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredBanners.length === 0 && (
                    <div className="col-span-full py-20 bg-white rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon size={48} className="mb-4 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">No banners found</p>
                    </div>
                )}
            </div>

            {/* Configuration Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedBanner?.id ? 'Edit Banner Configuration' : 'Deploy New Banner'}
                size="lg"
            >
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 gap-5">
                        {/* Primary Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Banner Reference Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={selectedBanner?.name || ''}
                                    onChange={e => setSelectedBanner(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. Summer Campaign 2024"
                                />
                            </div>
                            <Select
                                label="Initial Status"
                                value={selectedBanner?.status || 'Active'}
                                onChange={e => setSelectedBanner(prev => ({ ...prev, status: e.target.value }))}
                                options={['Active', 'Inactive']}
                                placeholder={null}
                            />
                        </div>

                        {/* Attribution: Seller & Property (Progressive) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                            <SearchableSelect
                                label="Step 1: Select Seller / Agent"
                                value={selectedBanner?.sellerId || ''}
                                onChange={e => setSelectedBanner(prev => ({ ...prev, sellerId: e.target.value, propertyId: '' }))}
                                options={usersData
                                    .filter(u => u.role === 'Seller' || u.role === 'Agent')
                                    .map(u => ({ value: u.id, label: `${u.name} (${u.role})` }))
                                }
                                placeholder="Search & choose seller"
                            />

                            {selectedBanner?.sellerId && (
                                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                                    <SearchableSelect
                                        label="Step 2: Target Property"
                                        value={selectedBanner?.propertyId || ''}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, propertyId: e.target.value }))}
                                        options={propertiesData
                                            .filter(p => p.userId === selectedBanner?.sellerId)
                                            .map(p => ({ value: p.id.toString(), label: p.title }))
                                        }
                                        placeholder="Search & choose property"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Configuration Payload - Visible only after Step 2 */}
                        {selectedBanner?.propertyId && (
                            <div className="space-y-6 pt-2 animate-in fade-in zoom-in-95 duration-500">
                                <div className="h-px bg-slate-100 w-full" />

                                {/* Placement Configuration */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <Select
                                        label="Visibility Area"
                                        value={selectedBanner?.screen || 'Home Screen'}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, screen: e.target.value }))}
                                        options={['Home Screen', 'Property Listings', 'User Dashboard', 'Premium Signup', 'Search Results']}
                                        placeholder={null}
                                    />
                                    <Select
                                        label="Platform Scope"
                                        value={selectedBanner?.platform || 'Both'}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, platform: e.target.value }))}
                                        options={[
                                            { value: 'Web', label: 'Web Only' },
                                            { value: 'Mobile', label: 'Mobile Only' },
                                            { value: 'Both', label: 'Omnichannel' }
                                        ]}
                                        placeholder={null}
                                    />
                                    <Select
                                        label="Vertical Position"
                                        value={selectedBanner?.position || 'top'}
                                        onChange={e => setSelectedBanner(prev => ({ ...prev, position: e.target.value }))}
                                        options={[
                                            { value: 'top', label: 'Top Header' },
                                            { value: 'middle', label: 'Mid-Section' },
                                            { value: 'bottom', label: 'Bottom Footer' }
                                        ]}
                                        placeholder={null}
                                    />
                                </div>

                                {/* Linkage & Internal Notes (Horizontal Row) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="form-label">Advertisement Link (URL)</label>
                                        <div className="relative group">
                                            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={14} />
                                            <input
                                                type="text"
                                                className="form-input pl-11"
                                                value={selectedBanner?.adLink || ''}
                                                onChange={e => setSelectedBanner(prev => ({ ...prev, adLink: e.target.value }))}
                                                placeholder="https://sherla.com/property/123"
                                            />
                                        </div>
                                    </div>
                                    {/* <div>
                                        <label className="form-label">Internal Campaign Memo</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={selectedBanner?.description || ''}
                                            onChange={e => setSelectedBanner(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Notes for internal tracking..."
                                        />
                                    </div> */}
                                </div>

                                {/* Asset Source Toggle */}
                                <div className="space-y-4 bg-slate-50/30 p-5 rounded-2xl border border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <label className="form-label !mb-0">Creative Asset Source</label>
                                        <div className="flex bg-slate-100/80 rounded-lg p-0.5 gap-1">
                                            <button type="button" onClick={() => setImageUploadMethod('url')} className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-md transition-all ${imageUploadMethod === 'url' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}>Remote URL</button>
                                            <button type="button" onClick={() => setImageUploadMethod('file')} className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-md transition-all ${imageUploadMethod === 'file' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}>Direct Upload</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                                        <div className="space-y-4">
                                            {imageUploadMethod === 'url' ? (
                                                <div className="relative group">
                                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={14} />
                                                    <input
                                                        type="text"
                                                        className="form-input pl-11"
                                                        value={selectedBanner?.image || ''}
                                                        onChange={e => setSelectedBanner(prev => ({ ...prev, image: e.target.value }))}
                                                        placeholder="Enter image URL..."
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-full">
                                                    <label className="w-full flex flex-col items-center justify-center px-4 py-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary/30 transition-all group/upload">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <ImageIcon size={24} className="text-slate-300 mb-2 group-hover/upload:text-primary transition-colors" />
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Asset</p>
                                                        </div>
                                                        <input type="file" className="hidden" accept="image/*" onChange={e => {
                                                            if (e.target.files[0]) {
                                                                setSelectedBanner(prev => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
                                                            }
                                                        }} />
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        {selectedBanner?.image && (
                                            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner flex items-center justify-center">

                                                <img src={selectedBanner.image} alt="Creative Preview" className="w-full h-full object-cover animate-fade-in" />

                                                {/* <div className="flex flex-col items-center gap-2 opacity-20">
                                                    <ImageIcon size={32} />
                                                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Preview Area</span>
                                                </div> */}

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-slate-200 bg-white rounded-xl text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">Discard</button>
                        <button
                            type="submit"
                            disabled={!selectedBanner?.propertyId}
                            className={`px-8 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 ${selectedBanner?.propertyId ? 'bg-slate-900 text-white hover:bg-primary shadow-slate-900/10' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                        >
                            {selectedBanner?.id ? 'Apply Modifications' : 'Add Banner'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

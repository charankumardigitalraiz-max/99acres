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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Banner Management</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Configure marketing creatives and promotional placement</p>
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
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95"
        >
          <Plus size={16} />Add New Banner
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-[450px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search by name or target screen..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-md text-[11px] font-bold uppercase tracking-widest outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select
            options={[
              { label: 'All Statuses', value: 'All' },
              { label: 'Active Creatives', value: 'Active' },
              { label: 'Inactive/Drafts', value: 'Inactive' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            containerClassName="w-full md:w-56"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-primary/20 transition-all group overflow-hidden flex flex-col">
            {/* Preview Area */}
            <div className="relative aspect-[21/9] bg-slate-100 overflow-hidden">
              <img
                src={banner.image}
                alt={banner.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 right-3 z-10">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border backdrop-blur-md ${banner.status === 'Active' ? 'bg-emerald-50/90 text-emerald-600 border-emerald-100' : 'bg-slate-50/90 text-slate-400 border-slate-100'}`}>
                  {banner.status}
                </span>
              </div>
              <div className="absolute top-3 left-3 flex gap-1.5">
                {(banner.platform === 'Web' || banner.platform === 'Both') && (
                  <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-md shadow-sm border border-slate-200 text-slate-400" title="Web Platform">
                    <Monitor size={12} />
                  </div>
                )}
                {(banner.platform === 'Mobile' || banner.platform === 'Both') && (
                  <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-md shadow-sm border border-slate-200 text-slate-400" title="Mobile Platform">
                    <Smartphone size={12} />
                  </div>
                )}
              </div>
            </div>

            {/* Banner Metadata */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-3">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                  <Layout size={12} /> {banner.screen}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{banner.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 tabular-nums">Ref: #BNR-{banner.id.toString().padStart(4, '0')}</p>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5 flex-1 line-clamp-2">
                {banner.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Calendar size={12} className="text-slate-300" /> {banner.date}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(banner.id)}
                    className={`w-8 h-8 rounded-md transition-all flex items-center justify-center border ${banner.status === 'Inactive' ? 'bg-emerald-50 text-emerald-400 border-emerald-100 hover:bg-emerald-500 hover:text-white' : 'bg-rose-50 text-rose-400 border-rose-100 hover:bg-rose-500 hover:text-white'}`}
                    title={banner.status === 'Active' ? 'Deactivate' : 'Activate'}
                  >
                    {banner.status === 'Active' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                  </button>
                  <button
                    className="p-2.5 rounded-xl btn-action-edit transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={() => {
                      setSelectedBanner(banner);
                      setIsModalOpen(true);
                    }}
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="p-2.5 rounded-xl btn-action-reject transition-all duration-300 shadow-sm hover:shadow-md"
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
          <div className="col-span-full py-16 bg-white rounded-lg border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={40} className="mb-3 opacity-20" />
            <p className="text-[10px] font-bold uppercase tracking-wider">No matching creatives found</p>
          </div>
        )}
      </div>

      {/* Configuration Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBanner?.id ? 'Edit Configuration' : 'Deploy Creative'}
        size="lg"
      >
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Campaign Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
                  value={selectedBanner?.name || ''}
                  onChange={e => setSelectedBanner(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Premium Listings Launch"
                />
              </div>
              <Select
                label="Visibility Status"
                value={selectedBanner?.status || 'Active'}
                onChange={e => setSelectedBanner(prev => ({ ...prev, status: e.target.value }))}
                options={['Active', 'Inactive']}
                placeholder={null}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <SearchableSelect
                label="Step 1: Primary Entity"
                value={selectedBanner?.sellerId || ''}
                onChange={e => setSelectedBanner(prev => ({ ...prev, sellerId: e.target.value, propertyId: '' }))}
                options={usersData
                  .filter(u => u.role === 'Seller' || u.role === 'Agent')
                  .map(u => ({ value: u.id, label: `${u.name} (${u.role})` }))
                }
                placeholder="Search for seller/agent"
              />

              {selectedBanner?.sellerId && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                  <SearchableSelect
                    label="Step 2: Associated Resource"
                    value={selectedBanner?.propertyId || ''}
                    onChange={e => setSelectedBanner(prev => ({ ...prev, propertyId: e.target.value }))}
                    options={propertiesData
                      .filter(p => p.userId === selectedBanner?.sellerId)
                      .map(p => ({ value: p.id.toString(), label: p.title }))
                    }
                    placeholder="Link to specific property"
                  />
                </div>
              )}
            </div>

            {selectedBanner?.propertyId && (
              <div className="space-y-5 pt-1 animate-in fade-in zoom-in-95 duration-500">
                <div className="h-px bg-slate-100 w-full" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Placement Area"
                    value={selectedBanner?.screen || 'Home Screen'}
                    onChange={e => setSelectedBanner(prev => ({ ...prev, screen: e.target.value }))}
                    options={['Home Screen', 'Property Listings', 'User Dashboard', 'Premium Signup', 'Search Results']}
                    placeholder={null}
                  />
                  <Select
                    label="Platform Access"
                    value={selectedBanner?.platform || 'Both'}
                    onChange={e => setSelectedBanner(prev => ({ ...prev, platform: e.target.value }))}
                    options={[
                      { value: 'Web', label: 'Web Only' },
                      { value: 'Mobile', label: 'Mobile Only' },
                      { value: 'Both', label: 'Unified' }
                    ]}
                    placeholder={null}
                  />
                  <Select
                    label="Vertical Slot"
                    value={selectedBanner?.position || 'top'}
                    onChange={e => setSelectedBanner(prev => ({ ...prev, position: e.target.value }))}
                    options={[
                      { value: 'top', label: 'Top Header' },
                      { value: 'middle', label: 'Mid Row' },
                      { value: 'bottom', label: 'Bottom Bar' }
                    ]}
                    placeholder={null}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Destination URL</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
                      value={selectedBanner?.adLink || ''}
                      onChange={e => setSelectedBanner(prev => ({ ...prev, adLink: e.target.value }))}
                      placeholder="https://example.com/target"
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Creative Asset</label>
                    <div className="flex bg-slate-200/50 rounded-md p-1 gap-1">
                      <button type="button" onClick={() => setImageUploadMethod('url')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${imageUploadMethod === 'url' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}>URL</button>
                      <button type="button" onClick={() => setImageUploadMethod('file')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${imageUploadMethod === 'file' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}>Upload</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {imageUploadMethod === 'url' ? (
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="text"
                          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
                          value={selectedBanner?.image || ''}
                          onChange={e => setSelectedBanner(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="Paste image URL here..."
                        />
                      </div>
                    ) : (
                      <label className="w-full flex flex-col items-center justify-center py-6 bg-white border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-primary/30 transition-all group">
                        <ImageIcon size={24} className="text-slate-300 mb-2 group-hover:text-primary transition-colors" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select File</p>
                        <input type="file" className="hidden" accept="image/*" onChange={e => {
                          if (e.target.files[0]) {
                            setSelectedBanner(prev => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
                          }
                        }} />
                      </label>
                    )}
                    {selectedBanner?.image && (
                      <div className="relative aspect-[21/9] rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
                        <img src={selectedBanner.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">Discard</button>
            <button
              type="submit"
              disabled={!selectedBanner?.propertyId}
              className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${selectedBanner?.propertyId ? 'bg-primary text-white hover:opacity-90 active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              {selectedBanner?.id ? 'Update Banner' : 'Create Banner'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

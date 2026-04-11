import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectFilteredSections,
    setStatusFilter,
    addSection,
    updateSection,
    deleteSection,
    toggleSectionStatus,
} from '../features/sections/sectionSlice';
import {
    Plus, Edit2, Trash2, Search, LayoutList,
    CheckCircle, XCircle, Building2, MapPin, X, ChevronDown
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import DeleteModel from '../components/model/DeleteModel';

const EMPTY_FORM = {
    id: null,
    title: '',
    subtitle: '',
    propertyListing: [], // array of property ids
    status: 'Active',
};

/* ── Property Multi-Select Dropdown ── */
function PropertyMultiSelect({ allProperties, selected, onChange }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filtered = allProperties.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.propertyType || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.city || '').toLowerCase().includes(search.toLowerCase())
    );

    const toggle = (id) => {
        onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
    };

    const selectedProps = allProperties.filter(p => selected.includes(p.id));

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all hover:border-primary/30 min-h-[44px]"
            >
                {selectedProps.length === 0 ? (
                    <span className="text-slate-400">Select properties to include…</span>
                ) : (
                    <div className="flex flex-wrap gap-1.5 flex-1 text-left">
                        {selectedProps.map(p => (
                            <span
                                key={p.id}
                                className="inline-flex items-center gap-1.5 pl-1.5 pr-2 py-0.5 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 shadow-sm leading-none"
                            >
                                {p.coverPhoto && (
                                    <img src={p.coverPhoto} alt="" className="w-4 h-4 rounded object-cover flex-shrink-0" />
                                )}
                                <span className="max-w-[100px] truncate">{p.title}</span>
                                <span
                                    role="button"
                                    onClick={e => { e.stopPropagation(); toggle(p.id); }}
                                    className="text-slate-400 hover:text-red-500 cursor-pointer ml-0.5 flex-shrink-0"
                                >
                                    <X size={9} />
                                </span>
                            </span>
                        ))}
                    </div>
                )}
                <ChevronDown size={14} className={`text-slate-400 flex-shrink-0 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                    {/* Search inside dropdown */}
                    <div className="p-3 border-b border-slate-100">
                        <div className="relative">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                autoFocus
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by title, type, city…"
                                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/10 font-medium"
                            />
                        </div>
                    </div>

                    {/* Property List */}
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                        {filtered.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400 font-medium">
                                <Building2 size={24} className="mx-auto mb-2 opacity-30" />
                                No properties match
                            </div>
                        ) : (
                            filtered.map(prop => {
                                const isSelected = selected.includes(prop.id);
                                return (
                                    <button
                                        type="button"
                                        key={prop.id}
                                        onClick={() => toggle(prop.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-slate-50 ${isSelected ? 'bg-primary/5' : ''}`}
                                    >
                                        {/* Checkbox */}
                                        <div className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                                            {isSelected && (
                                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Property Thumbnail */}
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                            {prop.coverPhoto ? (
                                                <img src={prop.coverPhoto} alt={prop.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 size={16} className="m-auto mt-2.5 text-slate-300" />
                                            )}
                                        </div>

                                        {/* Property Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate leading-tight">{prop.title}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{prop.propertyType}</span>
                                                {prop.city && (
                                                    <>
                                                        <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                                                        <span className="text-[9px] font-medium text-slate-400 flex items-center gap-0.5">
                                                            <MapPin size={8} />{prop.city}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs font-bold text-slate-900">{prop.price}</p>
                                            <p className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 ${prop.status === 'verified' ? 'text-emerald-500' : prop.status === 'rejected' ? 'text-rose-400' : 'text-amber-500'}`}>
                                                {prop.status}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {selected.length} selected
                        </p>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-[9px] font-black text-primary uppercase tracking-widest hover:text-primary/70 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Sections() {
    const dispatch = useDispatch();
    const sections = useSelector(selectFilteredSections);
    const { statusFilter, sections: allSections } = useSelector(state => state.sections);

    // Get all properties from the products slice
    const allProperties = useSelector(state => state.products.list);

    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);

    const counts = {
        all: allSections.length,
        active: allSections.filter(s => s.status === 'Active').length,
        inactive: allSections.filter(s => s.status === 'Inactive').length,
    };

    const filtered = sections.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(search.toLowerCase())
    );

    /* ── Helpers ── */
    const openAdd = () => {
        setModalMode('add');
        setFormData(EMPTY_FORM);
        setIsModalOpen(true);
    };
    const openEdit = (section) => {
        setModalMode('edit');
        setFormData({ ...section });
        setIsModalOpen(true);
    };
    const openDelete = (section) => {
        setSelectedSection(section);
        setIsDeleteOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (modalMode === 'add') {
            dispatch(addSection(formData));
        } else {
            dispatch(updateSection(formData));
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteSection(selectedSection?.id));
        setIsDeleteOpen(false);
    };

    // Get property titles for table display
    const getPropTitles = (ids = []) =>
        allProperties.filter(p => ids.includes(p.id));

    return (
        <div className="space-y-6 pb-12">

            {/* ── Page Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                        <span>Admin</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-primary/80">Sections</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Section Management</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        Define homepage sections — each section displays a set of pinned properties.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                >
                    <Plus size={15} /> Add Section
                </button>
            </div>

            {/* ── KPI Stats ── */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Sections', value: counts.all, icon: LayoutList },
                    { label: 'Active', value: counts.active, icon: CheckCircle },
                    { label: 'Inactive', value: counts.inactive, icon: XCircle },
                ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm group hover:border-primary/30 transition-all cursor-default">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <stat.icon size={16} className="text-primary" />
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* ── Control Bar ── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input
                        type="text"
                        placeholder="Search by title or subtitle..."
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 w-full sm:w-fit gap-1">
                    {['All', 'Active', 'Inactive'].map(status => (
                        <button
                            key={status}
                            onClick={() => dispatch(setStatusFilter(status))}
                            className={`flex-1 sm:flex-none px-5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${statusFilter === status
                                ? 'bg-white text-primary shadow-sm border border-slate-100'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Data Table ── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60">
                                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
                                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Subtitle</th>
                                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Properties</th>
                                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Created</th>
                                <th className="text-center px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="text-right px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-20 text-center">
                                        <LayoutList size={40} className="mx-auto mb-3 text-slate-200" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">No sections found</p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((section, idx) => {
                                    const props = getPropTitles(section.propertyListing || []);
                                    return (
                                        <tr key={section.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-slate-400 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                                            </td>

                                            {/* Title */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <LayoutList size={13} className="text-primary" />
                                                    </div>
                                                    <span className="font-bold text-slate-900 text-sm leading-tight">{section.title}</span>
                                                </div>
                                            </td>

                                            {/* Subtitle */}
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <p className="text-xs text-slate-500 font-medium max-w-xs truncate">{section.subtitle}</p>
                                            </td>

                                            {/* Properties stacked thumbnails */}
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                {props.length === 0 ? (
                                                    <span className="text-[10px] text-slate-400 font-medium italic">None selected</span>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {/* Stacked Avatars */}
                                                        <div className="flex -space-x-2">
                                                            {props.slice(0, 4).map(p => (
                                                                <div
                                                                    key={p.id}
                                                                    className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm"
                                                                    title={p.title}
                                                                >
                                                                    {p.coverPhoto ? (
                                                                        <img src={p.coverPhoto} alt={p.title} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <Building2 size={12} className="m-auto mt-1 text-slate-300" />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-500">
                                                            {props.length} propert{props.length !== 1 ? 'ies' : 'y'}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Created */}
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <span className="text-[10px] font-bold text-slate-400 tabular-nums">{section.createdAt}</span>
                                            </td>

                                            {/* Status toggle */}
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => dispatch(toggleSectionStatus(section.id))}
                                                    title={`Click to ${section.status === 'Active' ? 'deactivate' : 'activate'}`}
                                                >
                                                    {section.status === 'Active' ? (
                                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-colors">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-400 rounded-full text-[9px] font-bold uppercase tracking-widest border border-slate-200 hover:bg-slate-200 transition-colors">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
                                                            Inactive
                                                        </span>
                                                    )}
                                                </button>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button onClick={() => openEdit(section)} className="btn-action btn-action-edit" title="Edit">
                                                        <Edit2 size={13} />
                                                    </button>
                                                    <button onClick={() => openDelete(section)} className="btn-action btn-action-reject" title="Delete">
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {filtered.length > 0 && (
                    <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/40">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Showing {filtered.length} of {allSections.length} sections
                        </p>
                    </div>
                )}
            </div>

            {/* ── Add / Edit Modal ── */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'add' ? 'Add New Section' : 'Edit Section'}
                size="md"
            >
                <form onSubmit={handleSave} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="form-label">Section Title</label>
                        <input
                            type="text"
                            required
                            className="form-input"
                            placeholder="e.g. Featured Properties"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="form-label">Subtitle</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Handpicked premium listings across top cities"
                            value={formData.subtitle}
                            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                    </div>

                    {/* Property Listing — real properties from store */}
                    <div>
                        <label className="form-label">
                            Property Listing
                            <span className="ml-2 text-[9px] font-medium text-slate-400 normal-case tracking-normal">
                                — select properties to show in this section on the homepage
                            </span>
                        </label>
                        <PropertyMultiSelect
                            allProperties={allProperties}
                            selected={formData.propertyListing}
                            onChange={(ids) => setFormData({ ...formData, propertyListing: ids })}
                        />
                        <p className="text-[10px] text-slate-400 font-medium mt-1.5">
                            {formData.propertyListing.length} propert{formData.propertyListing.length !== 1 ? 'ies' : 'y'} selected
                        </p>

                        {/* Mini preview of selected properties */}
                        {formData.propertyListing.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {allProperties.filter(p => formData.propertyListing.includes(p.id)).map(p => (
                                    <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                            {p.coverPhoto
                                                ? <img src={p.coverPhoto} alt={p.title} className="w-full h-full object-cover" />
                                                : <Building2 size={14} className="m-auto mt-2 text-slate-300" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate">{p.title}</p>
                                            <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-0.5">{p.propertyType} · {p.city}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-slate-900">{p.price}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, propertyListing: prev.propertyListing.filter(id => id !== p.id) }))}
                                            className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status — only in edit mode */}
                    {modalMode === 'edit' && (
                        <div>
                            <label className="form-label">Status</label>
                            <div className="flex gap-3">
                                {['Active', 'Inactive'].map(s => (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => setFormData({ ...formData, status: s })}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${formData.status === s
                                            ? s === 'Active'
                                                ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-sm'
                                                : 'bg-rose-50 border-rose-400 text-rose-600 shadow-sm'
                                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                                            }`}
                                    >
                                        {s === 'Active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setIsModalOpen(false)}
                            className="px-5 py-2.5 flex-1 md:flex-none border border-slate-200 bg-white rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all">
                            Cancel
                        </button>
                        <button type="submit"
                            className="px-6 py-2.5 flex-1 md:flex-none bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            {modalMode === 'add' ? 'Create Section' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* ── Delete Modal ── */}
            <DeleteModel
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                itemType="Section"
                title="Delete Section"
                itemName={selectedSection?.title}
            />
        </div>
    );
}

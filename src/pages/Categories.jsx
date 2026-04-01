import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredCategories, setStatusFilter, addCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice';
import { Plus, Edit2, Trash2, Eye, LayoutGrid, CheckCircle, XCircle } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import DeleteModel from '../components/model/DeleteModel';

export default function Categories() {
    const categories = useSelector(selectFilteredCategories);
    const { statusFilter, categories: allCategories } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [formData, setFormData] = useState({ id: null, name: '', slug: '', description: '', image: '', status: 'Active' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imageUploadMethod, setImageUploadMethod] = useState('url'); // 'url' or 'file'

    const openAddModal = () => {
        setModalMode('add');
        setFormData({ id: null, name: '', slug: '', description: '', image: '', status: 'Active' });
        setIsModalOpen(true);
    };

    const openEditModal = (category) => {
        setModalMode('edit');
        setFormData(category);
        setIsModalOpen(true);
    };

    const openDeleteModal = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
        setIsDeleteModalOpen(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
        };

        if (modalMode === 'add') {
            dispatch(addCategory(finalData));
        } else {
            dispatch(updateCategory(finalData));
        }
        setIsModalOpen(false);
    };

    const counts = {
        all: allCategories.length,
        active: allCategories.filter(c => c.status === 'Active').length,
        inactive: allCategories.filter(c => c.status === 'Inactive').length,
    };



    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Categories</h2>
                    <p className="text-sm font-bold text-slate-500 mt-1">Manage property classification types</p>
                </div>
                <button onClick={openAddModal} className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <Plus size={16} /> Add Category
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Categories', value: counts.all, color: 'text-slate-800', bg: 'bg-white', border: 'border-slate-200' },
                    { label: 'Active', value: counts.active, color: 'text-emerald-600', bg: 'bg-emerald-50/50', border: 'border-emerald-100' },
                    { label: 'Inactive', value: counts.inactive, color: 'text-slate-500', bg: 'bg-slate-50/50', border: 'border-slate-100' },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} rounded-2xl p-5 border ${s.border} flex items-center gap-4 shadow-sm`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg === 'bg-white' ? 'bg-slate-50' : 'bg-white'} border ${s.border}`}>
                            <LayoutGrid size={20} className={s.color} />
                        </div>
                        <div>
                            <p className={`text-2xl font-black ${s.color} leading-none mb-1`}>{s.value}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 w-full sm:w-fit">
                {['All', 'Active', 'Inactive'].map(status => (
                    <button
                        key={status}
                        onClick={() => dispatch(setStatusFilter(status))}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === status
                            ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/50'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden group flex flex-col hover:border-primary/20 transition-all">
                        {/* Image Banner */}
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute top-4 right-4 z-10">
                                <Badge variant={category.status === 'Active' ? 'green' : 'slate'} className="shadow-lg backdrop-blur-md bg-white">
                                    {category.status}
                                </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 z-10">
                                <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1 shadow-sm">{category.name}</h2>
                                <p className="text-[9px] font-black text-white/80 uppercase tracking-widest shadow-sm">/{category.slug}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6 flex-1 line-clamp-2">
                                {category.description}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                <button className="p-2 rounded-xl  text-orange-500 hover:text-primary hover:bg-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary/20" title="View Properties">
                                    <Eye size={18} />
                                </button>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => openEditModal(category)} className="p-2 rounded-xl  text-teal-500 hover:text-slate-800 hover:bg-slate-100 transition-all outline-none focus:ring-2 focus:ring-slate-200" title="Edit Category">
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(category)
                                            // handleDelete(category.id)
                                        } className="p-2 rounded-xl text-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all outline-none focus:ring-2 focus:ring-rose-200" title="Delete Category">
                                        <Trash2 className='text-danger' size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                        <LayoutGrid size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">No categories found</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1 max-w-sm">No categories match the current filter criteria.</p>
                </div>
            )}

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add Category' : 'Edit Category'} size="md">
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full form-input" placeholder="e.g. Penthouse" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Slug</label>
                        <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full form-input" placeholder="Auto-generated if empty" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                        <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full form-input resize-none" rows="3" placeholder="Category description..." />
                    </div>

                    {/* Image Upload Selector */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-bold text-slate-700">Image Source</label>
                            <div className="flex bg-slate-100 rounded-lg p-0.5 gap-1">
                                <button type="button" onClick={() => setImageUploadMethod('url')} className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${imageUploadMethod === 'url' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>URL</button>
                                <button type="button" onClick={() => setImageUploadMethod('file')} className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${imageUploadMethod === 'file' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>Upload</button>
                            </div>
                        </div>
                        {imageUploadMethod === 'url' ? (
                            <input type="url" required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full form-input" placeholder="https://..." />
                        ) : (
                            <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) }) }} className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary/5 file:text-primary hover:file:bg-primary/10 file:transition-all outline-none" />
                        )}
                        {/* Image Preview */}
                        {formData.image && (
                            <div className="mt-3">
                                <img src={formData.image} alt="Preview" className="h-20 w-32 object-cover rounded-xl border border-slate-200 shadow-sm" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                        <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full form-input">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 flex-1 md:flex-none border border-border bg-white rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                        <button type="submit" className="px-5 py-2.5 flex-1 md:flex-none bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
                            {modalMode === 'add' ? 'Create' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>




            <DeleteModel
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => handleDelete(selectedCategory?.id)}
                itemType="Category"
                title="Delete Category"
                itemName={selectedCategory?.name}
            />
        </div>
    );
}

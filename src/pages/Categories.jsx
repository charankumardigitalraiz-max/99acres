import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredCategories, setStatusFilter, addCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice';
import { Plus, Edit2, Trash2, Eye, LayoutGrid, CheckCircle, XCircle } from 'lucide-react';
import Switch from "react-switch";
import Select from '../components/ui/Select';
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

  const openEditModal = (category, type) => {
    setModalMode(type);
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


  const toggleStatus = (id) => {
    const categoriesData = categories.find(c => c.id === id);
    const staus = { id, status: categories.find(c => c.id === id).status === 'Active' ? 'Inactive' : 'Active' };
    dispatch(updateCategory({ ...categoriesData, ...staus }))
    // dispatch()

  };

  const counts = {
    all: allCategories.length,
    active: allCategories.filter(c => c.status === 'Active').length,
    inactive: allCategories.filter(c => c.status === 'Inactive').length,
  };



  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-8 py-6 rounded-2xl border border-slate-200/60 shadow-sm gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 bg-primary h-full" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Categories</h2>
          <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
            Manage property categories and organizational types
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Categories', value: counts.all, icon: LayoutGrid, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Active Categories', value: counts.active, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Inactive Categories', value: counts.inactive, icon: XCircle, color: 'text-slate-400', bg: 'bg-slate-50' },
        ].map(s => (
          <div key={s.label} className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-default relative overflow-hidden">
            {/* Decorative glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${s.color.replace('text', 'bg')}`} />

            <div className="flex items-center gap-5 relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${s.bg} border border-slate-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <s.icon size={24} className={s.color} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1.5">{s.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-3xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{s.value}</p>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Items</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex bg-white border border-slate-200/60 rounded-xl p-1.5 gap-1.5 w-full sm:w-fit shadow-sm">
        {['All', 'Active', 'Inactive'].map(status => (
          <button
            key={status}
            onClick={() => dispatch(setStatusFilter(status))}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${statusFilter === status
              ? 'bg-primary text-white shadow-md'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-lg border border-slate-200 shadow-sm border-dashed">
            <LayoutGrid size={32} className="text-slate-200 mb-3" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No matching categories found</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="group relative bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-1">
              {/* Image Section with Enhanced Effects */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* Multi-layered Gradient for a premium finished look */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 ${category.status === 'Active'
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-50'
                    : 'bg-slate-900/40 border-white/10 text-slate-300'
                    }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${category.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse' : 'bg-slate-400'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{category.status}</span>
                  </div>

                  <div className="p-1 rounded-full">
                    <Switch
                      checked={category.status === 'Active'}
                      onChange={() => toggleStatus(category.id)}
                      onColor="#F59E0B"
                      offColor="#64748b"
                      handleDiameter={16}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={20}
                      width={38}
                    />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col relative">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-primary/10 transition-colors" />

                <div className="relative z-10 mb-2">
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h2>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-2 flex-1 line-clamp-2 font-medium">
                  {category.description}
                </p>

                {/* Refined Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    className="group/btn flex items-center gap-2 text-indigo-600 transition-all duration-300"
                    title="View Details"
                    onClick={() => openEditModal(category, "View")}
                  >
                    <div className="p-2 rounded-xl btn-action-view shadow-sm">
                      <Eye size={15} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(category, "Edit")}
                      className="p-2.5 rounded-xl btn-action-edit transition-all duration-300 shadow-sm hover:shadow-md"
                      title="Edit Category"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="p-2.5 rounded-xl btn-action-reject transition-all duration-300 shadow-sm hover:shadow-md"
                      title="Delete Category"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Create Category' : modalMode === 'View' ? 'Category Details' : 'Update Category'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Category Name</label>
              {modalMode === 'View' ? (
                <p className="text-base font-bold text-slate-900 px-1">
                  {formData.name}
                </p>
              ) : (
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
                  placeholder="e.g. Penthouse"
                />
              )}
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">URL Slug</label>
              {modalMode === 'View' ? (
                <p className="text-sm font-bold text-primary px-1 italic">
                  /{formData.slug}
                </p>
              ) : (
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
                  placeholder="auto-generated"
                />
              )}
            </div>
          </div>
          {/* <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Description</label>
            {modalMode === 'View' ? (
              <p className="text-sm text-slate-600 leading-relaxed px-1">
                {formData.description}
              </p>
            ) : (
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all resize-none min-h-[100px]"
                placeholder="Brief description of this category..."
              />
            )}
          </div> */}

          {/* Image Upload Selector - Only show for Add/Edit */}
          {modalMode !== 'View' ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Thumbnail Source</label>
                <div className="flex bg-slate-100 rounded-md p-0.5 gap-1">
                  <button type="button" onClick={() => setImageUploadMethod('url')} className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${imageUploadMethod === 'url' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-500'}`}>Link</button>
                  <button type="button" onClick={() => setImageUploadMethod('file')} className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all ${imageUploadMethod === 'file' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-500'}`}>Upload</button>
                </div>
              </div>
              {imageUploadMethod === 'url' ? (
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
                  placeholder="https://..."
                />
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Plus className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Click to upload image</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={e => { if (e.target.files[0]) setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) }) }}
                    />
                  </label>
                </div>
              )}
              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4 flex items-center gap-4 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <img src={formData.image} alt="Preview" className="h-14 w-20 object-cover rounded-md border border-slate-200 shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider truncate">Image Preview</p>
                    <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="text-[9px] font-bold text-rose-500 uppercase tracking-wider hover:underline mt-1">Remove</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category Image</label>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group shadow-sm">
                <img src={formData.image} alt={formData.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-wider"
            >
              {modalMode === 'View' ? 'Close' : 'Cancel'}
            </button>
            {modalMode !== 'View' && (
              <button
                type="submit"
                className="px-8 py-2 bg-primary text-white rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-sm active:scale-95"
              >
                {modalMode === 'add' ? 'Create Category' : 'Save Changes'}
              </button>
            )}
          </div>
        </form>
      </Modal>

      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(selectedCategory?.id)}
        itemType="Category"
        title="Remove Category"
        itemName={selectedCategory?.name}
      />
    </div>
  );
}


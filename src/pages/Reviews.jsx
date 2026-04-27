import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Search, Filter, Pencil, Trash2, Plus, Globe, Smartphone, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import DeleteModel from '../components/model/DeleteModel';
import { addReview, deleteReview, updateReview, selectFilteredReviews } from '../features/reviews/reviewSlice';

const TARGET_OPTIONS = ['All', 'Website', 'Mobile App'];

export default function Reviews() {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.reviews.reviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetFilter, setTargetFilter] = useState('All');

  // Local filtering for simplicity in this transformation
  const filteredReviews = allReviews.filter(review => {
    const matchesSearch = review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTarget = targetFilter === 'All' || review.target === targetFilter;
    return matchesSearch && matchesTarget;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, user: '', rating: 5, comment: '', target: 'Website', date: new Date().toISOString().split('T')[0] });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ id: null, user: '', rating: 5, comment: '', target: 'Website', date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(true);
  };

  const openEditModal = (review) => {
    setModalMode('edit');
    setFormData({ ...review });
    setIsModalOpen(true);
  };

  const openDeleteModal = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const initials = formData.user.split(' ').map(n => n[0]).join('').toUpperCase();
      dispatch(addReview({
        ...formData,
        id: Date.now(),
        avatar: initials || 'U'
      }));
    } else {
      dispatch(updateReview(formData));
    }
    setIsModalOpen(false);
  };

  const stats = [
    { id: 1, label: 'Total Reviews', value: allReviews.length, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 2, label: 'Website Reviews', value: allReviews.filter(r => r.target === 'Website').length, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, label: 'App Reviews', value: allReviews.filter(r => r.target === 'Mobile App').length, icon: Smartphone, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 4, label: 'Avg. Rating', value: (allReviews.reduce((acc, r) => acc + r.rating, 0) / (allReviews.length || 1)).toFixed(1), icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Platform Reviews</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Manage and curate platform testimonials and user feedback</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:border-primary/30 transition-all cursor-default">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 tabular-nums leading-none">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        {/* Control Bar */}
        <div className="px-5 py-4 bg-slate-50/30 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-md outline-none focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-200/30 p-1 rounded-md border border-slate-200 w-full sm:w-fit gap-1">
            {TARGET_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setTargetFilter(opt)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${targetFilter === opt
                  ? 'bg-white text-primary shadow-sm border border-slate-100'
                  : 'text-slate-400 hover:text-slate-600'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-slate-50">
          {filteredReviews.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 border border-slate-100 text-slate-300">
                <AlertCircle size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">No testimonials found</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-slate-50/30 transition-all group">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center font-bold text-slate-400 border border-slate-200 ring-4 ring-slate-50/50">
                      {review.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{review.user}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 tabular-nums">#REV-{review.id.toString().slice(-4)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400 tabular-nums">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                        "{review.comment}"
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${review.target === 'Mobile App' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                          {review.target === 'Mobile App' ? <Smartphone size={12} /> : <Globe size={12} />}
                          {review.target || 'Website'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col items-center gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => openEditModal(review)}
                      className="p-2.5 rounded-xl btn-action-edit transition-all duration-300 shadow-sm hover:shadow-md"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(review)}
                      className="p-2.5 rounded-xl btn-action-reject transition-all duration-300 shadow-sm hover:shadow-md"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredReviews.length > 0 && (
          <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-center">
            <button className="px-6 py-2 bg-white border border-slate-200 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-50 hover:shadow-sm transition-all active:scale-95">
              Load More Reviews
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Create Testimonial' : 'Update Review'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Customer Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all"
              placeholder="e.g. John Doe"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Rating Score</label>
              <select
                className="w-full px-3 py-2.5 text-sm font-bold border border-slate-200 rounded-md outline-none bg-white transition-all cursor-pointer"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Source Channel</label>
              <select
                className="w-full px-3 py-2.5 text-sm font-bold border border-slate-200 rounded-md outline-none bg-white transition-all cursor-pointer"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              >
                <option value="Website">Website</option>
                <option value="Mobile App">Mobile App</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Review Content</label>
            <textarea
              required
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all min-h-[120px] resize-none"
              placeholder="Enter the testimonial text..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-sm active:scale-95"
            >
              {modalMode === 'add' ? 'Create Review' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          dispatch(deleteReview(selectedReview.id));
          setIsDeleteModalOpen(false);
        }}
        title="Remove Testimonial"
        itemName={selectedReview?.user}
        itemType="review"
      />
    </div>
  );
}


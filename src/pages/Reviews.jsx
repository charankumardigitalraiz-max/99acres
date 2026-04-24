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
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        <span className="text-primary/80">Social Proof</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span>Testimonials</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Reviews</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={openAddModal} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95">
                        <Plus size={16} /> Add Testimonial
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm group hover:border-primary/30 transition-all cursor-default">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={16} />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-slate-900 tabular-nums leading-none tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Control Bar */}
                <div className="px-8 py-6 bg-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* <div className="relative flex-1 max-w-md group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-100 group-focus-within:border-primary/30 group-focus-within:text-primary transition-all">
                            <Search size={14} className="text-slate-400 group-focus-within:text-primary" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search testimonials..."
                            className="search-input pl-14 pr-4 py-3 text-xs font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div> */}

                    <div className="flex-1 max-w-[350px]">
                        {/* <label className="form-label">Search Customers</label> */}
                        <div className="relative">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                className="search-input pl-12 pr-4 py-4 text-xs"
                                placeholder="Enter name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200/50">
                            {TARGET_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setTargetFilter(opt)}
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${targetFilter === opt
                                        ? 'bg-white text-primary shadow-lg shadow-slate-200/50 border border-slate-100'
                                        : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="divide-y divide-slate-50">
                    {filteredReviews.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-slate-300">
                                <AlertCircle size={32} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">No reviews found</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Try adjusting your filters or add a new testimonial.</p>
                        </div>
                    ) : (
                        filteredReviews.map((review) => (
                            <div key={review.id} className="p-8 hover:bg-slate-50/50 transition-colors group">
                                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                                    <div className="flex items-start gap-6 flex-1">
                                        <Avatar initials={review.avatar} name={review.user} size="lg" className="ring-4 ring-slate-50 shadow-sm" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{review.user}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums">{review.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                                                ))}
                                            </div>
                                            <p className="mt-4 text-sm font-medium text-slate-600 leading-relaxed max-w-4xl italic">
                                                "{review.comment}"
                                            </p>
                                            <div className="mt-6 flex items-center gap-3">
                                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-widest shadow-sm ${review.target === 'Mobile App'
                                                    ? 'bg-purple-50 text-purple-600 border-purple-100'
                                                    : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                                    {review.target === 'Mobile App' ? <Smartphone size={12} /> : <Globe size={12} />}
                                                    {review.target || 'Website'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col items-center gap-2 w-full lg:w-auto">
                                        <button
                                            onClick={() => openEditModal(review)}
                                            className="flex-1 lg:flex-none btn-action btn-action-edit"
                                            title="Edit Testimonial"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(review)}
                                            className="flex-1 lg:flex-none btn-action btn-action-reject"
                                            title="Delete Testimonial"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {filteredReviews.length > 0 && (
                    <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center">
                        <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-white hover:shadow-md transition-all active:scale-95 shadow-sm">
                            Show More Testimonials
                        </button>
                    </div>
                )}
            </div>

            {/* Add / Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'add' ? 'Add Platform Review' : 'Edit Review'}
                size="md"
            >
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="form-label">User Name</label>
                        <input
                            type="text"
                            required
                            className="form-input"
                            placeholder="e.g. John Doe"
                            value={formData.user}
                            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Rating</label>
                            <select
                                className="form-select"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                            >
                                {[5, 4, 3, 2, 1].map(num => (
                                    <option key={num} value={num}>{num} Stars</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Platform Target</label>
                            <select
                                className="form-select"
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                            >
                                <option value="Website">Website</option>
                                <option value="Mobile App">Mobile App</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Review Content</label>
                        <textarea
                            required
                            className="form-input min-h-[120px] resize-none"
                            placeholder="Write the testimonial content here..."
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-primary transition-all active:scale-95"
                        >
                            {modalMode === 'add' ? 'Create Testimonial' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <DeleteModel
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    dispatch(deleteReview(selectedReview.id));
                    setIsDeleteModalOpen(false);
                }}
                title="Delete Testimonial"
                itemName={selectedReview?.user}
                itemType="review"
            />
        </div>
    );
}


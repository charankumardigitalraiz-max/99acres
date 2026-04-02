import { Link } from 'react-router-dom';
// import { reviewsData } from '../data/mockData';
import StatCard from '../components/ui/StatCard';
import Avatar from '../components/ui/Avatar';
import { Star, MessageSquare, ThumbsUp, Shield, Flag, Trash2, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setPropertyFilter, selectFilteredReviews } from '../features/reviews/reviewSlice';

export default function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(selectFilteredReviews);
  const { statusFilter, propertyFilter } = useSelector((state) => state.reviews);
  const properties = useSelector((state) => state.products.list);

  const stats = [
    { id: 1, label: 'Total Reviews', value: '1,248', change: '+12%', trend: 'up', icon: 'chart', color: 'blue' },
    { id: 2, label: 'Avg Rating', value: '4.7', change: '+0.2', trend: 'up', icon: 'star', color: 'amber' },
    { id: 3, label: 'Pending Approval', value: '42', change: '-5', trend: 'down', icon: 'chart', color: 'purple' },
    { id: 4, label: 'Flagged Content', value: '3', change: '-2', trend: 'down', icon: 'chart', color: 'green' },
  ];

  return (
    <div className="space-y-6">
      <div className="page-header flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Reviews & Ratings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage property reviews and user feedback across the platform.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="btn-secondary flex-1 sm:flex-initial">
            Export Report
          </button>
          <button className="btn-primary flex-1 sm:flex-initial">
            Moderation Rules
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.id} className="hover-lift">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="card glass-card">
        <div className="card-header border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6">
          <h2 className="section-title">Latest Reviews</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 w-full sm:w-auto justify-center">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-slate-700">4.7 / 5.0</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-slate-100 w-full sm:w-auto">
                <Filter size={14} className="text-slate-400" />
                <select 
                  className="bg-transparent border-none text-xs font-bold text-slate-600 focus:ring-0 cursor-pointer outline-none w-full"
                  value={propertyFilter}
                  onChange={(e) => dispatch(setPropertyFilter(e.target.value))}
                >
                  <option value="All">All Properties</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <select 
                className="bg-transparent border-none text-xs font-bold text-slate-600 focus:ring-0 px-3 py-1.5 sm:py-0 cursor-pointer outline-none w-full sm:w-auto"
                value={statusFilter}
                onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Flagged">Flagged</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 w-full">
                  <Avatar name={review.user} size="lg" className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-semibold text-slate-900 truncate">{review.user}</span>
                      <span className="hidden sm:inline text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-amber-500' : 'text-slate-200'} />
                      ))}
                    </div>
                    <p className="mt-3 text-slate-700 leading-relaxed text-sm">
                      {review.comment}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
                      <Link
                        to={`/products/${review.propertyId}`}
                        className="flex items-center gap-1.5 bg-primary/5 text-primary hover:bg-primary/10 px-2.5 py-1.5 rounded-lg transition-all border border-primary/10 group"
                      >
                        <Shield size={12} className="text-primary/60" />
                        <span className="font-bold truncate max-w-[150px] sm:max-w-none">Property: {review.property}</span>
                        <ExternalLink size={10} className="hidden sm:block opacity-40 group-hover:opacity-100" />
                      </Link>
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${review.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                        review.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                        {review.status}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-wrap sm:flex-nowrap">
                  <button className="flex-1 sm:flex-none p-2.5 sm:p-2 hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 rounded-xl transition-all border border-slate-100 sm:border-transparent hover:border-emerald-100 flex items-center justify-center gap-2 sm:block" title="Approve">
                    <CheckCircle size={18} />
                    <span className="sm:hidden text-xs font-bold">Approve</span>
                  </button>
                  <button className="flex-1 sm:flex-none p-2.5 sm:p-2 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-xl transition-all border border-slate-100 sm:border-transparent hover:border-red-100 flex items-center justify-center gap-2 sm:block" title="Delete">
                    <Trash2 size={18} />
                    <span className="sm:hidden text-xs font-bold">Delete</span>
                  </button>
                  <button className="flex-1 sm:flex-none p-2.5 sm:p-2 hover:bg-amber-50 hover:text-amber-600 text-slate-400 rounded-xl transition-all border border-slate-100 sm:border-transparent hover:border-amber-100 flex items-center justify-center gap-2 sm:block" title="Flag">
                    <Flag size={18} />
                    <span className="sm:hidden text-xs font-bold">Flag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card-body border-t border-border flex items-center justify-center p-4">
          <button className="btn-secondary text-xs">Load More Reviews</button>
        </div>
      </div>
    </div>
  );
}

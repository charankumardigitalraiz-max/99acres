import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearch, setTypeFilter, setStatusFilter, setCityFilter,
  setPage, setSelectedProperty, updatePropertyStatus, selectFilteredProperties
} from '../features/products/productsSlice';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Building2, MapPin, Clock, TrendingUp } from 'lucide-react';

const types = [
  { label: 'All Types', value: '' },
  { label: 'Villas', value: 'villas' },
  { label: 'Home', value: 'home' },
  { label: 'Plots', value: 'plots' },
  { label: 'Flats', value: 'flats' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Independent House', value: 'independent house' },
  { label: 'Apartments', value: 'Appartments' },
  { label: 'Lands', value: 'Lands' },
  { label: 'Other', value: 'other' },
];
const statuses = [
  { label: 'All Statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Processing', value: 'processing' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Verified', value: 'verified' },
  { label: 'Draft', value: 'draft' },
];
const cities = [
  { label: 'All Cities', value: '' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Delhi NCR', value: 'Delhi NCR' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Chennai', value: 'Chennai' },
];

const typeVariants = {
  Villas: 'green',
  Flats: 'violet',
  Plots: 'amber',
  Commercial: 'rose',
  'Independent House': 'indigo',
  Apartments: 'sky',
  Land: 'orange',
  other: 'slate',
};

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchQuery, typeFilter, statusFilter, cityFilter, currentPage, pageSize } = useSelector(s => s.products);
  const filtered = useSelector(selectFilteredProperties);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const counts = {
    all: filtered.length,
    new: filtered.filter(p => p.status?.toLowerCase() === 'new').length,
    processing: filtered.filter(p => p.status?.toLowerCase() === 'processing').length,
    rejected: filtered.filter(p => p.status?.toLowerCase() === 'rejected').length,
    verified: filtered.filter(p => p.status?.toLowerCase() === 'verified').length,
    draft: filtered.filter(p => p.status?.toLowerCase() === 'draft').length,
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Property Management</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Global listings management and approval repository</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Download size={14} className="text-primary" /> Export Data
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Units', value: counts.all, icon: Building2, color: 'text-blue-500' },
          { label: 'New', value: counts.new, icon: TrendingUp, color: 'text-indigo-500' },
          { label: 'Processing', value: counts.processing, icon: Clock, color: 'text-amber-500' },
          { label: 'Verified', value: counts.verified, icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Rejected', value: counts.rejected, icon: XCircle, color: 'text-rose-500' },
          { label: 'Draft', value: counts.draft, icon: Filter, color: 'text-slate-400' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm hover:border-primary/30 transition-all cursor-default">
            <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
              <s.icon size={16} className={s.color} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{s.label}</p>
            <p className="text-xl font-bold text-slate-900 tabular-nums leading-none">{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Filters Interface */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="relative w-full xl:w-96">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-md outline-none focus:border-primary transition-all"
            placeholder="Search properties or uploaders..."
            value={searchQuery}
            onChange={e => dispatch(setSearch(e.target.value))}
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
          <div className="flex-1 sm:w-40 sm:flex-none">
            <select
              className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-md outline-none bg-white transition-all cursor-pointer"
              value={typeFilter}
              onChange={e => dispatch(setTypeFilter(e.target.value))}
            >
              {types.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex-1 sm:w-40 sm:flex-none">
            <select
              className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-md outline-none bg-white transition-all cursor-pointer"
              value={statusFilter}
              onChange={e => dispatch(setStatusFilter(e.target.value))}
            >
              {statuses.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex-1 sm:w-40 sm:flex-none">
            <select
              className="w-full px-3 py-2 text-xs font-bold border border-slate-200 rounded-md outline-none bg-white transition-all cursor-pointer"
              value={cityFilter}
              onChange={e => dispatch(setCityFilter(e.target.value))}
            >
              {cities.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-primary border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-white uppercase tracking-wider">Property</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white uppercase tracking-wider hidden lg:table-cell">Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-white uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Uploaded By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Building2 size={40} className="mx-auto mb-3 text-slate-100" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No matching properties discovered</p>
                  </td>
                </tr>
              ) : (
                paginated.map(prop => (
                  <tr key={prop.id} className="group hover:bg-slate-50/30 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {prop.coverPhoto ? (
                            <img src={prop.coverPhoto} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Prop" />
                          ) : (
                            <Building2 size={16} className="text-slate-300" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 leading-none text-sm truncate group-hover:text-primary transition-colors">{prop.title}</p>
                          <p className="text-[10px] text-slate-500 mt-1.5 font-medium flex items-center gap-1.5">
                            <span className="text-primary/70 font-bold">#{prop.id.toString().padStart(4, '0')}</span>
                            {prop.bedrooms && <><span className="w-1 h-1 rounded-full bg-slate-300" /> {prop.bedrooms} BHK</>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-500 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10 transition-all">
                        {prop.propertyType}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin size={12} className="text-slate-300" />
                        <span className="text-[11px] font-medium">{prop.city}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 tabular-nums">{prop.price}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                          {prop.uploadedBy ? prop.uploadedBy.split(' ').map(n => n[0]).join('') : 'U'}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-700 leading-none">{prop.uploadedBy}</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-bold">{prop.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${prop.status?.toLowerCase() === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        prop.status?.toLowerCase() === 'processing' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          prop.status?.toLowerCase() === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${prop.status?.toLowerCase() === 'verified' ? 'bg-emerald-500' :
                          prop.status?.toLowerCase() === 'processing' ? 'bg-amber-500' :
                            prop.status?.toLowerCase() === 'rejected' ? 'bg-rose-500' :
                              'bg-slate-300'
                          }`} />
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/properties/${prop.id}`)}
                        className="p-2 rounded-xl btn-action-view shadow-sm"
                        title="View Details"
                      >
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                )
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/30 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Showing {Math.min((currentPage - 1) * pageSize + 1, filtered.length)}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(setPage(currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1)).map(p => (
                <button
                  key={p}
                  onClick={() => dispatch(setPage(p))}
                  className={`w-8 h-8 rounded-md text-[10px] font-bold transition-all shadow-sm border ${p === currentPage ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => dispatch(setPage(currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


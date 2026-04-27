import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearch, setTypeFilter, setStatusFilter, setCityFilter,
  setPage, setSelectedProperty, updatePropertyStatus, selectFilteredProperties
} from '../features/products/productsSlice';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Building2, MapPin } from 'lucide-react';

const types = ['All', 'villas', 'home', 'plots', 'flats', 'commercial', 'independent house', 'Appartments', 'Lands', 'other'];
const statuses = ['All', 'Active', 'Pending', 'Rejected'];
const cities = ['All', 'Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Chennai'];

const typeColors = {
  villas: 'bg-emerald-50 text-emerald-600',
  home: 'bg-blue-50 text-blue-600',
  plots: 'bg-amber-50 text-amber-600',
  flats: 'bg-violet-50 text-violet-600',
  commercial: 'bg-rose-50 text-rose-600',
  'independent house': 'bg-indigo-50 text-indigo-600',
  Appartments: 'bg-sky-50 text-sky-600',
  Lands: 'bg-orange-50 text-orange-600',
  other: 'bg-slate-50 text-slate-600',
};

export default function Properties() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchQuery, typeFilter, statusFilter, cityFilter, currentPage, pageSize } = useSelector(s => s.products);
  const filtered = useSelector(selectFilteredProperties);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const counts = {
    all: filtered.length,
    active: filtered.filter(p => p.status === 'Active').length,
    pending: filtered.filter(p => p.status === 'Pending').length,
    rejected: filtered.filter(p => p.status === 'Rejected').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Properties</h1>
          <p className="text-sm text-slate-500">Global listings management and approval</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Download size={14} className="text-primary" /> Export Listings
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: counts.all, icon: Building2 },
          { label: 'Active', value: counts.active, icon: CheckCircle },
          { label: 'Pending', value: counts.pending, icon: Filter },
          { label: 'Rejected', value: counts.rejected, icon: XCircle },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm group hover:border-primary/30 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-md bg-slate-50 flex items-center justify-center text-primary mb-4">
              <s.icon size={18} />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900 leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters Interface */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[280px]">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Search property or uploader..."
            value={searchQuery}
            onChange={e => dispatch(setSearch(e.target.value))}
          />
        </div>

        <div className="flex flex-wrap bg-slate-50 border border-slate-200 rounded-md p-1 gap-1">
          {types.slice(0, 6).map(t => (
            <button
              key={t}
              onClick={() => dispatch(setTypeFilter(t))}
              className={`px-3 py-1.5 text-[10px] rounded-md font-bold uppercase tracking-wider transition-all whitespace-nowrap ${typeFilter === t ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Property</th>
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">City</th>
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Area</th>
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Uploaded By</th>
                <th className="px-5 py-3 text-left text-xs font-black text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-center text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-right text-xs font-black text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.map(prop => (
                <tr key={prop.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400">
                        <Building2 size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none">{prop.title}</p>
                        {prop.bedrooms && <p className="text-[11px] text-slate-500 mt-1">{prop.bedrooms} BHK</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${typeColors[prop.type] || 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {prop.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={12} className="text-slate-400" />
                      <span className="text-xs font-medium">{prop.city}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-medium text-slate-500">{prop.area}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{prop.price}</td>
                  <td className="px-5 py-3.5 text-xs font-medium text-slate-600">{prop.uploadedBy}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 tabular-nums">{prop.date}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${prop.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : prop.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/property/${prop.id}`)}
                        className="p-1.5 rounded-md bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      {prop.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => dispatch(updatePropertyStatus({ id: prop.id, status: 'Active' }))}
                            className="p-1.5 rounded-md bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
                            title="Approve"
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            onClick={() => dispatch(updatePropertyStatus({ id: prop.id, status: 'Rejected' }))}
                            className="p-1.5 rounded-md bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all"
                            title="Reject"
                          >
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {Math.min((currentPage - 1) * pageSize + 1, filtered.length)}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch(setPage(currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => dispatch(setPage(p))}
                className={`w-7 h-7 rounded-md text-xs font-semibold transition-all ${p === currentPage ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => dispatch(setPage(currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

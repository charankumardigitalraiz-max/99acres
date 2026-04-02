import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, Plus, Edit2, Trash2, CheckSquare, Square } from 'lucide-react';
import Modal from '../components/ui/Modal';
import DeleteModel from '../components/model/DeleteModel';
import { addRoles, updaterole, deleteRole } from '../features/staff/roleSlice';

const AVAILABLE_PERMISSIONS = [
  'Full Access', 'User Management', 'Financials', 'System Settings',
  'Content Approval', 'User Support', 'Review Moderation',
  'Subscription Management', 'Lead Tracking', 'Reports Access',
  'Ticket Handling', 'User Communication'
];

export default function StaffRoles() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, name: '', members: 0, permissions: [] });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const handleAddRole = () => {
    setModalMode('add');
    setFormData({ id: null, name: '', members: 0, permissions: [] });
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setModalMode('edit');
    setFormData({ ...role });
    setIsModalOpen(true);
  };

  const handleDeleteRole = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete) {
      dispatch(deleteRole({ id: roleToDelete.id }));
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleTogglePermission = (perm) => {
    setFormData(prev => {
      const isSelected = prev.permissions.includes(perm);
      if (isSelected) {
        return { ...prev, permissions: prev.permissions.filter(p => p !== perm) };
      } else {
        return { ...prev, permissions: [...prev.permissions, perm] };
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      dispatch(addRoles(formData));
    } else {
      dispatch(updaterole(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="page-header flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff Roles & Permissions</h1>
          <p className="text-sm text-slate-500 mt-1">Define roles and manage access control for the admin panel.</p>
        </div>
        <button onClick={handleAddRole} className="btn-primary w-full sm:w-auto">
          <Plus size={16} />
          Add New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="card hover-lift transition-all">
            <div className="card-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{role.name}</h3>
                  <p className="text-xs text-slate-500">{role.members} members assigned</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteRole(role)}
                  className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="card-body">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Permissions</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-full font-medium">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-body border-t border-border flex items-center justify-between py-3">
              <button className="text-xs text-primary font-bold hover:underline">View Members</button>
              <span className="text-2xs text-slate-400 italic">Last updated: Just now</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add Role' : 'Edit Role'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full form-input" placeholder="e.g. Penthouse" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 whitespace-nowrap">Permissions</label>
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 max-h-[240px] overflow-y-auto">
              {AVAILABLE_PERMISSIONS.map(perm => {
                const isSelected = formData.permissions.includes(perm);
                return (
                  <label key={perm} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isSelected ? 'bg-white border-primary shadow-sm' : 'bg-transparent border-transparent hover:bg-white/50'
                    }`}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleTogglePermission(perm)}
                    />
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${isSelected ? 'bg-primary text-white' : 'bg-white border border-slate-200'
                      }`}>
                      {isSelected && <CheckSquare size={14} />}
                    </div>
                    <span className={`text-[11px] font-bold ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                      {perm}
                    </span>
                  </label>
                );
              })}
            </div>
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
        onConfirm={confirmDeleteRole}
        itemType="role"
        itemName={roleToDelete?.name}
      />
    </div>
  );
}

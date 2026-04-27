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
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Staff Roles</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Define access permissions and administrative hierarchies</p>
        </div>
        <button onClick={handleAddRole} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95">
          <Plus size={16} />Add New Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const displayPermissions = role.permissions.slice(0, 6);
          const hiddenCount = role.permissions.length - displayPermissions.length;

          return (
            <div key={role.id} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-primary/30 transition-all">
              <div className="px-6 py-5 bg-slate-50/30 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <Shield size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 truncate tracking-tight">{role.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{role.members} Authorized Members</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="p-2 rounded-md bg-white border border-slate-200 hover:bg-primary/10 hover:text-primary text-slate-500 transition-all shadow-sm"
                    title="Edit Role"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role)}
                    className="p-2 rounded-md bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition-all shadow-sm"
                    title="Delete Role"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="px-6 py-5 flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Functional Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {displayPermissions.map((perm, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {perm}
                    </span>
                  ))}
                  {hiddenCount > 0 && (
                    <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      +{hiddenCount} More
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add Role' : 'Edit Role'} size="md">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Role Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm font-medium" placeholder="e.g. Moderator" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">System Permissions</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-slate-50 rounded-lg border border-slate-100 max-h-[300px] overflow-y-auto">
              {AVAILABLE_PERMISSIONS.map(perm => {
                const isSelected = formData.permissions.includes(perm);
                return (
                  <label key={perm} className={`flex items-center gap-3 p-2.5 rounded-md border transition-all cursor-pointer ${isSelected ? 'bg-white border-primary/40 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/50'}`}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleTogglePermission(perm)}
                    />
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-primary text-white shadow-sm' : 'bg-white border border-slate-200'}`}>
                      {isSelected && <CheckSquare size={12} />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                      {perm}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">Discard</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95">
              {modalMode === 'add' ? 'Save Role' : 'Update Role'}
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

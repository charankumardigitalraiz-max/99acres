import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Select from '../components/ui/Select';
import { UserPlus, Mail, Edit2, Trash2, Shield, Calendar, Activity } from 'lucide-react';
import { addMember, updateMember, deleteMember, setLoading, setError } from '../features/staff/staffMember';
import Modal from '../components/ui/Modal';
import DeleteModel from '../components/model/DeleteModel';
// import { useSelector } from 'react-redux';

export default function StaffMembers() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.staff.members);
  const roles = useSelector((state) => state.roles.roles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, name: '', role: 'Moderator', email: '', status: 'Active', avatar: '' });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const handleAddMember = () => {
    setModalMode('add');
    setFormData({ id: null, name: '', role: 'Moderator', email: '', status: 'Active', avatar: '' });
    setIsModalOpen(true);
  };

  const handleEditMember = (member) => {
    setModalMode('edit');
    setFormData({ ...member });
    setIsModalOpen(true);
  };

  const handleDeleteMember = (member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      dispatch(deleteMember({ id: memberToDelete.id }));
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
      dispatch(addMember({ ...formData, avatar: initials }));
    } else {
      dispatch(updateMember(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Access Directory</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Manage administrative personnel and access levels</p>
        </div>
        <button onClick={handleAddMember} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95">
          <UserPlus size={16} />Authorize Staff
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map((member) => (
                <tr key={member.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                        {member.name.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">ID: #USR-{member.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 w-fit">
                      <Shield size={12} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Mail size={12} className="text-slate-400" />
                      <span className="text-xs">{member.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400 font-bold tabular-nums">
                      <Calendar size={12} />
                      <span className="text-[10px] uppercase tracking-wider">{member.joined}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditMember(member)}
                        className="p-2 rounded-md bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-500 transition-all"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member)}
                        className="p-2 rounded-md bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add Staff Member' : 'Edit Staff Member'} size="md">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm font-medium"
              placeholder="Enter full name"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Role"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              options={roles.map(r => ({ value: r.name, label: r.name }))}
              placeholder={null}
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Inactive']}
              placeholder={null}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm font-medium"
              placeholder="email@example.com"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 bg-white rounded-md text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md text-xs font-bold transition-all shadow-sm hover:opacity-90 active:scale-95">
              {modalMode === 'add' ? 'Add Member' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteMember}
        itemType="staff member"
        itemName={memberToDelete?.name}
      />
    </div>
  );
}

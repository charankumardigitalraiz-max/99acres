import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { UserPlus, Mail, Edit2, Trash2, Shield, Calendar, Activity } from 'lucide-react';
import { addMember, updateMember, deleteMember, setLoading, setError } from '../features/staff/staffMember';
import Modal from '../components/ui/Modal';
import DeleteModel from '../components/model/DeleteModel';
// import { useSelector } from 'react-redux';

export default function StaffMembers() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.staff.members);

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
    <div className="space-y-6">
      <div className="page-header flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Staff Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage admin panel users and their active status.</p>
        </div>
        <button onClick={handleAddMember} className="btn-primary w-full sm:w-auto">
          <UserPlus size={16} />
          Invite Staff
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="pl-6">Staff Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th className="text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {members.map((member) => (
                <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} size="md" />
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-2xs text-slate-400">ID: #{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 w-fit">
                      <Shield size={12} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-700">{member.role}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${member.status === 'Active' ? 'badge-green' : 'badge-slate'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Mail size={12} />
                      <span className="text-sm">{member.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar size={12} />
                      <span className="text-sm">{member.joined}</span>
                    </div>
                  </td>
                  <td className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditMember(member)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member)}
                        className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} className='text-red-500' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Invite Staff Member' : 'Edit Staff Member'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full form-input"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full form-input"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Support Agent">Support Agent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full form-input"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full form-input"
              placeholder="name@99acres.com"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-border bg-white rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 transition-all font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 font-bold">
              {modalMode === 'add' ? 'Send Invitation' : 'Save Changes'}
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

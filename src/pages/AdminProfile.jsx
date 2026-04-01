import { useState } from 'react';
import Avatar from '../components/ui/Avatar';
import { adminProfile, activityLog } from '../data/mockData';
import {
  User, Mail, Phone, MapPin, Shield, Calendar, Clock,
  Edit2, Lock, Bell, Save, CheckCircle, Activity
} from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-primary' : 'bg-slate-200'}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`}
    />
  </button>
);

export default function AdminProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(adminProfile);
  const [notifications, setNotifications] = useState(adminProfile.notifications);
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'activity', label: 'Activity Log', icon: Activity },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Admin Profile</h2>
          <p className="section-subtitle">Manage your account settings</p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium animate-fade-in">
            <CheckCircle size={13} />
            Changes saved successfully
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Profile Card */}
        <div className="card">
          <div className="p-5 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <Avatar initials={profile.avatar} size="xl" />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow">
                <Edit2 size={10} className="text-white" />
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-800">{profile.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
            <div className="flex items-center gap-1.5 mt-2 bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              <Shield size={11} />
              <span className="text-xs font-medium">{profile.role}</span>
            </div>
            <div className="w-full mt-4 pt-4 border-t border-border space-y-2.5">
              {[
                { icon: MapPin, label: profile.department },
                { icon: Calendar, label: `Since ${profile.joinedDate}` },
                { icon: Clock, label: `Last login: ${profile.lastLogin}` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-slate-500">
                  <Icon size={12} className="text-slate-400 flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-border">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <p className="section-title">Personal Information</p>
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className="btn-secondary text-xs py-1.5 px-3">
                    <Edit2 size={12} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setEditMode(false)} className="btn-secondary text-xs py-1.5 px-3">Cancel</button>
                    <button onClick={handleSave} className="btn-primary text-xs py-1.5 px-3">
                      <Save size={12} /> Save
                    </button>
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name', icon: User, type: 'text' },
                    { label: 'Email Address', key: 'email', icon: Mail, type: 'email' },
                    { label: 'Phone Number', key: 'phone', icon: Phone, type: 'tel' },
                    { label: 'Department', key: 'department', icon: MapPin, type: 'text' },
                  ].map(({ label, key, icon: Icon, type }) => (
                    <div key={key}>
                      <label className="form-label">{label}</label>
                      {editMode ? (
                        <input
                          type={type}
                          className="form-input"
                          value={profile[key]}
                          onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-border">
                          <Icon size={12} className="text-slate-400 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{profile[key]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="form-label">Bio</label>
                    {editMode ? (
                      <textarea
                        className="form-input h-20 resize-none"
                        value={profile.bio}
                        onChange={e => setProfile({ ...profile, bio: e.target.value })}
                      />
                    ) : (
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border border-border">
                        <p className="text-sm text-slate-600">{profile.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card">
              <div className="card-header">
                <p className="section-title">Change Password</p>
              </div>
              <div className="card-body space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-700 font-medium">Password last changed 45 days ago. Consider updating it regularly for security.</p>
                </div>
                {[
                  { label: 'Current Password', placeholder: 'Enter current password' },
                  { label: 'New Password', placeholder: 'Enter new password (min. 8 chars)' },
                  { label: 'Confirm New Password', placeholder: 'Re-enter new password' },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label className="form-label">{label}</label>
                    <input type="password" className="form-input" placeholder={placeholder} />
                  </div>
                ))}
                <div className="pt-1">
                  <button className="btn-primary">
                    <Lock size={13} /> Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <p className="section-title">Notification Preferences</p>
              </div>
              <div className="divide-y divide-border">
                {[
                  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive alerts via email' },
                  { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive alerts via SMS' },
                  { key: 'newUserSignup', label: 'New User Signup', desc: 'Notify when a new user registers' },
                  { key: 'newSubscription', label: 'New Subscription', desc: 'Notify on new plan subscriptions' },
                  { key: 'propertyApproval', label: 'Property Approval Requests', desc: 'Notify on pending property reviews' },
                  { key: 'weeklyReport', label: 'Weekly Report', desc: 'Get weekly performance report email' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                    <Toggle
                      checked={notifications[key]}
                      onChange={v => setNotifications({ ...notifications, [key]: v })}
                    />
                  </div>
                ))}
              </div>
              <div className="px-5 py-3.5 border-t border-border">
                <button onClick={handleSave} className="btn-primary">
                  <Save size={13} /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="card">
              <div className="card-header">
                <p className="section-title">Recent Activity</p>
                <span className="badge badge-slate">{activityLog.length} entries</span>
              </div>
              <div className="divide-y divide-border">
                {activityLog.map((log, i) => (
                  <div key={log.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity size={12} className="text-primary" />
                      </div>
                      {i < activityLog.length - 1 && <div className="w-px h-4 bg-border" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800">{log.action}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{log.detail}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-slate-500">{log.time}</p>
                      <p className="text-2xs text-slate-400">{log.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

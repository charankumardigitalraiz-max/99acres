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
    { key: 'profile', label: 'Identity', icon: User },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'notifications', label: 'Signals', icon: Bell },
    { key: 'activity', label: 'Protocol', icon: Activity },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-6 py-4 rounded-lg border border-slate-200 shadow-sm gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-none">Personnel Profile</h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">Administrative identity and security configurations</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider animate-in fade-in slide-in-from-right-4 duration-300">
            <CheckCircle size={14} />
            Profile Updated
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden h-fit">
          <div className="p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <Avatar initials={profile.avatar} size="xl" className="w-full h-full" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-md flex items-center justify-center shadow-lg hover:bg-primary transition-all border-2 border-white">
                <Edit2 size={12} />
              </button>
            </div>
            <p className="text-lg font-bold text-slate-900 tracking-tight">{profile.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{profile.email}</p>
            
            <div className="flex items-center gap-2 mt-4 bg-slate-50 border border-slate-100 px-3 py-1 rounded-md">
              <Shield size={12} className="text-primary" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{profile.role}</span>
            </div>

            <div className="w-full mt-8 pt-8 border-t border-slate-50 space-y-4">
              {[
                { icon: MapPin, label: profile.department },
                { icon: Calendar, label: `Joined ${profile.joinedDate}` },
                { icon: Clock, label: `Last seen: ${profile.lastLogin}` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-slate-500">
                  <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center">
                    <Icon size={12} className="text-slate-300" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm px-4">
            <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2.5 py-4 text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap relative ${activeTab === tab.key
                      ? 'text-primary'
                      : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Icon size={14} />
                    {tab.label}
                    {activeTab === tab.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="animate-in fade-in duration-300">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">Identity Brief</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Manage your core profile parameters</p>
                  </div>
                  {!editMode ? (
                    <button onClick={() => setEditMode(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                      <Edit2 size={12} className="text-primary" /> Modify
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:bg-slate-50 transition-all">Abort</button>
                      <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95">
                        <Save size={12} /> Commit Changes
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { label: 'Full Signature', key: 'name', icon: User, type: 'text' },
                      { label: 'Registry Email', key: 'email', icon: Mail, type: 'email' },
                      { label: 'Signal Link', key: 'phone', icon: Phone, type: 'tel' },
                      { label: 'Department Vector', key: 'department', icon: MapPin, type: 'text' },
                    ].map(({ label, key, icon: Icon, type }) => (
                      <div key={key}>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">{label}</label>
                        {editMode ? (
                          <input
                            type={type}
                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all font-medium"
                            value={profile[key]}
                            onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/50 rounded-md border border-slate-100 group hover:border-primary/20 transition-all">
                            <Icon size={14} className="text-slate-300 group-hover:text-primary/60 transition-colors" />
                            <span className="text-sm font-bold text-slate-700">{profile[key]}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="col-span-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Narrative Dossier</label>
                      {editMode ? (
                        <textarea
                          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all h-28 resize-none font-medium"
                          value={profile.bio}
                          onChange={e => setProfile({ ...profile, bio: e.target.value })}
                        />
                      ) : (
                        <div className="px-5 py-4 bg-slate-50/50 rounded-md border border-slate-100">
                          <p className="text-sm font-bold text-slate-500 leading-relaxed italic">"{profile.bio}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="animate-in fade-in duration-300">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">Ciphers & Access</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Manage credentials and authentication entropy</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm shrink-0 border border-amber-100">
                      <Lock size={16} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-900 leading-tight">Cipher Rotation Required</p>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1 opacity-80">Entropy last updated 45 session cycles ago</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { label: 'Current Key', placeholder: 'Input active cipher' },
                      { label: 'New Signature', placeholder: 'Entropy min 8.0' },
                      { label: 'Validate New', placeholder: 'Re-input for parity' },
                    ].map(({ label, placeholder }) => (
                      <div key={label}>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">{label}</label>
                        <input type="password" className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:border-primary outline-none transition-all font-mono" placeholder={placeholder} />
                      </div>
                    ))}
                    <div className="flex items-end">
                      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-md text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95">
                        <Lock size={14} /> Update Credentials
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="animate-in fade-in duration-300">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">Signal Configuration</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Configure alerting thresholds and delivery channels</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { key: 'emailAlerts', label: 'Electronic Correspondence', desc: 'Direct alerts to primary registry SMTP' },
                    { key: 'smsAlerts', label: 'Cellular Transmission', desc: 'Encrypted SMS signals for high-risk protocols' },
                    { key: 'newUserSignup', label: 'Identity Registration', desc: 'Notify upon new personnel onboarding' },
                    { key: 'newSubscription', label: 'Registry Commitment', desc: 'Signal upon plan tier escalation' },
                    { key: 'propertyApproval', label: 'Asset Validation', desc: 'Queue notification for pending audits' },
                    { key: 'weeklyReport', label: 'Matrix Synthesis', desc: 'Automated weekly performance telemetry' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between px-8 py-5 hover:bg-slate-50/30 transition-all group">
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wide group-hover:text-primary transition-colors">{label}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 opacity-50">{desc}</p>
                      </div>
                      <Toggle
                        checked={notifications[key]}
                        onChange={v => setNotifications({ ...notifications, [key]: v })}
                      />
                    </div>
                  ))}
                </div>
                <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex justify-end">
                  <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-md text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95">
                    <Save size={14} /> Save Signal Map
                  </button>
                </div>
              </div>
            )}

            {/* Activity Log Tab */}
            {activeTab === 'activity' && (
              <div className="animate-in fade-in duration-300">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">Protocol Journal</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Historical log of personnel operations</p>
                  </div>
                  <div className="text-[9px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/20 shadow-sm uppercase tracking-wider">{activityLog.length} Session Entries</div>
                </div>
                <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {activityLog.map((log, i) => (
                    <div key={log.id} className="flex items-start gap-6 px-8 py-5 hover:bg-slate-50/50 transition-all group">
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-primary/20 transition-all">
                          <Activity size={14} className="text-slate-300 group-hover:text-primary" />
                        </div>
                        {i < activityLog.length - 1 && <div className="w-px h-10 bg-slate-100" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wide mb-1 leading-tight group-hover:text-primary transition-colors">{log.action}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider opacity-60">{log.detail}</p>
                      </div>
                      <div className="text-right flex-shrink-0 mt-1">
                        <p className="text-[10px] font-bold text-slate-700 tabular-nums uppercase tracking-wider">{log.time}</p>
                        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">{log.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


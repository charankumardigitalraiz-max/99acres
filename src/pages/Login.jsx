import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Globe, Shield, ArrowRight } from 'lucide-react';
import loginBg from '../assets/login_bg.png';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-[#f8fafc]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse duration-1000"></div>
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-[420px] px-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-xl shadow-slate-200/50 p-10">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-6 group transition-all hover:scale-110">
              <Shield className="text-white group-hover:scale-110 transition-transform" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Access Control</h1>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-[0.2em]">Administrative Interface Layer</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Electronic Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-md outline-none focus:border-primary transition-all bg-slate-50/30 font-medium"
                    placeholder="admin@sherlac.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Key</label>
                  <button type="button" className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">Reset Key?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 text-sm border border-slate-200 rounded-md outline-none focus:border-primary transition-all bg-slate-50/30 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-md text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10 hover:bg-primary transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 group"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Initialize Session <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-6 text-slate-300">
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
              <Globe size={14} className="text-primary/40" /> Nexus
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
              <Shield size={14} className="text-primary/40" /> Vault
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckSquare({ size, className, strokeWidth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

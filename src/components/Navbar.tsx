import React from 'react';
import { Terminal, Shield, LogOut, LogIn, Code2, Sparkles, Layers } from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  user: UserSession;
  onOpenLogin: () => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenLogin,
  onLogout,
  activeTab,
  setActiveTab,
}) => {
  const completedCount = Object.values(user.completedMilestones).filter(Boolean).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('projects')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                BareMetalCraft
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30">
                HANDCRAFTED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Build Systems Software With Your Own Hands
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>9 Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('manifesto')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'manifesto'
                ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>The No-AI Oath</span>
          </button>

          <button
            onClick={() => setActiveTab('syscalls')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'syscalls'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Syscall &amp; API Codex</span>
          </button>
        </nav>

        {/* Auth / Profile Area */}
        <div className="flex items-center gap-3">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-semibold">{user.username}</span>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full font-bold">
                  {completedCount} tasks done
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-rose-400 text-xs font-medium transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login (admin)</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

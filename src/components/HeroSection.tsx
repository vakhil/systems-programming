import React from 'react';
import { Sparkles, Shield, Check, Heart, Code2, Compass } from 'lucide-react';
import { UserSession } from '../types';

interface HeroSectionProps {
  user: UserSession;
  onTakePledge: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  user,
  onTakePledge,
  selectedCategory,
  setSelectedCategory,
}) => {
  const categories = [
    { id: 'all', label: 'All 9 Projects', color: 'from-emerald-500 to-teal-500' },
    { id: 'Memory Management', label: 'Memory Allocators', color: 'from-emerald-400 to-teal-400' },
    { id: 'Networking & Concurrency', label: 'TCP Sockets & epoll', color: 'from-cyan-400 to-blue-400' },
    { id: 'Distributed Systems', label: 'Load Balancers', color: 'from-amber-400 to-orange-400' },
    { id: 'Developer Tools', label: 'Git From Scratch', color: 'from-orange-400 to-red-400' },
    { id: 'Database Engines', label: 'Redis Clone', color: 'from-rose-400 to-pink-400' },
    { id: 'Peer-to-Peer Networks', label: 'BitTorrent P2P', color: 'from-sky-400 to-indigo-400' },
    { id: 'Virtual Machines & Compilers', label: 'Virtual Machine / CPU', color: 'from-purple-400 to-violet-400' },
    { id: 'Real-Time Collaboration', label: 'WebSockets Canvas', color: 'from-teal-400 to-emerald-400' },
    { id: 'Fullstack Baremetal', label: 'Baremetal Blog', color: 'from-violet-400 to-fuchsia-400' },
  ];

  return (
    <section className="relative pt-12 pb-10 overflow-hidden">
      {/* Background radial gradient highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcoming Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Build Real Software From Scratch • With Only Your Own Hands</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mt-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build Foundational Systems.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Using Only Your Hands.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No AI copilot autocomplete. No bloated libraries. Learn how memory allocators, network protocols,
            Git, Redis, load balancers, and virtual machines actually work by crafting them step-by-step.
          </p>
        </div>

        {/* The No-AI Handcrafted Pledge Card */}
        <div className="mt-8 flex justify-center">
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-900/90 border border-slate-800 max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  The Handcrafted Code Pledge
                  {user.hasPledged && (
                    <span className="text-emerald-400 text-xs bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                      SIGNED
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  &quot;I vow to write line-by-line using specifications and RFCs, without generating answers from LLMs.&quot;
                </p>
              </div>
            </div>

            <button
              onClick={onTakePledge}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 shadow-lg ${
                user.hasPledged
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 shadow-emerald-950'
              }`}
            >
              {user.hasPledged ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Pledge Honored</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Sign The Pledge</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Colorful Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              9
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Practical Projects</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-cyan-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              45
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Guided Milestones</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              9
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Interactive Simulators</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-rose-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">Handcrafted Learning</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedCategory === c.id
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/50 shadow-md'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

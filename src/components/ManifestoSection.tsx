import React, { useState } from 'react';
import { Shield, Sparkles, Check, Flame, Award, HeartHandshake, AlertOctagon, Heart } from 'lucide-react';
import { UserSession } from '../types';

interface ManifestoSectionProps {
  user: UserSession;
  onTakePledge: () => void;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ user, onTakePledge }) => {
  const [copiedPledge, setCopiedPledge] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      'I pledged to build foundational software systems (memory allocators, TCP sockets, Git, Redis) with my own hands without AI copilots on BareMetalCraft!'
    );
    setCopiedPledge(true);
    setTimeout(() => setCopiedPledge(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 border border-purple-500/30 text-purple-300 font-semibold text-xs shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>OUR PHILOSOPHY &amp; VALUES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Handcrafted Code Manifesto
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Why spending an afternoon debugging a pointer or network frame builds permanent intuition
          that no AI prompt can ever replicate.
        </p>
      </div>

      {/* Pillars */}
      <div className="mt-12 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-rose-500/20 shadow-xl hover:border-rose-500/30 transition-all">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              1. The Prompt Engineer&apos;s Dilemma
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            AI code assistants operate by predicting likely tokens from internet data. When an LLM generates a
            network loop or a memory pool for you, it robs your brain of the struggle that builds deep intuition. If you
            never trace a packet byte through a ring buffer with your own hands, you do not truly understand
            networking—you are merely a consumer of someone else&apos;s abstractions.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/20 shadow-xl hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              2. The Tactile Joy of True Craftsmanship
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Real software engineering is a craft—just like carpentry or painting. It is holding raw byte buffers in
            your hands, choosing whether a pointer aligns to an 8-byte boundary, and watching real POSIX
            system calls answer on your laptop. When your custom memory manager or custom Git binary runs
            successfully, the joy is earned, genuine, and permanently yours.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              3. The Engineers Who Can Fix Anything
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            When production goes down because of a subtle concurrency deadlock, a socket buffer overflow,
            or a memory fragmentation leak, an autocomplete prompter cannot solve it. The only engineers who can
            save the day are the ones who built these systems from scratch and understand the physical
            reality of the machine.
          </p>
        </div>
      </div>

      {/* Interactive Pledge Certificate */}
      <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-purple-950/40 border border-emerald-500/40 relative overflow-hidden shadow-2xl text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-md">
          <Shield className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
          THE HANDCRAFTED SOFTWARE PLEDGE
        </h3>

        <div className="max-w-xl mx-auto p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 italic leading-relaxed">
          &ldquo;I hereby pledge to construct the foundational projects on this platform using only my
          hands, my intellect, official documentation, and low-level RFCs. I choose the path of real
          craftsmanship and deep understanding.&rdquo;
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onTakePledge}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-xl ${
              user.hasPledged
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-emerald-500/10'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 shadow-emerald-950'
            }`}
          >
            {user.hasPledged ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Pledge Signed &amp; Recorded</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Sign &amp; Seal The Pledge</span>
              </>
            )}
          </button>

          {user.hasPledged && (
            <button
              onClick={handleShare}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              {copiedPledge ? 'Copied to Clipboard!' : 'Share Handcrafted Pledge'}
            </button>
          )}
        </div>

        {user.hasPledged && (
          <div className="pt-2 text-xs font-semibold text-emerald-400">
            Honored by craftsperson {user.username || 'admin'} • Verified on bare metal
          </div>
        )}
      </div>
    </div>
  );
};

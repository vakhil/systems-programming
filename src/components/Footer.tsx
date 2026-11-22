import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">BareMetalCraft</span>
            <span className="mx-2 text-slate-600">|</span>
            <span>Handcrafted Software Engineering Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>9 Step-by-Step Projects</span>
          </span>
          <span className="hidden md:inline text-slate-600">&bull;</span>
          <span>Build With Your Own Hands</span>
          <span className="hidden md:inline text-slate-600">&bull;</span>
          <span>Zero AI Autocomplete Required</span>
        </div>

        <div className="text-slate-500 text-center sm:text-right">
          Crafted for curious engineers who want to understand how computers actually work.
        </div>
      </div>
    </footer>
  );
};

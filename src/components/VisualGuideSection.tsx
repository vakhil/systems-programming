import React, { useState } from 'react';
import {
  FolderTree,
  Terminal,
  Code2,
  Copy,
  Check,
  Play,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { GettingStartedGuide, Project } from '../types';

interface VisualGuideSectionProps {
  guide: GettingStartedGuide;
  project: Project;
}

export const VisualGuideSection: React.FC<VisualGuideSectionProps> = ({ guide, project }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<number | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(guide.starterCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(idx);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-8 my-6">
      {/* 1. Visual Architecture Blueprint Image / Diagram */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Visual Architecture Blueprint
              </h3>
              <p className="text-xs text-slate-400">
                System boundaries, data flows, and layer interactions
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-950 text-cyan-300 border border-slate-800">
            {guide.visualArchitectureImage.diagramType}
          </span>
        </div>

        {/* Visual Schematic Diagram Image Grid */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 shadow-inner space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {guide.visualArchitectureImage.elements.map((elem) => (
              <div
                key={elem.id}
                className={`p-4 rounded-xl border bg-slate-900/80 shadow-md flex flex-col justify-between ${
                  elem.color === 'emerald'
                    ? 'border-emerald-500/40 text-emerald-300'
                    : elem.color === 'cyan'
                    ? 'border-cyan-500/40 text-cyan-300'
                    : elem.color === 'amber'
                    ? 'border-amber-500/40 text-amber-300'
                    : elem.color === 'purple'
                    ? 'border-purple-500/40 text-purple-300'
                    : elem.color === 'rose'
                    ? 'border-rose-500/40 text-rose-300'
                    : 'border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 font-mono">
                      {elem.role}
                    </span>
                    <span className="text-[10px] font-mono opacity-60">#{elem.id}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{elem.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{elem.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connection Interconnects Flow */}
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">
              Data &amp; Control Flow Paths:
            </div>
            {guide.visualArchitectureImage.connections.map((conn, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{conn}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 italic text-center pt-1 font-sans">
            &ldquo;{guide.visualArchitectureImage.caption}&rdquo;
          </p>
        </div>
      </div>

      {/* 2. Toolchain Prerequisites & Folder Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prerequisites */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Development Toolchain &amp; Prerequisites</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 pt-1">
            {guide.prerequisites.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Directory Tree */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 font-mono">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-slate-800">
            <FolderTree className="w-4 h-4 text-amber-400" />
            <span>Recommended Project Directory Tree</span>
          </div>
          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 overflow-x-auto leading-relaxed shadow-inner">
            {guide.projectStructure}
          </pre>
        </div>
      </div>

      {/* 3. Beginning Code (Step Zero Starter Template) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Beginning Code: Step Zero Starter File
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy this foundational boilerplate to verify your build system before implementing milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {guide.starterFileName} ({guide.starterLanguage})
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Starter Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Block with Syntax Highlighting */}
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>{guide.starterFileName}</span>
            <span className="text-[11px] text-slate-500">Handcrafted Skeleton</span>
          </div>
          <pre className="p-5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-96">
            {guide.starterCode}
          </pre>
        </div>

        {/* Line-by-Line Code Breakdown */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" /> Line-by-Line Architecture Breakdown:
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {guide.codeBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div className="font-mono text-emerald-400 font-bold sm:w-28 flex-shrink-0">
                  {item.lines}
                </div>
                <div className="sm:w-44 font-semibold text-slate-200 flex-shrink-0">
                  {item.concept}
                </div>
                <div className="text-slate-300 text-xs leading-relaxed flex-1">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Compilation & First Run Commands */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Terminal className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Compile &amp; Run Your Baseline Code
            </h3>
            <p className="text-xs text-slate-400">
              Execute these exact commands in your terminal to verify zero compiler warnings and baseline functionality.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {guide.quickstartCommands.map((cmd, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-2 text-slate-200 overflow-x-auto">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-slate-100">{cmd}</span>
              </div>
              <button
                onClick={() => handleCopyCommand(cmd, idx)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                title="Copy command"
              >
                {copiedCmd === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>

        {/* Expected Terminal Output */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
            Expected Baseline Terminal Output:
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
            {guide.expectedOutput}
          </pre>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Project, UserSession } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Layers,
  Lightbulb,
  ShieldAlert,
  TestTube2,
  FileCode,
  Terminal,
  BookOpen,
  Sparkles,
  Save,
  Check,
  ChevronRight,
  PlayCircle,
  Compass,
  Film,
  Copy,
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import { InteractiveVideoPlayer } from './InteractiveVideoPlayer';
import { VisualGuideSection } from './VisualGuideSection';
import { AllocatorVisualizer } from './visualizers/AllocatorVisualizer';
import { SocketVisualizer } from './visualizers/SocketVisualizer';
import { LoadBalancerVisualizer } from './visualizers/LoadBalancerVisualizer';
import { StorageEngineVisualizer } from './visualizers/StorageEngineVisualizer';
import { GitVisualizer } from './visualizers/GitVisualizer';
import { RedisVisualizer } from './visualizers/RedisVisualizer';
import { TorrentVisualizer } from './visualizers/TorrentVisualizer';
import { VirtualMachineVisualizer } from './visualizers/VirtualMachineVisualizer';
import { CanvasVisualizer } from './visualizers/CanvasVisualizer';

interface ProjectDetailViewProps {
  project: Project;
  user: UserSession;
  onBack: () => void;
  onToggleMilestone: (projectId: string, milestoneId: string) => void;
  onSaveNotes: (projectId: string, notes: string) => void;
  onOpenLogin: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  user,
  onBack,
  onToggleMilestone,
  onSaveNotes,
  onOpenLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'milestones' | 'theory' | 'hints' | 'verification' | 'notes'>('guide');
  const [revealedHints, setRevealedHints] = useState<{ [key: string]: boolean }>({
    level1: true,
    level2: false,
    level3: false,
  });
  const [notes, setNotes] = useState<string>(user.notes[project.id] || '');
  const [notesSaved, setNotesSaved] = useState<boolean>(false);
  const [activePhaseIdx, setActivePhaseIdx] = useState<number>(0);
  const [copiedPhaseCmd, setCopiedPhaseCmd] = useState<number | null>(null);
  const [copiedPhaseCode, setCopiedPhaseCode] = useState<number | null>(null);
  const [expandedTheoryIdx, setExpandedTheoryIdx] = useState<number | null>(0);

  const handleCopyPhaseCmd = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedPhaseCmd(idx);
    setTimeout(() => setCopiedPhaseCmd(null), 2000);
  };

  const handleCopyPhaseCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedPhaseCode(idx);
    setTimeout(() => setCopiedPhaseCode(null), 2000);
  };

  const completedCount = project.milestones.filter(
    (m) => user.completedMilestones[`${project.id}_${m.id}`]
  ).length;

  const handleNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNotes(project.id, notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const renderVisualizer = () => {
    switch (project.theory.visualizerType) {
      case 'allocator':
        return <AllocatorVisualizer />;
      case 'socket':
        return <SocketVisualizer />;
      case 'balancer':
        return <LoadBalancerVisualizer />;
      case 'blog':
        return <StorageEngineVisualizer />;
      case 'git':
        return <GitVisualizer />;
      case 'redis':
        return <RedisVisualizer />;
      case 'torrent':
        return <TorrentVisualizer />;
      case 'vm':
        return <VirtualMachineVisualizer />;
      case 'canvas':
        return <CanvasVisualizer />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button & top bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-all shadow-sm hover:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to All Projects</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            Progress:{' '}
            <span className="text-emerald-400 font-bold">
              {completedCount} / {project.milestones.length}
            </span>{' '}
            Milestones Finished
          </span>
        </div>
      </div>

      {/* Project Banner with colorful gradient border & glow */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Colorful top ambient glow */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.accentColor.gradient}`}
        />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${project.accentColor.badgeClass}`}
              >
                {project.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">{project.difficulty}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {project.estimatedHours}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.languages.map((l) => (
              <span
                key={l.name}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border shadow-sm ${l.badgeColor}`}
                title={l.why}
              >
                {l.tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('guide')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 transition-all shadow-md shadow-emerald-500/20"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Watch 10-Min Video &amp; Visual Guide</span>
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-all"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Step Milestones</span>
          </button>
        </div>

        {/* Scope Synopsis */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20">
            <div className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4" /> What You Will Build:
            </div>
            <ul className="space-y-1.5 text-slate-300">
              {project.scope.whatYouWillBuild.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-500/20">
            <div className="font-bold text-rose-400 mb-2 flex items-center gap-1.5 text-sm">
              <ShieldAlert className="w-4 h-4" /> Handcrafted Rules (Build With Your Hands):
            </div>
            <ul className="space-y-1.5 text-slate-300">
              {project.scope.whatYouWontUse.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-8 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'guide'
              ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <PlayCircle className="w-4 h-4 text-emerald-400" />
          <span>🎬 Visual Guide &amp; 10-Min Video</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
            Start Here
          </span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'milestones'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Milestones Roadmap ({project.milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('theory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'theory'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Visual Theory &amp; Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('hints')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'hints'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>3. Progressive Hints</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'verification'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <TestTube2 className="w-4 h-4" />
          <span>4. Verification &amp; Tests</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'notes'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>5. My Notes &amp; Observations</span>
        </button>
      </div>

      {/* TAB CONTENT 0: Visual Getting Started Guide & 10-Minute Video Tour */}
      {activeTab === 'guide' && (
        <div className="mt-6 space-y-8 animate-fadeIn">
          {/* 10-Minute Video Tour */}
          {project.videoTour && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Film className="w-5 h-5 text-emerald-400" />
                    <span>Project Video Tour: Real Engineering Masterclass &amp; AI Voice Walkthrough</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose between the full 1080p real video masterclass with human instructor audio, or switch to the chapter scrubber with synthesized voice narration and tactile sound effects.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl">
                    ~10 Min (~{project.videoTour.durationFormatted})
                  </span>
                </div>
              </div>

              <InteractiveVideoPlayer
                videoTour={project.videoTour}
                accentColor={project.accentColor.primary}
              />
            </div>
          )}

          {/* Visual Getting Started Guide */}
          {project.gettingStarted && (
            <VisualGuideSection
              guide={project.gettingStarted}
              project={project}
              onNavigateToTheory={() => setActiveTab('theory')}
            />
          )}
        </div>
      )}

      {/* TAB CONTENT 1: Milestones Roadmap */}
      {activeTab === 'milestones' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Follow these sequential milestones. Mark each done as you prove it with your own hands.
            </span>
            {!user.isLoggedIn && (
              <button
                onClick={onOpenLogin}
                className="text-emerald-400 hover:underline font-bold"
              >
                Sign in to save your checklist &rarr;
              </button>
            )}
          </div>

          <div className="space-y-4">
            {project.milestones.map((milestone) => {
              const isDone = Boolean(user.completedMilestones[`${project.id}_${milestone.id}`]);

              return (
                <div
                  key={milestone.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-emerald-950/10 border-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => {
                          if (!user.isLoggedIn) {
                            onOpenLogin();
                            return;
                          }
                          onToggleMilestone(project.id, milestone.id);
                        }}
                        className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0 ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'bg-slate-950 border-slate-700 hover:border-emerald-500 text-transparent'
                        }`}
                        title={user.isLoggedIn ? 'Toggle milestone completion' : 'Login to save progress'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-400">
                            STEP {milestone.step}
                          </span>
                          <span className="text-slate-600">•</span>
                          <h3
                            className={`text-base font-bold ${
                              isDone ? 'text-emerald-300 line-through decoration-emerald-500/50' : 'text-white'
                            }`}
                          >
                            {milestone.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{milestone.goal}</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Specifications */}
                  <div className="mt-4 pl-0 sm:pl-9 space-y-3">
                    <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800/90 shadow-inner">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                        <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5" />
                          Detailed Specifications &amp; Step-by-Step Implementation:
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {milestone.specs.length} key steps
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        {milestone.specs.map((spec, sIdx) => {
                          const colonIdx = spec.indexOf(':');
                          const hasColonTitle = colonIdx !== -1 && colonIdx < 55;
                          const title = hasColonTitle ? spec.slice(0, colonIdx) : null;
                          const body = hasColonTitle ? spec.slice(colonIdx + 1).trim() : spec;

                          return (
                            <div
                              key={sIdx}
                              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700/80 transition-colors flex items-start gap-3"
                            >
                              <div className="w-5 h-5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[10px] flex-shrink-0 mt-0.5">
                                {sIdx + 1}
                              </div>
                              <div className="leading-relaxed">
                                {title && (
                                  <span className="font-bold text-slate-100 block mb-0.5">
                                    {title}
                                  </span>
                                )}
                                <span className="text-slate-300 font-normal">
                                  {body}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Syscalls & Concepts */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-500 text-xs">Core Concepts:</span>
                      {milestone.syscallsOrConcepts.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 text-xs font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Checkpoint & Hand Check */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                        <span className="font-bold">Checkpoint: </span>
                        {milestone.checkpoint}
                      </div>
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-300">
                        <span className="font-bold">Manual Verification: </span>
                        {milestone.manualHandCheck}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Visual Theory & Embedded Simulator */}
      {activeTab === 'theory' && (
        <div className="mt-6 space-y-6">
          {/* Embedded Interactive Visualizer */}
          {renderVisualizer()}

          {/* High-level Architecture & Mental Model */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Mental Model &amp; Core Architecture
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.theory.highLevelArchitecture}
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 leading-relaxed">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">
                Real-World Visual Analogy:
              </div>
              {project.theory.mentalModel}
            </div>
          </div>

          {/* Deep-Dive Systems Engineering Foundations */}
          {project.theory.deepDiveConcepts && project.theory.deepDiveConcepts.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span>Deep-Dive Systems Engineering Foundations</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Architectural mechanics, mathematical formulas, hardware cache boundaries, and low-level kernel contracts.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-xl font-bold">
                  {project.theory.deepDiveConcepts.length} Deep Concepts
                </span>
              </div>

              <div className="space-y-4">
                {project.theory.deepDiveConcepts.map((concept, cIdx) => {
                  const isExpanded = expandedTheoryIdx === cIdx;
                  return (
                    <div
                      key={cIdx}
                      className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden transition-all shadow-md"
                    >
                      <button
                        onClick={() => setExpandedTheoryIdx(isExpanded ? null : cIdx)}
                        className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-slate-900/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                              {concept.tag}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">0{cIdx + 1}</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {concept.title}
                          </h4>
                        </div>
                        <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 flex-shrink-0 mt-1">
                          {isExpanded ? 'Collapse' : 'Deep Dive'}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-90 text-cyan-400' : 'text-slate-500'
                            }`}
                          />
                        </span>
                      </button>

                      {/* Concept Synopsis */}
                      <div className="px-5 pb-3">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans">
                          <span className="font-bold text-cyan-300">Core Principle: </span>
                          {concept.coreConcept}
                        </div>
                      </div>

                      {/* Expanded In-Depth Theory */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 space-y-4 border-t border-slate-900 text-xs animate-fadeIn">
                          <div className="text-slate-300 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                            {concept.inDepthExplanation}
                          </div>

                          {concept.mathOrAlgorithm && (
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/20 font-mono text-cyan-300 space-y-1">
                              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                Algorithmic Formula &amp; Mathematical Mechanics:
                              </div>
                              <pre className="text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto text-emerald-400">
                                {concept.mathOrAlgorithm}
                              </pre>
                            </div>
                          )}

                          {concept.asciiDiagram && (
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 font-mono">
                              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                Visual Architecture / State Machine Diagram:
                              </div>
                              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-cyan-300 text-xs overflow-x-auto leading-tight">
                                {concept.asciiDiagram}
                              </pre>
                            </div>
                          )}

                          {concept.codeSnippet && (
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 font-mono">
                              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                                Systems Implementation Reference:
                              </div>
                              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-amber-300 text-xs overflow-x-auto leading-relaxed">
                                {concept.codeSnippet}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* How to Execute This Project: Step-by-Step Practical Blueprint */}
          {project.theory.executionRoadmap && project.theory.executionRoadmap.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      How to Execute This Project: Practical Engineering Blueprint
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Step-by-step execution lifecycle from zero-syscall baseline to production-ready stress tests.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl">
                    {project.theory.executionRoadmap.length} Sequential Execution Phases
                  </span>
                </div>
              </div>

              {/* Phase Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
                {project.theory.executionRoadmap.map((phase, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setActivePhaseIdx(pIdx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activePhaseIdx === pIdx
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-md shadow-emerald-500/10'
                        : 'text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-900 border border-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-400">
                      {phase.phaseNumber}
                    </span>
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {phase.phaseTitle}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Execution Phase Details */}
              {(() => {
                const curPhase = project.theory.executionRoadmap[activePhaseIdx] || project.theory.executionRoadmap[0];
                return (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Phase Header */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          PHASE {curPhase.phaseNumber} OF {project.theory.executionRoadmap.length}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          Target: {curPhase.phaseTitle}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {curPhase.phaseTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {curPhase.summary}
                      </p>
                    </div>

                    {/* Plain-English "Dumb It Down" ELI5 Breakdown */}
                    {curPhase.eli5Explanation && (
                      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                        <div className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5 tracking-wider">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          <span>Dumb It Down: Plain English Breakdown (ELI5)</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans whitespace-pre-line">
                          {curPhase.eli5Explanation}
                        </p>
                      </div>
                    )}

                    {/* Architectural Deep-Dive for this phase */}
                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
                      <div className="text-xs uppercase font-bold text-cyan-400 flex items-center gap-1.5 tracking-wider">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Execution Theory Behind This Phase:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                        {curPhase.architectureDeepDive}
                      </p>
                    </div>

                    {/* Visual Workflow ASCII Diagram */}
                    {curPhase.visualWorkflowAscii && (
                      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
                        <div className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-1.5 tracking-wider">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Phase Visual Execution Workflow &amp; State Map:</span>
                        </div>
                        <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 text-emerald-300 text-xs overflow-x-auto leading-relaxed shadow-inner">
                          {curPhase.visualWorkflowAscii}
                        </pre>
                      </div>
                    )}

                    {/* Step-by-Step Actionable Execution Steps */}
                    <div className="space-y-3">
                      <div className="text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Step-by-Step Construction Guide:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {curPhase.concreteExecutionSteps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-start gap-3 text-xs"
                          >
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-[11px] flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </div>
                            <div className="text-slate-300 leading-relaxed pt-0.5">
                              {step}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hands-On Copyable Code Snippet */}
                    {curPhase.handsOnCodeSnippet && (
                      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-1.5 tracking-wider">
                            <Code2 className="w-4 h-4 text-emerald-400" />
                            <span>Hands-On Phase Implementation Code (Copy &amp; Pasteable):</span>
                          </div>
                          <button
                            onClick={() => handleCopyPhaseCode(curPhase.handsOnCodeSnippet!, activePhaseIdx)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition-all shadow-md"
                          >
                            {copiedPhaseCode === activePhaseIdx ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied Code!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Phase Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 text-emerald-300 text-xs overflow-x-auto leading-relaxed max-h-96 shadow-inner">
                          {curPhase.handsOnCodeSnippet}
                        </pre>
                      </div>
                    )}

                    {/* Line-by-Line Code Breakdown */}
                    {curPhase.codeExplanationLines && curPhase.codeExplanationLines.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-xs uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-cyan-400" />
                          <span>Line-by-Line Code Breakdown: What Every Line Actually Does</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {curPhase.codeExplanationLines.map((lineItem, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                            >
                              <span className="font-mono text-emerald-400 font-bold sm:w-56 flex-shrink-0 bg-slate-900 px-2 py-1 rounded-md border border-slate-800 truncate">
                                {lineItem.line}
                              </span>
                              <span className="text-slate-300 leading-relaxed flex-1">
                                {lineItem.plainMeaning}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verification Command & Expected Terminal Output */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5 tracking-wider">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Verification Command:</span>
                        </div>
                        <button
                          onClick={() => handleCopyPhaseCmd(curPhase.verificationCommand, activePhaseIdx)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                        >
                          {copiedPhaseCmd === activePhaseIdx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Command</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs text-amber-300 overflow-x-auto">
                        <span className="text-emerald-400 font-bold">$</span>
                        <span>{curPhase.verificationCommand}</span>
                      </div>

                      {curPhase.verificationBreakdown && (
                        <p className="text-xs text-slate-400 font-sans italic leading-relaxed pt-1">
                          <span className="font-bold text-amber-400 not-italic">Command Breakdown: </span>
                          {curPhase.verificationBreakdown}
                        </p>
                      )}

                      {/* Expected Terminal Output */}
                      <div className="mt-3 space-y-1.5">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Expected Verified Terminal Output:
                        </div>
                        <pre className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-emerald-400 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                          {curPhase.expectedOutput}
                        </pre>
                        {curPhase.outputExplanation && (
                          <p className="text-xs text-slate-400 font-sans italic leading-relaxed pt-1">
                            <span className="font-bold text-emerald-400 not-italic">What This Proves: </span>
                            {curPhase.outputExplanation}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Edge Cases & Pitfalls for this Phase */}
                    {curPhase.edgeCasesAndPitfalls && curPhase.edgeCasesAndPitfalls.length > 0 && (
                      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-2">
                        <div className="text-xs uppercase font-bold text-rose-400 flex items-center gap-1.5 tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Phase Gotchas &amp; Traps to Avoid:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {curPhase.edgeCasesAndPitfalls.map((gotcha, gIdx) => (
                            <li key={gIdx} className="flex items-start gap-2">
                              <span className="text-rose-400 font-bold">&bull;</span>
                              <span>{gotcha}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Phase Navigation Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => setActivePhaseIdx((prev) => Math.max(0, prev - 1))}
                        disabled={activePhaseIdx === 0}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          activePhaseIdx === 0
                            ? 'opacity-40 cursor-not-allowed text-slate-600 bg-slate-950'
                            : 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        &larr; Previous Phase
                      </button>

                      <span className="text-xs text-slate-500 font-mono">
                        Phase {activePhaseIdx + 1} of {project.theory.executionRoadmap.length}
                      </span>

                      <button
                        onClick={() => setActivePhaseIdx((prev) => Math.min(project.theory.executionRoadmap!.length - 1, prev + 1))}
                        disabled={activePhaseIdx === project.theory.executionRoadmap.length - 1}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          activePhaseIdx === project.theory.executionRoadmap.length - 1
                            ? 'opacity-40 cursor-not-allowed text-slate-600 bg-slate-950'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        }`}
                      >
                        <span>Next Phase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ASCII Memory / Protocol Diagrams */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Data Structures &amp; Wire Diagrams
            </h3>

            <div className="space-y-4">
              {project.theory.dataStructures.map((ds, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <h4 className="text-sm font-bold text-cyan-300">{ds.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3">{ds.description}</p>
                  {ds.asciiDiagram && (
                    <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto leading-tight">
                      {ds.asciiDiagram}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Syscalls Reference */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              Key Syscalls &amp; APIs Used
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {project.theory.keySyscalls.map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-amber-300 font-bold text-sm font-mono">{s.syscall}()</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono truncate">{s.signature}</div>
                  <p className="text-xs text-slate-300 mt-2 font-sans">{s.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pitfalls */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Common Beginner Traps &amp; Bugs
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.theory.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&gt;</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Progressive Hints (3 Tiers) */}
      {activeTab === 'hints' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-amber-400 font-bold">Progressive Reveal Strategy: </span>
            Try to solve the project using only Level 1. Only unlock Level 2 and Level 3 if you hit a wall!
          </div>

          {/* Level 1: Concept */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  TIER 1
                </span>
                <h4 className="text-sm font-bold text-white">Conceptual Nudge (Zero Spoilers)</h4>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{project.hints.level1_concept}</p>
          </div>

          {/* Level 2: Architecture */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  TIER 2
                </span>
                <h4 className="text-sm font-bold text-white">Architectural Data Flow &amp; Memory Layout</h4>
              </div>
              <button
                onClick={() => setRevealedHints((p) => ({ ...p, level2: !p.level2 }))}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                {revealedHints.level2 ? 'Hide Details' : 'Reveal Hint 2'}
              </button>
            </div>
            {revealedHints.level2 ? (
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{project.hints.level2_architecture}</p>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 text-center text-xs text-slate-500 border border-dashed border-slate-800">
                Click &apos;Reveal Hint 2&apos; to view struct relationships and memory offsets.
              </div>
            )}
          </div>

          {/* Level 3: Code Skeleton */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  TIER 3
                </span>
                <h4 className="text-sm font-bold text-white">Low-Level Syscall Blueprint &amp; Skeleton</h4>
              </div>
              <button
                onClick={() => setRevealedHints((p) => ({ ...p, level3: !p.level3 }))}
                className="text-xs text-rose-400 hover:underline font-semibold"
              >
                {revealedHints.level3 ? 'Hide Code Skeleton' : 'Reveal Blueprint Code'}
              </button>
            </div>
            {revealedHints.level3 ? (
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                {project.hints.level3_codeSkeleton}
              </pre>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 text-center text-xs text-slate-500 border border-dashed border-slate-800">
                Click &apos;Reveal Blueprint Code&apos; if you need the exact code structure and loop dispatcher.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: Verification & Edge Cases */}
      {activeTab === 'verification' && (
        <div className="mt-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-purple-400" />
              Automated Verification Test Scenarios
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.verification.testScenarios.map((test, idx) => (
                <li key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                  <span className="text-purple-400 font-bold">&bull;</span>
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Compilation &amp; Leak Check Commands
            </h3>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              {project.verification.cliCommands.map((cmd, idx) => (
                <pre key={idx} className="text-xs font-mono text-emerald-400 overflow-x-auto">
                  $ {cmd}
                </pre>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Adversarial Edge Cases: Break Your Code!
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.verification.edgeCasesToBreak.map((edge, idx) => (
                <li key={idx} className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-900/30 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{edge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: Engineering Scratchpad */}
      {activeTab === 'notes' && (
        <div className="mt-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-blue-400" />
                  Your Project Engineering Log &amp; Notes
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Document your memory offsets, syscall observations, and bug post-mortems here.
                </p>
              </div>

              {notesSaved && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  <Check className="w-3.5 h-3.5" /> Saved to Session
                </span>
              )}
            </div>

            <form onSubmit={handleNotesSubmit} className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="/* Document pointer offsets, memory layout bugs, or test results here... */"
                rows={12}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950"
                >
                  <Save className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Project, UserSession } from '../types';
import {
  Cpu,
  Network,
  Server,
  Database,
  ArrowRight,
  Clock,
  GitBranch,
  Share2,
  Palette,
  Sparkles,
  PlayCircle
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  user: UserSession;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, user, onSelect }) => {
  const completedInProject = project.milestones.filter(
    (m) => user.completedMilestones[`${project.id}_${m.id}`]
  ).length;

  const progressPercent = Math.round((completedInProject / project.milestones.length) * 100);

  const getCategoryIcon = () => {
    switch (project.category) {
      case 'Memory Management':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Networking & Concurrency':
        return <Network className="w-5 h-5 text-cyan-400" />;
      case 'Distributed Systems':
        return <Server className="w-5 h-5 text-amber-400" />;
      case 'Fullstack Baremetal':
        return <Database className="w-5 h-5 text-violet-400" />;
      case 'Developer Tools':
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      case 'Database Engines':
        return <Database className="w-5 h-5 text-rose-400" />;
      case 'Peer-to-Peer Networks':
        return <Share2 className="w-5 h-5 text-sky-400" />;
      case 'Virtual Machines & Compilers':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Real-Time Collaboration':
        return <Palette className="w-5 h-5 text-teal-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative rounded-3xl bg-slate-900/80 hover:bg-slate-900/95 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between cursor-pointer shadow-xl hover:shadow-2xl overflow-hidden"
    >
      {/* Top Colorful Accent Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.accentColor.gradient} transition-all duration-300 group-hover:h-2`}
      />

      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-sm group-hover:scale-105 transition-transform">
              {getCategoryIcon()}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-300 block">
                {project.category}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {project.difficulty}
              </span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${project.accentColor.badgeClass}`}
          >
            {project.badge}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs font-medium text-slate-400 mt-1 line-clamp-1">
          {project.tagline}
        </p>

        {/* Short Description */}
        <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
          {project.shortDesc}
        </p>

        {/* Languages Tags */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.languages.map((lang) => (
              <span
                key={lang.name}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border ${lang.badgeColor}`}
              >
                {lang.tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        {/* Progress Bar if started */}
        {user.isLoggedIn && completedInProject > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
              <span>Your Progress</span>
              <span className="text-emerald-400 font-bold">
                {progressPercent}% ({completedInProject}/{project.milestones.length})
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              <PlayCircle className="w-3.5 h-3.5" />
              10m Video &amp; Visual Guide
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

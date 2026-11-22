import React, { useState, useEffect } from 'react';
import { Project, UserSession } from './types';
import { PROJECTS_DATA } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailView } from './components/ProjectDetailView';
import { LoginModal } from './components/LoginModal';
import { ManifestoSection } from './components/ManifestoSection';
import { SyscallCodex } from './components/SyscallCodex';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'baremetal_craft_user_v1';

export const App: React.FC = () => {
  // User Session State
  const [user, setUser] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      isLoggedIn: false,
      username: 'Guest Craftsperson',
      role: 'Apprentice',
      completedMilestones: {},
      notes: {},
      hasPledged: false,
    };
  });

  const [activeTab, setActiveTab] = useState<'projects' | 'manifesto' | 'syscalls'>('projects');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Sync session to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  const handleLoginSuccess = (username: string) => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: true,
      username,
      role: 'Master Systems Engineer',
    }));
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
      username: 'Guest Craftsperson',
      role: 'Apprentice',
    }));
  };

  const handleToggleMilestone = (projectId: string, milestoneId: string) => {
    const key = `${projectId}_${milestoneId}`;
    setUser((prev) => {
      const nextDone = !prev.completedMilestones[key];
      return {
        ...prev,
        completedMilestones: {
          ...prev.completedMilestones,
          [key]: nextDone,
        },
      };
    });
  };

  const handleSaveNotes = (projectId: string, notes: string) => {
    setUser((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [projectId]: notes,
      },
    }));
  };

  const handleTakePledge = () => {
    setUser((prev) => ({
      ...prev,
      hasPledged: true,
      pledgedAt: new Date().toISOString(),
    }));
  };

  // Filter projects by category
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans bg-grid-pattern">
      {/* Navigation */}
      <Navbar
        user={user}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          setSelectedProject(null);
        }}
      />

      <main className="flex-1">
        {selectedProject ? (
          <ProjectDetailView
            project={selectedProject}
            user={user}
            onBack={() => setSelectedProject(null)}
            onToggleMilestone={handleToggleMilestone}
            onSaveNotes={handleSaveNotes}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'projects' && (
              <>
                <HeroSection
                  user={user}
                  onTakePledge={handleTakePledge}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                {/* Projects Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                        9 Handcrafted Software Projects
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Explore interactive visualizers, clear mental models, and step-by-step milestones to build with your own hands.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      {filteredProjects.length} Available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        user={user}
                        onSelect={(p) => setSelectedProject(p)}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'manifesto' && (
              <ManifestoSection user={user} onTakePledge={handleTakePledge} />
            )}

            {activeTab === 'syscalls' && <SyscallCodex />}
          </>
        )}
      </main>

      {/* Floating Interactive Terminal */}
      <InteractiveTerminal
        projects={PROJECTS_DATA}
        user={user}
        onSelectProject={(p) => {
          setSelectedProject(p);
          setActiveTab('projects');
        }}
        onTakePledge={handleTakePledge}
      />

      {/* Login Dialog Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

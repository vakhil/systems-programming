import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { Project, UserSession } from '../types';

interface InteractiveTerminalProps {
  projects: Project[];
  user: UserSession;
  onSelectProject: (p: Project) => void;
  onTakePledge: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  projects,
  user,
  onSelectProject,
  onTakePledge,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to the Handcrafted Systems Studio Shell v2.0',
    'Type "projects" to view all 9 blueprints, or "help" for a list of commands.',
    '-------------------------------------------------------------------------'
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, `craftsperson@studio:~$ ${cmd}`];
    const parts = cmd.split(' ');
    const main = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (main) {
      case 'help':
        newHistory.push(
          'Available Commands:',
          '  projects           List all 9 handcrafted project blueprints',
          '  open <id>          Open and inspect a project blueprint',
          '  whoami             Show current craftsperson credentials & progress',
          '  pledge             Sign or verify the Handcrafted No-AI Oath',
          '  man <topic>        Show manual page (e.g. "man git", "man redis")',
          '  motd               Display inspirational thought of the day',
          '  clear              Clear terminal history'
        );
        break;

      case 'projects':
      case 'ls':
        newHistory.push('All 9 Handcrafted Project Blueprints:');
        projects.forEach((p, idx) => {
          newHistory.push(`  ${idx + 1}. [${p.id}] - ${p.title} (${p.category})`);
        });
        break;

      case 'open':
        const target = projects.find(
          (p) => p.id === arg || p.title.toLowerCase().includes(arg)
        );
        if (target) {
          newHistory.push(`Opening blueprint: ${target.title}...`);
          onSelectProject(target);
          setIsOpen(false);
        } else {
          newHistory.push(`Error: Project "${arg}" not found. Type "projects" for the list of IDs.`);
        }
        break;

      case 'whoami':
        newHistory.push(
          `User: ${user.username}`,
          `Role: Master Craftsperson`,
          `Pledged: ${user.hasPledged ? 'YES (Honored)' : 'NO (Unsigned)'}`,
          `Completed Milestones: ${Object.values(user.completedMilestones).filter(Boolean).length} / 45`
        );
        break;

      case 'pledge':
        onTakePledge();
        newHistory.push('The Handcrafted Oath has been signed and recorded.');
        break;

      case 'man':
        if (arg === 'git') {
          newHistory.push(
            'MANUAL: git(1) From Scratch',
            'SYNOPSIS: Content-addressable storage using SHA-1 blobs, directory trees, and commit snapshots.'
          );
        } else if (arg === 'redis') {
          newHistory.push(
            'MANUAL: redis(1) RESP Engine',
            'SYNOPSIS: Single-threaded in-memory key-value dictionary using the RESP protocol.'
          );
        } else if (arg === 'malloc') {
          newHistory.push(
            'MANUAL: my_malloc(3)',
            'SYNOPSIS: void* my_malloc(size_t size)',
            'Allocates virtual memory chunks using an explicit free list and boundary tag headers.'
          );
        } else {
          newHistory.push(`No manual entry for "${arg}". Try "man git", "man redis", or "man malloc".`);
        }
        break;

      case 'motd':
        newHistory.push(
          '"The only way to deeply understand a complex system is to build a simplified version of it with your own hands."',
          'Keep building!'
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push(`command not found: ${main}. Type "help" for a list of valid commands.`);
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <>
      {/* Floating launcher button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 text-xs font-bold shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Interactive Shell</span>
        </button>
      )}

      {/* Floating terminal window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-full sm:w-[540px] h-[380px] bg-slate-950/95 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md">
          {/* Title Bar */}
          <div className="h-10 bg-slate-900 px-4 flex items-center justify-between border-b border-slate-800 text-xs select-none">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span>Studio Terminal — craftsperson@studio:~</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Output */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('craftsperson@')
                    ? 'text-emerald-400 font-bold'
                    : line.startsWith('Error')
                    ? 'text-rose-400'
                    : line.startsWith('  ')
                    ? 'text-slate-400'
                    : 'text-slate-200'
                }
              >
                {line}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Line */}
          <form
            onSubmit={handleCommand}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 font-mono text-xs"
          >
            <span className="text-emerald-400 font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type help, projects, man git..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none"
            />
            <button type="submit" className="text-slate-400 hover:text-emerald-400">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

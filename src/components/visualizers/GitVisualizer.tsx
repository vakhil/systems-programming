import React, { useState } from 'react';
import { GitBranch, GitCommit, FileText, Folder, Plus, RefreshCw, ArrowRight } from 'lucide-react';

interface GitObject {
  id: string;
  type: 'blob' | 'tree' | 'commit';
  hash: string;
  label: string;
  details: string;
  parentHash?: string;
}

export const GitVisualizer: React.FC = () => {
  const [objects, setObjects] = useState<GitObject[]>([
    {
      id: '1',
      type: 'blob',
      hash: 'e69de29',
      label: 'README.md',
      details: 'Content: "# Hello World\\nHandcrafted code"'
    },
    {
      id: '2',
      type: 'tree',
      hash: '3b18e51',
      label: 'root tree (v1)',
      details: '100644 blob e69de29  README.md'
    },
    {
      id: '3',
      type: 'commit',
      hash: '7a8f901',
      label: 'Commit: "Initial commit"',
      details: 'tree 3b18e51\\nauthor Dev <dev@local>\\n\\nInitial commit'
    }
  ]);

  const [activeBranch, setActiveBranch] = useState<string>('main -> 7a8f901');
  const [logText, setLogText] = useState<string>('Git repository initialized in .git/objects. 3 objects stored.');

  const handleAddFile = () => {
    const nextNum = objects.filter((o) => o.type === 'blob').length + 1;
    const blobHash = Math.random().toString(16).substring(2, 9);
    const treeHash = Math.random().toString(16).substring(2, 9);
    const commitHash = Math.random().toString(16).substring(2, 9);

    const newBlob: GitObject = {
      id: String(objects.length + 1),
      type: 'blob',
      hash: blobHash,
      label: `app_${nextNum}.c`,
      details: `Content: "int main() { return ${nextNum}; }"`
    };

    const newTree: GitObject = {
      id: String(objects.length + 2),
      type: 'tree',
      hash: treeHash,
      label: `tree (v${nextNum + 1})`,
      details: `Includes README.md + app_${nextNum}.c`
    };

    const lastCommit = [...objects].reverse().find((o) => o.type === 'commit');

    const newCommit: GitObject = {
      id: String(objects.length + 3),
      type: 'commit',
      hash: commitHash,
      label: `Commit: "Add app_${nextNum}.c"`,
      details: `tree ${treeHash}\\nparent ${lastCommit?.hash || 'none'}`,
      parentHash: lastCommit?.hash
    };

    setObjects((prev) => [...prev, newBlob, newTree, newCommit]);
    setActiveBranch(`main -> ${commitHash}`);
    setLogText(`[git commit] Created Blob (${blobHash}), wrote Tree (${treeHash}), and sealed Commit (${commitHash})!`);
  };

  const handleReset = () => {
    setObjects([
      {
        id: '1',
        type: 'blob',
        hash: 'e69de29',
        label: 'README.md',
        details: 'Content: "# Hello World\\nHandcrafted code"'
      },
      {
        id: '2',
        type: 'tree',
        hash: '3b18e51',
        label: 'root tree (v1)',
        details: '100644 blob e69de29  README.md'
      },
      {
        id: '3',
        type: 'commit',
        hash: '7a8f901',
        label: 'Commit: "Initial commit"',
        details: 'tree 3b18e51\\nauthor Dev <dev@local>\\n\\nInitial commit'
      }
    ]);
    setActiveBranch('main -> 7a8f901');
    setLogText('Repository reset to initial commit.');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 my-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              Git Object Graph &amp; Content-Addressable Storage
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-normal">
                .git/objects
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              See how Git stores files as SHA-1 content hashes, trees, and linked commit snapshots.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddFile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-xs font-mono font-bold shadow-md hover:brightness-110 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Stage &amp; Commit File
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset repository"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Current Branch Reference */}
      <div className="my-4 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
        <span className="text-slate-400">
          HEAD Ref: <span className="text-orange-400 font-bold">{activeBranch}</span>
        </span>
        <span className="text-slate-500 text-[11px]">
          Objects in DB: <span className="text-white font-bold">{objects.length}</span>
        </span>
      </div>

      {/* Objects Visual Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
        {/* Blobs */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-500/20">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 mb-2">
            <FileText className="w-3.5 h-3.5" /> Blobs (File Content)
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {objects
              .filter((o) => o.type === 'blob')
              .map((b) => (
                <div key={b.id} className="p-2 rounded-lg bg-slate-950 border border-blue-500/30 text-xs font-mono">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-blue-300 font-bold">{b.label}</span>
                    <span className="text-slate-500">{b.hash}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">{b.details}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Trees */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-2">
            <Folder className="w-3.5 h-3.5" /> Trees (Directory Indexes)
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {objects
              .filter((o) => o.type === 'tree')
              .map((t) => (
                <div key={t.id} className="p-2 rounded-lg bg-slate-950 border border-emerald-500/30 text-xs font-mono">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-emerald-300 font-bold">{t.label}</span>
                    <span className="text-slate-500">{t.hash}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">{t.details}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Commits */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-500/20">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 mb-2">
            <GitCommit className="w-3.5 h-3.5" /> Commits (Snapshot DAG)
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {objects
              .filter((o) => o.type === 'commit')
              .map((c) => (
                <div key={c.id} className="p-2 rounded-lg bg-slate-950 border border-purple-500/30 text-xs font-mono">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-purple-300 font-bold">{c.label}</span>
                    <span className="text-slate-500">{c.hash}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">{c.details}</div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
        <span className="text-orange-300 truncate">{logText}</span>
      </div>
    </div>
  );
};

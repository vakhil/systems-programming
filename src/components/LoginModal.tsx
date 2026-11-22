import React, { useRef, useEffect, useState } from 'react';
import { Lock, User, AlertCircle, X, CheckCircle2, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('asdmin');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Click outside fallback per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handlePointerDown = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;
      if (isOutside) {
        onClose();
      }
    };

    dialog.addEventListener('mousedown', handlePointerDown);
    return () => dialog.removeEventListener('mousedown', handlePointerDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials: admin / asdmin per user requirements
    if (username.trim() === 'admin' && password === 'asdmin') {
      setError(null);
      onLoginSuccess('admin');
      onClose();
    } else {
      setError('Invalid credentials! Hint: use "admin" as username and "asdmin" as password.');
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('asdmin');
    setError(null);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="p-0 bg-transparent text-slate-100 max-w-md w-full rounded-3xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-md border-0"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden relative">
        {/* Top colorful gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Craftsperson Sign In</h3>
            <p className="text-xs text-slate-400 mt-0.5">Save your milestone checklist &amp; personal project notes</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all font-mono"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all font-mono"
              placeholder="asdmin"
            />
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs flex items-center justify-between">
            <span className="text-slate-400">Default Credentials: <span className="text-emerald-400 font-mono font-bold">admin / asdmin</span></span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2"
            >
              Autofill
            </button>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Sign In
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

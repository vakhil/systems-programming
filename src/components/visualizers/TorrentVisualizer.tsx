import React, { useState } from 'react';
import { Share2, Download, RefreshCw, CheckCircle2, Users, ShieldCheck } from 'lucide-react';

interface PieceStatus {
  index: number;
  status: 'missing' | 'downloading' | 'verified';
  peerIp?: string;
  hash: string;
}

export const TorrentVisualizer: React.FC = () => {
  const [pieces, setPieces] = useState<PieceStatus[]>([
    { index: 0, status: 'verified', hash: 'e81a3', peerIp: '192.168.1.12' },
    { index: 1, status: 'verified', hash: 'b94f1', peerIp: '192.168.1.12' },
    { index: 2, status: 'downloading', hash: 'c12d8', peerIp: '10.0.0.4' },
    { index: 3, status: 'missing', hash: '7f99a' },
    { index: 4, status: 'missing', hash: '2b44e' },
    { index: 5, status: 'missing', hash: '6c11d' },
    { index: 6, status: 'missing', hash: '9a33f' },
    { index: 7, status: 'missing', hash: '4e77b' },
    { index: 8, status: 'missing', hash: '1d88c' },
    { index: 9, status: 'missing', hash: '8f22a' },
    { index: 10, status: 'missing', hash: '3e55d' },
    { index: 11, status: 'missing', hash: '5b99e' },
  ]);

  const [downloadSpeed, setDownloadSpeed] = useState<string>('3.4 MB/s');
  const [logText, setLogText] = useState<string>('Connected to tracker. 4 seeders found. Bitfield received.');

  const handleDownloadNext = () => {
    const missingIdx = pieces.findIndex((p) => p.status === 'missing');
    if (missingIdx === -1) {
      setLogText('Torrent download complete! File 100% verified against SHA-1 piece hashes.');
      return;
    }

    // Step 1: mark downloading
    const newPieces = [...pieces];
    newPieces[missingIdx] = {
      ...newPieces[missingIdx],
      status: 'downloading',
      peerIp: '192.168.1.12'
    };
    setPieces(newPieces);
    setLogText(`Requesting 16KB blocks for Piece #${missingIdx} from peer 192.168.1.12...`);

    // Step 2: verify SHA-1 hash and write
    setTimeout(() => {
      setPieces((prev) =>
        prev.map((p, idx) =>
          idx === missingIdx ? { ...p, status: 'verified' } : p
        )
      );
      setLogText(`Piece #${missingIdx} SHA-1 hash [${pieces[missingIdx].hash}] OK! Wrote 512KB to disk.`);
    }, 600);
  };

  const handleReset = () => {
    setPieces([
      { index: 0, status: 'verified', hash: 'e81a3', peerIp: '192.168.1.12' },
      { index: 1, status: 'verified', hash: 'b94f1', peerIp: '192.168.1.12' },
      { index: 2, status: 'missing', hash: 'c12d8' },
      { index: 3, status: 'missing', hash: '7f99a' },
      { index: 4, status: 'missing', hash: '2b44e' },
      { index: 5, status: 'missing', hash: '6c11d' },
      { index: 6, status: 'missing', hash: '9a33f' },
      { index: 7, status: 'missing', hash: '4e77b' },
      { index: 8, status: 'missing', hash: '1d88c' },
      { index: 9, status: 'missing', hash: '8f22a' },
      { index: 10, status: 'missing', hash: '3e55d' },
      { index: 11, status: 'missing', hash: '5b99e' },
    ]);
    setLogText('Swarm connection reset.');
  };

  const completedCount = pieces.filter((p) => p.status === 'verified').length;
  const progressPercent = Math.round((completedCount / pieces.length) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-sky-950/40 border border-sky-500/30 rounded-2xl p-5 my-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sky-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              BitTorrent Piece Matrix &amp; Swarm State
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-normal">
                P2P Protocol
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Visualize piece bitfields, concurrent block pipelining, and SHA-1 checksum validation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadNext}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 text-xs font-mono font-bold shadow-md hover:brightness-110 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download Next Piece
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset swarm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Swarm Stats */}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Total Progress:</span>
          <span className="text-sky-400 font-bold">{progressPercent}% ({completedCount}/{pieces.length})</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Swarm Peers:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Users className="w-3 h-3" /> 4 Active (2 Seeds)
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Transfer Rate:</span>
          <span className="text-cyan-300 font-bold">{downloadSpeed}</span>
        </div>
      </div>

      {/* Visual Piece Matrix */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>File Piece Grid (512KB per chunk)</span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Verified</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Downloading</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700" /> Missing</span>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {pieces.map((p) => (
            <div
              key={p.index}
              className={`p-2 rounded-lg border font-mono text-xs flex flex-col justify-between h-16 transition-all ${
                p.status === 'verified'
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  : p.status === 'downloading'
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-300 animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold">#{p.index}</span>
                {p.status === 'verified' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                {p.status === 'verified' ? p.hash : p.status === 'downloading' ? 'in-flight' : 'pending'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log */}
      <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
        <span className="text-sky-300 truncate">{logText}</span>
      </div>
    </div>
  );
};

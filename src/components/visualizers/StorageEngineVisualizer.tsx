import React, { useState } from 'react';
import { Database, Plus, RefreshCw, FileText, Search, HardDrive } from 'lucide-react';

interface PostRecord {
  id: number;
  offset: string;
  byteSize: number;
  title: string;
  body: string;
  timestamp: string;
  crc32: string;
}

export const StorageEngineVisualizer: React.FC = () => {
  const [diskRecords, setDiskRecords] = useState<PostRecord[]>([
    {
      id: 1,
      offset: '0x0000',
      byteSize: 312,
      title: 'Writing My First Allocator',
      body: 'Today I replaced glibc with 300 lines of C...',
      timestamp: '1732258400',
      crc32: '0x8F4A12BC'
    },
    {
      id: 2,
      offset: '0x0138',
      byteSize: 420,
      title: 'Why TCP Is A Byte Stream',
      body: 'Stop expecting packets at the application layer...',
      timestamp: '1732261200',
      crc32: '0x3E9D551A'
    }
  ]);

  const [indexMap, setIndexMap] = useState<Record<number, string>>({
    1: '0x0000',
    2: '0x0138'
  });

  const [selectedPost, setSelectedPost] = useState<PostRecord | null>(null);
  const [storageLog, setStorageLog] = useState<string>('Database mounted. In-memory index active with 2 entries.');

  const handleAppendPost = () => {
    const nextId = diskRecords.length + 1;
    const lastRecord = diskRecords[diskRecords.length - 1];
    const nextOffsetNum = lastRecord ? parseInt(lastRecord.offset, 16) + lastRecord.byteSize : 0;
    const nextOffset = '0x' + nextOffsetNum.toString(16).padStart(4, '0');

    const sampleTitles = [
      'Zero-Copy sendfile() in Linux',
      'The Truth About Virtual Memory',
      'Building Without AI Copilots',
      'Ring Buffers Explained Visually',
      'Demystifying epoll Edge Triggering'
    ];
    const chosenTitle = sampleTitles[(nextId - 1) % sampleTitles.length];

    const newRecord: PostRecord = {
      id: nextId,
      offset: nextOffset,
      byteSize: 360,
      title: chosenTitle,
      body: 'Detailed technical reflections written by hand with zero framework bloat...',
      timestamp: Math.floor(Date.now() / 1000).toString(),
      crc32: '0x' + Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase()
    };

    setDiskRecords([...diskRecords, newRecord]);
    setIndexMap((prev) => ({ ...prev, [nextId]: nextOffset }));
    setStorageLog(`[APPEND] Sequential write of ${newRecord.byteSize} bytes at file offset ${nextOffset}. Index updated in O(1).`);
  };

  const handleReadPost = (id: number) => {
    const offset = indexMap[id];
    if (!offset) {
      setStorageLog(`[ERROR] ID ${id} not found in in-memory index table!`);
      return;
    }
    const record = diskRecords.find((r) => r.id === id);
    if (record) {
      setSelectedPost(record);
      setStorageLog(`[PREAD] Looked up ID ${id} in RAM -> Offset ${offset}. pread(fd, buf, ${record.byteSize}, ${offset}) returned in 0.04ms!`);
    }
  };

  const handleCrashAndReboot = () => {
    // RAM is wiped
    setIndexMap({});
    setSelectedPost(null);
    setStorageLog('[SIMULATION] Server process crashed! RAM index wiped out. Rebooting...');

    setTimeout(() => {
      // Rebuild index by scanning WAL / binary file
      const rebuilt: Record<number, string> = {};
      diskRecords.forEach((r) => {
        rebuilt[r.id] = r.offset;
      });
      setIndexMap(rebuilt);
      setStorageLog(`[RECOVERY] Scanned ${diskRecords.length} binary records from disk in 0.12ms. In-memory index fully restored!`);
    }, 800);
  };

  const resetStorage = () => {
    setDiskRecords([
      {
        id: 1,
        offset: '0x0000',
        byteSize: 312,
        title: 'Writing My First Allocator',
        body: 'Today I replaced glibc with 300 lines of C...',
        timestamp: '1732258400',
        crc32: '0x8F4A12BC'
      },
      {
        id: 2,
        offset: '0x0138',
        byteSize: 420,
        title: 'Why TCP Is A Byte Stream',
        body: 'Stop expecting packets at the application layer...',
        timestamp: '1732261200',
        crc32: '0x3E9D551A'
      }
    ]);
    setIndexMap({ 1: '0x0000', 2: '0x0138' });
    setSelectedPost(null);
    setStorageLog('Database reset.');
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h4 className="font-mono text-base font-semibold text-emerald-300">
              Interactive Append-Only Storage Engine &amp; Indexer
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Understand how high-speed storage engines (like Redis WAL, Kafka, and Bitcask) achieve O(1) reads and blazing sequential writes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetStorage}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-dark-800 hover:bg-dark-700 text-slate-300 rounded border border-slate-700/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Split view: RAM Index vs Disk Binary File */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
        {/* RAM Index */}
        <div className="bg-dark-950 p-4 rounded-lg border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-3 border-b border-white/5 pb-2">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> In-Memory Index (RAM)
            </span>
            <span className="text-[10px] text-slate-500">Fast O(1) hash table</span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {Object.keys(indexMap).length === 0 ? (
              <div className="text-rose-400/80 py-4 text-center italic">
                Index empty (Process restarted or unmounted).
              </div>
            ) : (
              Object.entries(indexMap).map(([id, offset]) => (
                <div
                  key={id}
                  onClick={() => handleReadPost(Number(id))}
                  className="p-2 rounded bg-dark-900 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-slate-200">Post ID #{id}</span>
                  <span className="text-emerald-400 text-[11px]">&rarr; Offset: {offset}</span>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-3 flex gap-2">
            <button
              onClick={handleAppendPost}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Append New Post
            </button>
            <button
              onClick={handleCrashAndReboot}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
              title="Simulate process crash and fast WAL replay recovery"
            >
              Crash &amp; Rebuild
            </button>
          </div>
        </div>

        {/* Disk Binary File */}
        <div className="bg-dark-950 p-4 rounded-lg border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-3 border-b border-white/5 pb-2">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" /> Disk Binary File: /var/data/blog.db
            </span>
            <span className="text-[10px] text-slate-500">Append-Only Sequential</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {diskRecords.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedPost(r)}
                className={`p-2.5 rounded border transition-colors cursor-pointer ${
                  selectedPost?.id === r.id
                    ? 'bg-cyan-950/30 border-cyan-500/60 text-cyan-200'
                    : 'bg-dark-900 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/5">
                  <span className="text-slate-400">Offset: {r.offset} ({r.byteSize} bytes)</span>
                  <span className="text-[10px] text-slate-500">CRC: {r.crc32}</span>
                </div>
                <div className="font-bold text-slate-100 text-xs mt-1 truncate">{r.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Post Preview */}
      {selectedPost && (
        <div className="mb-4 p-3 rounded-lg bg-dark-950 border border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] mb-1">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Record Read via pread() at {selectedPost.offset}:</span>
          </div>
          <div className="text-sm font-bold text-slate-100">{selectedPost.title}</div>
          <div className="text-slate-300 text-xs mt-1">{selectedPost.body}</div>
        </div>
      )}

      {/* Storage Engine Log */}
      <div className="bg-dark-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs">
        <span className="text-slate-500 mr-2">&gt;</span>
        <span className="text-emerald-400">{storageLog}</span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Database, Play, RefreshCw, Clock, ArrowRight, Zap } from 'lucide-react';

interface RedisEntry {
  key: string;
  val: string;
  type: 'string' | 'integer' | 'list';
  ttl?: number;
}

export const RedisVisualizer: React.FC = () => {
  const [entries, setEntries] = useState<RedisEntry[]>([
    { key: 'session:token', val: 'a89f-21cb-4e90', type: 'string', ttl: 45 },
    { key: 'visits:count', val: '1420', type: 'integer' },
    { key: 'user:101', val: '{"name":"Linus"}', type: 'string' },
  ]);

  const [inputCmd, setInputCmd] = useState('SET user:202 "Ada" EX 60');
  const [respWire, setRespWire] = useState('*4\\r\\n$3\\r\\nSET\\r\\n$8\\r\\nuser:202\\r\\n$3\\r\\nAda\\r\\n$2\\r\\nEX\\r\\n$2\\r\\n60\\r\\n');
  const [serverResp, setServerResp] = useState('+OK\\r\\n');
  const [logMsg, setLogMsg] = useState('Redis server listening on 127.0.0.1:6379.');

  const handleExecute = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parts = inputCmd.trim().split(' ');
    const cmd = parts[0]?.toUpperCase();

    if (cmd === 'SET') {
      const k = parts[1] || 'sample_key';
      const v = parts.slice(2).join(' ') || 'sample_val';
      const hasEx = parts.includes('EX');
      const ttlVal = hasEx ? parseInt(parts[parts.indexOf('EX') + 1] || '60', 10) : undefined;

      setEntries((prev) => [
        ...prev.filter((item) => item.key !== k),
        { key: k, val: v, type: 'string', ttl: ttlVal }
      ]);
      setRespWire(`*${parts.length}\\r\\n` + parts.map((p) => `$${p.length}\\r\\n${p}\\r\\n`).join(''));
      setServerResp('+OK\\r\\n');
      setLogMsg(`Stored key "${k}" in dictionary hash table. Memory footprint: +${k.length + v.length + 32}B.`);
    } else if (cmd === 'GET') {
      const k = parts[1];
      const match = entries.find((item) => item.key === k);
      setRespWire(`*2\\r\\n$3\\r\\nGET\\r\\n$${k?.length || 0}\\r\\n${k}\\r\\n`);
      if (match) {
        setServerResp(`$${match.val.length}\\r\\n${match.val}\\r\\n`);
        setLogMsg(`Hash lookup hit for "${k}" -> "${match.val}" (O(1)).`);
      } else {
        setServerResp('$-1\\r\\n');
        setLogMsg(`Hash lookup miss for "${k}" -> nil.`);
      }
    } else if (cmd === 'INCR') {
      const k = parts[1] || 'counter';
      const match = entries.find((item) => item.key === k);
      const nextNum = match ? parseInt(match.val, 10) + 1 : 1;
      setEntries((prev) => [
        ...prev.filter((item) => item.key !== k),
        { key: k, val: String(nextNum), type: 'integer' }
      ]);
      setRespWire(`*2\\r\\n$4\\r\\nINCR\\r\\n$${k.length}\\r\\n${k}\\r\\n`);
      setServerResp(`:${nextNum}\\r\\n`);
      setLogMsg(`Atomically incremented "${k}" to ${nextNum}.`);
    } else if (cmd === 'DEL') {
      const k = parts[1];
      setEntries((prev) => prev.filter((item) => item.key !== k));
      setRespWire(`*2\\r\\n$3\\r\\nDEL\\r\\n$${k?.length || 0}\\r\\n${k}\\r\\n`);
      setServerResp(':1\\r\\n');
      setLogMsg(`Removed key "${k}" from hash table.`);
    }
  };

  const handleReset = () => {
    setEntries([
      { key: 'session:token', val: 'a89f-21cb-4e90', type: 'string', ttl: 45 },
      { key: 'visits:count', val: '1420', type: 'integer' },
      { key: 'user:101', val: '{"name":"Linus"}', type: 'string' },
    ]);
    setLogMsg('Redis dictionary reset.');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-rose-950/40 border border-rose-500/30 rounded-2xl p-5 my-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rose-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              RESP Protocol &amp; In-Memory Dictionary
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-normal">
                PORT :6379
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Inspect the raw TCP Redis Serialization Protocol (RESP) and live hash table buckets.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Reset store"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Command Dispatcher Form */}
      <form onSubmit={handleExecute} className="my-4 flex gap-2">
        <input
          type="text"
          value={inputCmd}
          onChange={(e) => setInputCmd(e.target.value)}
          placeholder="SET key value EX 60 / GET key / INCR counter / DEL key"
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-100 placeholder-slate-600 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-mono text-xs font-bold rounded-xl shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all"
        >
          <Play className="w-3.5 h-3.5" /> Send RESP
        </button>
      </form>

      {/* Wire Inspector & Live Hash Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
        {/* Wire Protocol bytes */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Zap className="w-3 h-3 text-rose-400" /> TCP Wire Bytes (RESP):
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-rose-300 text-[11px] break-all leading-tight">
            {respWire}
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-2 mb-1">
            Server Raw Response:
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400 text-[11px] font-bold">
            {serverResp}
          </div>
        </div>

        {/* In-Memory Key Value Pairs */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>In-Memory Hash Map ({entries.length} keys)</span>
            <span className="text-slate-500">O(1) amortized</span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {entries.map((item) => (
              <div
                key={item.key}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-rose-400 font-bold">{item.key}</span>
                  <span className="text-slate-500 mx-1.5">&rarr;</span>
                  <span className="text-slate-200">{item.val}</span>
                </div>
                {item.ttl && (
                  <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    <Clock className="w-2.5 h-2.5" /> {item.ttl}s
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
        <span className="text-rose-300 truncate">{logMsg}</span>
      </div>
    </div>
  );
};

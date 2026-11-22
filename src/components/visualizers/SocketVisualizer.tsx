import React, { useState } from 'react';
import { Activity, Send, UserPlus, Zap, Radio, RefreshCw } from 'lucide-react';

interface ClientConn {
  fd: number;
  username: string;
  room: string;
  rxBytesPending: number;
  txBytesPending: number;
  status: 'ESTABLISHED' | 'READ_READY' | 'WRITING';
}

export const SocketVisualizer: React.FC = () => {
  const [clients, setClients] = useState<ClientConn[]>([
    { fd: 4, username: 'neo_89', room: '#general', rxBytesPending: 0, txBytesPending: 0, status: 'ESTABLISHED' },
    { fd: 5, username: 'trinity', room: '#general', rxBytesPending: 0, txBytesPending: 0, status: 'ESTABLISHED' },
    { fd: 6, username: 'morpheus', room: '#general', rxBytesPending: 0, txBytesPending: 0, status: 'ESTABLISHED' },
  ]);

  const [epollState, setEpollState] = useState<'WAITING' | 'AWAKE_READ' | 'BROADCASTING'>('WAITING');
  const [logEvents, setLogEvents] = useState<string[]>([
    'epoll_create1(0) initialized epoll_fd=3.',
    'epoll_ctl: Registered listen_fd=3 for EPOLLIN.',
    'epoll_wait(timeout=-1): Thread sleeping in kernel waiting for I/O readiness...'
  ]);

  const addLog = (msg: string) => {
    setLogEvents((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const handleSimulateMessage = (senderFd: number) => {
    const sender = clients.find((c) => c.fd === senderFd);
    if (!sender) return;

    // Step 1: Kernel receives packet
    setEpollState('AWAKE_READ');
    addLog(`[KERNEL] Packet arrived on fd=${senderFd} (${sender.username}). Framing: [len=14][op=0x03]["Wake up Neo"]`);
    
    setClients((prev) =>
      prev.map((c) => (c.fd === senderFd ? { ...c, rxBytesPending: 19, status: 'READ_READY' } : c))
    );

    // Step 2: epoll_wait wakes up and drains
    setTimeout(() => {
      setEpollState('BROADCASTING');
      addLog(`[SERVER] epoll_wait unblocked! read(fd=${senderFd}) consumed 19 bytes. Broadcasting to room #general...`);

      setClients((prev) =>
        prev.map((c) => {
          if (c.fd === senderFd) {
            return { ...c, rxBytesPending: 0, status: 'ESTABLISHED' };
          }
          return { ...c, txBytesPending: 19, status: 'WRITING' };
        })
      );

      // Step 3: Flush TX buffers
      setTimeout(() => {
        setEpollState('WAITING');
        addLog(`[SERVER] write() non-blocking flushes completed for all peers in #general. epoll_wait re-entered.`);
        setClients((prev) =>
          prev.map((c) => ({ ...c, txBytesPending: 0, status: 'ESTABLISHED' }))
        );
      }, 1000);
    }, 800);
  };

  const handleNewClient = () => {
    if (clients.length >= 6) {
      addLog('[WARN] Max connection demo slots reached (6 clients).');
      return;
    }
    const nextFd = Math.max(...clients.map((c) => c.fd)) + 1;
    const names = ['cypher', 'tank', 'dozer', 'switch', 'apoc'];
    const newName = names[nextFd % names.length] + '_' + Math.floor(Math.random() * 100);

    const newClient: ClientConn = {
      fd: nextFd,
      username: newName,
      room: '#general',
      rxBytesPending: 0,
      txBytesPending: 0,
      status: 'ESTABLISHED'
    };

    setClients((prev) => [...prev, newClient]);
    addLog(`[ACCEPT] accept4() yielded non-blocking fd=${nextFd}. Added to epoll set with EPOLLIN | EPOLLET.`);
  };

  const resetServer = () => {
    setClients([
      { fd: 4, username: 'neo_89', room: '#general', rxBytesPending: 0, txBytesPending: 0, status: 'ESTABLISHED' },
      { fd: 5, username: 'trinity', room: '#general', rxBytesPending: 0, txBytesPending: 0, status: 'ESTABLISHED' },
      { fd: 6, username: 'morpheus', room: '#general', rxBytesPending: 0, txBytesPending: 0, status: 'ESTABLISHED' },
    ]);
    setEpollState('WAITING');
    setLogEvents([
      'Server reset. epoll_wait(timeout=-1) re-entered. 3 active sockets registered.'
    ]);
  };

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <h4 className="font-mono text-base font-semibold text-cyan-300">
              Interactive epoll Event Loop &amp; Socket Multiplexer
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Watch how a single thread dispatches thousands of non-blocking sockets without thread-per-client overhead.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetServer}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-dark-800 hover:bg-dark-700 text-slate-300 rounded border border-slate-700/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Epoll Core vs Active Sockets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-5">
        {/* Epoll Loop Engine */}
        <div className="bg-dark-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                epoll_wait() Thread
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  epollState === 'WAITING'
                    ? 'bg-slate-800 text-slate-300'
                    : epollState === 'AWAKE_READ'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}
              >
                {epollState}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded bg-dark-900 border border-slate-800 text-slate-300">
                <span className="text-slate-500">listen_fd:</span> 3 (port :9000)
              </div>
              <div className="p-2 rounded bg-dark-900 border border-slate-800 text-slate-300">
                <span className="text-slate-500">Monitored FDs:</span> {clients.length + 1}
              </div>
              <div className="p-2 rounded bg-dark-900 border border-slate-800 text-slate-300">
                <span className="text-slate-500">Active Threads:</span> 1 (Zero context switches!)
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4">
            <button
              onClick={handleNewClient}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 rounded text-xs font-mono transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Simulate Inbound Client (accept4)
            </button>
          </div>
        </div>

        {/* Client Sockets Matrix */}
        <div className="lg:col-span-2 bg-dark-950 p-4 rounded-lg border border-slate-800">
          <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>Connected Sockets ({clients.length})</span>
            <span className="text-[10px] text-slate-500">Click &apos;Send Message&apos; to trigger EPOLLIN</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {clients.map((c) => (
              <div
                key={c.fd}
                className={`p-3 rounded-lg border font-mono text-xs transition-all ${
                  c.status === 'READ_READY'
                    ? 'bg-amber-950/20 border-amber-500/50 text-amber-200'
                    : c.status === 'WRITING'
                    ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-200'
                    : 'bg-dark-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-100">{c.username}</span>
                    <span className="text-[10px] text-slate-500">fd={c.fd}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {c.room}
                  </span>
                </div>

                <div className="py-2 text-[11px] space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Inbound RX Queue:</span>
                    <span className={c.rxBytesPending > 0 ? 'text-amber-400 font-bold' : ''}>
                      {c.rxBytesPending} bytes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outbound TX Queue:</span>
                    <span className={c.txBytesPending > 0 ? 'text-cyan-400 font-bold' : ''}>
                      {c.txBytesPending} bytes
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleSimulateMessage(c.fd)}
                  disabled={epollState !== 'WAITING'}
                  className="w-full mt-1 flex items-center justify-center gap-1.5 py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50 rounded text-[11px] transition-colors"
                >
                  <Send className="w-3 h-3 text-cyan-400" />
                  Send Framed Msg
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Kernel Trace */}
      <div className="bg-dark-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" /> Non-blocking Syscall Event Trace:
        </div>
        <div className="space-y-1 text-slate-300 text-[11px]">
          {logEvents.map((log, i) => (
            <div key={i} className="leading-snug truncate">
              <span className="text-slate-600 mr-2">&gt;</span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

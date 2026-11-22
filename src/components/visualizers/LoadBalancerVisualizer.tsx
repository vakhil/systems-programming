import React, { useState } from 'react';
import { Server, ArrowRight, Play, AlertTriangle, ShieldCheck, RefreshCw, BarChart3 } from 'lucide-react';

interface BackendNode {
  id: number;
  name: string;
  port: number;
  isHealthy: boolean;
  activeRequests: number;
  totalServed: number;
  latencyMs: number;
}

export const LoadBalancerVisualizer: React.FC = () => {
  const [backends, setBackends] = useState<BackendNode[]>([
    { id: 1, name: 'srv_primary_a', port: 9001, isHealthy: true, activeRequests: 0, totalServed: 12, latencyMs: 14 },
    { id: 2, name: 'srv_primary_b', port: 9002, isHealthy: true, activeRequests: 0, totalServed: 11, latencyMs: 22 },
    { id: 3, name: 'srv_primary_c', port: 9003, isHealthy: true, activeRequests: 0, totalServed: 13, latencyMs: 18 },
  ]);

  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-conn'>('round-robin');
  const [rrIndex, setRrIndex] = useState<number>(0);
  const [lbLogs, setLbLogs] = useState<string[]>([
    'Proxy listening on 0.0.0.0:8080.',
    'Health Check daemon: 3/3 backends HEALTHY (200 OK /healthz).',
    'Ready to route traffic.'
  ]);

  const addLog = (msg: string) => {
    setLbLogs((prev) => [msg, ...prev.slice(0, 4)]);
  };

  const dispatchRequest = () => {
    const healthyNodes = backends.filter((b) => b.isHealthy);
    if (healthyNodes.length === 0) {
      addLog('[HTTP 503] No healthy upstream backends available! Circuit open.');
      return;
    }

    let targetBackend: BackendNode;

    if (algorithm === 'round-robin') {
      const idx = rrIndex % healthyNodes.length;
      targetBackend = healthyNodes[idx];
      setRrIndex((prev) => prev + 1);
      addLog(`[ROUTER] Round-Robin selected ${targetBackend.name} (: ${targetBackend.port}). Forwarding GET /products...`);
    } else {
      // Least Connections
      targetBackend = healthyNodes.reduce((min, b) =>
        b.activeRequests < min.activeRequests ? b : min
      );
      addLog(`[ROUTER] Least-Conn selected ${targetBackend.name} (active: ${targetBackend.activeRequests}). Forwarding GET /products...`);
    }

    // Bump active request count
    setBackends((prev) =>
      prev.map((b) =>
        b.id === targetBackend.id
          ? { ...b, activeRequests: b.activeRequests + 1, totalServed: b.totalServed + 1 }
          : b
      )
    );

    // Complete request after latency simulation
    setTimeout(() => {
      setBackends((prev) =>
        prev.map((b) =>
          b.id === targetBackend.id
            ? { ...b, activeRequests: Math.max(0, b.activeRequests - 1) }
            : b
        )
      );
    }, 700);
  };

  const sendBurst = () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        dispatchRequest();
      }, i * 150);
    }
  };

  const toggleBackendHealth = (id: number) => {
    setBackends((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextHealth = !b.isHealthy;
          addLog(
            nextHealth
              ? `[HEALTH] Probe recovered: ${b.name} (: ${b.port}) restored to active rotation!`
              : `[CIRCUIT BREAKER] Probe failed: ${b.name} (: ${b.port}) marked DOWN! Traffic diverted.`
          );
          return { ...b, isHealthy: nextHealth, activeRequests: nextHealth ? b.activeRequests : 0 };
        }
        return b;
      })
    );
  };

  const resetAll = () => {
    setBackends([
      { id: 1, name: 'srv_primary_a', port: 9001, isHealthy: true, activeRequests: 0, totalServed: 0, latencyMs: 14 },
      { id: 2, name: 'srv_primary_b', port: 9002, isHealthy: true, activeRequests: 0, totalServed: 0, latencyMs: 22 },
      { id: 3, name: 'srv_primary_c', port: 9003, isHealthy: true, activeRequests: 0, totalServed: 0, latencyMs: 18 },
    ]);
    setRrIndex(0);
    setLbLogs(['State reset. All 3 backends healthy on ports 9001, 9002, 9003.']);
  };

  const totalRequests = backends.reduce((acc, b) => acc + b.totalServed, 0);

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-amber-400" />
            <h4 className="font-mono text-base font-semibold text-amber-300">
              Interactive L7 Reverse Proxy &amp; Load Balancer
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test routing algorithms, simulate backend node failures, and observe automatic circuit breaking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetAll}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-dark-800 hover:bg-dark-700 text-slate-300 rounded border border-slate-700/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Traffic Routing Pipeline */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Inbound Client */}
        <div className="bg-dark-950 p-4 rounded-lg border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 uppercase tracking-wider text-[10px] mb-2">Inbound Client Traffic</div>
          <div className="space-y-3">
            <div className="p-2.5 rounded bg-dark-900 border border-slate-800 text-slate-200">
              <div className="text-amber-400 font-bold">PORT :8080</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Total HTTP Requests: {totalRequests}</div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={dispatchRequest}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded text-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5" /> Dispatch 1 Request
              </button>
              <button
                onClick={sendBurst}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" /> Dispatch Burst (6 Requests)
              </button>
            </div>
          </div>
        </div>

        {/* Algorithm Control / Proxy Node */}
        <div className="bg-dark-950 p-4 rounded-lg border border-amber-500/30 text-xs font-mono flex flex-col justify-between h-full">
          <div>
            <div className="text-amber-400 uppercase tracking-wider text-[10px] mb-2 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Load Balancer Engine
            </div>
            <div className="space-y-2 mt-3">
              <label className="text-[11px] text-slate-400 block">Routing Strategy:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAlgorithm('round-robin')}
                  className={`py-1 px-2 rounded text-[11px] border transition-colors ${
                    algorithm === 'round-robin'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-dark-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Round Robin
                </button>
                <button
                  onClick={() => setAlgorithm('least-conn')}
                  className={`py-1 px-2 rounded text-[11px] border transition-colors ${
                    algorithm === 'least-conn'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-dark-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Least Conn
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800/80 mt-3 flex items-center gap-1">
            <span>Health Loop:</span>
            <span className="text-emerald-400">Active (2000ms probe)</span>
          </div>
        </div>

        {/* Upstream Pool */}
        <div className="space-y-2 font-mono text-xs">
          {backends.map((node) => (
            <div
              key={node.id}
              className={`p-3 rounded-lg border transition-all ${
                node.isHealthy
                  ? 'bg-dark-950 border-slate-800 text-slate-200'
                  : 'bg-rose-950/20 border-rose-500/40 text-rose-300 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{node.name}</span>
                  <span className="text-slate-500 text-[10px]">:{node.port}</span>
                </div>
                <button
                  onClick={() => toggleBackendHealth(node.id)}
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border transition-colors ${
                    node.isHealthy
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/30'
                  }`}
                  title="Click to toggle health status"
                >
                  {node.isHealthy ? 'HEALTHY' : 'DEAD'}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Active: <span className="text-amber-400 font-bold">{node.activeRequests}</span></span>
                <span>Served: <span className="text-slate-200">{node.totalServed}</span></span>
                <span>{node.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syscall / Router Trace */}
      <div className="bg-dark-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <ArrowRight className="w-3 h-3 text-amber-400" /> Proxy Inspection Log:
        </div>
        <div className="space-y-1 text-slate-300 text-[11px]">
          {lbLogs.map((log, i) => (
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

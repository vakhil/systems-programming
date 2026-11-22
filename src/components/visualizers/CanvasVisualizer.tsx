import React, { useState } from 'react';
import { Palette, MousePointer2, RefreshCw, Zap, Users, ArrowRight } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  color: string;
  author: string;
}

export const CanvasVisualizer: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    { x: 50, y: 40, color: '#06b6d4', author: 'Alice' },
    { x: 80, y: 70, color: '#06b6d4', author: 'Alice' },
    { x: 140, y: 90, color: '#f59e0b', author: 'Bob' },
    { x: 180, y: 120, color: '#f59e0b', author: 'Bob' },
  ]);

  const [wsFrame, setWsFrame] = useState<{
    opcode: string;
    maskKey: string;
    payloadLen: number;
    rawPayload: string;
  }>({
    opcode: '0x02 (Binary Frame)',
    maskKey: '0x3A 0xF8 0x11 0xBC',
    payloadLen: 12,
    rawPayload: '[x: 180, y: 120, color: 0xF59E0B]'
  });

  const [logText, setLogText] = useState('WebSocket handshake established (101 Switching Protocols). Ping/Pong keep-alive active.');

  const handleAliceDraw = () => {
    const rx = Math.floor(Math.random() * 240) + 20;
    const ry = Math.floor(Math.random() * 120) + 20;
    const newPt: Point = { x: rx, y: ry, color: '#06b6d4', author: 'Alice' };

    setPoints((prev) => [...prev, newPt]);
    setWsFrame({
      opcode: '0x02 (Binary Frame)',
      maskKey: '0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase(),
      payloadLen: 12,
      rawPayload: `[x: ${rx}, y: ${ry}, color: 0x06B6D4]`
    });
    setLogText(`Alice emitted WS binary frame -> Server unmasked and broadcasted to Bob in 0.4ms.`);
  };

  const handleBobDraw = () => {
    const rx = Math.floor(Math.random() * 240) + 20;
    const ry = Math.floor(Math.random() * 120) + 20;
    const newPt: Point = { x: rx, y: ry, color: '#f59e0b', author: 'Bob' };

    setPoints((prev) => [...prev, newPt]);
    setWsFrame({
      opcode: '0x02 (Binary Frame)',
      maskKey: '0x' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase(),
      payloadLen: 12,
      rawPayload: `[x: ${rx}, y: ${ry}, color: 0xF59E0B]`
    });
    setLogText(`Bob emitted WS binary frame -> Server broadcasted to Alice without intermediate allocations.`);
  };

  const handleReset = () => {
    setPoints([
      { x: 50, y: 40, color: '#06b6d4', author: 'Alice' },
      { x: 80, y: 70, color: '#06b6d4', author: 'Alice' },
    ]);
    setLogText('Canvas canvas reset.');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-teal-950/40 border border-teal-500/30 rounded-2xl p-5 my-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-teal-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              RFC 6455 WebSocket Frame &amp; Multi-Cursor Sync
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-normal">
                ws:// localhost:8080
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Inspect client masking, unmasking algorithms, and sub-millisecond cursor state replication.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAliceDraw}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all"
          >
            <MousePointer2 className="w-3.5 h-3.5" /> Alice Draw
          </button>
          <button
            onClick={handleBobDraw}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-all"
          >
            <MousePointer2 className="w-3.5 h-3.5" /> Bob Draw
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset canvas"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas vs WS Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {/* Collaborative Canvas Stage */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Shared Canvas State ({points.length} strokes)</span>
            <span className="flex items-center gap-2 text-[10px]">
              <span className="text-cyan-400">&bull; Alice</span>
              <span className="text-amber-400">&bull; Bob</span>
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full h-44 bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden">
            <svg className="w-full h-full">
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill={p.color}
                  className="transition-all duration-300"
                />
              ))}
              {points.length > 1 && (
                <polyline
                  points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4"
                  opacity="0.4"
                />
              )}
            </svg>
          </div>
        </div>

        {/* WebSocket Frame Breakdown */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-teal-400" /> RFC 6455 Wire Frame Layout:
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Opcode:</span>
              <span className="text-teal-300 font-bold">{wsFrame.opcode}</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Mask Key (Client-to-Server):</span>
              <span className="text-cyan-300 font-bold">{wsFrame.maskKey}</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Payload Length:</span>
              <span className="text-amber-300 font-bold">{wsFrame.payloadLen} bytes</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-500 mb-0.5">Unmasked Payload Data:</div>
              <div className="text-emerald-300 font-bold truncate">{wsFrame.rawPayload}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
        <span className="text-teal-300 truncate">{logText}</span>
      </div>
    </div>
  );
};

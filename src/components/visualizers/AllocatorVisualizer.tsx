import React, { useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, Cpu, CheckCircle2 } from 'lucide-react';

interface Block {
  id: number;
  addr: string;
  size: number;
  isFree: boolean;
  label?: string;
  nextFreeAddr?: string;
}

export const AllocatorVisualizer: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, addr: '0x1000', size: 64, isFree: false, label: 'buffer_a' },
    { id: 2, addr: '0x1048', size: 32, isFree: true, nextFreeAddr: '0x10e8' },
    { id: 3, addr: '0x1070', size: 96, isFree: false, label: 'struct_user' },
    { id: 4, addr: '0x10e8', size: 64, isFree: true, nextFreeAddr: 'NULL' },
  ]);

  const [lastAction, setLastAction] = useState<string>('Initial heap state with 2 allocated chunks and 2 free list chunks.');
  const [nextId, setNextId] = useState<number>(5);

  const handleMalloc = (reqSize: number) => {
    // Look for first fit
    const freeIdx = blocks.findIndex((b) => b.isFree && b.size >= reqSize);
    if (freeIdx !== -1) {
      const target = blocks[freeIdx];
      const remainingSize = target.size - reqSize;

      let newBlocks = [...blocks];
      if (remainingSize >= 16) {
        // Split block
        const allocatedBlock: Block = {
          id: nextId,
          addr: target.addr,
          size: reqSize,
          isFree: false,
          label: `req_${nextId}`
        };
        const splitAddr = '0x' + (parseInt(target.addr, 16) + reqSize + 8).toString(16);
        const freeRemainder: Block = {
          id: nextId + 1,
          addr: splitAddr,
          size: remainingSize - 8,
          isFree: true,
          nextFreeAddr: target.nextFreeAddr
        };
        newBlocks.splice(freeIdx, 1, allocatedBlock, freeRemainder);
        setNextId(nextId + 2);
        setLastAction(`First-Fit found free block at ${target.addr}. Splitting ${target.size}B into ${reqSize}B payload + remainder!`);
      } else {
        // Exact fit
        newBlocks[freeIdx] = { ...target, isFree: false, label: `req_${nextId}` };
        setNextId(nextId + 1);
        setLastAction(`First-Fit exact match at ${target.addr} (${reqSize}B). Marked as allocated.`);
      }
      setBlocks(newBlocks);
    } else {
      // Extend heap via sbrk
      const lastBlock = blocks[blocks.length - 1];
      const nextAddr = lastBlock ? '0x' + (parseInt(lastBlock.addr, 16) + lastBlock.size + 8).toString(16) : '0x1000';
      const newBlock: Block = {
        id: nextId,
        addr: nextAddr,
        size: reqSize,
        isFree: false,
        label: `sbrk_${nextId}`
      };
      setBlocks([...blocks, newBlock]);
      setNextId(nextId + 1);
      setLastAction(`No suitable free block found! Called sbrk(${reqSize + 16}) to grow heap program break.`);
    }
  };

  const handleFree = (blockId: number) => {
    const idx = blocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;

    let newBlocks = [...blocks];
    newBlocks[idx] = { ...newBlocks[idx], isFree: true, label: undefined };

    // Coalescing check (left and right neighbors)
    let actionLog = `Freed block ${newBlocks[idx].addr}. `;
    let coalesced = false;

    // Check right neighbor
    if (idx + 1 < newBlocks.length && newBlocks[idx + 1].isFree) {
      const mergedSize = newBlocks[idx].size + newBlocks[idx + 1].size + 8;
      newBlocks[idx] = { ...newBlocks[idx], size: mergedSize };
      newBlocks.splice(idx + 1, 1);
      actionLog += `Merged with right free neighbor (+${mergedSize}B). `;
      coalesced = true;
    }

    // Check left neighbor
    if (idx > 0 && newBlocks[idx - 1].isFree) {
      const mergedSize = newBlocks[idx - 1].size + newBlocks[idx].size + 8;
      newBlocks[idx - 1] = { ...newBlocks[idx - 1], size: mergedSize };
      newBlocks.splice(idx, 1);
      actionLog += `Merged with left free neighbor via boundary tags. `;
      coalesced = true;
    }

    if (!coalesced) {
      actionLog += 'Added to explicit free list.';
    }

    setBlocks(newBlocks);
    setLastAction(actionLog);
  };

  const resetHeap = () => {
    setBlocks([
      { id: 1, addr: '0x1000', size: 64, isFree: false, label: 'buffer_a' },
      { id: 2, addr: '0x1048', size: 32, isFree: true, nextFreeAddr: '0x10e8' },
      { id: 3, addr: '0x1070', size: 96, isFree: false, label: 'struct_user' },
      { id: 4, addr: '0x10e8', size: 64, isFree: true, nextFreeAddr: 'NULL' },
    ]);
    setLastAction('Heap reset to default state.');
  };

  const totalHeapBytes = blocks.reduce((acc, b) => acc + b.size + 16, 0);
  const totalFreeBytes = blocks.filter((b) => b.isFree).reduce((acc, b) => acc + b.size, 0);

  return (
    <div className="bg-dark-900 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h4 className="font-mono text-base font-semibold text-emerald-300">
              Interactive Heap Memory Allocator Simulator
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize headers, payloads, First-Fit block search, splitting, and O(1) coalescing in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetHeap}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-dark-800 hover:bg-dark-700 text-slate-300 rounded border border-slate-700/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Heap
          </button>
        </div>
      </div>

      {/* Heap Memory Strip */}
      <div className="my-5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Virtual Address Space &lt;Heap Segment&gt;</span>
          <span>
            Total: <span className="text-slate-200">{totalHeapBytes}B</span> | Free:{' '}
            <span className="text-emerald-400">{totalFreeBytes}B</span> ({blocks.filter((b) => b.isFree).length} chunks)
          </span>
        </div>

        <div className="w-full bg-dark-950 p-2.5 rounded-lg border border-slate-800 overflow-x-auto">
          <div className="flex items-stretch gap-2 min-w-[600px] h-28">
            {blocks.map((block) => (
              <div
                key={block.id}
                style={{ flexGrow: Math.max(1, Math.round(block.size / 16)) }}
                className={`relative rounded-md p-2 flex flex-col justify-between border transition-all duration-300 ${
                  block.isFree
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                    : 'bg-indigo-950/30 border-indigo-500/50 text-indigo-200 hover:border-indigo-400'
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/10 pb-1">
                  <span className="text-slate-400">{block.addr}</span>
                  <span
                    className={`px-1 py-0.2 rounded text-[9px] uppercase font-bold ${
                      block.isFree ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {block.isFree ? 'FREE' : 'ALLOC'}
                  </span>
                </div>

                {/* Body / Payload */}
                <div className="my-auto text-center font-mono">
                  <div className="text-xs font-bold text-slate-100">
                    {block.isFree ? `${block.size}B Hole` : block.label || 'Payload'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Header: 16B | Data: {block.size}B
                  </div>
                </div>

                {/* Footer or Action */}
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-mono">
                  {block.isFree ? (
                    <span className="text-[9px] text-emerald-400/80 truncate">
                      next: {block.nextFreeAddr || 'NULL'}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleFree(block.id)}
                      className="w-full py-0.5 px-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded text-[10px] flex items-center justify-center gap-1 transition-colors"
                      title="Free this memory block"
                    >
                      <Trash2 className="w-2.5 h-2.5" /> free()
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <div className="text-xs font-mono text-slate-300 mb-2">Trigger Allocator Syscall:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleMalloc(32)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> malloc(32)
            </button>
            <button
              onClick={() => handleMalloc(64)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> malloc(64)
            </button>
            <button
              onClick={() => handleMalloc(128)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 rounded transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> malloc(128)
            </button>
          </div>
        </div>

        {/* Syscall & State Feed */}
        <div className="bg-dark-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Allocator Kernel Log:
          </div>
          <div className="text-slate-200 text-xs leading-relaxed">{lastAction}</div>
        </div>
      </div>
    </div>
  );
};

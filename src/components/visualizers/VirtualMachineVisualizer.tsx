import React, { useState } from 'react';
import { Cpu, Play, SkipForward, RotateCcw, ArrowRight, Layers } from 'lucide-react';

interface Instruction {
  addr: number;
  opcode: string;
  args: string;
  comment: string;
}

export const VirtualMachineVisualizer: React.FC = () => {
  const instructions: Instruction[] = [
    { addr: 0, opcode: 'LOAD_CONST', args: '15, R1', comment: 'Load integer 15 into Register 1' },
    { addr: 1, opcode: 'LOAD_CONST', args: '25, R2', comment: 'Load integer 25 into Register 2' },
    { addr: 2, opcode: 'ADD', args: 'R1, R2, R3', comment: 'R3 = R1 + R2 (40)' },
    { addr: 3, opcode: 'PUSH', args: 'R3', comment: 'Push R3 (40) onto evaluation stack' },
    { addr: 4, opcode: 'PRINT', args: 'STACK_TOP', comment: 'Syscall print stdout' },
    { addr: 5, opcode: 'HALT', args: '', comment: 'Terminate virtual CPU' },
  ];

  const [pc, setPc] = useState<number>(0);
  const [registers, setRegisters] = useState<{ R1: number; R2: number; R3: number; FLAGS: string }>({
    R1: 0,
    R2: 0,
    R3: 0,
    FLAGS: '0x00 (CLEAN)'
  });
  const [stack, setStack] = useState<number[]>([]);
  const [stdout, setStdout] = useState<string[]>(['[VM Boot] Initialized registers R1..R3, stack pointer SP=0x1000.']);

  const handleStep = () => {
    if (pc >= instructions.length) return;

    const currentInst = instructions[pc];
    const newRegs = { ...registers };
    const newStack = [...stack];
    const newLogs = [...stdout];

    switch (currentInst.opcode) {
      case 'LOAD_CONST':
        if (currentInst.args.includes('R1')) newRegs.R1 = 15;
        if (currentInst.args.includes('R2')) newRegs.R2 = 25;
        newLogs.push(`Executed ${currentInst.opcode} ${currentInst.args}.`);
        break;
      case 'ADD':
        newRegs.R3 = newRegs.R1 + newRegs.R2;
        newLogs.push(`Executed ADD: R3 set to ${newRegs.R3}.`);
        break;
      case 'PUSH':
        newStack.push(newRegs.R3);
        newLogs.push(`Pushed ${newRegs.R3} onto stack.`);
        break;
      case 'PRINT':
        const val = newStack[newStack.length - 1];
        newLogs.push(`[STDOUT] Output: ${val}`);
        break;
      case 'HALT':
        newLogs.push('VM Halted. Execution cycles: 6.');
        break;
    }

    setRegisters(newRegs);
    setStack(newStack);
    setStdout(newLogs);
    setPc((prev) => Math.min(prev + 1, instructions.length));
  };

  const handleReset = () => {
    setPc(0);
    setRegisters({ R1: 0, R2: 0, R3: 0, FLAGS: '0x00 (CLEAN)' });
    setStack([]);
    setStdout(['[VM Reset] Initialized registers R1..R3. Ready at address 0x00.']);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-500/30 rounded-2xl p-5 my-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              Virtual CPU &amp; Bytecode Stepper
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-normal">
                Interpreter Core
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Watch registers, stack pointer, and the Program Counter (PC) evolve cycle by cycle.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStep}
            disabled={pc >= instructions.length}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-mono font-bold shadow-md hover:brightness-110 disabled:opacity-40 transition-all"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Step Cycle (F10)
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset CPU"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid: Instructions vs Registers & Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {/* Instruction Memory */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Instruction Memory (ROM)</span>
            <span className="text-purple-400 font-bold">PC: 0x0{pc}</span>
          </div>

          <div className="space-y-1.5">
            {instructions.map((inst) => (
              <div
                key={inst.addr}
                className={`p-2 rounded-lg border text-xs transition-all ${
                  pc === inst.addr
                    ? 'bg-purple-950/40 border-purple-500 text-purple-200 font-bold shadow-sm'
                    : pc > inst.addr
                    ? 'bg-slate-900/50 border-slate-800/80 text-slate-500'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center text-[11px]">
                  <span>
                    <span className="text-slate-500 mr-2">0x0{inst.addr}</span>
                    <span className={pc === inst.addr ? 'text-purple-300' : 'text-slate-200'}>
                      {inst.opcode} {inst.args}
                    </span>
                  </span>
                  {pc === inst.addr && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{inst.comment}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Registers & Stack */}
        <div className="space-y-3 font-mono text-xs">
          {/* Registers */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
              CPU Register File (32-Bit)
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">R1</div>
                <div className="text-sm font-bold text-cyan-300">{registers.R1}</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">R2</div>
                <div className="text-sm font-bold text-cyan-300">{registers.R2}</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500">R3 (Acc)</div>
                <div className="text-sm font-bold text-purple-300">{registers.R3}</div>
              </div>
            </div>
          </div>

          {/* Operand Stack */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-purple-400" /> Operand Stack (LIFO)
              </span>
              <span className="text-slate-500">{stack.length} items</span>
            </div>
            <div className="min-h-16 flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 overflow-x-auto">
              {stack.length === 0 ? (
                <span className="text-[11px] text-slate-600 italic">[Empty Stack]</span>
              ) : (
                stack.map((val, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-200 font-bold text-xs"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stdout Console */}
      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
        <span className="text-purple-300 truncate">{stdout[stdout.length - 1]}</span>
      </div>
    </div>
  );
};

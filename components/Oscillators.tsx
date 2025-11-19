import React from 'react';
import { BrainwaveState } from '../types';
import { MIN_BASE_FREQ, MAX_BASE_FREQ, MIN_BEAT_FREQ, MAX_BEAT_FREQ } from '../constants';

interface OscillatorsProps {
  baseFreq: number;
  beatFreq: number;
  targetLabel: string;
  isPlaying: boolean;
  onBaseChange: (val: number) => void;
  onBeatChange: (val: number) => void;
  onTogglePlay: () => void;
}

export const Oscillators: React.FC<OscillatorsProps> = ({
  baseFreq,
  beatFreq,
  targetLabel,
  isPlaying,
  onBaseChange,
  onBeatChange,
  onTogglePlay
}) => {
  // Helper to get range color based on beat freq (Brainwave state)
  const getBeatColor = (freq: number) => {
      if (freq < 4) return 'text-indigo-400'; // Delta
      if (freq < 8) return 'text-blue-400'; // Theta
      if (freq < 13) return 'text-teal-400'; // Alpha
      if (freq < 30) return 'text-yellow-400'; // Beta
      return 'text-purple-400'; // Gamma
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 mb-6 relative overflow-hidden group">
       {/* Status Bar */}
       <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-white">Oscillators</h2>
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${isPlaying ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-gray-500 border-gray-700 bg-gray-800'}`}>
                    {isPlaying ? 'Active' : 'Standby'}
                </span>
           </div>
           <div className="text-right">
               <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Target State</span>
               <span className={`text-sm font-mono font-medium ${getBeatColor(beatFreq)}`}>
                   {targetLabel}
               </span>
           </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           {/* Base Frequency Control */}
            <div className="bg-black/40 p-4 rounded-xl border border-zinc-800/50">
                <div className="flex justify-between mb-4">
                    <label className="text-xs text-gray-400 font-medium tracking-wider uppercase">Base Frequency</label>
                    <span className="text-blue-400 font-mono font-bold">{baseFreq} Hz</span>
                </div>
                <input
                    type="range"
                    min={MIN_BASE_FREQ}
                    max={MAX_BASE_FREQ}
                    step={1}
                    value={baseFreq}
                    onChange={(e) => onBaseChange(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                />
                <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
                    <span>{MIN_BASE_FREQ}Hz</span>
                    <span>{MAX_BASE_FREQ}Hz</span>
                </div>
            </div>

            {/* Binaural Beat Control */}
            <div className="bg-black/40 p-4 rounded-xl border border-zinc-800/50">
                <div className="flex justify-between mb-4">
                    <label className="text-xs text-gray-400 font-medium tracking-wider uppercase">Binaural Beat</label>
                    <span className={`${getBeatColor(beatFreq)} font-mono font-bold`}>{beatFreq} Hz</span>
                </div>
                <input
                    type="range"
                    min={MIN_BEAT_FREQ}
                    max={MAX_BEAT_FREQ}
                    step={0.5}
                    value={beatFreq}
                    onChange={(e) => onBeatChange(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                />
                 <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
                    <span>{MIN_BEAT_FREQ}Hz</span>
                    <span>{MAX_BEAT_FREQ}Hz</span>
                </div>
            </div>
       </div>

       {/* Main Action Button */}
       <button
        onClick={onTogglePlay}
        className={`w-full py-4 rounded-xl font-bold tracking-wide uppercase text-sm transition-all duration-300 flex items-center justify-center gap-3
            ${isPlaying 
                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]'
            }`}
       >
        {isPlaying ? (
            <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                Stop Session
            </>
        ) : (
            <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                Start Session
            </>
        )}
       </button>
    </div>
  );
};
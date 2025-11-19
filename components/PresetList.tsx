import React from 'react';
import { PRESETS } from '../constants';
import { Preset } from '../types';

interface PresetListProps {
  currentPresetId: string | null;
  onSelect: (preset: Preset) => void;
}

export const PresetList: React.FC<PresetListProps> = ({ currentPresetId, onSelect }) => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 h-full">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Quick Presets</h3>
      <div className="space-y-3">
        {PRESETS.map((preset) => {
            const isActive = currentPresetId === preset.id;
            return (
                <button
                    key={preset.id}
                    onClick={() => onSelect(preset)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden
                        ${isActive 
                            ? 'bg-blue-900/20 border-blue-500/50 shadow-lg shadow-blue-900/20' 
                            : 'bg-black/20 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
                        }`}
                >
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                    <div className="flex justify-between items-start mb-1">
                        <span className={`font-semibold ${isActive ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
                            {preset.name}
                        </span>
                        <span className="text-xs font-mono bg-zinc-900 text-zinc-500 px-2 py-1 rounded border border-zinc-800">
                            {preset.beatFreq} Hz
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        {preset.description}
                    </p>
                </button>
            );
        })}
      </div>
    </div>
  );
};
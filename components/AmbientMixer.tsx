import React from 'react';
import { NoiseColor } from '../types';

interface AmbientMixerProps {
  masterVol: number;
  noiseVol: number;
  noiseColor: NoiseColor;
  onMasterVolChange: (val: number) => void;
  onNoiseVolChange: (val: number) => void;
  onNoiseColorChange: (val: NoiseColor) => void;
}

export const AmbientMixer: React.FC<AmbientMixerProps> = ({
  masterVol,
  noiseVol,
  noiseColor,
  onMasterVolChange,
  onNoiseVolChange,
  onNoiseColorChange
}) => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Ambient Mixer</h3>
      
      {/* Master Volume */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-300">Master Volume</label>
            <span className="text-xs text-gray-500 font-mono">{(masterVol * 100).toFixed(0)}%</span>
        </div>
        <div className="relative h-10 bg-black/40 rounded-lg border border-zinc-800 flex items-center px-4">
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={masterVol}
                onChange={(e) => onMasterVolChange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer accent-white hover:accent-gray-200"
            />
        </div>
      </div>

      {/* Noise Controls */}
      <div>
        <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-300">Background Noise</label>
            <span className="text-xs text-gray-500 font-mono">{(noiseVol * 100).toFixed(0)}%</span>
        </div>
        
        <div className="flex gap-4 items-center">
            {/* Toggle Buttons */}
            <div className="flex bg-black/40 rounded-lg p-1 border border-zinc-800">
                {[NoiseColor.Off, NoiseColor.White, NoiseColor.Pink, NoiseColor.Brown].map((color) => {
                    const isActive = noiseColor === color;
                    return (
                        <button
                            key={color}
                            onClick={() => onNoiseColorChange(color)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all
                                ${isActive 
                                    ? 'bg-zinc-700 text-white shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {color}
                        </button>
                    );
                })}
            </div>
            
            {/* Noise Volume Slider */}
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={noiseVol}
                onChange={(e) => onNoiseVolChange(Number(e.target.value))}
                disabled={noiseColor === NoiseColor.Off}
                className={`flex-1 h-1 rounded appearance-none cursor-pointer
                    ${noiseColor === NoiseColor.Off ? 'bg-zinc-800 accent-zinc-600 cursor-not-allowed' : 'bg-zinc-700 accent-gray-400'}
                `}
            />
        </div>
      </div>
    </div>
  );
};
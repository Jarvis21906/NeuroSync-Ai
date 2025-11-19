import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Visualizer } from './components/Visualizer';
import { NeuroCoach } from './components/NeuroCoach';
import { Oscillators } from './components/Oscillators';
import { AmbientMixer } from './components/AmbientMixer';
import { PresetList } from './components/PresetList';
import { useAudioEngine } from './hooks/useAudioEngine';
import { DEFAULT_SETTINGS } from './constants';
import { BrainwaveState, NoiseColor, Preset, SessionSettings } from './types';

const App: React.FC = () => {
  const {
    analyser,
    isPlaying,
    togglePlay,
    updateOscillators,
    setMasterVolume,
    setNoiseVolume,
    setNoiseType
  } = useAudioEngine();

  // State
  const [baseFreq, setBaseFreq] = useState(DEFAULT_SETTINGS.baseFreq);
  const [beatFreq, setBeatFreq] = useState(DEFAULT_SETTINGS.beatFreq);
  const [targetLabel, setTargetLabel] = useState<string>(DEFAULT_SETTINGS.targetState);
  const [activePresetId, setActivePresetId] = useState<string | null>(DEFAULT_SETTINGS.id);
  
  const [masterVol, setMasterVolState] = useState(0.5);
  const [noiseVol, setNoiseVolState] = useState(0.1);
  const [noiseColor, setNoiseColorState] = useState<NoiseColor>(NoiseColor.Off);

  // AI Recommendation Box
  const [recommendation, setRecommendation] = useState<string | null>(null);

  // Handlers
  const handlePresetSelect = (preset: Preset) => {
    setBaseFreq(preset.baseFreq);
    setBeatFreq(preset.beatFreq);
    setTargetLabel(preset.targetState);
    setActivePresetId(preset.id);
    setRecommendation(null); // Clear AI recommendation on manual preset
    
    if (isPlaying) {
        updateOscillators(preset.baseFreq, preset.beatFreq);
    }
  };

  const handleBaseChange = (val: number) => {
    setBaseFreq(val);
    setActivePresetId(null);
    if (isPlaying) updateOscillators(val, beatFreq);
  };

  const handleBeatChange = (val: number) => {
    setBeatFreq(val);
    setActivePresetId(null);
    
    // Basic label inference if manual
    let label = '';
    if (val < 4) label = BrainwaveState.Delta;
    else if (val < 8) label = BrainwaveState.Theta;
    else if (val < 13) label = BrainwaveState.Alpha;
    else if (val < 30) label = BrainwaveState.Beta;
    else label = BrainwaveState.Gamma;
    
    setTargetLabel(label);

    if (isPlaying) updateOscillators(baseFreq, val);
  };

  const handleTogglePlay = () => {
    togglePlay(baseFreq, beatFreq, noiseColor);
  };

  const handleMasterVolChange = (val: number) => {
    setMasterVolState(val);
    setMasterVolume(val);
  };

  const handleNoiseVolChange = (val: number) => {
    setNoiseVolState(val);
    setNoiseVolume(val);
  };

  const handleNoiseColorChange = (val: NoiseColor) => {
    setNoiseColorState(val);
    setNoiseType(val);
    // If selecting a noise color from Off, ensure volume is audible if it was 0
    if (val !== NoiseColor.Off && noiseColor === NoiseColor.Off && noiseVol === 0) {
        setNoiseVolState(0.2);
        setNoiseVolume(0.2);
    }
  };

  const handleApplyAISettings = (settings: SessionSettings) => {
    setBaseFreq(settings.baseFrequency);
    setBeatFreq(settings.beatFrequency);
    setTargetLabel(settings.targetState);
    setRecommendation(settings.description || null);
    setActivePresetId(null);
    
    if (isPlaying) {
        updateOscillators(settings.baseFrequency, settings.beatFrequency);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-gray-200 font-sans selection:bg-purple-500 selection:text-white pb-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visualizer, Controls, Mixer */}
          <div className="lg:col-span-7 space-y-6">
            <Visualizer analyser={analyser} isPlaying={isPlaying} />
            
            <Oscillators 
                baseFreq={baseFreq}
                beatFreq={beatFreq}
                targetLabel={targetLabel}
                isPlaying={isPlaying}
                onBaseChange={handleBaseChange}
                onBeatChange={handleBeatChange}
                onTogglePlay={handleTogglePlay}
            />

            <AmbientMixer 
                masterVol={masterVol}
                noiseVol={noiseVol}
                noiseColor={noiseColor}
                onMasterVolChange={handleMasterVolChange}
                onNoiseVolChange={handleNoiseVolChange}
                onNoiseColorChange={handleNoiseColorChange}
            />
          </div>

          {/* Right Column: AI, Info, Presets */}
          <div className="lg:col-span-5 space-y-6">
             <NeuroCoach onApplySettings={handleApplyAISettings} />
             
             {recommendation && (
                 <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-purple-500/30 p-4 rounded-xl animate-in fade-in slide-in-from-top-4 duration-500">
                     <h4 className="text-purple-300 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                        AI Recommendation
                     </h4>
                     <p className="text-sm text-gray-300 leading-relaxed italic">"{recommendation}"</p>
                 </div>
             )}

             <PresetList 
                currentPresetId={activePresetId}
                onSelect={handlePresetSelect}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
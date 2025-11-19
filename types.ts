export enum BrainwaveState {
  Delta = 'Delta (0.5-4Hz)',
  Theta = 'Theta (4-8Hz)',
  Alpha = 'Alpha (8-13Hz)',
  Beta = 'Beta (13-30Hz)',
  Gamma = 'Gamma (30Hz+)',
}

export enum NoiseColor {
  Off = 'Off',
  White = 'White',
  Pink = 'Pink',
  Brown = 'Brown',
}

export interface SessionSettings {
  baseFrequency: number; // Hz
  beatFrequency: number; // Hz
  targetState: string; // Label
  description?: string;
}

export interface AudioEngineState {
  isPlaying: boolean;
  volume: number;
  noiseVolume: number;
  noiseColor: NoiseColor;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  baseFreq: number;
  beatFreq: number;
  targetState: BrainwaveState;
}
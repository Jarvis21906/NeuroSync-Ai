import { BrainwaveState, Preset } from './types';

export const MIN_BASE_FREQ = 60;
export const MAX_BASE_FREQ = 900;
export const MIN_BEAT_FREQ = 0.5;
export const MAX_BEAT_FREQ = 50;

export const PRESETS: Preset[] = [
  {
    id: 'deep-sleep',
    name: 'Deep Sleep',
    description: 'Dreamless sleep, restoration, healing.',
    baseFreq: 100,
    beatFreq: 2,
    targetState: BrainwaveState.Delta,
  },
  {
    id: 'deep-meditation',
    name: 'Deep Meditation',
    description: 'Creativity, dreaming, reduced anxiety.',
    baseFreq: 150,
    beatFreq: 6,
    targetState: BrainwaveState.Theta,
  },
  {
    id: 'relaxed-focus',
    name: 'Relaxed Focus',
    description: 'Positive thinking, fast learning, flow state.',
    baseFreq: 200,
    beatFreq: 10,
    targetState: BrainwaveState.Alpha,
  },
  {
    id: 'active-concentration',
    name: 'Active Concentration',
    description: 'Problem solving, memory, alertness.',
    baseFreq: 300,
    beatFreq: 20,
    targetState: BrainwaveState.Beta,
  },
  {
    id: 'peak-performance',
    name: 'Peak Performance',
    description: 'Cognitive enhancement, memory recall.',
    baseFreq: 400,
    beatFreq: 40,
    targetState: BrainwaveState.Gamma,
  },
];

export const DEFAULT_SETTINGS = PRESETS[2]; // Relaxed Focus
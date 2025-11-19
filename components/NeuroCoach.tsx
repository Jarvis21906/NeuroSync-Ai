import React, { useState } from 'react';
import { generateSessionParams } from '../services/geminiService';
import { SessionSettings } from '../types';

interface NeuroCoachProps {
  onApplySettings: (settings: SessionSettings) => void;
}

export const NeuroCoach: React.FC<NeuroCoachProps> = ({ onApplySettings }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateSessionParams(prompt);
      onApplySettings({
        baseFrequency: result.baseFrequency,
        beatFrequency: result.beatFrequency,
        targetState: result.targetStateLabel,
        description: result.explanation
      });
    } catch (e) {
        console.error(e);
      setError("Could not generate session. Check API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4 text-purple-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        <h2 className="font-semibold text-lg">AI Neuro-Coach</h2>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'I need to focus on coding complex algorithms...'"
          className="flex-1 bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2
            ${isLoading || !prompt.trim() 
                ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25'}`}
        >
          {isLoading ? (
              <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Generating...
              </span>
          ) : 'Generate'}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
};
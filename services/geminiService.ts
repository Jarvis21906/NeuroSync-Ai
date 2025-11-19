import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BrainwaveState } from "../types";

// Define the response schema for the AI Neuro-Coach
const sessionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    baseFrequency: {
      type: Type.NUMBER,
      description: "Base carrier frequency in Hz (60-900)",
    },
    beatFrequency: {
      type: Type.NUMBER,
      description: "Binaural beat frequency difference in Hz (0.5-50)",
    },
    targetStateLabel: {
      type: Type.STRING,
      description: "Short label for the brainwave state (e.g., 'Deep Focus')",
    },
    explanation: {
      type: Type.STRING,
      description: "Brief explanation of why these settings were chosen based on the user request.",
    },
  },
  required: ["baseFrequency", "beatFrequency", "targetStateLabel", "explanation"],
};

export const generateSessionParams = async (userIntent: string) => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert Neuro-Coach specializing in Binaural Entrainment audio therapy.
    The user has a specific goal or feeling.
    Generate optimal oscillator settings for them.

    Binaural Beat Reference:
    - Delta (0.5-4Hz): Sleep, healing.
    - Theta (4-8Hz): Meditation, creativity.
    - Alpha (8-13Hz): Relaxation, flow state.
    - Beta (13-30Hz): Focus, active thinking.
    - Gamma (30Hz+): Peak performance, cognition.

    Base Frequency Reference:
    - Lower (100-200Hz): More grounding.
    - Medium (200-400Hz): Standard focus.
    - Higher (400Hz+): More energizing.

    User Intent: "${userIntent}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: sessionSchema,
        systemInstruction: "Return only valid JSON.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ analyser, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing logic
    const resize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!analyser || !isPlaying) {
        // Idle animation
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a faint idle line
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#0a0a0a'; // Clear color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 3;
      // Create gradient stroke
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#a855f7'); // Purple
      gradient.addColorStop(0.5, '#3b82f6'); // Blue
      gradient.addColorStop(1, '#ec4899'); // Pink
      
      ctx.strokeStyle = gradient;

      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isPlaying]);

  return (
    <div className="w-full h-48 bg-black rounded-2xl border border-gray-800 overflow-hidden shadow-inner shadow-black/50 relative mb-6">
       {!isPlaying && (
           <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-sm pointer-events-none">
               AWAITING SIGNAL...
           </div>
       )}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
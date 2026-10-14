import React, { useEffect, useRef } from 'react';

/**
 * HealthBackgroundAnimation
 * Renders a soothing, premium health-themed background animation:
 * 1. Realistic ECG / Heartbeat cardiac monitor sweep in rich Burgundy & Rose neon glow
 * 2. Floating cellular bio-spheres with 3D depth and subtle drift
 * 3. Soft pulsing vital-wave concentric rings
 * 4. Micro medical cross emblems with subtle float physics
 */
export const HealthBackgroundAnimation: React.FC<{ opacity?: number }> = ({ opacity = 0.55 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating cellular bio-spheres (erythrocytes / biomarkers)
    interface BioParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      angle: number;
    }

    const particles: BioParticle[] = [];
    const particleCount = Math.min(24, Math.floor(width / 50));

    const colors = [
      'rgba(136, 19, 55, ',   // Deep burgundy #881337
      'rgba(159, 18, 57, ',   // Rich rose-800 #9f1239
      'rgba(225, 29, 72, ',   // Vibrant rose-600 #e11d48
      'rgba(76, 5, 25, ',     // Dark burgundy #4c0519
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 7 + 3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.25 + 0.12,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // ECG Heartbeat wave parameters
    let ecgX = 0;
    const ecgSpeed = 2.4;
    let time = 0;

    // Standard clinical ECG P-Q-R-S-T wave function
    const getEcgOffset = (t: number): number => {
      // Period is 100 frames (~1.6 seconds per heartbeat cycle = 72 bpm)
      const phase = (t % 140) / 140;
      if (phase < 0.15) {
        // Flat baseline
        return 0;
      } else if (phase < 0.25) {
        // P-wave (atrial depolarization): smooth gentle bump
        const pNorm = (phase - 0.15) / 0.1;
        return -Math.sin(pNorm * Math.PI) * 7;
      } else if (phase < 0.32) {
        // PR segment
        return 0;
      } else if (phase < 0.35) {
        // Q wave: small downward deflection
        const qNorm = (phase - 0.32) / 0.03;
        return Math.sin(qNorm * Math.PI) * 4;
      } else if (phase < 0.40) {
        // R wave: sharp tall spike upward
        const rNorm = (phase - 0.35) / 0.05;
        return -Math.sin(rNorm * Math.PI) * 44;
      } else if (phase < 0.44) {
        // S wave: downward deflection below baseline
        const sNorm = (phase - 0.40) / 0.04;
        return Math.sin(sNorm * Math.PI) * 11;
      } else if (phase < 0.52) {
        // ST segment
        return 0;
      } else if (phase < 0.68) {
        // T-wave (ventricular repolarization): medium rounded bump
        const tNorm = (phase - 0.52) / 0.16;
        return -Math.sin(tNorm * Math.PI) * 13;
      } else {
        // TP baseline
        return 0;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 1;

      // 1. Draw vital heartbeat / ECG trace across 2 horizontal levels
      const ecgLevels = [
        { y: height * 0.28, stroke: 'rgba(136, 19, 55, 0.18)', glow: 'rgba(225, 29, 72, 0.25)', width: 1.5 },
        { y: height * 0.72, stroke: 'rgba(159, 18, 57, 0.12)', glow: 'rgba(136, 19, 55, 0.18)', width: 1.2 },
      ];

      ecgLevels.forEach((level) => {
        ctx.beginPath();
        ctx.strokeStyle = level.stroke;
        ctx.lineWidth = level.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw segmented line with realistic ECG pulses
        for (let x = 0; x < width; x += 3) {
          const sampleTime = (x * 0.65 + time * 1.2);
          const offset = getEcgOffset(sampleTime);
          const y = level.y + offset;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Pulsing glowing scanning cursor for ECG
        const sweepX = (time * ecgSpeed) % width;
        const currentOffset = getEcgOffset(sweepX * 0.65 + time * 1.2);
        const cursorY = level.y + currentOffset;

        const grad = ctx.createRadialGradient(sweepX, cursorY, 0, sweepX, cursorY, 14);
        grad.addColorStop(0, 'rgba(225, 29, 72, 0.7)');
        grad.addColorStop(0.5, 'rgba(159, 18, 57, 0.3)');
        grad.addColorStop(1, 'rgba(136, 19, 55, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sweepX, cursorY, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sweepX, cursorY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render 3D floating cellular particles (biomarkers / red blood cells)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseSpeed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentRadius = p.radius + Math.sin(p.angle) * 1.5;
        const currentAlpha = p.alpha + Math.sin(p.angle) * 0.05;

        // 3D sphere gradient highlight
        const grad = ctx.createRadialGradient(
          p.x - currentRadius * 0.3,
          p.y - currentRadius * 0.3,
          currentRadius * 0.1,
          p.x,
          p.y,
          currentRadius
        );
        grad.addColorStop(0, `rgba(255, 230, 235, ${currentAlpha * 1.5})`);
        grad.addColorStop(0.5, `${p.color}${currentAlpha})`);
        grad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle biconcave disc ring for erythrocyte feel
        ctx.strokeStyle = `${p.color}${currentAlpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 0.65, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 3. Floating subtle medical crosses
      const crossCount = 4;
      for (let i = 0; i < crossCount; i++) {
        const cx = (width * (i + 1)) / (crossCount + 1) + Math.sin(time * 0.015 + i) * 20;
        const cy = height * (0.2 + (i % 3) * 0.28) + Math.cos(time * 0.012 + i) * 15;
        const size = 12;

        ctx.fillStyle = 'rgba(136, 19, 55, 0.07)';
        ctx.fillRect(cx - 2, cy - size / 2, 4, size);
        ctx.fillRect(cx - size / 2, cy - 2, size, 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

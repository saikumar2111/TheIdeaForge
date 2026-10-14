import React, { useRef, useEffect } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  label: string;
  value: string;
  color: string;
}

export const ThreeDHealthSphere: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D parameters
    const RADIUS = Math.min(width, height) * 0.38;
    let angleX = 0.003;
    let angleY = 0.005;
    let rotX = 0.2;
    let rotY = 0.4;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Clinical biomarker nodes in 3D space
    const nodes: Node3D[] = [
      { x: 0, y: RADIUS, z: 0, label: 'HbA1c', value: '7.1%', color: '#BE123C' },
      { x: 0, y: -RADIUS, z: 0, label: 'eGFR', value: '94 mL/min', color: '#10B981' },
      { x: RADIUS, y: 0, z: 0, label: 'LDL', value: '157 mg/dL', color: '#9F1239' },
      { x: -RADIUS, y: 0, z: 0, label: 'Glucose', value: '128 mg/dL', color: '#E11D48' },
      { x: 0, y: 0, z: RADIUS, label: 'Blood Pressure', value: '128/82', color: '#881337' },
      { x: 0, y: 0, z: -RADIUS, label: 'Cholesterol', value: '238 mg/dL', color: '#BE123C' },
      {
        x: RADIUS * 0.7 * Math.cos(1),
        y: RADIUS * 0.7 * Math.sin(1),
        z: RADIUS * 0.7,
        label: 'Metformin',
        value: '500mg BID',
        color: '#4C0519',
      },
      {
        x: -RADIUS * 0.7 * Math.cos(2),
        y: RADIUS * 0.7 * Math.sin(2),
        z: -RADIUS * 0.7,
        label: 'Atorvastatin',
        value: '20mg QHS',
        color: '#881337',
      },
    ];

    // Latitude and longitude wireframe rings
    const ringSegments = 36;
    const numRings = 7;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const project = (x: number, y: number, z: number) => {
      // Rotate around X
      let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      // Rotate around Y
      let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

      // Perspective projection
      const cameraDistance = RADIUS * 3;
      const scale = cameraDistance / (cameraDistance + z2);
      const px = width / 2 + x2 * scale;
      const py = height / 2 + y1 * scale;

      return { px, py, scale, z: z2 };
    };

    const render = () => {
      if (!isDragging) {
        rotX += angleX;
        rotY += angleY;
      }

      ctx.clearRect(0, 0, width, height);

      // Central ambient 3D sphere gradient glow
      const cx = width / 2;
      const cy = height / 2;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 1.3);
      glow.addColorStop(0, 'rgba(190, 18, 60, 0.15)');
      glow.addColorStop(0.5, 'rgba(136, 19, 55, 0.08)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D wireframe rings
      for (let i = 1; i <= numRings; i++) {
        const phi = (Math.PI / (numRings + 1)) * i;
        const ringRadius = RADIUS * Math.sin(phi);
        const yCoord = RADIUS * Math.cos(phi);

        ctx.beginPath();
        for (let j = 0; j <= ringSegments; j++) {
          const theta = (Math.PI * 2 * j) / ringSegments;
          const x = ringRadius * Math.cos(theta);
          const z = ringRadius * Math.sin(theta);
          const p = project(x, yCoord, z);

          if (j === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.strokeStyle = `rgba(159, 18, 57, ${0.12 + 0.1 * (i % 2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw longitudinal meridian rings
      for (let i = 0; i < 4; i++) {
        const theta = (Math.PI / 4) * i;
        ctx.beginPath();
        for (let j = 0; j <= ringSegments; j++) {
          const phi = (Math.PI * 2 * j) / ringSegments;
          const x = RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = RADIUS * Math.cos(phi);
          const z = RADIUS * Math.sin(phi) * Math.sin(theta);
          const p = project(x, y, z);

          if (j === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.strokeStyle = 'rgba(136, 19, 55, 0.16)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Sort nodes by Z-depth so far ones are drawn behind and near ones in front
      const projectedNodes = nodes
        .map((n) => {
          const p = project(n.x, n.y, n.z);
          return { ...n, ...p };
        })
        .sort((a, b) => a.z - b.z);

      // Render nodes with 3D depth scaling, halos and labels
      projectedNodes.forEach((node) => {
        const alpha = Math.max(0.3, Math.min(1, (node.z + RADIUS) / (RADIUS * 2)));
        const pointSize = Math.max(4, 7 * node.scale);

        // Connecting radial ray from sphere center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.px, node.py);
        ctx.strokeStyle = `rgba(190, 18, 60, ${0.15 * alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 3D Outer Halo
        ctx.beginPath();
        ctx.arc(node.px, node.py, pointSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 18, 60, ${0.18 * alpha})`;
        ctx.fill();

        // 3D Core Sphere
        ctx.beginPath();
        ctx.arc(node.px, node.py, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3D Label Card
        if (alpha > 0.4) {
          const text = `${node.label}: ${node.value}`;
          ctx.font = `600 ${Math.max(10, Math.round(11 * node.scale))}px Plus Jakarta Sans, sans-serif`;
          const metrics = ctx.measureText(text);
          const boxWidth = metrics.width + 12;
          const boxHeight = 20 * node.scale;
          const boxX = node.px + 10;
          const boxY = node.py - 10;

          // Shadowed 3D Tag
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.strokeStyle = 'rgba(136, 19, 55, 0.25)';
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#4C0519';
          ctx.fillText(text, boxX + 6, boxY + boxHeight * 0.7);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-rose-900/60 bg-white/80 px-2 py-0.5 rounded border border-rose-200/60 pointer-events-none">
        3D HealthSphere Spatial Model • Drag to Rotate
      </div>
    </div>
  );
};

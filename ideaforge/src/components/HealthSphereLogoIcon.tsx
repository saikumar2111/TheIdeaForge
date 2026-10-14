import React from 'react';

/**
 * Professional Clinical HealthSphere Logo Icon
 * Combines an ergonomic 3D medical cross with a precision cardiac pulse
 * trace and vital biomarker nodes in a refined burgundy & rose finish.
 */
export const HealthSphereLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="hs-emblem-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.65" stopColor="#FFE4E8" />
        <stop offset="1" stopColor="#FECDD3" />
      </linearGradient>
      <linearGradient id="hs-pulse-trace" x1="4" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#881337" />
        <stop offset="0.5" stopColor="#BE123C" />
        <stop offset="1" stopColor="#881337" />
      </linearGradient>
      <filter id="hs-glow" x="-2" y="-2" width="36" height="36" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#2A020B" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#hs-glow)">
      {/* 3D Clinical Cross with ergonomic curved corners */}
      <path
        d="M12.5 3.5C12.5 2.67 13.17 2 14 2H18C18.83 2 19.5 2.67 19.5 3.5V11H27C27.83 11 28.5 11.67 28.5 12.5V16.5C28.5 17.33 27.83 18 27 18H19.5V25.5C19.5 26.33 18.83 27 18 27H14C13.17 27 12.5 26.33 12.5 25.5V18H5C4.17 18 3.5 17.33 3.5 16.5V12.5C3.5 11.67 4.17 11 5 11H12.5V3.5Z"
        fill="url(#hs-emblem-grad)"
      />
      {/* Precision Cardiac Pulse Beat through the center */}
      <path
        d="M5.5 14.5H10.5L12.8 9.5L16 21L19.2 11.8L21.5 14.5H26.5"
        stroke="url(#hs-pulse-trace)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Active Clinical Biomarker Pulse Nodes */}
      <circle cx="16" cy="21" r="1.4" fill="#BE123C" />
      <circle cx="12.8" cy="9.5" r="1.2" fill="#881337" />
    </g>
  </svg>
);

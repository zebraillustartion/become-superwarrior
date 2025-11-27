import React from 'react';
import { Appearance } from '../../types';

interface PixelAvatarProps {
  appearance: Appearance;
  size?: number;
  className?: string;
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({ appearance, size = 100, className = '' }) => {
  const { skinColor, hairColor, hairStyle, outfitColor } = appearance;

  // 12x12 Grid System logic for SVG rects
  const pixelSize = 10;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
    >
      {/* Background (Optional transparent) */}
      
      {/* --- Body (Outfit) --- */}
      <rect x="30" y="70" width="60" height="50" fill={outfitColor} />
      {/* Arms */}
      <rect x="20" y="70" width="10" height="40" fill={skinColor} />
      <rect x="90" y="70" width="10" height="40" fill={skinColor} />

      {/* --- Head (Skin) --- */}
      <rect x="30" y="20" width="60" height="50" fill={skinColor} />
      
      {/* --- Face Features --- */}
      {/* Eyes */}
      <rect x="40" y="40" width="10" height="10" fill="#000" />
      <rect x="70" y="40" width="10" height="10" fill="#000" />
      {/* Blush */}
      <rect x="30" y="50" width="10" height="10" fill="rgba(255,0,0,0.1)" />
      <rect x="80" y="50" width="10" height="10" fill="rgba(255,0,0,0.1)" />

      {/* --- Hair --- */}
      {hairStyle !== 'BALD' && (
        <>
           {/* Common Top Hair */}
           <rect x="30" y="10" width="60" height="10" fill={hairColor} />
           <rect x="20" y="20" width="10" height="30" fill={hairColor} />
           <rect x="90" y="20" width="10" height="30" fill={hairColor} />
        </>
      )}

      {hairStyle === 'SHORT' && (
        <>
          <rect x="30" y="20" width="20" height="10" fill={hairColor} />
          <rect x="70" y="20" width="20" height="10" fill={hairColor} />
        </>
      )}

      {hairStyle === 'LONG' && (
        <>
          <rect x="20" y="50" width="10" height="30" fill={hairColor} />
          <rect x="90" y="50" width="10" height="30" fill={hairColor} />
          <rect x="30" y="20" width="60" height="10" fill={hairColor} />
        </>
      )}

      {hairStyle === 'MOHAWK' && (
        <>
           <rect x="50" y="0" width="20" height="20" fill={hairColor} />
        </>
      )}

    </svg>
  );
};
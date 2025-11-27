import React from 'react';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const PixelCard: React.FC<PixelCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-pixel-card border-4 border-black shadow-pixel rounded-xl p-5 text-pixel-text transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};
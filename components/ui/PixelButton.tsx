import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  let bgClass = 'bg-pixel-blue text-white';
  
  if (variant === 'secondary') bgClass = 'bg-gray-700 text-white';
  if (variant === 'danger') bgClass = 'bg-pixel-accent text-white';
  if (variant === 'success') bgClass = 'bg-pixel-green text-black';

  return (
    <button
      className={`
        relative px-6 py-2 font-pixel text-xl uppercase tracking-wider
        border-4 border-black shadow-pixel rounded-lg
        active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
        transition-all duration-75
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:-translate-y-1 hover:shadow-pixel-lg
        ${bgClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
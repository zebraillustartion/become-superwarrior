
import React from 'react';
import { motion } from 'framer-motion';
import { Hero, Tab } from '../types';
import { Coins, Sparkles, Edit2, ListTodo, ShoppingBag, Backpack, Settings, Crown } from 'lucide-react';
import { PixelAvatar } from './ui/PixelAvatar';
import { LEVEL_TITLES } from '../constants';

interface HeroHeaderProps {
  hero: Hero;
  onAvatarClick: () => void;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ 
  hero, 
  onAvatarClick,
  activeTab,
  onTabChange
}) => {
  const maxExp = hero.level * 100;
  const progressPercent = Math.min((hero.currentExp / maxExp) * 100, 100);

  // Get Level Title (0-indexed array, level starts at 1)
  // Ensure we don't go out of bounds if level > 50
  const titleIndex = Math.min(Math.max(0, hero.level - 1), LEVEL_TITLES.length - 1);
  const currentTitle = LEVEL_TITLES[titleIndex];

  const tabs = [
    { id: 'TASKS', icon: ListTodo, label: '任务' },
    { id: 'SHOP', icon: ShoppingBag, label: '商店' },
    { id: 'INVENTORY', icon: Backpack, label: '背包' },
    { id: 'SETTINGS', icon: Settings, label: '设置' }
  ];

  return (
    <div className="sticky top-0 z-50 bg-pixel-dark border-b-8 border-black shadow-2xl pt-4 overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative max-w-2xl mx-auto px-6 flex flex-col gap-4">
        
        {/* Top Row: Avatar & Stats */}
        <div className="flex items-end gap-6 pb-2">
          {/* Avatar Area - Interactive */}
          <div 
            className="relative z-10 -mb-2 group cursor-pointer"
            onClick={onAvatarClick}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-200 to-indigo-300 border-4 border-white shadow-pixel rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 overflow-hidden relative">
              <PixelAvatar appearance={hero.appearance} size={80} className="mt-4" />
              
              {/* Edit Overlay Hint */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 className="text-white" size={24} />
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-yellow-400 text-black border-4 border-black px-2 py-0.5 font-bold text-lg rounded-lg shadow-sm transform rotate-12 z-20">
              LV.{hero.level}
            </div>
          </div>

          {/* Stats Area */}
          <div className="flex-1 space-y-2 pb-1">
            {/* Header Row: Title & Gold */}
            <div className="flex justify-between items-end mb-1">
              
              {/* Level Title Block */}
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-1 bg-pixel-card border-2 border-pixel-muted px-2 py-0.5 rounded-lg shadow-sm">
                    <Crown size={14} className="text-pixel-accent" />
                    <span className="text-xs sm:text-sm font-bold text-pixel-text tracking-wider">
                      {currentTitle}
                    </span>
                 </div>
              </div>

              {/* Gold Display */}
              <div className="flex items-center gap-2 text-yellow-600 bg-yellow-400/10 px-3 py-1 rounded-full border-2 border-yellow-500/30 shadow-inner">
                  <Coins size={18} className="text-yellow-500 fill-yellow-500 animate-pulse" />
                  <span className="text-xl font-bold tracking-widest font-pixel">{hero.gold}</span>
              </div>
            </div>

            {/* EXP Bar - Thicker & Rounded */}
            <div className="relative w-full">
              <div className="h-6 bg-gray-800 border-4 border-black rounded-full overflow-hidden shadow-inner relative">
                  {/* Background Grid for Bar */}
                  <div className="absolute inset-0 opacity-20" 
                      style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }}>
                  </div>
                  
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 relative z-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                  />
                  
                  {/* Shine Effect */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20 z-10 rounded-t-full"></div>
              </div>
              
              {/* Text Overlay (Outside or Inside) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <span className="text-xs font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-widest uppercase flex items-center gap-2">
                  <Sparkles size={10} className="text-yellow-300" />
                  EXP {hero.currentExp} / {maxExp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Navigation Tabs */}
        <div className="flex justify-between gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as Tab)}
                className={`
                  flex-1 min-w-[70px] flex items-center justify-center gap-2 py-2 rounded-xl border-4 transition-all duration-200
                  ${isActive 
                    ? 'bg-pixel-card border-pixel-text text-pixel-text shadow-pixel -translate-y-1' 
                    : 'bg-pixel-dark/50 border-pixel-muted/50 text-pixel-muted hover:bg-pixel-card/30'
                  }
                `}
              >
                <Icon size={18} /> <span className="font-bold tracking-wider text-sm hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  );
};

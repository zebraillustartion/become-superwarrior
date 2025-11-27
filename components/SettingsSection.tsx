import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, RefreshCw, AlertTriangle, Check } from 'lucide-react';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';
import { Theme } from '../types';
import { THEMES } from '../constants';

interface SettingsSectionProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  onResetGame: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ 
  currentThemeId, 
  onThemeChange, 
  onResetGame 
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl text-pixel-text font-bold border-b-4 border-pixel-text inline-block pb-1">
          系统设置
        </h2>
      </div>

      {/* Theme Selector */}
      <section className="space-y-4">
        <h3 className="text-xl text-pixel-blue font-bold flex items-center gap-2">
          <Settings size={20} /> 界面风格
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEMES.map((theme) => {
            const isActive = currentThemeId === theme.id;
            return (
              <PixelCard 
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`
                  relative cursor-pointer transition-all duration-200 group
                  ${isActive ? 'ring-4 ring-yellow-400 scale-[1.02]' : 'hover:scale-[1.01] hover:opacity-80'}
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Color Preview Swatch */}
                  <div className="w-16 h-16 rounded-lg border-2 border-gray-400 shadow-sm overflow-hidden grid grid-cols-2">
                     <div style={{ backgroundColor: theme.colors.dark }} className="h-full w-full" />
                     <div style={{ backgroundColor: theme.colors.accent }} className="h-full w-full" />
                     <div style={{ backgroundColor: theme.colors.card }} className="h-full w-full col-span-2" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-pixel-text">{theme.name}</h4>
                    {isActive && (
                      <span className="text-xs text-yellow-500 font-bold">当前使用</span>
                    )}
                  </div>

                  {isActive && (
                    <div className="bg-yellow-400 text-black rounded-full p-1">
                      <Check size={16} strokeWidth={4} />
                    </div>
                  )}
                </div>
              </PixelCard>
            );
          })}
        </div>
      </section>

      <hr className="border-pixel-muted/30 border-2 border-dashed" />

      {/* Danger Zone */}
      <section className="space-y-4">
        <h3 className="text-xl text-red-500 font-bold flex items-center gap-2">
          <AlertTriangle size={20} /> 时光回溯
        </h3>
        <p className="text-pixel-muted text-sm">
          这个功能会重置你的等级、金币和当前任务进度，让你重新开始挑战。
          <br />
          <span className="font-bold text-pixel-text">放心：你精心装扮的形象和自定义的商店商品会被保留。</span>
        </p>

        {!showResetConfirm ? (
           <PixelButton 
             variant="danger" 
             className="w-full flex items-center justify-center gap-2"
             onClick={() => setShowResetConfirm(true)}
           >
             <RefreshCw size={18} /> 重置游戏进度
           </PixelButton>
        ) : (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 p-4 rounded-xl border-2 border-red-500 text-center space-y-4"
          >
             <div className="text-pixel-text font-bold text-lg animate-pulse">
               确定要回到过去吗？
             </div>
             <div className="flex gap-4">
               <PixelButton 
                 variant="secondary" 
                 className="flex-1"
                 onClick={() => setShowResetConfirm(false)}
               >
                 取消
               </PixelButton>
               <PixelButton 
                 variant="danger" 
                 className="flex-1"
                 onClick={onResetGame}
               >
                 确定重置
               </PixelButton>
             </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};
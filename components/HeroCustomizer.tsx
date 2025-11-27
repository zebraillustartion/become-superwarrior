import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Appearance, HairStyle } from '../types';
import { SKIN_COLORS, HAIR_COLORS, OUTFIT_COLORS, HAIR_STYLES } from '../constants';
import { PixelAvatar } from './ui/PixelAvatar';
import { PixelButton } from './ui/PixelButton';
import { PixelCard } from './ui/PixelCard';
import { X, Save } from 'lucide-react';

interface HeroCustomizerProps {
  initialAppearance: Appearance;
  onSave: (newAppearance: Appearance) => void;
  onClose: () => void;
}

export const HeroCustomizer: React.FC<HeroCustomizerProps> = ({ 
  initialAppearance, 
  onSave, 
  onClose 
}) => {
  const [appearance, setAppearance] = useState<Appearance>(initialAppearance);

  const handleSave = () => {
    onSave(appearance);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <PixelCard className="bg-pixel-card border-white relative overflow-hidden text-pixel-text">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-2">
            <h2 className="text-2xl font-bold">定制你的英雄</h2>
            <button onClick={onClose} className="text-pixel-muted hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-sky-200 rounded-full border-4 border-white shadow-inner mb-4">
               <PixelAvatar appearance={appearance} size={150} />
            </div>
          </div>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {/* Skin Color */}
            <div>
              <label className="block text-sm text-pixel-muted mb-2">肤色</label>
              <div className="flex gap-3 flex-wrap">
                {SKIN_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setAppearance({ ...appearance, skinColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${appearance.skinColor === color ? 'border-white scale-110 ring-2 ring-yellow-400' : 'border-gray-500'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div>
              <label className="block text-sm text-pixel-muted mb-2">发型</label>
              <div className="grid grid-cols-4 gap-2">
                {HAIR_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setAppearance({ ...appearance, hairStyle: style.id as HairStyle })}
                    className={`
                      py-1 px-2 text-sm border-2 rounded-lg
                      ${appearance.hairStyle === style.id 
                        ? 'bg-yellow-500 text-black border-white font-bold' 
                        : 'bg-pixel-dark/30 text-pixel-text border-pixel-muted/30'
                      }
                    `}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div>
              <label className="block text-sm text-pixel-muted mb-2">发色</label>
              <div className="flex gap-3 flex-wrap">
                {HAIR_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setAppearance({ ...appearance, hairColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${appearance.hairColor === color ? 'border-white scale-110 ring-2 ring-yellow-400' : 'border-gray-500'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Outfit Color */}
            <div>
              <label className="block text-sm text-pixel-muted mb-2">服装颜色</label>
              <div className="flex gap-3 flex-wrap">
                {OUTFIT_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setAppearance({ ...appearance, outfitColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${appearance.outfitColor === color ? 'border-white scale-110 ring-2 ring-yellow-400' : 'border-gray-500'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-4 border-black">
            <PixelButton onClick={handleSave} className="w-full" variant="success">
               <div className="flex items-center justify-center gap-2">
                 <Save size={20} /> 保存形象
               </div>
            </PixelButton>
          </div>
        </PixelCard>
      </motion.div>
    </div>
  );
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InventoryItem, UserStats, Achievement } from '../types';
import { ACHIEVEMENTS, EMOJI_OPTIONS } from '../constants';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';
import { Gift, Trophy, ClipboardList, Lock, CheckCircle2, Plus, Target, Trash2 } from 'lucide-react';

interface InventorySectionProps {
  inventory: InventoryItem[];
  onUseItem: (uniqueId: string) => void;
  stats: UserStats;
  customAchievements: Achievement[];
  onAddAchievement: (title: string, description: string, icon: string, targetType: 'TASK' | 'BUY', targetValue: number) => void;
  onDeleteAchievement: (id: string) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({ 
  inventory, 
  onUseItem, 
  stats,
  customAchievements,
  onAddAchievement,
  onDeleteAchievement
}) => {
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [targetType, setTargetType] = useState<'TASK' | 'BUY'>('TASK');
  const [targetValue, setTargetValue] = useState('10');
  const [selectedIcon, setSelectedIcon] = useState(EMOJI_OPTIONS[0]);

  const allAchievements = [...ACHIEVEMENTS, ...customAchievements];
  
  // Calculate unlocked achievements
  const checkAchievement = (type: 'TASK' | 'BUY', target: number) => {
    if (type === 'TASK') return stats.totalTasksCompleted >= target;
    if (type === 'BUY') return stats.totalItemsPurchased >= target;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetValue) return;
    onAddAchievement(title, desc || '自定义目标', selectedIcon, targetType, parseInt(targetValue));
    setIsCreating(false);
    // Reset form
    setTitle('');
    setDesc('');
    setTargetValue('10');
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. Achievements Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b-4 border-yellow-500 pb-1">
          <h2 className="text-2xl text-yellow-500 inline-flex items-center gap-2">
            <Trophy size={24} /> 勇士成就
          </h2>
          <PixelButton onClick={() => setIsCreating(!isCreating)} className="text-xs px-3 py-1" variant="secondary">
            {isCreating ? '取消' : '添加目标'}
          </PixelButton>
        </div>

        {/* Add Achievement Form */}
        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <PixelCard className="mb-6 bg-pixel-card border-yellow-500">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 text-pixel-muted">成就名称</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-pixel-input border-2 border-pixel-muted/30 p-2 text-pixel-text focus:border-yellow-500 outline-none rounded-lg"
                      placeholder="例如: 百里挑一"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-pixel-muted">描述</label>
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full bg-pixel-input border-2 border-pixel-muted/30 p-2 text-pixel-text focus:border-yellow-500 outline-none rounded-lg"
                      placeholder="例如: 完成100个任务"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                     <div className="flex-1">
                        <label className="block text-sm mb-1 text-pixel-muted">目标类型</label>
                        <div className="flex bg-pixel-input p-1 rounded-lg border-2 border-pixel-muted/30">
                           <button
                             type="button"
                             onClick={() => setTargetType('TASK')}
                             className={`flex-1 py-1 rounded text-sm font-bold transition-all ${targetType === 'TASK' ? 'bg-pixel-blue text-white shadow-sm' : 'text-pixel-muted'}`}
                           >
                             任务数
                           </button>
                           <button
                             type="button"
                             onClick={() => setTargetType('BUY')}
                             className={`flex-1 py-1 rounded text-sm font-bold transition-all ${targetType === 'BUY' ? 'bg-pixel-blue text-white shadow-sm' : 'text-pixel-muted'}`}
                           >
                             购买数
                           </button>
                        </div>
                     </div>
                     <div className="flex-1">
                        <label className="block text-sm mb-1 text-pixel-muted">目标数量</label>
                        <input
                          type="number"
                          value={targetValue}
                          onChange={(e) => setTargetValue(e.target.value)}
                          className="w-full bg-pixel-input border-2 border-pixel-muted/30 p-2 text-pixel-text focus:border-yellow-500 outline-none rounded-lg"
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm mb-2 text-pixel-muted">选择图标</label>
                     <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {EMOJI_OPTIONS.map(icon => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => setSelectedIcon(icon)}
                            className={`
                              flex-shrink-0 text-xl p-2 border-2 hover:bg-pixel-dark/20 rounded-lg transition-all
                              ${selectedIcon === icon ? 'border-yellow-500 bg-pixel-dark/20 scale-110' : 'border-transparent'}
                            `}
                          >
                            {icon}
                          </button>
                        ))}
                     </div>
                  </div>

                  <PixelButton type="submit" className="w-full bg-yellow-500 text-black border-white hover:bg-yellow-400">
                    创建成就
                  </PixelButton>
                </form>
              </PixelCard>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allAchievements.map((ach) => {
            const isUnlocked = checkAchievement(ach.targetType, ach.targetValue);
            const isCustom = customAchievements.some(c => c.id === ach.id);
            const progress = ach.targetType === 'TASK' ? stats.totalTasksCompleted : stats.totalItemsPurchased;
            
            return (
              <div 
                key={ach.id}
                className={`
                  relative p-4 border-4 rounded-xl flex items-center gap-4 transition-all duration-300 group
                  ${isUnlocked 
                    ? 'bg-pixel-card border-yellow-500 shadow-pixel translate-y-[-2px]' 
                    : 'bg-pixel-dark border-pixel-muted opacity-60 grayscale'
                  }
                `}
              >
                {/* Delete Button for Custom Achievements */}
                {isCustom && (
                  <button 
                    onClick={() => onDeleteAchievement(ach.id)}
                    className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full p-1 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="删除此成就"
                  >
                    <Trash2 size={12} />
                  </button>
                )}

                <div className={`
                    flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl border-2 rounded-lg relative overflow-hidden
                    ${isUnlocked ? 'bg-pixel-dark border-yellow-500/50' : 'bg-pixel-dark border-pixel-muted'}
                `}>
                  {isUnlocked ? ach.icon : <Lock size={20} className="text-pixel-muted" />}
                  
                  {/* Progress Bar Background */}
                  {!isUnlocked && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-yellow-500 transition-all duration-500"
                      style={{ width: `${Math.min((progress / ach.targetValue) * 100, 100)}%` }}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className={`text-lg font-bold truncate font-pixel ${isUnlocked ? 'text-yellow-500' : 'text-pixel-muted'}`}>
                    {ach.title}
                  </h3>
                  <p className="text-sm text-pixel-muted leading-tight">{ach.description}</p>
                  
                  {!isUnlocked && (
                     <p className="text-xs text-pixel-muted mt-1 font-mono">
                        进度: {progress} / {ach.targetValue}
                     </p>
                  )}
                </div>

                {isUnlocked && (
                  <div className="absolute top-1 right-1">
                      <CheckCircle2 size={16} className="text-yellow-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Stats Summary */}
      <PixelCard className="flex items-center justify-between bg-pixel-card/80 border-pixel-muted">
          <div className="flex items-center gap-4">
             <div className="bg-pixel-blue p-3 border-2 border-white rounded-full shadow-sm text-white">
               <ClipboardList size={24} />
             </div>
             <div>
               <div className="text-sm text-pixel-muted uppercase tracking-wider mb-1">累计完成任务</div>
               <div className="text-3xl font-bold text-pixel-text font-pixel leading-none">
                 {stats.totalTasksCompleted}
               </div>
             </div>
          </div>
          <div className="text-right opacity-50 text-xs text-pixel-muted">
            <div>Keep Growing!</div>
            <div>勇士</div>
          </div>
      </PixelCard>

      {/* 3. Inventory List */}
      <div className="space-y-4">
         <div className="flex justify-between items-center">
          <h2 className="text-2xl text-pixel-green border-b-4 border-pixel-green inline-block pb-1">
            我的背包
          </h2>
        </div>

        {inventory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-pixel-muted border-2 border-dashed border-pixel-muted/50 rounded-lg">
             <Gift size={48} className="mb-4 opacity-50" />
             <p>背包是空的</p>
             <p className="text-sm mt-2">快去完成任务赚钱买奖励吧！</p>
          </div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {inventory.map((item) => (
              <motion.div
                key={item.uniqueId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <PixelCard className="flex items-center justify-between border-pixel-muted/50 bg-pixel-card/50">
                   <div className="flex items-center gap-4">
                      <div className="text-3xl bg-pixel-dark/10 w-12 h-12 flex items-center justify-center border-2 border-pixel-muted/30 rounded-lg">
                          {item.icon}
                      </div>
                      <div>
                          <h3 className="text-xl text-pixel-text">{item.name}</h3>
                          <p className="text-xs text-pixel-muted">
                            {new Date(item.purchasedAt).toLocaleDateString()}
                          </p>
                      </div>
                   </div>
                   <PixelButton 
                     onClick={() => onUseItem(item.uniqueId)} 
                     variant="success"
                     className="text-sm px-4 py-1"
                   >
                     使用
                   </PixelButton>
                </PixelCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
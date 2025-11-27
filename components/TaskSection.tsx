import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, Trash2, Scroll } from 'lucide-react';
import { Task, Priority } from '../types';
import { PRIORITY_CONFIG } from '../constants';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';

// Particle Effect Components
const Particle: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <motion.div
    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
    animate={{ 
      x: (Math.random() - 0.5) * 100, 
      y: (Math.random() - 0.5) * 100, 
      opacity: 0, 
      scale: 0,
      rotate: Math.random() * 360
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{ 
      position: 'absolute', 
      left: x, 
      top: y, 
      width: '8px', 
      height: '8px', 
      backgroundColor: color,
      zIndex: 50,
      pointerEvents: 'none'
    }}
  />
);

const ConfettiBurst: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const colors = ['#FFD700', '#FF4500', '#00FF00', '#1E90FF', '#FF69B4'];
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle 
          key={i} 
          x={x} 
          y={y} 
          color={colors[Math.floor(Math.random() * colors.length)]} 
        />
      ))}
    </>
  );
};

interface TaskSectionProps {
  tasks: Task[];
  onAddTask: (title: string, priority: Priority) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskSection: React.FC<TaskSectionProps> = ({ 
  tasks, 
  onAddTask, 
  onCompleteTask,
  onDeleteTask 
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>(Priority.MEDIUM);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bursts, setBursts] = useState<{id: number, x: number, y: number}[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle, newPriority);
    setNewTaskTitle('');
    setIsFormOpen(false);
  };

  const handleComplete = (e: React.MouseEvent, taskId: string) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add burst
    const burstId = Date.now();
    setBursts(prev => [...prev, { id: burstId, x: e.clientX, y: e.clientY }]); // Use global coords for portal-like effect if needed, but here relative to screen is easier

    // Clean up burst after animation
    setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== burstId));
    }, 1000);

    onCompleteTask(taskId);
  };

  return (
    <div className="pb-20">
      {/* Burst Container (Fixed Overlay) */}
      {bursts.map(burst => (
         <div key={burst.id} style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 100 }}>
             <ConfettiBurst x={burst.x} y={burst.y} />
         </div>
      ))}

      {/* Controls Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2">
           <div className="bg-yellow-500 p-2 rounded-lg border-2 border-black text-black">
             <Scroll size={24} />
           </div>
           <h2 className="text-3xl text-pixel-text font-bold drop-shadow-sm font-pixel">
             任务卷轴
           </h2>
        </div>
        <PixelButton onClick={() => setIsFormOpen(!isFormOpen)} className="text-sm" variant={isFormOpen ? 'secondary' : 'primary'}>
          {isFormOpen ? '取消' : '接取任务'}
        </PixelButton>
      </div>

      {/* Add Task Form (Floating) */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="overflow-hidden mb-6 mx-2"
          >
            <PixelCard className="bg-pixel-card border-pixel-accent relative z-20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-pixel-muted">任务内容</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="例如: 晨跑3公里..."
                    className="w-full bg-pixel-input border-2 border-pixel-muted/50 rounded-lg p-3 text-pixel-text focus:border-pixel-accent outline-none font-pixel text-xl placeholder-gray-400"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-pixel-muted">优先级奖励</label>
                  <div className="flex gap-3">
                    {Object.values(Priority).map((p) => (
                      <div
                        key={p}
                        onClick={() => setNewPriority(p)}
                        className={`
                          flex-1 cursor-pointer border-4 rounded-xl p-3 text-center transition-all
                          ${newPriority === p 
                            ? `${PRIORITY_CONFIG[p].borderColor} ${PRIORITY_CONFIG[p].bgColor} opacity-100 scale-105 shadow-lg` 
                            : 'border-pixel-muted/30 bg-pixel-muted/10 opacity-60 hover:opacity-100 hover:scale-105'
                          }
                        `}
                      >
                        <div className={`font-bold text-xl ${PRIORITY_CONFIG[p].color}`}>
                          {PRIORITY_CONFIG[p].label}
                        </div>
                        <div className="text-xs text-pixel-muted mt-1 font-bold">
                          +{PRIORITY_CONFIG[p].exp}XP
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <PixelButton type="submit" variant="success" className="w-full mt-2">
                  <div className="flex items-center justify-center gap-2">
                    <Plus size={20} /> 确认发布
                  </div>
                </PixelButton>
              </form>
            </PixelCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE SCROLL CONTAINER */}
      <div className="relative mx-2 filter drop-shadow-2xl">
         {/* Top Roll */}
         <div className="h-8 bg-[#d4c5b0] border-4 border-black rounded-full relative z-10 -mb-4 shadow-sm flex items-center justify-center">
            <div className="w-1/2 h-1 bg-black/10 rounded-full"></div>
         </div>
         
         {/* Scroll Body */}
         <div className="bg-[#f4e4bc] border-x-4 border-black pt-8 pb-8 px-4 min-h-[400px] relative">
             {/* Paper Texture Overlay */}
             <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 2.24 5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}>
             </div>

             {/* Content */}
             <div className="space-y-4 relative z-10">
                {tasks.length === 0 && !isFormOpen && (
                  <div className="text-center py-20 opacity-50 flex flex-col items-center">
                    <div className="text-6xl mb-4 grayscale">📜</div>
                    <div className="text-[#5c4d3c] font-bold text-2xl">暂无任务</div>
                    <div className="text-[#8c7b6c]">勇士，该出发了！</div>
                  </div>
                )}

                <AnimatePresence mode="popLayout">
                  {tasks.map((task) => {
                    const config = PRIORITY_CONFIG[task.priority];
                    return (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0, x: 100 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                      >
                        {/* Note: Cards inside the scroll are DARK for contrast, or we could make them Light Paper style. 
                            Let's keep them Dark style for that 'Magic Rune' feel on parchment. */}
                        <div className={`
                            flex items-center justify-between group 
                            bg-white border-4 border-[#5c4d3c] rounded-xl p-4 shadow-sm
                            hover:shadow-md hover:scale-[1.02] transition-all duration-200
                        `}>
                          <div className="flex-1 pr-4">
                             <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full text-white font-bold shadow-sm ${config.color.replace('text-', 'bg-')}`}>
                                  {config.label}
                                </span>
                                <span className="text-gray-500 text-xs font-bold">
                                   EXP+{config.exp} G+{config.gold}
                                </span>
                             </div>
                             <h3 className="text-xl leading-tight text-[#2c241b] font-bold break-all">{task.title}</h3>
                          </div>
                          
                          <div className="flex items-center gap-2">
                             <button 
                               onClick={() => onDeleteTask(task.id)}
                               className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                               title="删除"
                             >
                               <Trash2 size={20} />
                             </button>
                             <button 
                               onClick={(e) => handleComplete(e, task.id)} 
                               className="w-12 h-12 rounded-xl bg-[#5c4d3c] text-white border-2 border-[#5c4d3c] flex items-center justify-center shadow-pixel hover:bg-green-600 hover:border-green-800 active:translate-y-1 active:shadow-none transition-all"
                               title="完成任务"
                             >
                                <Check size={28} strokeWidth={3} />
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
             </div>
         </div>

         {/* Bottom Roll */}
         <div className="h-8 bg-[#d4c5b0] border-4 border-black rounded-full relative z-10 -mt-4 shadow-lg flex items-center justify-center">
            <div className="w-1/2 h-1 bg-black/10 rounded-full"></div>
         </div>
      </div>
    </div>
  );
};
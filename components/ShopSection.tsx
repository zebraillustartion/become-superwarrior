import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Coins } from 'lucide-react';
import { ShopItem } from '../types';
import { EMOJI_OPTIONS } from '../constants';
import { PixelCard } from './ui/PixelCard';
import { PixelButton } from './ui/PixelButton';

interface ShopSectionProps {
  items: ShopItem[];
  userGold: number;
  onBuyItem: (item: ShopItem) => void;
  onAddItem: (name: string, price: number, icon: string) => void;
  onDeleteItem: (id: string) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ 
  items, 
  userGold, 
  onBuyItem, 
  onAddItem,
  onDeleteItem
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('50');
  const [selectedIcon, setSelectedIcon] = useState(EMOJI_OPTIONS[0]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;
    onAddItem(newName, parseInt(newPrice), selectedIcon);
    setNewName('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-yellow-600 border-b-4 border-yellow-600 inline-block pb-1">
          奖励商店
        </h2>
        <PixelButton onClick={() => setIsCreating(!isCreating)} className="text-sm" variant="secondary">
          {isCreating ? '关闭' : '上架新品'}
        </PixelButton>
      </div>

      {/* Add Item Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <PixelCard className="mb-6 bg-pixel-card border-yellow-500">
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-pixel-muted">奖励名称</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-pixel-input border-2 border-pixel-muted/30 p-2 text-pixel-text focus:border-yellow-500 outline-none rounded-lg"
                    placeholder="例如: 看电影"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-pixel-muted">价格 (金币)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-pixel-input border-2 border-pixel-muted/30 p-2 text-pixel-text focus:border-yellow-500 outline-none rounded-lg"
                  />
                </div>
                <div>
                   <label className="block text-sm mb-2 text-pixel-muted">选择图标</label>
                   <div className="grid grid-cols-5 gap-2">
                      {EMOJI_OPTIONS.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setSelectedIcon(icon)}
                          className={`
                            text-2xl p-2 border-2 hover:bg-pixel-dark/20 rounded-lg
                            ${selectedIcon === icon ? 'border-yellow-500 bg-pixel-dark/20' : 'border-transparent'}
                          `}
                        >
                          {icon}
                        </button>
                      ))}
                   </div>
                </div>
                <PixelButton type="submit" className="w-full bg-yellow-500 text-black border-white hover:bg-yellow-400">
                  上架商品
                </PixelButton>
              </form>
            </PixelCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop Grid */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const canAfford = userGold >= item.price;
          return (
            <PixelCard key={item.id} className="flex flex-col items-center text-center relative group hover:scale-[1.02]">
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.id);
                }}
                className="absolute top-1 right-1 text-pixel-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
              >
                ×
              </button>
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-lg font-bold mb-1 line-clamp-1 text-pixel-text">{item.name}</h3>
              <div className="text-yellow-600 flex items-center gap-1 mb-3 font-bold">
                <Coins size={16} /> {item.price}
              </div>
              <PixelButton 
                onClick={() => onBuyItem(item)}
                disabled={!canAfford}
                variant={canAfford ? 'primary' : 'secondary'}
                className={`w-full text-sm py-1 ${!canAfford ? 'opacity-50' : ''}`}
              >
                {canAfford ? '购买' : '金币不足'}
              </PixelButton>
            </PixelCard>
          );
        })}
      </div>
      {items.length === 0 && (
         <div className="text-center py-10 text-pixel-muted">商店空空如也...</div>
      )}
    </div>
  );
};
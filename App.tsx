import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Hero, Task, ShopItem, InventoryItem, Tab, Priority, UserStats, Appearance, Achievement } from './types';
import { DEFAULT_SHOP_ITEMS, PRIORITY_CONFIG, DEFAULT_APPEARANCE, THEMES } from './constants';
import { HeroHeader } from './components/HeroHeader';
import { TaskSection } from './components/TaskSection';
import { ShopSection } from './components/ShopSection';
import { InventorySection } from './components/InventorySection';
import { SettingsSection } from './components/SettingsSection';
import { HeroCustomizer } from './components/HeroCustomizer';

// Helper for LocalStorage
function useStickyState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (e) {
      console.error("Error loading state", e);
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

const App: React.FC = () => {
  // --- Global State ---
  const [hero, setHero] = useStickyState<Hero>('hero_v2', {
    level: 1,
    currentExp: 0,
    gold: 0,
    appearance: DEFAULT_APPEARANCE
  });

  // Backward compatibility: If appearance is missing (from v1), add it
  useEffect(() => {
    if (!hero.appearance) {
      setHero(prev => ({ ...prev, appearance: DEFAULT_APPEARANCE }));
    }
  }, []);

  const [stats, setStats] = useStickyState<UserStats>('stats_v1', {
    totalTasksCompleted: 0,
    totalItemsPurchased: 0
  });

  const [tasks, setTasks] = useStickyState<Task[]>('tasks_v1', []);
  const [shopItems, setShopItems] = useStickyState<ShopItem[]>('shop_v1', DEFAULT_SHOP_ITEMS);
  const [inventory, setInventory] = useStickyState<InventoryItem[]>('inventory_v1', []);
  const [customAchievements, setCustomAchievements] = useStickyState<Achievement[]>('achievements_custom_v1', []);
  const [activeTab, setActiveTab] = useState<Tab>('TASKS');
  const [currentThemeId, setCurrentThemeId] = useStickyState<string>('theme_v1', 'paper');
  
  // Customization Modal State
  const [isCustomizing, setIsCustomizing] = useState(false);

  // --- Theme Logic ---
  useEffect(() => {
    const theme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
    const root = document.documentElement;
    root.style.setProperty('--pixel-dark', theme.colors.dark);
    root.style.setProperty('--pixel-card', theme.colors.card);
    root.style.setProperty('--pixel-accent', theme.colors.accent);
    root.style.setProperty('--pixel-blue', theme.colors.blue);
    root.style.setProperty('--pixel-text', theme.colors.text);
    root.style.setProperty('--pixel-input-bg', theme.colors.inputBg);
    
    // Set a muted color derived from text (approximate opacity)
    root.style.setProperty('--pixel-muted', theme.colors.text + '99'); // Hex transparency
  }, [currentThemeId]);

  // --- Logic Helpers ---
  const addExpAndGold = (expAmount: number, goldAmount: number) => {
    setHero(prev => {
      let newExp = prev.currentExp + expAmount;
      let newLevel = prev.level;
      let newGold = prev.gold + goldAmount;
      let maxExp = newLevel * 100;

      // Level Up Logic
      while (newExp >= maxExp) {
        newExp -= maxExp;
        newLevel++;
        maxExp = newLevel * 100;
      }

      return {
        ...prev,
        level: newLevel,
        currentExp: newExp,
        gold: newGold
      };
    });
  };

  const handleUpdateAppearance = (newAppearance: Appearance) => {
    setHero(prev => ({ ...prev, appearance: newAppearance }));
    setIsCustomizing(false);
  };

  // Soft Reset: Resets progress but keeps User Customization (Shop & Look & Achievements)
  const handleResetGame = () => {
    // 1. Reset Hero Status (Level, Gold, Exp) but KEEP Appearance
    setHero(prev => ({
      ...prev,
      level: 1,
      currentExp: 0,
      gold: 0,
      // Appearance is preserved
    }));

    // 2. Reset Stats
    setStats({
      totalTasksCompleted: 0,
      totalItemsPurchased: 0
    });

    // 3. Clear Inventory
    setInventory([]);

    // 4. Clear Active Tasks
    setTasks([]);

    // 5. Shop Items are PRESERVED
    // 6. Custom Achievements are PRESERVED
    
    // Force UI refresh (optional, but React state update handles it)
    alert("时光倒流成功！你的等级、金币和任务已重置，但你的形象、商店和自定成就已保留。");
  };

  // --- Task Handlers ---
  const handleAddTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      priority,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const reward = PRIORITY_CONFIG[task.priority];
    addExpAndGold(reward.exp, reward.gold);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    
    // Update Stats
    setStats(prev => ({
      ...prev,
      totalTasksCompleted: prev.totalTasksCompleted + 1
    }));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // --- Shop Handlers ---
  const handleAddItem = (name: string, price: number, icon: string) => {
    const newItem: ShopItem = {
      id: uuidv4(),
      name,
      price,
      icon
    };
    setShopItems(prev => [...prev, newItem]);
  };

  const handleDeleteShopItem = (id: string) => {
    setShopItems(prev => prev.filter(i => i.id !== id));
  };

  const handleBuyItem = (item: ShopItem) => {
    if (hero.gold >= item.price) {
      setHero(prev => ({ ...prev, gold: prev.gold - item.price }));
      const inventoryItem: InventoryItem = {
        ...item,
        uniqueId: uuidv4(),
        purchasedAt: Date.now()
      };
      setInventory(prev => [inventoryItem, ...prev]);
      
      // Update Stats
      setStats(prev => ({
        ...prev,
        totalItemsPurchased: prev.totalItemsPurchased + 1
      }));
    }
  };

  // --- Achievement Handlers ---
  const handleAddAchievement = (title: string, description: string, icon: string, targetType: 'TASK' | 'BUY', targetValue: number) => {
    const newAch: Achievement = {
      id: uuidv4(),
      title,
      description,
      icon,
      targetType,
      targetValue
    };
    setCustomAchievements(prev => [...prev, newAch]);
  };

  const handleDeleteAchievement = (id: string) => {
    setCustomAchievements(prev => prev.filter(a => a.id !== id));
  };

  // --- Inventory Handlers ---
  const handleUseItem = (uniqueId: string) => {
    setInventory(prev => prev.filter(i => i.uniqueId !== uniqueId));
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-pixel-dark font-pixel text-pixel-text flex flex-col transition-colors duration-300">
      {/* Background Dots */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Hero Customization Modal */}
      {isCustomizing && (
        <HeroCustomizer 
          initialAppearance={hero.appearance || DEFAULT_APPEARANCE} 
          onSave={handleUpdateAppearance}
          onClose={() => setIsCustomizing(false)}
        />
      )}

      {/* Sticky Combined Header (Info + Nav) */}
      <HeroHeader 
        hero={hero} 
        onAvatarClick={() => setIsCustomizing(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="relative z-0 flex-1 max-w-2xl w-full mx-auto p-4 mt-2">
        {activeTab === 'TASKS' && (
          <TaskSection 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
        
        {activeTab === 'SHOP' && (
          <ShopSection 
            items={shopItems}
            userGold={hero.gold}
            onAddItem={handleAddItem}
            onBuyItem={handleBuyItem}
            onDeleteItem={handleDeleteShopItem}
          />
        )}

        {activeTab === 'INVENTORY' && (
          <InventorySection 
            inventory={inventory}
            onUseItem={handleUseItem}
            stats={stats}
            customAchievements={customAchievements}
            onAddAchievement={handleAddAchievement}
            onDeleteAchievement={handleDeleteAchievement}
          />
        )}

        {activeTab === 'SETTINGS' && (
          <SettingsSection 
            currentThemeId={currentThemeId}
            onThemeChange={setCurrentThemeId}
            onResetGame={handleResetGame}
          />
        )}
      </main>
    </div>
  );
};

export default App;
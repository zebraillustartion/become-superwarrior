
import { Priority, ShopItem, Achievement, Appearance, Theme } from './types';

export const LEVEL_BASE_EXP = 100;

export const LEVEL_TITLES = [
  "初出茅庐", "蓄势待发", "心向阳光", "充满希望", "跬步千里", "每日精进", "拒绝拖延", "行胜于言", "崭露头角", "渐入佳境", // 1-10
  "坚持不懈", "闻鸡起舞", "披星戴月", "勇往直前", "磨砺意志", "攻坚克难", "严于律己", "只争朝夕", "奋发图强", "势如破竹", // 11-20
  "游刃有余", "独当一面", "乘风破浪", "披荆斩棘", "意气风发", "智慧之光", "运筹帷幄", "出类拔萃", "卓尔不群", "中流砥柱", // 21-30
  "炉火纯青", "登峰造极", "高瞻远瞩", "虚怀若谷", "宁静致远", "厚积薄发", "匠心独运", "矢志不渝", "气贯长虹", "王者风范", // 31-40
  "壮志凌云", "追光之人", "照亮黑暗", "纵横四海", "震古烁今", "一代宗师", "荣耀加身", "改变世界", "星辰大海", "无尽传说"  // 41-50
];

export const PRIORITY_CONFIG = {
  [Priority.HIGH]: {
    label: '高',
    exp: 50,
    gold: 20,
    color: 'text-red-500',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/20',
  },
  [Priority.MEDIUM]: {
    label: '中',
    exp: 30,
    gold: 10,
    color: 'text-blue-500',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/20',
  },
  [Priority.LOW]: {
    label: '低',
    exp: 10,
    gold: 5,
    color: 'text-green-600',
    borderColor: 'border-green-600',
    bgColor: 'bg-green-500/20',
  },
};

export const DEFAULT_SHOP_ITEMS: ShopItem[] = [
  { id: 'default_1', name: '喝杯奶茶', price: 50, icon: '🥤' },
  { id: 'default_2', name: '游戏1小时', price: 100, icon: '🎮' },
  { id: 'default_3', name: '睡懒觉', price: 80, icon: '🛌' },
  { id: 'default_4', name: '吃顿好的', price: 200, icon: '🍖' },
];

export const EMOJI_OPTIONS = [
  '🥤', '🎮', '🛌', '🍖', '🍰', 
  '🍺', '🍿', '🎬', '🚲', '🛀', 
  '📚', '🏖️', '🎧', '🎸', '🎹'
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'novice',
    title: '初出茅庐',
    description: '完成第1个任务',
    icon: '🐣',
    targetType: 'TASK',
    targetValue: 1,
  },
  {
    id: 'task_master',
    title: '任务达人',
    description: '累计完成10个任务',
    icon: '⚔️',
    targetType: 'TASK',
    targetValue: 10,
  },
  {
    id: 'shopaholic',
    title: '购物狂',
    description: '累计购买5次商品',
    icon: '🛍️',
    targetType: 'BUY',
    targetValue: 5,
  },
  {
    id: 'veteran',
    title: '身经百战',
    description: '累计完成50个任务',
    icon: '👑',
    targetType: 'TASK',
    targetValue: 50,
  }
];

// --- Customization Constants ---

export const DEFAULT_APPEARANCE: Appearance = {
  skinColor: '#f5d0b0', // Light
  hairColor: '#4a3728', // Brown
  hairStyle: 'SHORT',
  outfitColor: '#3b82f6', // Blue
};

export const SKIN_COLORS = [
  '#f5d0b0', // Light
  '#e0ac69', // Tan
  '#8d5524', // Dark
  '#ffdbac', // Pale
  '#c68642', // Bronze
];

export const HAIR_COLORS = [
  '#4a3728', // Brown
  '#000000', // Black
  '#eab308', // Blonde
  '#991b1b', // Red
  '#9ca3af', // Grey
  '#3b82f6', // Blue (Anime)
];

export const OUTFIT_COLORS = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#22c55e', // Green
  '#a855f7', // Purple
  '#eab308', // Gold
  '#1f2937', // Dark Grey
];

export const HAIR_STYLES = [
  { id: 'SHORT', label: '短发' },
  { id: 'LONG', label: '长发' },
  { id: 'MOHAWK', label: '莫西干' },
  { id: 'BALD', label: '光头' },
];

// --- Theme Constants (Light Modes) ---

export const THEMES: Theme[] = [
  {
    id: 'paper',
    name: '经典羊皮卷',
    colors: {
      dark: '#fdf6e3', // Solarized Base3
      card: '#eee8d5', // Solarized Base2
      accent: '#d33682', // Magenta
      blue: '#268bd2', // Blue
      text: '#000000', // Black Text
      inputBg: '#ffffff', // White Input
    },
  },
  {
    id: 'sky',
    name: '晴空万里',
    colors: {
      dark: '#f0f9ff', // Sky 50
      card: '#e0f2fe', // Sky 100
      accent: '#f472b6', // Pink 400
      blue: '#0ea5e9', // Sky 500
      text: '#000000', // Black Text
      inputBg: '#ffffff', // White Input
    },
  },
  {
    id: 'mint',
    name: '清新薄荷',
    colors: {
      dark: '#f0fdf4', // Green 50
      card: '#dcfce7', // Green 100
      accent: '#fb923c', // Orange 400
      blue: '#22c55e', // Green 500
      text: '#000000', // Black Text
      inputBg: '#ffffff', // White Input
    },
  },
  {
    id: 'lavender',
    name: '香芋紫梦',
    colors: {
      dark: '#faf5ff', // Purple 50
      card: '#f3e8ff', // Purple 100
      accent: '#e879f9', // Fuchsia 400
      blue: '#a855f7', // Purple 500
      text: '#000000', // Black Text
      inputBg: '#ffffff', // White Input
    },
  },
  {
    id: 'classic_dark',
    name: '经典午夜 (暗色)',
    colors: {
      dark: '#1a1a2e',
      card: '#16213e',
      accent: '#e94560',
      blue: '#0f3460',
      text: '#eeeeee',
      inputBg: '#2a2a40', // Darker input for dark mode
    },
  },
];

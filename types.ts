export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export type HairStyle = 'SHORT' | 'LONG' | 'MOHAWK' | 'BALD';

export interface Appearance {
  skinColor: string;
  hairColor: string;
  hairStyle: HairStyle;
  outfitColor: string;
}

export interface Hero {
  level: number;
  currentExp: number;
  gold: number;
  appearance: Appearance;
}

export interface UserStats {
  totalTasksCompleted: number;
  totalItemsPurchased: number;
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  createdAt: number;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface InventoryItem extends ShopItem {
  uniqueId: string; // To handle multiple instances of the same item
  purchasedAt: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetType: 'TASK' | 'BUY';
  targetValue: number;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    dark: string;
    card: string;
    accent: string;
    blue: string;
    text: string;
    inputBg: string; // New: Background color for input fields
  };
}

export type Tab = 'TASKS' | 'SHOP' | 'INVENTORY' | 'SETTINGS';
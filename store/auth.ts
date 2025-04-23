// app/store/auth.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  logout: () => void;
};

// Custom storage adapter for expo-secure-store
const secureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (e) {
      console.error('Error getting item from SecureStore', e);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Error setting item in SecureStore', e);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('Error removing item from SecureStore', e);
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

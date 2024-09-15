// store.ts
import { create } from 'zustand';
import { StoreState, Category } from '../constants'; // Adjust the import path as needed

export const useStore = create<StoreState>()((set) => ({
  categories: [],
  addCategory: (category: Category) => set((state: StoreState) => ({
    categories: [...state.categories, category]
  })),
  updateCategory: (updatedCategory: Category) => set((state: StoreState) => ({
    categories: state.categories.map(cat =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    )
  })),
  deleteCategory: (id: string) => set((state: StoreState) => ({
    categories: state.categories.filter(cat => cat.id !== id)
  })),
}));

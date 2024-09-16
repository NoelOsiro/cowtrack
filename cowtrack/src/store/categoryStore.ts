import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreState, Category } from '../constants'; // Adjust the import path as needed

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      categories: [],

      addCategory: (category: Category | Category[]) => {
        set((state: StoreState) => {
          // Ensure we're always adding individual category items (handle array case)
          const newCategories = Array.isArray(category) ? category : [category];
          return {
            categories: [...state.categories, ...newCategories],
          };
        });
      },

      editCategory: (updatedCategory: Category) =>
        set((state: StoreState) => ({
          categories: state.categories.map((cat) =>
            cat.id === updatedCategory.id ? updatedCategory : cat
          ),
        })),

      removeCategory: (id: string) =>
        set((state: StoreState) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        })),
    }),
    {
      name: 'categories-storage', // Name of the storage item in localStorage
    }
  )
);

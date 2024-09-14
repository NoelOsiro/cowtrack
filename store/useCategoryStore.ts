import { create } from 'zustand';
import { Category, Animal, categoriesData } from '@/constants/categoriesData'; // Ensure correct import path
import { COLORS, icons } from '@/constants'; // Ensure correct import path
import { deleteCategory, getCategoriesData, insertCategory, storeCategoriesData, updateCategory } from './dataStorage';
// Ensure correct import path

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  showMoreToggle: boolean;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: Category | null) => void;
  setShowMoreToggle: (showMore: boolean) => void;
  setCategoryName: (name: string) => void;
  setCategoryColor: (color: string) => void;
  setCategoryIcon: (icon: string) => void;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  updateAnimalsForCategory: (categoryId: string, animals: Animal[]) => void;
  loadCategories: () => Promise<void>;
  saveCategories: () => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [], // Initially empty, will be set from DB, constants, or AsyncStorage
  selectedCategory: null,
  showMoreToggle: false,
  categoryName: '',
  categoryColor: COLORS.primary,
  categoryIcon: '',

  setCategories: (categories: Category[]) => set({ categories }),
  setSelectedCategory: (category: Category | null) => set({ selectedCategory: category }),
  setShowMoreToggle: (showMore: boolean) => set({ showMoreToggle: showMore }),
  setCategoryName: (name: string) => set({ categoryName: name }),
  setCategoryColor: (color: string) => set({ categoryColor: color }),
  setCategoryIcon: (icon: string) => set({ categoryIcon: icon }),

  updateAnimalsForCategory: (categoryId: string, animals: Animal[]) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId ? { ...category, animals } : category
      ),
    })),

  // Load categories from AsyncStorage or fallback to default data
  loadCategories: async () => {
    const storedCategories = await getCategoriesData();
    if (storedCategories) {
      set({ categories: storedCategories });
    } else {
      set({ categories: categoriesData }); // If no AsyncStorage data, use default
      await storeCategoriesData(categoriesData); // Save the default data in AsyncStorage
    }
  },

  // Save categories into AsyncStorage
  saveCategories: async () => {
    const { categories } = useCategoryStore.getState(); // Access current state categories
    await storeCategoriesData(categories); // Save categories into AsyncStorage
  },
  //Add category and save to storage
  addCategory: async (category) => {
    await insertCategory(category)
    .then(() => {
      console.log('Category added successfully');
    }
    )
    
    set((state) => ({
      categories: [...state.categories, category],
    }));
  },

  updateCategory: async (category) => {
    await updateCategory(category)
    .then(() => {
      console.log('Category updated successfully');
    }
    )
    set((state) => ({
      categories: state.categories.map((item) =>
        item.id === category.id ? category : item
      ),
    })); 
  },

  deleteCategory: async (categoryId) => {
    await deleteCategory(categoryId)
    .then(() => {
      console.log('Category deleted successfully');
    }
    )
    set((state) => ({
      categories: state.categories.filter((item) => item.id !== categoryId),
    }));
  }
}));

export default useCategoryStore;

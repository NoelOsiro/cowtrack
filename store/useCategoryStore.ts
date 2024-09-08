// useCategoryStore.ts
import {create} from 'zustand';
import { categoriesData, Category, Animal } from '@/constants/categoriesData'; // Update this import path based on your project structure
import { COLORS, icons } from '@/constants'; // Update this import path based on your project structure

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
    updateAnimalsForCategory: (categoryId: number, animals: Animal[]) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
    categories: categoriesData,
    selectedCategory: null,
    showMoreToggle: false,
    categoryName: '',
    categoryColor: COLORS.primary,
    categoryIcon: Object.keys(icons)[0],
    setCategories: (categories) => set({ categories }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setShowMoreToggle: (showMore) => set({ showMoreToggle: showMore }),
    setCategoryName: (name) => set({ categoryName: name }),
    setCategoryColor: (color) => set({ categoryColor: color }),
    setCategoryIcon: (icon) => set({ categoryIcon: icon }),
    updateAnimalsForCategory: (categoryId: number, animals: Animal[]) =>
        set((state) => ({
            categories: state.categories.map((category) =>
                category.id === categoryId ? { ...category, animals } : category
            ),
        })),
}));

export default useCategoryStore;

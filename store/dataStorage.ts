// asyncStorage.ts (or the relevant utils file)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '@/constants/categoriesData'; // Ensure correct import path

const CATEGORIES_KEY = 'categoriesData';

// Function to store categories into AsyncStorage
export const storeCategoriesData = async (categories: Category[]): Promise<void> => {
  try {
    const jsonCategories = JSON.stringify(categories);
    await AsyncStorage.setItem(CATEGORIES_KEY, jsonCategories);
  } catch (error) {
    console.error('Error storing categories data:', error);
  }
};

// Function to get categories from AsyncStorage
export const getCategoriesData = async (): Promise<Category[] | null> => {
  try {
    const jsonCategories = await AsyncStorage.getItem(CATEGORIES_KEY);
    return jsonCategories != null ? JSON.parse(jsonCategories) : null;
  } catch (error) {
    console.error('Error getting categories data:', error);
    return null;
  }
};

// Function to insert a new category into AsyncStorage
export const insertCategory = async (category: Category): Promise<void> => {
  try {
    const storedCategories = await getCategoriesData();
    if (storedCategories) {
      const updatedCategories = [...storedCategories, category];
      await storeCategoriesData(updatedCategories);
    }
  } catch (error) {
    console.error('Error inserting category:', error);
  }
};

// Function to delete a category in AsyncStorage
export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    const storedCategories = await getCategoriesData();
    if (storedCategories) {
      const updatedCategories = storedCategories.filter((category) => category.id !== categoryId);
      await storeCategoriesData(updatedCategories);
    }
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

// Function to update a category in AsyncStorage
export const updateCategory = async (updatedCategory: Category): Promise<void> => {
  try {
    const storedCategories = await getCategoriesData();
    if (storedCategories) {
      const updatedCategories = storedCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      await storeCategoriesData(updatedCategories);
    }
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

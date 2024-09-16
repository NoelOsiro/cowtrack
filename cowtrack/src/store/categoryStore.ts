import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreState, Category } from '../constants';
import { useBreedStore } from './breedStore'; // Import Breed store
import { useAnimalStore } from './animalStore'; // Import Animal store

// Separate the logic to handle cascading deletes
const cascadeDeleteBreedsAndAnimals = (categoryId: number) => {
  const { breeds, removeBreed } = useBreedStore.getState();
  const { removeAnimal } = useAnimalStore.getState();

  // Find breeds associated with the removed category
  const breedsToRemove = breeds.filter((breed) => breed.categoryId === categoryId);

  // Remove related breeds and associated animals
  breedsToRemove.forEach((breed) => {
    removeBreed(breed.id);

    // Remove animals associated with the removed breed
    const { animals } = useAnimalStore.getState();
    const animalsToRemove = animals.filter((animal) => animal.breedId === breed.id.toString());
    animalsToRemove.forEach((animal) => removeAnimal(animal.id));
  });
};

export const useCategoryStore = create<StoreState>()(
  persist(
    (set) => ({
      categories: [],

      addCategory: (category: Category | Category[]) => {
        set((state: StoreState) => {
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

      removeCategory: (id: number) => {
        // Cascade delete logic before updating state
        cascadeDeleteBreedsAndAnimals(id);

        // Update the category state by removing the selected category
        set((state: StoreState) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        }));
      },
    }),
    {
      name: 'categories-storage', // Name of the storage item in localStorage
    }
  )
);

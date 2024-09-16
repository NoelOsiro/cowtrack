import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BreedStoreState, Breed } from '../constants';
import { useAnimalStore } from './animalStore'; // Import Animal store

// Separate the logic to handle cascading deletes
const cascadeDeleteAnimals = (breedId: number) => {
  const { animals, removeAnimal } = useAnimalStore.getState();

  // Find animals associated with the removed breed
  const animalsToRemove = animals.filter((animal) => animal.breedId === breedId.toString());

  // Remove related animals
  animalsToRemove.forEach((animal) => removeAnimal(animal.id));
};

export const useBreedStore = create<BreedStoreState>()(
  persist(
    (set) => ({
      breeds: [],

      addBreed: (breed: Breed | Breed[]) => {
        set((state: BreedStoreState) => {
          const newBreeds = Array.isArray(breed) ? breed : [breed];
          return {
            breeds: [...state.breeds, ...newBreeds],
          };
        });
      },

      editBreed: (updatedBreed: Breed) =>
        set((state: BreedStoreState) => ({
          breeds: state.breeds.map((b) =>
            b.id === updatedBreed.id ? updatedBreed : b
          ),
        })),

      removeBreed: (id: number) => {
        // Cascade delete logic before updating state
        cascadeDeleteAnimals(id);

        // Update the breed state by removing the selected breed
        set((state: BreedStoreState) => ({
          breeds: state.breeds.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: 'breeds-storage', // Name of the storage item in localStorage
    }
  )
);

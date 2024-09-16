import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BreedStoreState, Breed } from '../constants'; // Adjust the import path as needed

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
          breeds: state.breeds.map((cat) =>
            cat.id === updatedBreed.id ? updatedBreed : cat
          ),
        })),

      removeBreed: (id: string) =>
        set((state: BreedStoreState) => ({
          breeds: state.breeds.filter((cat) => cat.id !== id),
        })),
    }),
    {
      name: 'breeds-storage', // Name of the storage item in localStorage
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnimalStoreState, Animal } from '../constants'; // Adjust the import path as needed

export const useAnimalStore = create<AnimalStoreState>()(
  persist(
    (set) => ({
      animals: [],

      addAnimal: (animal: Animal | Animal[]) => {
        set((state: AnimalStoreState) => {
          const newAnimals = Array.isArray(animal) ? animal : [animal];
          return {
            animals: [...state.animals, ...newAnimals],
          };
        });
      },

      editAnimal: (updatedAnimal: Animal) =>
        set((state: AnimalStoreState) => ({
          animals: state.animals.map((cat) =>
            cat.id === updatedAnimal.id ? updatedAnimal : cat
          ),
        })),

      removeAnimal: (id: string) =>
        set((state: AnimalStoreState) => ({
          animals: state.animals.filter((cat) => cat.id !== id),
        })),
    }),
    {
      name: 'animals-storage', // Name of the storage item in localStorage
    }
  )
);

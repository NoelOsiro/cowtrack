// store.ts
import { create } from 'zustand';
import { AnimalStoreState, Animal } from '../constants'; // Adjust the import path as needed

export const useAnimalStore = create<AnimalStoreState>()((set) => ({
  animals: [],
  addAnimal: (animal: Animal) => set((state: AnimalStoreState) => ({
    animals: [...state.animals, animal]
  })),
  updateAnimal: (updatedAnimal: Animal) => set((state: AnimalStoreState) => ({
    animals: state.animals.map((cat: Animal) =>
      cat.id === updatedAnimal.id ? updatedAnimal : cat
    )
  })),
  deleteAnimal: (id: string) => set((state: AnimalStoreState) => ({
    animals: state.animals.filter((cat:Animal) => cat.id !== id)
  })),
}));

// store.ts
import { create } from 'zustand';
import { BreedStoreState, Breed } from '../constants'; // Adjust the import path as needed

export const useBreedStore = create<BreedStoreState>()((set) => ({
  breeds: [],
  addBreed: (breed: Breed) => set((state: BreedStoreState) => ({
    breeds: [...state.breeds, breed]
  })),
  updateBreed: (updatedBreed: Breed) => set((state: BreedStoreState) => ({
    breeds: state.breeds.map(cat =>
      cat.id === updatedBreed.id ? updatedBreed : cat
    )
  })),
  deleteBreed: (id: string) => set((state: BreedStoreState) => ({
    breeds: state.breeds.filter(cat => cat.id !== id)
  })),
}));

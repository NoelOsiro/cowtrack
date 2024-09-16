import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnimalStoreState, Animal } from '../constants';
import { useBreedStore } from './breedStore'; // Import the Breed store

export const useAnimalStore = create<AnimalStoreState>()(
  persist(
    (set) => ({
      animals: [],

      addAnimal: (animal: Animal | Animal[]) => {
        set((state: AnimalStoreState) => {
          const newAnimals = Array.isArray(animal) ? animal : [animal];

          // Ensure the breed exists before adding the animal
          const { breeds } = useBreedStore.getState();
          newAnimals.forEach(newAnimal => {
            const breed = breeds.find(b => b.id === parseInt(newAnimal.breedId));
            if (!breed) {
              console.error(`Breed ID ${newAnimal.breedId} does not exist!`);
              return;
            }
          });

          return {
            animals: [...state.animals, ...newAnimals],
          };
        });
      },

      editAnimal: (updatedAnimal: Animal) =>
        set((state: AnimalStoreState) => {
          const { breeds } = useBreedStore.getState();
          const breed = breeds.find(b => b.id === parseInt(updatedAnimal.breedId));
          if (!breed) {
            console.error(`Breed ID ${updatedAnimal.breedId} does not exist!`);
            return state; // Do nothing if breed doesn't exist
          }

          return {
            animals: state.animals.map((animal) =>
              animal.id === updatedAnimal.id ? updatedAnimal : animal
            ),
          };
        }),

      removeAnimal: (id: number) =>
        set((state: AnimalStoreState) => ({
          animals: state.animals.filter((animal) => animal.id !== id),
        })),
    }),
    {
      name: 'animals-storage', // Name of the storage item in localStorage
    }
  )
);

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal } from '@/constants/types';
import { getAnimalsByUserId, animalsCollection } from '@/services/animalCollections'; // Adjust the import path as necessary
import { addDoc } from 'firebase/firestore';
import { Platform } from 'react-native';

interface AnimalStore {
  animals: Animal[];
  fetchAnimals: (userId: string) => Promise<void>;
  addAnimal: (animal: Animal) => Promise<void>;
  clearAnimals: () => void;
}

export const useAnimalStore = create<AnimalStore>()(
  persist(
    (set) => ({
      animals: [],
      
      // Fetches animals for the specified user from Firestore
      fetchAnimals: async (userId) => {
        try {
          const fetchedAnimals = await getAnimalsByUserId(userId);
          set({ animals: fetchedAnimals as Animal[] });
        } catch (error) {
          console.error('Error fetching animals:', error);
        }
      },
      
      // Adds a new animal to Firestore and updates the Zustand store
      addAnimal: async (animal) => {
        try {
          const docRef = await addDoc(animalsCollection, animal);
          set((state) => ({ animals: [...state.animals, { ...animal, id: docRef.id }] }));
        } catch (error) {
          console.error('Error adding animal:', error);
        }
      },

      // Clears animals from the Zustand store (useful for logouts or resets)
      clearAnimals: () => set({ animals: [] }),
    }),
    
    // Persistence configuration for Zustand, using AsyncStorage or localStorage based on platform
    {
      name: 'animal-storage',
      storage: createJSONStorage(() => 
        Platform.OS === "web" ? localStorage : AsyncStorage
      ),
    }
  )
);

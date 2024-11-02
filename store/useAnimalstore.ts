import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal } from '@/constants/types';
import { getAnimalsByUserId, animalsCollection } from '@/services/animalCollections';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { Platform } from 'react-native';

interface AnimalStore {
  animals: Animal[];
  hasFetched: boolean;
  fetchAnimals: (userId: string) => Promise<void>;
  addAnimal: (animal: Animal) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
  archiveAnimal: (animalId: string) => Promise<void>;
  clearAnimals: () => void;
}

export const useAnimalStore = create<AnimalStore>()(
  persist(
    (set, get) => ({
      animals: [],
      hasFetched: false,

      // Fetches animals for the specified user from Firestore
      fetchAnimals: async (userId) => {
        const { animals, hasFetched } = get();
        
        // Fetch only if not already fetched
        if (animals.length === 0 && !hasFetched) {
          try {
            const fetchedAnimals = await getAnimalsByUserId(userId);
            set({ animals: fetchedAnimals as Animal[], hasFetched: true });
          } catch (error) {
            console.error('Error fetching animals:', error);
          }
        }
      },

      // Adds a new animal to Firestore and updates the Zustand store
      addAnimal: async (animal) => {
        try {
          const docRef = await addDoc(animalsCollection, animal);
          set((state) => ({
            animals: [...state.animals, { ...animal, id: docRef.id }],
          }));
        } catch (error) {
          console.error('Error adding animal:', error);
        }
      },

      // Archives an animal in Firestore and removes it from the Zustand store
      archiveAnimal: async (animalId) => {
        try {
          const animalRef = doc(animalsCollection, animalId);
          await updateDoc(animalRef, { archived: true });
          set((state) => ({
            animals: state.animals.filter((animal) => animal.id !== animalId),
          }));
        } catch (error) {
          console.error('Error archiving animal:', error);
        }
      },

      // Updates an existing animal in Firestore and the Zustand store
      updateAnimal: async (animal) => {
        try {
          const animalRef = doc(animalsCollection, animal.id);
          await updateDoc(animalRef, animal as { [x: string]: any });
          set((state) => ({
            animals: state.animals.map((a) =>
              a.id === animal.id ? animal : a
            ),
          }));
        } catch (error) {
          console.error('Error updating animal:', error);
        }
      },

      // Clears animals from the Zustand store (useful for logouts or resets)
      clearAnimals: () => set({ animals: [], hasFetched: false }),
    }),

    // Persistence configuration for Zustand, using AsyncStorage or localStorage based on platform
    {
      name: 'animal-storage',
      storage: createJSONStorage(() =>
        Platform.OS === 'web' ? localStorage : AsyncStorage
      ),
    }
  )
);

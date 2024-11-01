import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal } from '@/constants/types';
import { getAnimalsByUserId, animalsCollection } from '@/services/animalCollections'; // Adjust the import path as necessary
import { addDoc,doc, updateDoc } from 'firebase/firestore';
import { Platform } from 'react-native';

interface AnimalStore {
  animals: Animal[];
  fetchAnimals: (userId: string) => Promise<void>;
  addAnimal: (animal: Animal) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
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
      // New archiveAnimal function
      archiveAnimal: async (animalId:string) => {
        try {
          const animalRef = doc(animalsCollection, animalId);
          await updateDoc(animalRef, { archived: true }); // Update the Firestore document to mark it as archived
          set((state) => ({ animals: state.animals.filter((animal) => animal.id !== animalId) }));
        } catch (error) {
          console.error("Error archiving animal:", error);
        }
      },

      // Updates an existing animal in Firestore and updates the Zustand store
      updateAnimal: async (animal) => {
        try {
          const animalRef = doc(animalsCollection, animal.id);
          await updateDoc(animalRef, animal as { [x: string]: any }); // Update the Firestore document with the new animal data
          set((state) => ({
            animals: state.animals.map((a) => (a.id === animal.id ? animal : a)),
          }));
        } catch (error) {
          console.error('Error updating animal:', error);
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

// src/stores/homepageStore.ts

import {create} from 'zustand';

// Define the type for the store state
interface HomepageStoreState {
  selectedData: {
    label: string;
    value: number;
  } | null;
  setSelectedData: (data: { label: string; value: number } | null) => void;
}

// Create the Zustand store
export const useHomepageStore = create<HomepageStoreState>((set) => ({
  selectedData: null,
  setSelectedData: (data) => set({ selectedData: data }),
}));

import { home, pencil, addCircle } from 'ionicons/icons';

export const categoryIcons = [
  { value: 'home', label: 'Home', icon: home },
  { value: 'pencil', label: 'Pencil', icon: pencil },
  { value: 'addCircle', label: 'Add Circle', icon: addCircle },
];

export const categoryColors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
];

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string; // New field for category type
}
export interface StoreState {
  categories: Category[];
  addCategory: (category: Category) => void;
  editCategory: (updatedCategory: Category) => void;
  removeCategory: (id: number) => void;
}
export interface Breed {
  id: number;
  name: string;
  categoryId: number;
}
export interface BreedStoreState {
  breeds: Breed[];
  addBreed: (breed: Breed) => void;
  editBreed: (updatedBreed: Breed) => void;
  removeBreed: (id: number) => void;
}

export interface Animal {
  id: number;
  name: string;
  breedId: number;
  count: number;
  location:string;

}
export interface AnimalStoreState {
  animals: Animal[];
  addAnimal: (animal: Animal) => void;
  editAnimal: (updatedAnimal: Animal) => void;
  removeAnimal: (id: number) => void;
}
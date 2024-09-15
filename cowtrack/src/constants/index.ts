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
  id: string;
  name: string;
  icon: string;
  color: string;
  type: string; // New field for category type
}
export interface StoreState {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (updatedCategory: Category) => void;
  deleteCategory: (id: string) => void;
}
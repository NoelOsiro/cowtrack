import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Breed } from '../constants';
import { supabase } from './supabase/supabaseClient';

export const saveBreed = async (breed: Breed) => {
  try {
    const { data, error } = await supabase.from('breeds').insert([
      {
        name: breed.name,
        categoryId: breed.categoryId
      }
    ])

    if (error) {
      throw new Error('Failed to save category.');
    }
    return data;
  }
  catch (error: any) {
    // If file doesn't exist, initialize existingData as an empty array
    throw error;
  }
}

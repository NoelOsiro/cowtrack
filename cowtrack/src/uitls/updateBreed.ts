import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Breed } from '../constants';
import { supabase } from './supabase/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export const updateBreed = async (updatedBreed: Breed) => {
  // Try to read existing data
  try {
    const { data, error } = await supabase
      .from('breeds')
      .update({
        name: updatedBreed.name,
        categoryId: updatedBreed.categoryId
      })
        .eq('id', updatedBreed.id)

        if (error) {
          throw new Error('Failed to save category.');
        }
        return data;
  } catch (error: any) {
    // If file doesn't exist, initialize existingData as an empty array
    throw error;
  }
}



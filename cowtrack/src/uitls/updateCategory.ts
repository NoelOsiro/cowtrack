import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Category } from '../constants';
import { supabase } from './supabase/supabaseClient';

export const updateCategory = async (updatedCategory: Category) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update([{
        name: updatedCategory.name,
        icon: updatedCategory.icon,
        color: updatedCategory.color
      }])
      .eq('id', updatedCategory.id)
      .select('*');

    if (error) {
      throw new Error('Failed to save category.');
    }
    return data;
  } catch (error) {;
    throw new Error('An unexpected error occurred while saving the category.');
  }
  };
  
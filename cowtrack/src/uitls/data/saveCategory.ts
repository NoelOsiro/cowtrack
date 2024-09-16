import { Category } from '../../constants';
import { supabase } from '../supabase/supabaseClient';

export const saveCategory = async (category: Category): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name: category.name,
        icon: category.icon,
        color: category.color
      }])
      .select('*');

    if (error) {
      throw new Error('Failed to save category.');
    }
    return data;
  } catch (error) {;
    throw new Error('An unexpected error occurred while saving the category.');
  }
};

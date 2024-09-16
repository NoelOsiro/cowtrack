import { supabase } from '../supabase/supabaseClient';

export const deleteCategory = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .select('*');

    if (error) {
      throw new Error('Failed to delete category.');
    }
    return data;
  } catch (error) {
    throw new Error('An unexpected error occurred while deleting the category.');
  }
};
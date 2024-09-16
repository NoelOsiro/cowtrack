import { supabase } from "./supabase/supabaseClient";

export const deleteBreed = async (breedId: string) => {
  try {
    const { data, error } = await supabase
      .from('breeds')
      .delete()
      .eq('id', breedId)
      .select('*');

    if (error) {
      throw new Error('Failed to delete breed.');
    }
    return data;
  } catch (error) {
    throw new Error('An unexpected error occurred while deleting the breed.');
  }
}
  
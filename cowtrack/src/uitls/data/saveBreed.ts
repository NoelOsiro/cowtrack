import { Breed } from '../../constants';
import { supabase } from '../supabase/supabaseClient';

export const saveBreed = async (breed: Breed): Promise<any | Error> => {
  try {
    // Insert the breed into the Supabase table with correct type arguments
    const { data, error } = await supabase
      .from('breeds') // Specify Breed as the table row type
      .insert([
        {
          name: breed.name,
          categoryId: breed.categoryId,
        },
      ])
      .select('*');

    if (error) {
      return new Error('Failed to save breed: ' + error.message);
    }
    
    return data;

     // Return the inserted data typed as Breed[]
  } catch (error: any) {
    return new Error('An unexpected error occurred: ' + error.message);
  }
};

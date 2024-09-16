import { Animal } from '../../constants';
import { supabase } from '../supabase/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export const updateAnimal = async (updatedAnimal: Animal) => {
    try {
        const { data, error } = await supabase
        .from('animals')
        .update([{
            name: updatedAnimal.name,
            categoryId: updatedAnimal.categoryId,
            breedId: updatedAnimal.breedId,
            count: updatedAnimal.count,
            location: updatedAnimal.location
        }])
        .eq('id', updatedAnimal.id)
        .select('*');
    
        if (error) {
        throw new Error('Failed to save animal.');
        }
        return data;
    } catch (error) {;
        throw new Error('An unexpected error occurred while saving the animal.');
    }
    };
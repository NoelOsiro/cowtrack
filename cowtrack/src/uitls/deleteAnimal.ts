import { supabase } from "./supabase/supabaseClient";

export const deleteAnimal = async (animalId: string) => {
    try {
        const { data, error } = await supabase
        .from('animals')
        .delete()
        .eq('id', animalId)
        .select('*');
    
        if (error) {
        throw new Error('Failed to delete animal.');
        }
        return data;
    } catch (error) {
        throw new Error('An unexpected error occurred while deleting the animal.');
    }
    };
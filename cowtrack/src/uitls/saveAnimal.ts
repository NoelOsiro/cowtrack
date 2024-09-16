import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { v4 as uuidv4 } from 'uuid';
import { Animal } from '../constants';
import { supabase } from './supabase/supabaseClient';

export const saveAnimal = async (newData: Animal) => {

    try {
        const { data, error } = await supabase.from('animals').insert([
            {
                name: newData.name,
                breedId: newData.breedId,
                count: newData.count,
                location: newData.location,
            }
        ])
        .select('*');
        if (error) {
            throw new Error('Failed to save category.');
          }
          return data;
    } catch (error: any) {
        throw error;
    }
}
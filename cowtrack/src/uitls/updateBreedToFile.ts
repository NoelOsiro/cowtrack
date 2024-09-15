import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Breed } from '../constants';

export const updateBreedDataToFile = async (updatedBreed: Breed) => {
    try {
      const fileName = 'breeds.json';
      let existingData: Breed[] = [];
  
      // Try to read existing data
      try {
        const result = await Filesystem.readFile({
          path: fileName,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
  
        if (typeof result.data === 'string') {
          existingData = JSON.parse(result.data);
        }
      } catch (error:any) {
        // If file doesn't exist, initialize existingData as an empty array
        if (error.message.includes('File does not exist.')) {
          existingData = [];
        } else {
          throw error;
        }
      }
  
      // Update the category
      const updatedData = existingData.map(breed =>
        breed.id === updatedBreed.id ? updatedBreed : breed
      );
  
      // Save updated data back to file
      const jsonData = JSON.stringify(updatedData);
  
      await Filesystem.writeFile({
        path: fileName,
        data: jsonData,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
  
      console.log(`Data updated in ${fileName}`);
    } catch (error) {
      console.error('Unable to update data:', error);
    }
  };
  
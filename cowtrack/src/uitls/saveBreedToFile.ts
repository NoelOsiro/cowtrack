import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { v4 as uuidv4 } from 'uuid';
import { Breed } from '../constants';

export const saveBreedToFile = async (newData: Omit<Breed, 'id'>) => {
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
    } catch (error: any) {
      // If file doesn't exist, initialize existingData as an empty array
      if (error.message.includes('File does not exist.')) {
        existingData = [];
      } else {
        throw error;
      }
    }

    // Add new Breed with a unique ID
    const breedWithId: Breed = {
      id: uuidv4(),
      ...newData,
    };

    // Combine existing data with new breed
    const combinedData = [...existingData, breedWithId];

    // Save combined data back to file
    const jsonData = JSON.stringify(combinedData);

    await Filesystem.writeFile({
      path: fileName,
      data: jsonData,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    console.log(`Data saved to ${fileName}`);
  } catch (error) {
    console.error('Unable to save data:', error);
  }
};

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../constants';

export const saveDataToFile = async (newData: Omit<Category, 'id'>) => {
  try {
    const fileName = 'categories.json';
    let existingData: Category[] = [];

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

    // Add new category with a unique ID
    const categoryWithId: Category = {
      id: uuidv4(),
      ...newData,
    };

    // Combine existing data with new category
    const combinedData = [...existingData, categoryWithId];

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
